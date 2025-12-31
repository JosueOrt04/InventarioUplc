#!/bin/bash

# Configuración
BACKEND_DIR="$HOME/Documentos/Estancia_dos/Labora/laboratorio/Backen_React"
FRONTEND_PORT="5173"
BACKEND_PORT="5001"
WHATSAPP_SCRIPT="$BACKEND_DIR/src/enviar_whatsapp.cjs"

# Variables para monitoreo
SERVER_START_TIME=$(date +%s)
RESTART_COUNT=0
CURRENT_URL=""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

# ========== FUNCIONES DE MONITOREO Y REPARACIÓN ==========

# Monitoreo de salud del servidor (MEJORADO CON MÚLTIPLES MÉTODOS)
check_server_health() {
    local port=$1
    local timeout=8
    
    # Método 1: Verificar si el puerto está en uso
    if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        return 1
    fi
    
    # Método 2: Intentar conectar al puerto (más básico)
    if ! nc -z localhost $port >/dev/null 2>&1; then
        return 1
    fi
    
    # Método 3: Verificar endpoint de health (si existe)
    if curl -f -s -m $timeout "http://localhost:$port/health" >/dev/null 2>&1; then
        return 0
    fi
    
    # Método 4: Verificar endpoint raíz u otros endpoints comunes
    if curl -f -s -m $timeout "http://localhost:$port/" >/dev/null 2>&1; then
        return 0
    fi
    
    # Método 5: Verificar si responde cualquier endpoint (solo verificar conexión HTTP)
    if curl -s -m $timeout "http://localhost:$port" >/dev/null 2>&1; then
        return 0
    fi
    
    # Método 6: Verificar con wget si curl falla
    if command -v wget >/dev/null 2>&1; then
        if wget -q -O - --timeout=$timeout "http://localhost:$port" >/dev/null 2>&1; then
            return 0
        fi
    fi
    
    return 1
}

# Esperar a que el servidor esté listo (NUEVA FUNCIÓN)
wait_for_server() {
    local port=$1
    local max_attempts=15
    local attempt=1
    
    log "Esperando a que el servidor esté listo en puerto $port..."
    
    while [ $attempt -le $max_attempts ]; do
        if check_server_health $port; then
            success "Servidor listo después de ${attempt}s"
            return 0
        fi
        sleep 2
        ((attempt++))
    done
    
    error "El servidor no respondió después de $((max_attempts * 2)) segundos"
    return 1
}

# Reinicio forzoso del servidor (MEJORADO CON ESPERA)
force_restart_server() {
    log "Iniciando reinicio forzoso del servidor via PM2..."
    
    # Usar PM2 para reiniciar
    if pm2 describe laboratorio-backend > /dev/null 2>&1; then
        log "Reiniciando aplicación con PM2..."
        pm2 restart laboratorio-backend
        
        # Esperar más tiempo para que PM2 reinicie completamente
        sleep 12
        
        # Verificar estado de PM2 primero
        if pm2 describe laboratorio-backend | grep -q "online"; then
            # Ahora esperar a que el servidor esté realmente listo
            if wait_for_server $BACKEND_PORT; then
                success "Servidor reiniciado exitosamente via PM2"
                SERVER_START_TIME=$(date +%s)
                return 0
            else
                warning "PM2 reporta online pero el servidor no responde"
                return 1
            fi
        else
            error "PM2 no pudo reiniciar el servidor"
            return 1
        fi
    else
        error "No se encontró la aplicación en PM2"
        return 1
    fi
}

