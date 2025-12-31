#!/bin/bash

# ============================
# CONFIGURACIÓN GENERAL
# ============================
FRONTEND_DIR="$HOME/Documentos/laboratorio/Flocten_React"
BACKEND_DIR="$HOME/Documentos/laboratorio/Backen_React"
FRONTEND_PORT="5173"
BACKEND_PORT="5001"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log(){ echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"; }
error(){ echo -e "${RED}❌ $1${NC}"; }
success(){ echo -e "${GREEN}✅ $1${NC}"; }
warning(){ echo -e "${YELLOW}⚠️ $1${NC}"; }

# ============================
# VERIFICAR DEPENDENCIAS
# ============================
check_dependencies(){
    command -v cloudflared >/dev/null || { error "cloudflared no está instalado"; exit 1; }
    command -v node >/dev/null || { error "Node.js no está instalado"; exit 1; }
}

# ============================
# EXTRAER URL DE CLOUDFLARE
# ============================
extract_cloudflare_url() {
    local LOG="$1"
    for i in {1..30}; do
        if [ -f "$LOG" ]; then
            URL=$(grep -o 'https://[^ ]*\.trycloudflare\.com' "$LOG" | head -1)
            [ -n "$URL" ] && echo "$URL" && return 0
        fi
        sleep 2
    done
    return 1
}

# ============================
# ACTUALIZAR BACKEND
# ============================
update_backend_env(){
    local url="$1"
    local env="$BACKEND_DIR/.env"

    if grep -q '^BASE_URL=' "$env"; then
        sed -i "s|^BASE_URL=.*|BASE_URL=$url|" "$env"
    else
        echo "BASE_URL=$url" >> "$env"
    fi

    success "Backend .env actualizado"
}

# ============================
# ACTUALIZAR FRONTEND
# ============================
update_frontend_files(){
    local url="$1"

    # serve.json
    if [ -f "$FRONTEND_DIR/public/serve.json" ]; then
        sed -i "s|http://localhost:[0-9]*|$url|g" "$FRONTEND_DIR/public/serve.json"
        sed -i "s|https://.*\.trycloudflare\.com|$url|g" "$FRONTEND_DIR/public/serve.json"
        success "serve.json actualizado"
    fi

    # .env.production
if [ -f "$FRONTEND_DIR/.env.production" ]; then
    sed -i "s|REACT_APP_API_URL=.*|REACT_APP_API_URL=${url}/api|g" "$FRONTEND_DIR/.env.production"
    sed -i "s|VITE_API_URL=.*|VITE_API_URL=${url}/api|g" "$FRONTEND_DIR/.env.production"
    success ".env.production actualizado"
fi


    # Buscar y reemplazar en src/
    find "$FRONTEND_DIR/src" -type f \( -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' \) | while read f; do
        sed -i "s|http://localhost:[0-9]*|$url|g" "$f"
        sed -i "s|https://.*\.trycloudflare\.com|$url|g" "$f"
    done

    success "Archivos del frontend actualizados"
}

# ============================
# BUILD + SERVE PRODUCCIÓN
# ============================
build_and_serve_production(){
    log "Ejecutando build de producción…"

    cd "$FRONTEND_DIR" || exit 1

    # Instalar dependencias si faltan
    if [ ! -d node_modules ]; then
        npm ci || { error "Fallo instalando dependencias"; exit 1; }
    fi

    # BUILD
    npm run build || { error "❌ Falló npm run build"; exit 1; }

    # ============================
    # INSTALAR SERVE SI NO EXISTE
    # ============================
    if ! command -v serve >/dev/null; then
        log "serve no está instalado, instalándolo globalmente…"
        sudo npm install -g serve || { error "❌ No se pudo instalar serve"; exit 1; }
        success "serve instalado correctamente ✔"
    else
        log "serve ya está instalado ✔"
    fi

    # Detectar carpeta
    OUT="dist"
    [ -d build ] && OUT="build"

    # Matar procesos previos
    pkill -f "serve -s" 2>/dev/null || true
    kill $(lsof -ti :$FRONTEND_PORT) 2>/dev/null || true

    log "Iniciando servidor de producción en puerto $FRONTEND_PORT…"

    # CORRECCIÓN CRÍTICA:
    nohup serve -s "$OUT" -c serve.json -l $FRONTEND_PORT > "$FRONTEND_DIR/serve.log" 2>&1 &

    sleep 5

    if lsof -i:$FRONTEND_PORT -sTCP:LISTEN >/dev/null; then
        success "Frontend producción está corriendo ✔"
        log "Log: $FRONTEND_DIR/serve.log"
    else
        error "No se pudo iniciar el servidor de producción"
        exit 1
    fi
}

# ============================
# MAIN
# ============================
main(){

    check_dependencies

    log "Iniciando Cloudflare…"

    mkdir -p "$FRONTEND_DIR/Cloudflared_Logs"

    LOG="$FRONTEND_DIR/Cloudflared_Logs/log-$(date +%s).txt"

    cloudflared tunnel --url "http://localhost:$BACKEND_PORT" > "$LOG" 2>&1 &
    PID=$!

    sleep 4

    URL=$(extract_cloudflare_url "$LOG")

    if [ -z "$URL" ]; then
        error "No se pudo obtener URL de Cloudflare"
        exit 1
    fi

    success "URL obtenida: $URL"

    update_backend_env "$URL"
    update_frontend_files "$URL"

    build_and_serve_production

    echo "$URL" > "$FRONTEND_DIR/.cloudflare-url"

    success "Todo completado correctamente ✔"
    log "Frontend: http://localhost:$FRONTEND_PORT"
    log "Cloudflare: $URL"
}

main
