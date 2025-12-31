import React, { useRef } from "react";

const TC_Y_PP_A = () => {
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
                  PARA ESTUDIANTES / ALUMNOS
                </h2>
              </div>
              <div className="badge badge-lg badge-accent mt-4 md:mt-0 font-bold p-4">
                Vigente: Noviembre 2025
              </div>
            </div>
            <p className="mt-4 text-sm opacity-80">
              Sistema de Gestión de Laboratorio Ambiental LZC • Documento Legal Vinculante
            </p>
          </div>
        </div>

        {/* Sección 1: Aceptación */}
        <div className="card bg-base-100 shadow-xl mb-6 border-l-4 border-primary">
          <div className="card-body">
            <h3 className="card-title text-2xl text-primary mb-2">
              1. Aceptación General
            </h3>
            <p className="text-base-content/80 leading-relaxed text-justify">
              Al acceder al Sistema de Gestión de Laboratorio Ambiental LZC (en adelante "el Sistema"), el estudiante acepta de manera expresa e irrevocable todos los términos aquí descritos.
              <br /><br />
              El uso del Sistema implica que:
              <br />
              • Ha leído y comprendido estas disposiciones.
              <br />
              • Usará el Sistema únicamente para fines académicos.
              <br />
              • Es responsable directo de toda acción realizada con su cuenta.
              <br /><br />
              <span className="font-bold text-error">
                En caso de desacuerdo, el estudiante deberá abstenerse de utilizar el Sistema. El desconocimiento no exime del cumplimiento.
              </span>
            </p>
          </div>
        </div>

        {/* Sección 2: Definiciones */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-4">
              2. Definiciones
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Sistema:</span> Plataforma digital institucional para gestión del laboratorio.
              </div>
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Estudiante / Alumno:</span> Persona inscrita en la Universidad con acceso autorizado.
              </div>
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Institución:</span> Universidad Politécnica de Lázaro Cárdenas (UPLZC).
              </div>
              <div className="bg-base-200 p-3 rounded-lg">
                <span className="font-bold block">Desarrolladores:</span> Equipo técnico creador del Sistema, sin intervención operativa.
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Licencia de Uso */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-4">
              3. Licencia de Uso Otorgada al Estudiante
            </h3>
            <p className="text-sm mb-2">
              El Sistema permite al Estudiante:
            </p>
            <ul className="list-disc list-inside space-y-1 text-base-content/80 ml-4 mb-4">
              <li>Registrar solicitudes de materiales para prácticas autorizadas.</li>
              <li>Ver el estado de sus solicitudes.</li>
              <li>Consultar información correspondiente a prácticas asignadas.</li>
              <li>Cumplir indicaciones de maestros y encargado del laboratorio.</li>
            </ul>
            <div className="alert alert-warning text-sm">
              <span>
                ⚠️ Queda estrictamente prohibido el uso para fines personales, comerciales o no académicos.
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-2 mt-3">
              <li>❌ Solicitar materiales sin autorización de un maestro.</li>
              <li>❌ Usar el Sistema para prácticas personales, ajenas o no registradas.</li>
              <li>❌ Manipular información, inventario o registros.</li>
              <li>❌ Usar accesos de otros estudiantes o maestros.</li>
              <li>❌ Crear solicitudes falsas o duplicadas.</li>
              <li>❌ Interferir con el funcionamiento del Sistema.</li>
            </ul>
          </div>
        </div>

        {/* Sección 4: Responsabilidades del Estudiante */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-4">
              4. Responsabilidades del Estudiante
            </h3>
            
            {/* 4.1 Uso Responsable */}
            <div className="border-t-4 border-info pt-4 mb-4">
              <h4 className="card-title text-lg text-info mb-2">4.1. Uso Responsable</h4>
              <p className="text-sm mb-2">El Estudiante se compromete a:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-success">✅</span> Utilizar el Sistema únicamente para actividades académicas oficiales.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Registrar datos verídicos al realizar una solicitud.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Consultar regularmente el estado de sus solicitudes.</li>
              </ul>
            </div>

            {/* 4.2 Cuidado del Material */}
            <div className="border-t-4 border-secondary pt-4 mb-4">
              <h4 className="card-title text-lg text-secondary mb-2">4.2. Cuidado del Material Solicitado</h4>
              <p className="text-sm mb-2">Una vez se le proporcione material físico, el Estudiante:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-success">✅</span> Es responsable del correcto uso, manejo y devolución.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Acepta cubrir costos o sanciones académicas por daño, pérdida o mal uso.</li>
              </ul>
            </div>

            {/* 4.3 Seguridad de Cuenta */}
            <div className="border-t-4 border-accent pt-4">
              <h4 className="card-title text-lg text-accent mb-2">4.3. Seguridad de Cuenta</h4>
              <p className="text-sm mb-2">El Estudiante debe:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li className="flex gap-2"><span className="text-success">✅</span> Mantener su contraseña segura.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> No compartir accesos con terceros.</li>
                <li className="flex gap-2"><span className="text-success">✅</span> Reportar intentos de acceso no autorizado.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección 5: Prohibiciones Específicas */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-4">
              5. Lo Que No Puede Hacer el Estudiante
            </h3>
            <p className="text-sm mb-3">
              El Estudiante no podrá, bajo ninguna circunstancia:
            </p>
            <ul className="text-sm space-y-2 ml-2">
              <li className="flex gap-2"><span className="text-error">❌</span> Modificar inventario digital.</li>
              <li className="flex gap-2"><span className="text-error">❌</span> Registrar información que no corresponda a su práctica.</li>
              <li className="flex gap-2"><span className="text-error">❌</span> Alterar, suplantar o ingresar datos ajenos.</li>
              <li className="flex gap-2"><span className="text-error">❌</span> Usar el Sistema como herramienta de mensajería o entretenimiento.</li>
              <li className="flex gap-2"><span className="text-error">❌</span> Utilizar material del laboratorio fuera de los permisos otorgados.</li>
              <li className="flex gap-2"><span className="text-error">❌</span> Realizar prácticas sin supervisión o sin autorización.</li>
              <li className="flex gap-2"><span className="text-error">❌</span> Acceder a módulos restringidos o intentar vulnerar el Sistema.</li>
            </ul>
            <div className="alert alert-error bg-opacity-10 mt-3">
              <span className="text-sm">
                Cualquier violación tendrá consecuencias académicas y disciplinarias.
              </span>
            </div>
          </div>
        </div>

        {/* Sección 6: Responsabilidad sobre Material */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-2">
              6. Responsabilidad Sobre el Material del Laboratorio
            </h3>
            <p className="text-sm mb-2">
              El Estudiante acepta que:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-4 mb-3">
              <li>Todo material solicitado debe devolverse en las mismas condiciones.</li>
              <li>Debe seguir protocolos de seguridad y manejo.</li>
              <li>Es responsable de accidentes derivados de negligencia o uso indebido.</li>
            </ul>
            <p className="text-sm mb-2">Los daños, pérdidas o faltantes pueden derivar en:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-4">
              <li>Sanciones económicas,</li>
              <li>Reporte académico,</li>
              <li>Restricciones de acceso al laboratorio.</li>
            </ul>
          </div>
        </div>

        {/* Sección 7: Política de Privacidad */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title text-xl text-primary mb-2">
              7. Política de Privacidad
            </h3>
            <p className="text-sm mb-2">
              El Sistema recopila únicamente información necesaria para su funcionamiento académico, incluyendo:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-4 mb-3">
              <li>Nombre del estudiante</li>
              <li>Matrícula institucional</li>
              <li>Correo institucional</li>
              <li>Solicitudes registradas</li>
              <li>Historial de prácticas</li>
              <li>Actividad en el Sistema</li>
            </ul>
            <p className="text-sm mb-2">El uso de estos datos es exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80 ml-4 mb-3">
              <li>Control académico</li>
              <li>Gestión del laboratorio</li>
              <li>Auditorías internas</li>
              <li>Registro de trazabilidad del material</li>
            </ul>
            <div className="alert alert-warning text-sm">
              <span>
                ⚠️ Los desarrolladores no tienen acceso a esta información, no la almacenan ni la procesan.
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
              🚫 8. Deslinde Total de los Desarrolladores
            </h3>

            <div className="space-y-4 text-sm md:text-base">
              <div className="bg-base-100/10 p-4 rounded-lg">
                <h4 className="font-bold text-warning mb-1">
                  Solo Desarrollo Técnico
                </h4>
                <p>
                  Los desarrolladores solo crearon el Sistema conforme a los requisitos establecidos por la Institución. Entregaron el código y documentación técnica, cumpliendo su obligación.
                </p>
              </div>

              <div className="bg-base-100/10 p-4 rounded-lg border border-warning/30">
                <h4 className="font-bold text-warning mb-1">
                  Sin Acceso ni Responsabilidad Operativa
                </h4>
                <p>
                  Los desarrolladores <strong>NO</strong> administran, operan ni supervisan solicitudes o inventario. No tienen acceso a los datos. No son responsables por la conducta, acciones o mal uso del estudiante dentro del Sistema.
                </p>
              </div>

              <div className="bg-base-100/10 p-4 rounded-lg">
                <h4 className="font-bold text-warning mb-1">
                  Responsabilidad Institucional
                </h4>
                <p>
                  La operación del Sistema es responsabilidad exclusiva de la Institución y el personal académico. Los desarrolladores no participan en decisiones académicas, préstamos de material ni gestión física del laboratorio.
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
                9. Suspensión de Acceso
              </h4>
              <p className="text-sm text-base-content/70">
                La Institución podrá suspender temporal o permanentemente el acceso del estudiante si: hace mal uso del Sistema, manipula información, miente en solicitudes, daña material del laboratorio, o incumple los protocolos de seguridad.
              </p>
            </div>
            <div className="divider my-0"></div>
            <div>
              <h4 className="font-bold text-primary">
                10. Sanciones
              </h4>
              <p className="text-sm text-base-content/70">
                Dependiendo de la gravedad, las sanciones pueden incluir: cancelación de solicitudes, reporte a Dirección Académica, pérdida de acceso al laboratorio, responsabilidad por daños o pérdidas, y medidas disciplinarias conforme al reglamento universitario.
              </p>
            </div>
            <div className="divider my-0"></div>
            <div>
              <h4 className="font-bold text-primary">
                11. Jurisdicción
              </h4>
              <p className="text-sm text-base-content/70">
                Para controversias derivadas del uso del Sistema, se aplicarán las leyes del Estado de Michoacán y los tribunales de <span className="font-bold text-base-content">Lázaro Cárdenas, Michoacán</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 opacity-50 text-xs">
          <p>ID de Versión Legal: 2025.11.21-REV-ESTUDIANTES</p>
          <p>Universidad Politécnica LZC</p>
        </div>
      </div>
    </div>
  );
};

export default TC_Y_PP_A;