# Auto-reparación de CORS
auto_fix_cors() {
    local url="$1"
    local server_file="$BACKEND_DIR/src/Server.js"
    
    if [ ! -f "$server_file" ]; then
        error "Archivo server.js no encontrado: $server_file"
        return 1
    fi
    
    log "Aplicando reparación automática de CORS..."
    
    # Crear backup
    local backup_file="$server_file.backup.$(date +%s)"
    cp "$server_file" "$backup_file"
    
    # Verificar si la URL ya está en la configuración
    if grep -q "$url" "$server_file"; then
        log "La URL ya está configurada en CORS"
        rm -f "$backup_file"
        return 0
    fi
    
    # Método 1: Reemplazar URLs específicas de cloudflare
    sed -i "s|https://[a-zA-Z0-9.-]*\\.trycloudflare\\.com|$url|g" "$server_file"
    
    # Método 2: Reemplazar array completo de allowedOrigins
    if grep -q "allowedOrigins = \\[" "$server_file"; then
        sed -i "s|allowedOrigins = \\[.*\\]|allowedOrigins = [\"$url\"]|g" "$server_file"
    fi
    
    # Método 3: Agregar al array existente si no estaba presente
    if ! grep -q "$url" "$server_file"; then
        sed -i "s|allowedOrigins = \\(\\[.*\\)\\]|allowedOrigins = \\1, \"$url\"]|g" "$server_file" 2>/dev/null || true
    fi
    
    # Método 4: Buscar y reemplazar en cualquier configuración CORS
    sed -i "s|origin: \\[.*\\],|origin: [\"$url\"],|g" "$server_file" 2>/dev/null || true
    
    if grep -q "$url" "$server_file"; then
        success "CORS reparado automáticamente para: $url"
        rm -f "$backup_file"
        return 0
    else
        error "No se pudo reparar CORS automáticamente"
        mv "$backup_file" "$server_file"
        return 1
    fi
}

# Monitoreo continuo del servidor (MEJORADO)
start_server_monitor() {
    log "Iniciando monitoreo continuo del servidor..."
    local consecutive_failures=0
    local max_consecutive_failures=3
    local health_check_interval=45  # Aumentado a 45 segundos
    
    # Esperar un poco antes del primer check
    sleep 30
    
    while true; do
        local current_time=$(date +%s)
        local uptime=$((current_time - SERVER_START_TIME))
        
        # Verificar salud del servidor
        if check_server_health $BACKEND_PORT; then
            if [ $consecutive_failures -gt 0 ]; then
                success "Servidor recuperado después de $consecutive_failures fallos"
            fi
            log "Servidor saludable - Uptime: ${uptime}s - Restarts: $RESTART_COUNT"
            consecutive_failures=0
        else
            ((consecutive_failures++))
            error "Servidor no responde ($consecutive_failures/$max_consecutive_failures)"
            
            # Solo reiniciar después de múltiples fallos consecutivos
            if [ $consecutive_failures -ge $max_consecutive_failures ]; then
                error "Múltiples fallos detectados - Reiniciando..."
                if force_restart_server; then
                    ((RESTART_COUNT++))
                    # Re-aplicar configuración CORS después del reinicio
                    if [ -n "$CURRENT_URL" ]; then
                        sleep 8
                        auto_fix_cors "$CURRENT_URL"
                    fi
                    consecutive_failures=0
                    # Esperar más después del reinicio
                    sleep 30
                else
                    error "Fallo en el reinicio - Reintentando en 60 segundos"
                    sleep 60
                fi
            fi
        fi
        
        sleep $health_check_interval
    done
}

# ========== FUNCIONES ORIGINALES DEL SCRIPT ==========

# Verificar dependencias
check_dependencies() {
    if ! command -v cloudflared &> /dev/null; then
        error "cloudflared no está instalado"
        log "Instala con: sudo apt install cloudflared"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        error "Node.js no está instalado"
        exit 1
    fi
    
    if ! command -v pm2 &> /dev/null; then
        error "PM2 no está instalado"
        log "Instala con: npm install -g pm2"
        exit 1
    fi
    
    # Verificar comandos para monitoreo
    if ! command -v lsof &> /dev/null; then
        error "lsof no está instalado"
        log "Instala con: sudo apt install lsof"
        exit 1
    fi
    
    # Verificar netcat para checks básicos
    if ! command -v nc &> /dev/null; then
        warning "nc (netcat) no está instalado, instalando..."
        sudo apt update && sudo apt install -y netcat
    fi
}

