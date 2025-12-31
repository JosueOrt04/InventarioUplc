import React, { useRef } from "react";

const TC_Y_PP = () => {
  const contentRef = useRef();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-8 px-4">
      <div className="max-w-5xl mx-auto" ref={contentRef}>
        {/* Header Card */}
        <div className="card bg-primary text-primary-content shadow-2xl mb-8">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="card-title text-3xl md:text-4xl font-bold">
                  ⚖️ Términos y Condiciones de Uso
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mt-2 opacity-90">
                  Sistema de Gestión de Laboratorio Ambiental LZC
                </h2>
              </div>
              <div className="badge badge-lg badge-accent mt-4 md:mt-0 font-bold p-4">
                Vigente: Noviembre 2025
              </div>
            </div>
            <p className="mt-4 text-sm opacity-80">
              Dirigido a Maestros y Secretario de Academia • Documento Legal Vinculante
            </p>
          </div>
        </div>

        {/* Sección 1: Aceptación */}
        <div className="card bg-base-100 shadow-xl mb-6 border-l-4 border-primary">
          <div className="card-body">
            <h3 className="card-title text-2xl text-primary mb-2">
              1. Aceptación y Carácter Vinculante
            </h3>
            <p className="text-base-content/80 leading-relaxed text-justify">
              El acceso y uso del Sistema de Gestión de Laboratorio Ambiental LZC (en adelante "el Sistema") implica la aceptación total y sin reservas del presente documento. Al iniciar sesión, el Usuario declara:
              <br /><br />
              • Haber leído y comprendido estos términos.
              <br />
              • Aceptar sus responsabilidades.
              <br />
              • Comprometerse a cumplir estrictamente las disposiciones aquí señaladas.
              <br /><br />
              <span className="font-bold text-error">
                Si el Usuario no está de acuerdo con alguna sección, deberá abstenerse de usar el Sistema. El desconocimiento no exime del cumplimiento.
              </span>
            </p>
          </div>
        </div>

        {/* Sección 2: Definiciones */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-4">
              2. Definiciones Clave
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Sistema:</span> Plataforma digital, interfaz, bases de datos, código, reportes y módulos internos.
              </div>
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Usuarios Autorizados:</span> Maestros, Secretario de Academia y personal académico con credencial asignada.
              </div>
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Administrador del Sistema:</span> Persona designada por la Institución para gestionar accesos.
              </div>
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Encargado del Laboratorio:</span> Persona responsable del inventario físico.
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Licencia y Prohibiciones */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-4">
              3. Licencia de Uso
            </h3>
            <p className="text-sm mb-2">
              El Usuario recibe una licencia limitada a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-base-content/80 ml-4 mb-4">
              <li>Consultar inventario del laboratorio.</li>
              <li>Registrar prácticas, solicitudes y observaciones.</li>
              <li>Validar solicitudes de alumnos.</li>
              <li>Supervisar movimientos de materiales.</li>
            </ul>
            <div className="alert alert-warning text-sm">
              <span>
                ⚠️ Queda estrictamente prohibido el uso para fines personales, comerciales, de entretenimiento o minería de datos.
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-2 mt-3">
              <li>❌ Manipular registros con intención de ocultar pérdidas, daños o faltantes.</li>
              <li>❌ Alterar información histórica o eliminar movimientos sin autorización.</li>
              <li>❌ Utilizar accesos ajenos.</li>
            </ul>
          </div>
        </div>

        {/* Sección 4: Roles y Responsabilidades */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-4">
              4. Responsabilidades Separadas
            </h3>
            
            {/* Maestros */}
            <div className="border-t-4 border-info pt-4 mb-4">
              <h4 className="card-title text-lg text-info mb-2">4.1. Responsabilidades del Maestro</h4>
              <p className="text-sm mb-2">El Maestro se compromete a:</p>
              <ul className="text-sm space-y-1 ml-4 mb-3">
                <li className="flex gap-2"><span className="text-success">✅</span> Registrar información veraz.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Supervisar prácticas y movimientos autorizados.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Mantener la confidencialidad de sus credenciales.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Reportar errores o anomalías en &lt; 24 horas.</li>
              </ul>
              <p className="text-sm mb-2">El Maestro no podrá:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-error">❌</span> Autorizar salidas de material sin práctica justificada.</li>
                <li className="flex gap-2"><span className="text-error">❌</span> Delegar su cuenta a terceros.</li>
                <li className="flex gap-2"><span className="text-error">❌</span> Utilizar información para fines no institucionales.</li>
                <li className="flex gap-2"><span className="text-error">❌</span> Manipular inventarios para favorecer a terceros.</li>
              </ul>
            </div>

            {/* Secretario */}
            <div className="border-t-4 border-secondary pt-4 mb-4">
              <h4 className="card-title text-lg text-secondary mb-2">4.2. Responsabilidades del Secretario de Academia</h4>
              <p className="text-sm mb-2">El Secretario de Academia deberá:</p>
              <ul className="text-sm space-y-1 ml-4 mb-3">
                <li className="flex gap-2"><span className="text-success">✅</span> Validar solicitudes de docentes y alumnos.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Administrar la información académica asociada.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Garantizar que no se alteren registros sin documentación oficial.</li>
              </ul>
              <p className="text-sm mb-2">Está prohibido:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-error">❌</span> Modificar movimientos sin evidencia.</li>
                <li className="flex gap-2"><span className="text-error">❌</span> Borrar logs o auditorías.</li>
                <li className="flex gap-2"><span className="text-error">❌</span> Autorizar material a personas no registradas.</li>
              </ul>
            </div>

            {/* Encargado */}
            <div className="border-t-4 border-accent pt-4 mb-4">
              <h4 className="card-title text-lg text-accent mb-2">4.3. Responsabilidades del Encargado del Laboratorio</h4>
              <ul className="text-sm space-y-1 ml-4 mb-3">
                <li className="flex gap-2"><span className="text-success">✅</span> Mantener inventario físico actualizado.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Notificar discrepancias detectadas en el Sistema.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Custodiar materiales sensibles o peligrosos.</li>
              </ul>
              <p className="text-sm font-bold text-error">No está permitido:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-error">❌</span> Retirar, agregar o alterar inventario sin registro digital.</li>
              </ul>
            </div>

            {/* Institución */}
            <div className="border-t-4 border-primary pt-4 mb-4">
              <h4 className="card-title text-lg text-primary mb-2">4.4. Responsabilidades de la Institución</h4>
              <p className="text-sm mb-2">La Institución es responsable de:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-success">✅</span> Designar a los usuarios autorizados.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Proveer infraestructura para el funcionamiento.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Realizar copias de seguridad (backups).</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Emitir reglamentos internos de uso del laboratorio.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección 5: Seguridad y Evidencia */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-2">
              5. Seguridad y Evidencia Digital
            </h3>
            <div className="alert alert-error bg-opacity-10">
              <div className="text-sm">
                <p className="font-bold mb-1">Valor Probatorio de los Logs:</p>
                <p>
                  El Usuario acepta que los registros de actividad (logs) generados por el Sistema constituyen <strong>evidencia válida y fidedigna</strong> en cualquier proceso de auditoría interna, administrativa o legal.
                </p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 mt-3 ml-2">
              <li>Su contraseña es personal e intransferible.</li>
              <li>Toda actividad realizada con su cuenta se presume legítima.</li>
              <li>Prohibido intentar vulnerar la seguridad del Sistema.</li>
            </ul>
          </div>
        </div>

        {/* Sección 6: Política de Privacidad */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-2">
              6. Política de Privacidad
            </h3>
            <p className="text-sm mb-2">
              El Sistema recopila únicamente información institucional necesaria:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-4 mb-3">
              <li>Nombre y correo institucional del usuario.</li>
              <li>Actividades realizadas dentro del Sistema.</li>
              <li>Solicitudes, aprobaciones y movimientos.</li>
            </ul>
            <p className="text-sm mb-2">Los datos se usan exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-4">
              <li>Control del laboratorio.</li>
              <li>Auditorías académicas.</li>
              <li>Seguridad del inventario.</li>
            </ul>
            <div className="alert alert-warning text-sm mt-3">
              <span>
                ⚠️ Los desarrolladores no acceden, almacenan ni procesan información personal, ya que solo entregaron el software.
              </span>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE PROTECCIÓN AL DESARROLLADOR */}
        <div className="card bg-neutral text-neutral-content shadow-2xl mb-8">
          <div className="card-body relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-9xl opacity-5">
              🛡️
            </div>

            <h3 className="card-title text-2xl text-warning mb-4">
              🚫 7. Entrega del Sistema y Cierre de Responsabilidad
            </h3>

            <div className="space-y-4 text-sm md:text-base">
              <div className="bg-base-100/10 p-4 rounded-lg">
                <h4 className="font-bold text-warning mb-1">
                  Entrega Formal con Reporte Técnico
                </h4>
                <p>
                  Los desarrolladores realizaron el Sistema conforme a los requerimientos proporcionados por la Institución y el Asesor del proyecto. El Sistema fue entregado junto con su <strong>Reporte Técnico</strong>, donde se detalla su funcionamiento, alcances y módulos.
                </p>
              </div>

              <div className="bg-base-100/10 p-4 rounded-lg border border-warning/30">
                <h4 className="font-bold text-warning mb-1">
                  Transferencia de Decisión Operativa
                </h4>
                <p>
                  Con la entrega del código y la documentación, la responsabilidad de los desarrolladores queda <strong>legalmente cumplida</strong>. La decisión de <strong>implementar, operar, modificar, actualizar, o no utilizar el Sistema</strong>, recae exclusivamente en la Institución y su Asesor.
                </p>
              </div>

              <div className="bg-base-100/10 p-4 rounded-lg">
                <h4 className="font-bold text-warning mb-1">
                  Exención Total de Responsabilidad
                </h4>
                <p>
                  Los desarrolladores no son responsables por: fallas de servidores de la Institución, falta de uso del Sistema, cambios posteriores realizados por terceros, o pérdida de información por malas prácticas del personal.
                </p>
              </div>

              <div className="bg-base-100/10 p-4 rounded-lg border border-warning/30">
                <h4 className="font-bold text-warning mb-1">
                  Sin Injerencia Operativa
                </h4>
                <p>
                  Los desarrolladores <strong>NO</strong> participan en decisiones académicas, préstamos de material ni gestión física del laboratorio. Su responsabilidad se limita estrictamente al código fuente entregado.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones Legales Finales */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body space-y-4">
            <div>
              <h4 className="font-bold text-primary">
                8. Copias de Seguridad y Conservación
              </h4>
              <p className="text-sm text-base-content/70">
                La Institución es la única responsable de realizar backups. Los desarrolladores no se hacen responsables por pérdida total o parcial de datos causada por: errores humanos, fallos de hardware, ataques externos, o falta de respaldo institucional.
              </p>
            </div>
            <div className="divider my-0"></div>
            <div>
              <h4 className="font-bold text-primary">
                9. Interrupciones de Servicio
              </h4>
              <p className="text-sm text-base-content/70">
                El Usuario reconoce que interrupciones por fallas de energía, internet o mantenimiento no son responsabilidad de los desarrolladores.
              </p>
            </div>
            <div className="divider my-0"></div>
            <div>
              <h4 className="font-bold text-primary">
                10. Sanciones
              </h4>
              <p className="text-sm text-base-content/70">
                El incumplimiento de estos términos podrá resultar en: suspensión del acceso, reporte a Dirección Académica, responsabilidades administrativas o legales, y sanciones por mal uso de material del laboratorio.
              </p>
            </div>
            <div className="divider my-0"></div>
            <div>
              <h4 className="font-bold text-primary">
                11. Legislación Aplicable
              </h4>
              <p className="text-sm text-base-content/70">
                Para la interpretación del presente documento, las partes se someten a las leyes del Estado de Michoacán y a los tribunales de <span className="font-bold text-base-content">Lázaro Cárdenas, Michoacán</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 opacity-50 text-xs">
          <p>ID de Versión Legal: 2025.11.21-REV-FINAL</p>
          <p>Universidad Politécnica LZC</p>
        </div>
      </div>
    </div>
  );
};

export default TC_Y_PP;