# Extraer URL de cloudflared
extract_cloudflare_url() {
    local log_file="$1"
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if [ -f "$log_file" ]; then
            local url=$(grep -o 'https://[^ ]*\.trycloudflare\.com' "$log_file" | head -1)
            if [ -n "$url" ]; then
                echo "$url"
                return 0
            fi
        fi
        sleep 2
        attempt=$((attempt + 1))
    done
    return 1
}

# Actualizar configuración de CORS en server.js
update_server_cors() {
    local url="$1"
    CURRENT_URL="$url"  # Guardar para monitoreo
    
    if auto_fix_cors "$url"; then
        return 0
    else
        warning "No se pudo actualizar CORS automáticamente"
        return 1
    fi
}

# Actualizar configuración de Socket.IO
update_socket_config() {
    local url="$1"
    local socket_file="$BACKEND_DIR/src/lib/socket.js"
    
    if [ -f "$socket_file" ]; then
        cp "$socket_file" "$socket_file.backup"
        
        log "Actualizando socket.js con URL: $url"
        
        sed -i "s|allowedOrigins = \\[.*\\]|allowedOrigins = [\"$url\"]|g" "$socket_file"
        sed -i "s|https://[a-zA-Z0-9.-]*\\.trycloudflare\\.com|$url|g" "$socket_file"
        sed -i "s|origin: \\[.*\\],|origin: [\"$url\"],|g" "$socket_file" 2>/dev/null || true
        
        if grep -q "$url" "$socket_file"; then
            success "Configuración de Socket.IO actualizada con: $url"
            rm -f "$socket_file.backup"
            return 0
        else
            warning "No se pudo actualizar socket.js"
            return 1
        fi
    else
        warning "No se encontró lib/socket.js"
        return 1
    fi
}

# Reiniciar el servidor para aplicar cambios (MEJORADO CON ESPERA)
restart_server() {
    log "Reiniciando servidor con PM2 para aplicar cambios..."
    
    if pm2 describe laboratorio-backend > /dev/null 2>&1; then
        log "Reiniciando aplicación con PM2..."
        pm2 restart laboratorio-backend
        sleep 10
        
        if pm2 describe laboratorio-backend | grep -q "online"; then
            # Esperar a que el servidor esté realmente listo
            if wait_for_server $BACKEND_PORT; then
                success "Servidor reiniciado correctamente con PM2"
                SERVER_START_TIME=$(date +%s)
                return 0
            else
                error "PM2 reporta online pero el servidor no responde"
                return 1
            fi
        else
            error "Error al reiniciar con PM2"
            return 1
        fi
    else
        log "Iniciando aplicación con PM2..."
        cd "$BACKEND_DIR"
        pm2 start ecosystem.config.cjs --env production
        sleep 15
        
        if pm2 describe laboratorio-backend | grep -q "online" && wait_for_server $BACKEND_PORT; then
            success "Aplicación iniciada correctamente con PM2"
            SERVER_START_TIME=$(date +%s)
            return 0
        else
            error "Error al iniciar con PM2"
            return 1
        fi
    fi
}

# Función para enviar mensaje por WhatsApp
enviar_whatsapp() {
    local url="$1"
    
    if [ -f "$WHATSAPP_SCRIPT" ]; then
        log "Enviando mensaje de WhatsApp con la nueva URL..."
        
        pkill -f "enviar_whatsapp.cjs" 2>/dev/null || true
        sleep 2
        
        cd "$BACKEND_DIR"
        log "Ejecutando: node $WHATSAPP_SCRIPT \"$url\""
        
        local output
        output=$(timeout 60s node "$WHATSAPP_SCRIPT" "$url" 2>&1)
        local whatsapp_exit_code=$?
        
        echo "$output"
        
        case $whatsapp_exit_code in
            0) success "Notificación de WhatsApp enviada correctamente" ;;
            124) warning "Script de WhatsApp terminó por timeout (60s)" ;;
            *) warning "Script de WhatsApp terminó con código: $whatsapp_exit_code" ;;
        esac
    else
        warning "Script de WhatsApp no encontrado: $WHATSAPP_SCRIPT"
    fi
}

# Verificar estado del servidor (MEJORADA)
check_server_status() {
    log "Verificando estado del servidor..."
    
    if check_server_health $BACKEND_PORT; then
        success "Servidor está funcionando correctamente"
        local current_time=$(date +%s)
        local uptime=$((current_time - SERVER_START_TIME))
        log "Uptime: ${uptime}s - Reinicios: $RESTART_COUNT"
        return 0
    else
        warning "El servidor no responde al health check inicial"
        log "Esto puede ser normal si acaba de iniciar"
        return 1
    fi
}

# Configuración principal
main() {
    log "Iniciando configuración automática de Cloudflare Tunnel con PM2..."
    
    check_dependencies
    
    cd "$BACKEND_DIR" || {
        error "No se pudo acceder al directorio: $BACKEND_DIR"
        exit 1
    }

    LOG_DIR="./Cloudflared_Logs"
    mkdir -p "$LOG_DIR"
    
    # Verificar estado inicial (no crítico)
    check_server_status
    
    # Verificar/Iniciar PM2
    if ! pm2 describe laboratorio-backend > /dev/null 2>&1; then
        warning "Backend no detectado en PM2"
        log "Iniciando backend con PM2..."
        pm2 start ecosystem.config.cjs --env production
        sleep 15
        wait_for_server $BACKEND_PORT || warning "Servidor lento en iniciar"
    fi
    
    log "Estado actual de PM2:"
    pm2 status laboratorio-backend
    
    # Iniciar cloudflared
    log "Iniciando Cloudflare Tunnel..."
    CLOUDFLARED_LOG="./Cloudflared_Logs/cloudflared-$(date +%s).log"
    cloudflared tunnel --url "http://localhost:$FRONTEND_PORT" > "$CLOUDFLARED_LOG" 2>&1 &
    CLOUDFLARED_PID=$!
    
    # Esperar y extraer URL
    log "Extrayendo URL de Cloudflare..."
    CLOUDFLARE_URL=$(extract_cloudflare_url "$CLOUDFLARED_LOG")
    
    if [ -n "$CLOUDFLARE_URL" ]; then
        success "URL obtenida: $CLOUDFLARE_URL"
        
        enviar_whatsapp "$CLOUDFLARE_URL"
        update_server_cors "$CLOUDFLARE_URL"
        update_socket_config "$CLOUDFLARE_URL"
        
        if restart_server; then
            echo "$CLOUDFLARE_URL" > .cloudflare-url
            echo "REACT_APP_API_URL=$CLOUDFLARE_URL" > .env.cloudflare
            
            success "Configuración completada!"
            log "🌐 Frontend URL: $CLOUDFLARE_URL"
            log "🔧 Backend URL: http://localhost:$BACKEND_PORT"
            log "📁 URL guardada en: .cloudflare-url y .env.cloudflare"
            log "🚀 PM2 corriendo con 4 instancias"
            log "🔍 Monitoreo activo del servidor"
            
            # Iniciar monitoreo en segundo plano
            start_server_monitor &
            MONITOR_PID=$!
            
            if command -v qrencode &> /dev/null; then
                log "📱 QR Code:"
                qrencode -t ANSI "$CLOUDFLARE_URL"
            fi
        fi
    else
        error "No se pudo obtener URL de Cloudflare"
        log "Revisa el log: $CLOUDFLARED_LOG"
    fi
    
    trap 'cleanup' SIGINT SIGTERM
    log "Presiona Ctrl+C para detener el tunnel y el monitoreo (PM2 sigue corriendo)"
    wait
}

cleanup() {
    log "Deteniendo servicios..."
    [ -n "$CLOUDFLARED_PID" ] && kill $CLOUDFLARED_PID 2>/dev/null
    [ -n "$MONITOR_PID" ] && kill $MONITOR_PID 2>/dev/null
    pkill -f "enviar_whatsapp.cjs" 2>/dev/null
    log "✅ PM2 sigue corriendo en segundo plano"
    log "💡 Usa 'pm2 status' para ver el estado"
    log "💡 Usa 'pm2 stop laboratorio-backend' para detener el servidor"
    exit 0
}

# Ejecutar
main "$@"
