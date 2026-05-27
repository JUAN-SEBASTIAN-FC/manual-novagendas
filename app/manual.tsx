"use client";

import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// Custom UI Components for Documentation MDX
// ==========================================

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="alert-box note">
      <div className="alert-icon">💡</div>
      <div className="alert-content">{children}</div>
    </div>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="alert-box tip">
      <div className="alert-icon">✨</div>
      <div className="alert-content">{children}</div>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="alert-box warning">
      <div className="alert-icon">⚠️</div>
      <div className="alert-content">{children}</div>
    </div>
  );
}

export function Card({ title, icon, href, children, onClick }: { 
  title: string; 
  icon?: string; 
  href?: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const getIconEmoji = (iconName?: string) => {
    switch (iconName) {
      case 'calendar': return '📅';
      case 'calendar-days': return '🗓️';
      case 'calendar-x': return '🚫';
      case 'users': return '👥';
      case 'user-plus': return '👤';
      case 'user-group': return '👥';
      case 'credit-card': return '💳';
      case 'box': return '📦';
      case 'chart-bar': return '📊';
      case 'rocket': return '🚀';
      case 'shield': return '🛡️';
      case 'circle-check': return '✅';
      case 'clock': return '⏱️';
      case 'circle-x': return '❌';
      case 'badge-check': return '🏆';
      case 'pencil': return '✏️';
      case 'toggle-on': return '🔛';
      case 'envelope': return '✉️';
      case 'phone': return '📞';
      case 'key': return '🔑';
      case 'user-check': return '✔️';
      case 'shield-check': return '🛡️';
      case 'magnifying-glass': return '🔍';
      case 'map-pin': return '📍';
      case 'clipboard-list': return '📋';
      case 'google': return '🌐';
      case 'whatsapp': return '💬';
      default: return '📄';
    }
  };

  return (
    <div className="card-item" onClick={onClick}>
      {icon && (
        <div className="card-icon-wrapper">
          {getIconEmoji(icon)}
        </div>
      )}
      <div className="card-title">{title}</div>
      <div className="card-desc">{children}</div>
    </div>
  );
}

export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div className={`card-group ${cols === 3 ? 'cols-3' : ''}`}>
      {children}
    </div>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="steps-container">
      <div className="steps-line"></div>
      {children}
    </div>
  );
}

export function Step({ title, children, number }: { title: string; children: React.ReactNode; number: number }) {
  return (
    <div className="step-item">
      <div className="step-number-circle">{number}</div>
      <div className="step-body">
        <div className="step-title">{title}</div>
        <div className="step-content">{children}</div>
      </div>
    </div>
  );
}

export function Tabs({ children }: { children: React.ReactNode }) {
  const tabsArray = React.Children.toArray(children) as any[];
  const [activeTab, setActiveTab] = useState(0);

  if (tabsArray.length === 0) return null;

  return (
    <div className="tabs-container">
      <div className="tabs-header-bar">
        {tabsArray.map((tab, idx) => (
          <button
            key={idx}
            className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.props?.title || `Tab ${idx + 1}`}
          </button>
        ))}
      </div>
      <div className="tab-panel-content">
        {tabsArray[activeTab]}
      </div>
    </div>
  );
}

export function Tab({ title, children }: { title: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="accordion-group">
      {children}
    </div>
  );
}

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="accordion-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">▼</span>
      </button>
      <div className="accordion-panel">
        <div className="accordion-content">
          {children}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Main Portal Code
// ==========================================

interface PageData {
  id: string;
  title: string;
  description: string;
  group: string;
  lang: 'es' | 'en';
  content: (setPage: (id: string) => void) => React.ReactNode;
}

export default function ManualPortal() {
  const [activePage, setActivePage] = useState('introduction');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Define Nav Group structure matching docs.json
  const navGroups = [
    {
      title: "Comenzar",
      pages: [
        { id: "introduction", title: "Introducción" },
        { id: "quickstart", title: "Primeros Pasos" },
        { id: "roles-and-permissions", title: "Roles y Permisos" }
      ]
    },
    {
      title: "Funcionalidades Principales",
      pages: [
        { id: "features/agenda", title: "Agenda y Citas" },
        { id: "features/clients", title: "Clientes" },
        { id: "features/services", title: "Servicios" },
        { id: "features/payments", title: "Pagos" },
        { id: "features/inventory", title: "Inventario" },
        { id: "features/statistics", title: "Estadísticas" }
      ]
    },
    {
      title: "Integraciones",
      pages: [
        { id: "integrations/google-calendar", title: "Google Calendar" },
        { id: "integrations/whatsapp-bot", title: "Bot de WhatsApp" }
      ]
    },
    {
      title: "Administración",
      pages: [
        { id: "admin/team-management", title: "Gestión de Equipo" },
        { id: "admin/locations", title: "Sedes" },
        { id: "admin/audit-logs", title: "Auditoría" },
        { id: "admin/holidays", title: "Días Bloqueados" }
      ]
    },
    {
      title: "Cuenta",
      pages: [
        { id: "account/login", title: "Iniciar Sesión" },
        { id: "account/password-reset", title: "Restablecer Contraseña" },
        { id: "account/profile", title: "Perfil de Usuario" }
      ]
    },

  ];

  // Flat pages array for easy lookups
  const flatPages = navGroups.flatMap(g => g.pages.map(p => ({ ...p, group: g.title })));

  // All pages
  const pagesDb: Record<string, PageData> = {
    // -------------------------------------------------------------
    // INTRODUCCION (ES)
    // -------------------------------------------------------------
    "introduction": {
      id: "introduction",
      title: "Novagendas: gestión de citas para negocios de servicios",
      description: "Aprende qué es Novagendas, para quién está diseñado, cómo funcionan los subdominios multi-tenant y cómo tu equipo gestiona las citas de principio a fin.",
      group: "Comenzar",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Novagendas es una plataforma web de gestión de citas diseñada para clínicas estéticas, spas y negocios de servicios de salud. Le da a todo tu equipo — desde recepción hasta especialistas — un único lugar para gestionar el ciclo completo de una visita: agendamiento, historial de clientes, pagos, inventario e informes.</p>
          <p>La plataforma está diseñada como una <strong>herramienta de operaciones interna</strong>. Tu equipo gestiona las citas que llegan por llamadas, mensajes de WhatsApp o visitas presenciales. No hay portal de autoagendamiento para clientes — Novagendas mantiene el agendamiento bajo el control de tu equipo.</p>

          <h2 id="como-funciona-novagendas">Cómo funciona Novagendas</h2>
          <p>Cada negocio en Novagendas tiene su propio espacio de trabajo aislado, accesible a través de un subdominio dedicado:</p>
          <pre><code>tunegocio.novagendas.com</code></pre>
          <p>Todo lo que tu equipo ve y hace — citas, clientes, pagos — está completamente circunscrito a tu negocio. Los datos de un negocio nunca son visibles para otro.</p>
          <p>Cuando tu equipo accede al subdominio, llega a una página de inicio de sesión con el nombre de tu negocio. Tras iniciar sesión, cada miembro del equipo ve únicamente las funcionalidades que su rol permite. Un especialista va directo a la Agenda; un recepcionista puede gestionar clientes e inventario; un administrador tiene acceso completo a todo.</p>
          
          <Note>
            Tu subdominio se configura cuando se crea tu cuenta en Novagendas. Contacta a tu gestor de cuenta si necesitas cambiarlo.
          </Note>

          <h2 id="funcionalidades-principales">Funcionalidades principales</h2>
          <CardGroup cols={2}>
            <Card title="Agenda" icon="calendar" onClick={() => setPage('features/agenda')}>
              Un calendario de arrastrar y soltar con vistas de día, semana y mes. Crea, edita y reprograma citas en segundos. La sincronización opcional con Google Calendar mantiene los calendarios personales de tu equipo actualizados automáticamente.
            </Card>
            <Card title="Clientes" icon="users" onClick={() => setPage('features/clients')}>
              Una base de datos completa de clientes con datos de contacto, historial de citas y notas clínicas. Cada visita queda registrada para que tus especialistas siempre tengan el contexto correcto antes de una sesión.
            </Card>
            <Card title="Pagos" icon="credit-card" onClick={() => setPage('features/payments')}>
              Registra pagos y depósitos parciales en el punto de servicio. Lleva el control de los ingresos diarios y saldos pendientes sin cambiar a otro sistema.
            </Card>
            <Card title="Inventario" icon="box" onClick={() => setPage('features/inventory')}>
              Supervisa los niveles de stock de productos y recibe alertas automáticas de stock bajo. Descuenta los insumos directamente al crear una cita para mantener tus conteos precisos.
            </Card>
            <Card title="Estadísticas" icon="chart-bar" onClick={() => setPage('features/statistics')}>
              Métricas en el panel e informes detallados sobre ingresos, citas y servicios más solicitados. Exporta datos a Excel para un análisis más profundo.
            </Card>
            <Card title="Gestión de equipo" icon="user-group" onClick={() => setPage('admin/team-management')}>
              Agrega miembros del personal, asigna roles y controla a qué tiene acceso cada persona. Tres niveles de roles cubren la jerarquía típica de una clínica.
            </Card>
          </CardGroup>

          <h2 id="quien-usa-cada-parte">Quién usa cada parte</h2>
          <p>Novagendas está diseñado en torno a tres roles que reflejan cómo operan realmente las clínicas:</p>
          <ul>
            <li><strong>Administrador</strong> — generalmente el dueño o gerente de la clínica. Tiene acceso completo a todas las funcionalidades, incluyendo pagos, estadísticas, gestión de usuarios y registros de auditoría.</li>
            <li><strong>Recepcionista</strong> — personal de recepción que gestiona el agendamiento y la atención de clientes. Puede acceder a la Agenda, Clientes, Servicios e Inventario, pero no a Pagos ni Usuarios.</li>
            <li><strong>Especialista</strong> — profesionales que brindan los servicios. Ven únicamente la Agenda y sus propios clientes, manteniendo su vista enfocada en su agenda.</li>
          </ul>
          <p>Puedes leer el desglose completo de lo que cada rol puede ver y hacer en la sección de <a style={{cursor:'pointer'}} onClick={() => setPage('roles-and-permissions')}>Roles y permisos</a>.</p>

          <h2 id="que-hacer-a-continuacion">Qué hacer a continuación</h2>
          <CardGroup cols={2}>
            <Card title="Comenzar" icon="rocket" onClick={() => setPage('quickstart')}>
              Accede a tu subdominio, inicia sesión y agenda tu primera cita.
            </Card>
            <Card title="Roles y permisos" icon="shield" onClick={() => setPage('roles-and-permissions')}>
              Descubre exactamente qué puede ver y hacer cada miembro del equipo.
            </Card>
            <Card title="Agenda y citas" icon="calendar" onClick={() => setPage('features/agenda')}>
              Aprende a crear, editar y gestionar citas.
            </Card>
            <Card title="Sincronización con Google Calendar" icon="calendar-days" onClick={() => setPage('integrations/google-calendar')}>
              Conecta el calendario de tu negocio para sincronización automática de eventos.
            </Card>
          </CardGroup>
        </div>
      )
    },
    // -------------------------------------------------------------
    // QUICKSTART (ES)
    // -------------------------------------------------------------
    "quickstart": {
      id: "quickstart",
      title: "Primeros pasos en Novagendas: guía para tu primera cita",
      description: "Inicia sesión en tu subdominio, completa la configuración inicial y agenda tu primera cita. Cubre los tres roles y la sincronización opcional con Google Calendar.",
      group: "Comenzar",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Comenzar con Novagendas toma solo unos minutos. Esta guía te lleva desde el acceso a tu espacio de trabajo, el inicio de sesión, la configuración inicial requerida, hasta agendar tu primera cita. Si eres especialista o recepcionista, puedes omitir los pasos exclusivos para administradores — están claramente indicados.</p>

          <Steps>
            <Step title="Abre el subdominio de tu negocio" number={1}>
              <p>Cada negocio en Novagendas tiene su propia dirección web única. Escríbela en cualquier navegador:</p>
              <pre><code>tunegocio.novagendas.com</code></pre>
              <p>Reemplaza <code>tunegocio</code> con el subdominio que te proporcionó tu administrador o gestor de cuenta. Llegarás a la página de inicio de sesión de tu espacio de trabajo.</p>
              <Tip>
                Guarda tu subdominio en favoritos para que tu equipo no tenga que recordarlo. Cada miembro del personal usa la misma URL.
              </Tip>
            </Step>

            <Step title="Inicia sesión con tus credenciales" number={2}>
              <p>En la página de inicio de sesión, ingresa el correo electrónico y la contraseña que tu administrador configuró para ti. Luego haz clic en <strong>Iniciar Sesión</strong>.</p>
              <p>Tu rol determina a dónde te lleva Novagendas después de iniciar sesión:</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Rol</th>
                      <th>Lo que ves primero</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Administrador</strong></td>
                      <td>Panel con las estadísticas del día y el checklist de configuración</td>
                    </tr>
                    <tr>
                      <td><strong>Recepcionista</strong></td>
                      <td>Panel con las citas del día</td>
                    </tr>
                    <tr>
                      <td><strong>Especialista</strong></td>
                      <td>Calendario de la agenda, filtrado a tus propias citas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Note>
                Tu sesión dura 24 horas. Después de ese tiempo, se te pedirá que inicies sesión nuevamente. Si cierras el navegador y lo vuelves a abrir dentro de ese período, seguirás conectado.
              </Note>
              <p>Si aún no tienes credenciales, pídele a tu administrador que cree una cuenta para ti en <strong>Usuarios</strong>.</p>
              <p>¿Olvidaste tu contraseña? Haz clic en <strong>¿Olvidaste tu contraseña?</strong> en la página de inicio de sesión. Ingresa tu correo y sigue el enlace de restablecimiento enviado a tu bandeja.</p>
            </Step>

            <Step title="Completa la configuración inicial (solo Administrador)" number={3}>
              <p>Si eres Administrador, el Panel muestra un checklist de <strong>Configuración del Sistema</strong> después de tu primer inicio de sesión. Hay un paso obligatorio antes de poder comenzar a agendar citas:</p>
              <p><strong>Agrega al menos una categoría de servicio y un servicio.</strong> Ve a <strong>Servicios</strong>, crea una categoría (por ejemplo, "Tratamientos Faciales"), luego agrega un servicio con nombre, duración y precio. Esto es lo que asignarás a las citas en la Agenda.</p>
              <p>El checklist también incluye pasos opcionales pero recomendados:</p>
              <CardGroup cols={2}>
                <Card title="Agregar miembros del equipo" icon="user-plus" onClick={() => setPage('admin/team-management')}>
                  Ve a <strong>Usuarios</strong> y crea cuentas para tus recepcionistas y especialistas. Asigna a cada persona un rol para que solo vea lo que necesita.
                </Card>
                <Card title="Registrar tus clientes" icon="users" onClick={() => setPage('features/clients')}>
                  Agrega pacientes existentes a <strong>Clientes</strong> antes de agendar, o créalos al momento de registrar la primera cita.
                </Card>
                <Card title="Configurar días bloqueados" icon="calendar-x" onClick={() => setPage('admin/holidays')}>
                  Bloquea ferivos y días de cierre en <strong>Feriados</strong> para que el sistema no permita reservas en esas fechas.
                </Card>
                <Card title="Configurar inventario" icon="box" onClick={() => setPage('features/inventory')}>
                  Agrega los productos que tu equipo usa durante los tratamientos para que el stock se rastree y descuente automáticamente.
                </Card>
              </CardGroup>
              <Tip>
                Puedes marcar cada elemento del checklist como completado a medida que avanzas. El checklist se colapsa automáticamente una vez que todos los pasos están completos y no aparecerá para los roles de tu equipo.
              </Tip>
            </Step>

            <Step title="Agenda tu primera cita" number={4}>
              <p>Abre <strong>Agenda</strong> desde el menú lateral. El calendario muestra por defecto la vista del día actual.</p>
              <p>Para crear una cita:</p>
              <ol>
                <li>Haz clic en cualquier espacio libre en la cuadrícula del calendario.</li>
                <li>En el formulario que aparece, busca o crea un cliente.</li>
                <li>Selecciona uno o más servicios.</li>
                <li>Asigna un especialista.</li>
                <li>Confirma la fecha y la hora.</li>
                <li>Haz clic en <strong>Guardar</strong> para guardar.</li>
              </ol>
              <p>La cita aparece en el calendario de inmediato. Puedes arrastrarla a otro horario para reprogramarla, o hacer clic en ella para editar los detalles, cambiar el estado o agregar notas.</p>
              <Note>
                Si aún no existen servicios, el formulario de cita no permitirá guardar. Completa el Paso 3 primero.
              </Note>
            </Step>

            <Step title="Conectar Google Calendar (opcional)" number={5}>
              <p>Novagendas puede crear automáticamente eventos en Google Calendar cada vez que se agenda, edita o cancela una cita. La sincronización se configura una sola vez a nivel de negocio — todos los especialistas se benefician de ella automáticamente.</p>
              <p>Para conectar:</p>
              <ol>
                <li>Ve a <strong>Agenda</strong> y busca la opción de conexión con <strong>Google Calendar</strong>.</li>
                <li>Haz clic en <strong>Conectar</strong> e inicia sesión con la cuenta de Google que deseas usar para el calendario de tu negocio.</li>
                <li>Autoriza los permisos solicitados.</li>
                <li>Una vez conectado, aparece un mensaje de confirmación y las nuevas citas se sincronizarán automáticamente.</li>
              </ol>
              <Tip>
                Cuando Google Calendar está conectado, cada cita envía una invitación por correo al cliente y al especialista asignado — un recordatorio integrado sin costo adicional.
              </Tip>
              <Warning>
                La conexión con Google Calendar está vinculada a tu negocio, no a usuarios individuales. Desconectarla elimina la sincronización de todas las citas de todo tu equipo.
              </Warning>
              <p>Para instrucciones detalladas de configuración, consulta la guía de <a style={{cursor:'pointer'}} onClick={() => setPage('integrations/google-calendar')}>Integración con Google Calendar</a>.</p>
            </Step>
          </Steps>

          <h2 id="que-sigue">¿Qué sigue?</h2>
          <p>Una vez que tengas tu primera cita en el calendario, explora el resto de la plataforma a tu propio ritmo:</p>
          <CardGroup cols={2}>
            <Card title="Roles y permisos" icon="shield" onClick={() => setPage('roles-and-permissions')}>
              Consulta el desglose completo de lo que cada rol puede acceder antes de agregar más miembros al equipo.
            </Card>
            <Card title="Historial de clientes" icon="users" onClick={() => setPage('features/clients')}>
              Aprende a gestionar perfiles de clientes, notas clínicas e historial de citas.
            </Card>
            <Card title="Pagos" icon="credit-card" onClick={() => setPage('features/payments')}>
              Registra pagos y depósitos vinculados directamente a las citas.
            </Card>
            <Card title="Estadísticas" icon="chart-bar" onClick={() => setPage('features/statistics')}>
              Realiza seguimiento de ingresos, citas y servicios más solicitados en cualquier rango de fechas.
            </Card>
          </CardGroup>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ROLES AND PERMISSIONS (ES)
    // -------------------------------------------------------------
    "roles-and-permissions": {
      id: "roles-and-permissions",
      title: "Roles y permisos de usuario en Novagendas explicados",
      description: "Comprende los tres roles de Novagendas — Administrador, Recepcionista y Especialista — qué puede acceder cada uno y cómo un Administrador asigna roles a los miembros del equipo.",
      group: "Comenzar",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Novagendas utiliza un modelo de acceso basado en roles con tres niveles: <strong>Administrador</strong>, <strong>Recepcionista</strong> (Recepción) y <strong>Especialista</strong>. Cada cuenta de usuario pertenece exactamente a un rol. El rol controla qué secciones aparecen en el menú lateral y qué acciones puede realizar el usuario.</p>
          <p>Los roles son asignados por un Administrador al crear o editar una cuenta de usuario en <strong>Usuarios</strong>. El rol de un usuario tiene efecto inmediato — no es necesario cerrar sesión.</p>

          <Note>
            Las sesiones expiran después de 24 horas sin importar el rol. Cada miembro del equipo será invitado a iniciar sesión nuevamente una vez que su sesión expire.
          </Note>

          <h2 id="resumen-de-roles">Resumen de roles</h2>
          <Tabs>
            <Tab title="Administrador">
              <p>El rol de Administrador tiene acceso sin restricciones a todas las funcionalidades de la plataforma. Este rol está pensado para dueños de clínicas, gerentes o cualquier persona responsable de la operación completa del negocio.</p>
              <p><strong>Secciones accesibles:</strong></p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Sección</th>
                      <th>Lo que puedes hacer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Panel</strong></td>
                      <td>Ver las citas del día, ingresos, conteo de pacientes y alertas de stock bajo</td>
                    </tr>
                    <tr>
                      <td><strong>Agenda</strong></td>
                      <td>Crear, editar, reprogramar y cancelar citas para todos los especialistas</td>
                    </tr>
                    <tr>
                      <td><strong>Clientes</strong></td>
                      <td>Agregar, editar y ver todos los perfiles de clientes e historial clínico</td>
                    </tr>
                    <tr>
                      <td><strong>Servicios</strong></td>
                      <td>Crear y gestionar categorías de servicios, servicios individuales, duraciones y precios</td>
                    </tr>
                    <tr>
                      <td><strong>Pagos</strong></td>
                      <td>Registrar pagos y depósitos, ver historial de pagos e ingresos</td>
                    </tr>
                    <tr>
                      <td><strong>Inventario</strong></td>
                      <td>Gestionar stock de productos, establecer niveles mínimos, recibir alertas de stock bajo</td>
                    </tr>
                    <tr>
                      <td><strong>Usuarios</strong></td>
                      <td>Crear cuentas de usuario, asignar roles, desactivar miembros del equipo</td>
                    </tr>
                    <tr>
                      <td><strong>Estadísticas</strong></td>
                      <td>Ver informes de ingresos, citas y servicios; exportar a Excel</td>
                    </tr>
                    <tr>
                      <td><strong>Registros de auditoría</strong></td>
                      <td>Revisar el historial completo de actividad — quién hizo qué y cuándo</td>
                    </tr>
                    <tr>
                      <td><strong>Configuración del bot</strong></td>
                      <td>Configurar el bot de agendamiento de WhatsApp (si está habilitado para tu cuenta)</td>
                    </tr>
                    <tr>
                      <td><strong>Sedes</strong></td>
                      <td>Agregar y gestionar las ubicaciones físicas de tu negocio</td>
                    </tr>
                    <tr>
                      <td><strong>Perfil</strong></td>
                      <td>Actualizar datos personales, foto de perfil y contraseña</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>Los Administradores también ven el checklist de <strong>Configuración del Sistema</strong> en el Panel después del primer inicio de sesión. Este checklist te guía a través de la configuración de servicios, la adición de miembros del equipo y otros pasos recomendados antes de empezar.</p>
              <Tip>
                Si eres la única persona que gestiona el negocio, probablemente serás el único Administrador. Evita dar acceso de Administrador a miembros del personal que solo necesitan agendar o atender clientes — usa Recepcionista o Especialista en su lugar.
              </Tip>
            </Tab>

            <Tab title="Recepcionista">
              <p>El rol de Recepcionista (Recepción) está diseñado para el personal de recepción que gestiona el agendamiento, la atención de clientes y las operaciones del día a día — pero que no debe acceder a datos financieros ni gestionar cuentas de usuario.</p>
              <p><strong>Secciones accesibles:</strong></p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Sección</th>
                      <th>Lo que puedes hacer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Panel</strong></td>
                      <td>Ver las citas del día y el conteo de pacientes</td>
                    </tr>
                    <tr>
                      <td><strong>Agenda</strong></td>
                      <td>Crear, editar y gestionar citas para todos los especialistas</td>
                    </tr>
                    <tr>
                      <td><strong>Clientes</strong></td>
                      <td>Agregar, editar y ver todos los perfiles e historial de clientes</td>
                    </tr>
                    <tr>
                      <td><strong>Servicios</strong></td>
                      <td>Ver y gestionar el catálogo de servicios</td>
                    </tr>
                    <tr>
                      <td><strong>Inventario</strong></td>
                      <td>Ver y actualizar los niveles de stock de productos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p><strong>No accesible:</strong></p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Sección</th>
                      <th>Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Pagos</strong></td>
                      <td>Los datos financieros están restringidos solo al Administrador</td>
                    </tr>
                    <tr>
                      <td><strong>Usuarios</strong></td>
                      <td>La gestión del equipo está restringida solo al Administrador</td>
                    </tr>
                    <tr>
                      <td><strong>Estadísticas</strong></td>
                      <td>Los informes están restringidos solo al Administrador</td>
                    </tr>
                    <tr>
                      <td><strong>Registros de auditoría</strong></td>
                      <td>Restringido solo al Administrador</td>
                    </tr>
                    <tr>
                      <td><strong>Configuración del bot</strong></td>
                      <td>Restringido solo al Administrador</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>Si un Recepcionista navega a una sección restringida, la plataforma lo redirige automáticamente al Panel.</p>
              <Note>
                Los Recepcionistas pueden ver la Agenda de todos los especialistas — lo necesitan para coordinar reservas en todo el equipo. Sin embargo, no pueden ver lo que ganan otros usuarios ni cambiar quién tiene acceso al sistema.
              </Note>
            </Tab>

            <Tab title="Especialista">
              <p>El rol de Especialista está destinado a los profesionales que brindan servicios. Su vista es intencionalmente reducida: solo ven lo que necesitan para prepararse y llevar a cabo sus sesiones.</p>
              <p><strong>Secciones accesibles:</strong></p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Sección</th>
                      <th>Lo que puedes hacer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Agenda</strong></td>
                      <td>Ver y gestionar las citas asignadas a ti</td>
                    </tr>
                    <tr>
                      <td><strong>Clientes</strong></td>
                      <td>Ver y actualizar los registros de tus propios clientes</td>
                    </tr>
                    <tr>
                      <td><strong>Perfil</strong></td>
                      <td>Actualizar tus datos personales y contraseña</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p><strong>No accesible:</strong></p>
              <p>Todas las demás secciones — Pagos, Inventario, Servicios, Usuarios, Estadísticas, Registros de auditoría y Configuración del bot — no están disponibles para los Especialistas.</p>
              <p>Cuando un Especialista inicia sesión, la plataforma abre directamente la <strong>Agenda</strong>. Cualquier intento de navegar a una sección restringida redirige de vuelta a la Agenda.</p>
              <Note>
                Los Especialistas solo pueden ver las citas asignadas a ellos — no el calendario completo del equipo. Si tu clínica necesita que un especialista vea todas las reservas, usa el rol de Recepcionista en su lugar.
              </Note>
            </Tab>
          </Tabs>

          <h2 id="como-se-asignan-los-roles">Cómo se asignan los roles</h2>
          <p>Solo un Administrador puede crear usuarios y asignar roles. Para agregar un nuevo miembro del equipo:</p>
          <Steps>
            <Step title="Ve a Usuarios" number={1}>
              Abre <strong>Usuarios</strong> desde el menú lateral. Esta sección solo es visible para los Administradores.
            </Step>
            <Step title="Crea un nuevo usuario" number={2}>
              Haz clic en <strong>Agregar usuario</strong> y completa el nombre, correo electrónico y contraseña del miembro del equipo. Elige el rol apropiado del menú desplegable: Administrador, Recepcionista o Especialista.
            </Step>
            <Step title="Guarda y comparte las credenciales" number={3}>
              Guarda la cuenta y luego comparte las credenciales de inicio de sesión directamente con el miembro del equipo. Pueden actualizar su contraseña desde su <strong>Perfil</strong> en cualquier momento.
            </Step>
          </Steps>
          <p>Para cambiar el rol de un usuario existente, abre su perfil en <strong>Usuarios</strong>, actualiza el campo de rol y guarda. El cambio tiene efecto en la próxima carga de página — no es necesario que cierren y vuelvan a iniciar sesión.</p>
          <Warning>
            Eliminar un usuario o cambiar su rol no invalida su sesión actual de inmediato. Si necesitas revocar el acceso de inmediato, pídele al usuario que cierre sesión o espera a que su sesión de 24 horas expire.
          </Warning>

          <h2 id="permisos-de-un-vistazo">Permisos de un vistazo</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Funcionalidad</th>
                  <th style={{textAlign:'center'}}>Administrador</th>
                  <th style={{textAlign:'center'}}>Recepcionista</th>
                  <th style={{textAlign:'center'}}>Especialista</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Panel</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Agenda (todos los especialistas)</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Agenda (solo propias)</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                </tr>
                <tr>
                  <td>Clientes (todos)</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Clientes (solo propios)</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                </tr>
                <tr>
                  <td>Servicios</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Inventario</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Pagos</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Usuarios</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Estadísticas</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Registros de auditoría</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Configuración del bot</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Sedes</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>No</td>
                  <td style={{textAlign:'center'}}>No</td>
                </tr>
                <tr>
                  <td>Perfil</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                  <td style={{textAlign:'center'}}>Sí</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    // -------------------------------------------------------------
    // FEATURES: AGENDA (ES)
    // -------------------------------------------------------------
    "features/agenda": {
      id: "features/agenda",
      title: "Agenda y gestión de citas con la agenda de Novagendas",
      description: "Crea, reprograma y da seguimiento a las citas en Novagendas. Cubre las vistas de Día, Semana y Mes, estados, arrastrar y soltar, detección de conflictos y depósitos.",
      group: "Funcionalidades Principales",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>La agenda es el corazón de Novagendas. Te ofrece un calendario en vivo donde puedes reservar citas, seguir su progreso y ver el horario de cada especialista de un vistazo. Las citas aparecen como bloques codificados por colores que reflejan tanto el color asignado al servicio como un indicador de estado en el borde izquierdo, para que puedas leer la carga del día en segundos.</p>

          <h2 id="vistas-del-calendario">Vistas del calendario</h2>
          <p>La agenda ofrece tres vistas. Cambia entre ellas usando los botones <strong>Día</strong>, <strong>Semana</strong> y <strong>Mes</strong> en la barra de herramientas.</p>
          <Tabs>
            <Tab title="Vista de día">
              <p>Muestra un solo día como una línea de tiempo vertical desde tus horas de trabajo configuradas (por defecto 6 AM – 9 PM). Cada bloque de cita se muestra en su hora de inicio exacta y con un tamaño proporcional a su duración. Hasta cinco citas superpuestas se muestran lado a lado en la misma columna antes de que aparezcan los controles de paginación.</p>
              <p>Haz clic en cualquier encabezado de columna de fecha en la vista Semana para ir directamente a ese día.</p>
            </Tab>
            <Tab title="Vista de semana">
              <p>Muestra los siete días de la semana actual en columnas paralelas. Hasta dos citas superpuestas se muestran por columna de día en esta vista. Los días pasados aparecen ligeramente atenuados; las fechas bloqueadas muestran un indicador 🚫.</p>
              <p>Usa las flechas <strong>‹</strong> y <strong>›</strong> o el botón <strong>Hoy</strong> para navegar entre semanas.</p>
            </Tab>
            <Tab title="Vista de mes">
              <p>Muestra una cuadrícula mensual completa con el conteo de citas por día. Haz clic en cualquier celda de fecha para ver sus citas, o cambia a la vista de Día para más detalles. Esta vista es ideal para identificar días de alta demanda y planificar la cobertura.</p>
            </Tab>
          </Tabs>

          <h2 id="crear-una-cita">Crear una cita</h2>
          <Steps>
            <Step title="Abre el formulario de nueva cita" number={1}>
              <p>Haz clic en cualquier espacio libre en el calendario. El formulario se abre con la fecha y hora en que hiciste clic. También puedes usar el botón <strong>+ Nueva Cita</strong> en la barra de herramientas para abrir un formulario en blanco.</p>
              <Note>
                No puedes reservar una cita en el pasado. Los espacios de hace más de una hora están en gris y no se pueden hacer clic.
              </Note>
            </Step>
            <Step title="Selecciona el cliente" number={2}>
              <p>Comienza a escribir el nombre o número de documento del cliente en el campo <strong>Paciente</strong>. El selector busca tanto por nombre como por número de documento mientras escribes.</p>
            </Step>
            <Step title="Elige uno o más servicios" number={3}>
              <p>Abre the selector de servicios y selecciona los procedimientos para esta sesión. Puedes agregar múltiples servicios — sus duraciones se suman automáticamente para determinar la duración total de la cita en el calendario.</p>
            </Step>
            <Step title="Asigna un especialista y sede" number={4}>
              <p>Elige el especialista del menú desplegable. Si tu clínica tiene una sola sede, se selecciona automáticamente; de lo contrario, elige la sucursal correspondiente.</p>
            </Step>
            <Step title="Establece la fecha y hora" number={5}>
              <p>Ajusta los campos de fecha y hora si es necesario. El formulario toma por defecto el espacio en que hiciste clic.</p>
            </Step>
            <Step title="Agrega detalles opcionales" number={6}>
              <p>Opcionalmente puedes:</p>
              <ul>
                <li>Agregar productos consumidos durante la sesión (ver <a href="#productos-usados-durante-una-sesion">Productos usados durante una sesión</a>)</li>
                <li>Aplicar un depósito (abono) existente al costo de la cita</li>
                <li>Escribir notas internas</li>
              </ul>
            </Step>
            <Step title="Guarda" number={7}>
              <p>Haz clic en <strong>Agendar Cita</strong>. Novagendas verifica conflictos de agendamiento antes de guardar. Si el espacio ya está ocupado por el mismo especialista, aparece una advertencia de conflicto con los detalles de la cita existente.</p>
            </Step>
          </Steps>

          <h2 id="estados-de-las-citas">Estados de las citas</h2>
          <p>Cada cita tiene uno de cuatro estados. El borde izquierdo de color en el bloque del calendario refleja el estado actual.</p>
          <CardGroup cols={2}>
            <Card title="Confirmada" icon="circle-check">
              La cita ha sido confirmada con el cliente. El borde aparece en <strong>verde</strong>.
            </Card>
            <Card title="En Espera" icon="clock">
              Agendada pero aún no confirmada. El borde aparece en <strong>ámbar/amarillo</strong>. Este es el estado predeterminado para las citas recién creadas.
            </Card>
            <Card title="Cancelada" icon="circle-x">
              La cita fue cancelada. Las citas canceladas están ocultas en la cuadrícula del calendario pero permanecen en los informes. El borde aparece en <strong>rojo</strong>.
            </Card>
            <Card title="Completada" icon="badge-check">
              La sesión ha sido completada. El borde aparece en <strong>azul/primario</strong>.
            </Card>
          </CardGroup>
          <p>Para cambiar el estado de una cita, ábrela haciendo clic en el ícono de lápiz y selecciona el nuevo estado en el menú desplegable <strong>Estado</strong>. Cuando marcas una cita como <strong>Cancelada</strong>, se envía automáticamente un correo de cancelación al cliente si tiene una dirección de correo registrada.</p>

          <h2 id="arrastrar-y-soltar-para-reprogramar">Arrastrar y soltar para reprogramar</h2>
          <p>En las vistas de Día y Semana, arrastra cualquier bloque de cita a un nuevo espacio para reprogramarla. Novagendas:</p>
          <ol>
            <li>Verificará conflictos con el horario existente del especialista en el destino.</li>
            <li>Si se encuentra un conflicto, moverá automáticamente la cita al final del bloque conflictivo (hasta cinco intentos).</li>
            <li>Guardará el nuevo horario y sincronizará el cambio con Google Calendar si tu cuenta está conectada.</li>
          </ol>
          <Warning>
            No puedes arrastrar una cita a un espacio en el pasado. Aparecerá un mensaje de advertencia y el movimiento se cancelará.
          </Warning>

          <h2 id="deteccion-de-conflictos">Detección de conflictos</h2>
          <p>Novagendas evita la doble reserva de un especialista. Cuando guardas o arrastras una cita, el sistema verifica si el especialista ya tiene otra cita (que no esté cancelada) que se superponga con la misma ventana de tiempo. Si existe un conflicto, un modal muestra el nombre del cliente conflictivo y los horarios exactos de inicio y fin para que puedas elegir un espacio diferente.</p>

          <h2 id="filtrar-el-calendario">Filtrar el calendario</h2>
          <p>Usa el filtro <strong>Especialista</strong> en la barra de herramientas para ver solo las citas asignadas a un miembro específico del equipo. Un filtro adicional de <strong>Sede</strong> reduce la vista a una sola ubicación cuando tu clínica opera en múltiples sucursales. Los Especialistas ven por defecto solo sus propias citas cuando inician sesión.</p>

          <h2 id="productos-usados-durante-una-sesion">Productos usados durante una sesión</h2>
          <p>Puedes registrar los artículos de inventario consumidos durante una cita directamente en el formulario de cita. Esto mantiene tus niveles de stock precisos sin un paso adicional.</p>
          <Steps>
            <Step title="Abre el panel de productos" number={1}>
              En el formulario de cita, localiza la sección <strong>Productos Utilizados</strong>. Busca un producto por nombre usando el campo de búsqueda.
            </Step>
            <Step title="Establece la cantidad" number={2}>
              Ajusta la cantidad con los controles <strong>+</strong> / <strong>−</strong>, luego haz clic en <strong>Agregar</strong> para añadir el artículo a la cita.
            </Step>
            <Step title="Guarda la cita" number={3}>
              Cuando guardas una nueva cita, Novagendas descuenta automáticamente el stock de cada producto agregado. Editar una cita existente no aplica un segundo descuento.
            </Step>
          </Steps>
          <Tip>
            Solo aparecen en la búsqueda de productos aquellos con stock mayor a cero. Si falta un producto en la lista, primero revisa el módulo de Inventario para reponerlo.
          </Tip>

          <h2 id="aplicar-un-deposito-abono-a-una-cita">Aplicar un depósito (abono) a una cita</h2>
          <p>Si un cliente tiene un depósito con saldo disponible, puedes aplicarlo al crear una cita.</p>
          <Steps>
            <Step title="Selecciona el cliente" number={1}>
              Después de elegir el cliente en el formulario, el sistema obtiene automáticamente cualquier depósito con saldo positivo.
            </Step>
            <Step title="Elige un depósito" number={2}>
              Selecciona el depósito del menú desplegable <strong>Abono disponible</strong>. Ingresa el monto a aplicar — no puede exceder el saldo restante del depósito.
            </Step>
            <Step title="Guarda" number={3}>
              Al guardar, el saldo del depósito se reduce, se crea un registro de pago y la cita refleja el monto aplicado.
            </Step>
          </Steps>

          <h2 id="eliminar-o-cancelar-una-cita">Eliminar o cancelar una cita</h2>
          <p>Abre la cita haciendo clic en el ícono de edición, luego:</p>
          <ul>
            <li><strong>Cancelar la cita</strong>: Cambia el estado a <strong>Cancelada</strong> y guarda. La cita se marca como cancelada, se elimina de la cuadrícula activa del calendario y se envía un correo de cancelación al cliente.</li>
            <li><strong>Eliminar la cita</strong>: Haz clic en el botón <strong>Eliminar</strong> en la parte inferior del formulario. Esto realiza una eliminación suave — la cita se elimina del calendario e informes pero permanece en la base de datos para fines de auditoría. También se envía un correo de cancelación si el cliente tiene un correo registrado.</li>
          </ul>
          <Warning>
            La eliminación no se puede deshacer desde el calendario. Si necesitas recuperar una cita eliminada, contacta a tu administrador.
          </Warning>

          <h2 id="imprimir-un-recibo-de-cita">Imprimir un recibo de cita</h2>
          <p>Con una cita abierta, haz clic en <strong>Imprimir Recibo</strong> para generar un resumen imprimible que incluye el nombre del cliente, especialista, servicios, precio total, duración y estado actual. El recibo se abre en una nueva ventana del navegador y se imprime automáticamente.</p>
        </div>
      )
    },
    // -------------------------------------------------------------
    // FEATURES: CLIENTS (ES)
    // -------------------------------------------------------------
    "features/clients": {
      id: "features/clients",
      title: "Gestiona los registros de clientes e historial clínico en Novagendas",
      description: "Agrega nuevos clientes, busca por nombre o documento, ve el historial de citas, agrega notas clínicas y edita o archiva perfiles de pacientes en Novagendas.",
      group: "Funcionalidades Principales",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>El módulo de Clientes es tu directorio de pacientes. Cada cliente tiene una ficha clínica que reúne sus datos de contacto, próximas citas, historial de visitas y notas de evolución clínica en un solo lugar. Mantener estos registros actualizados permite que cada miembro de tu equipo trabaje con la misma información.</p>

          <h2 id="agregar-un-nuevo-cliente">Agregar un nuevo cliente</h2>
          <Steps>
            <Step title="Abre el formulario de registro" number={1}>
              Haz clic en <strong>+ Nuevo Paciente</strong> en la parte superior del directorio de clientes. El formulario se abre como un cuadro de diálogo modal.
            </Step>
            <Step title="Ingresa la información requerida" number={2}>
              <p>Completa los siguientes campos:</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Campo</th>
                      <th>Obligatorio</th>
                      <th>Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Documento de Identidad</td>
                      <td>Sí</td>
                      <td>Número de cédula o documento</td>
                    </tr>
                    <tr>
                      <td>Nombre Completo</td>
                      <td>Sí</td>
                      <td>Nombre y apellido</td>
                    </tr>
                    <tr>
                      <td>Teléfono / WhatsApp</td>
                      <td>Sí</td>
                      <td>Usado para recordatorios de citas</td>
                    </tr>
                    <tr>
                      <td>Correo Electrónico</td>
                      <td>No</td>
                      <td>Requerido para confirmaciones por correo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Step>
            <Step title="Acepta el consentimiento de datos" number={3}>
              Marca la casilla de consentimiento <strong>Habeas Data</strong>. Esto registra la autorización del cliente para que sus datos personales y clínicos sean procesados de acuerdo con la Ley 1581 (ley colombiana de protección de datos). El formulario no puede enviarse sin este consentimiento.
            </Step>
            <Step title="Guarda" number={4}>
              Haz clic en <strong>Aperturar Paciente</strong>. El cliente aparece de inmediato en el directorio.
            </Step>
          </Steps>
          <Note>
            Solo los usuarios con el rol de <strong>Administrador</strong> o <strong>Recepción</strong> pueden registrar nuevos clientes. Los Especialistas pueden ver y agregar notas clínicas a los clientes asignados a ellos.
          </Note>

          <h2 id="buscar-un-cliente">Buscar un cliente</h2>
          <p>Usa la barra de búsqueda en la parte superior del directorio para encontrar un cliente. La búsqueda filtra por:</p>
          <ul>
            <li>Nombre completo (nombre o apellido)</li>
            <li>Número de documento / cédula</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
          </ul>
          <p>Los resultados se actualizan mientras escribes. Haz clic en cualquier entrada de la lista para abrir su ficha clínica en el panel derecho.</p>

          <h2 id="ver-la-ficha-clinica-de-un-cliente">Ver la ficha clínica de un cliente</h2>
          <p>Al seleccionar un cliente del directorio se abre su ficha, que muestra:</p>
          <ul>
            <li><strong>Banner de perfil</strong> — nombre, número de documento, teléfono y correo</li>
            <li><strong>Próxima Cita</strong> — su próxima cita con fecha, hora, servicio y estado (si existe)</li>
            <li><strong>Evolución</strong> — sección colapsable con todas las notas clínicas</li>
            <li><strong>Historial de Citas</strong> — sección colapsable con todas las citas pasadas y próximas</li>
          </ul>

          <h2 id="ver-el-historial-de-citas">Ver el historial de citas</h2>
          <p>Expande la sección <strong>Historial de Citas</strong> para ver todas las citas vinculadas al cliente, las más recientes primero. Cada entrada muestra la fecha, insignia de estado, especialista, rango de horario y servicios prestados. Haz clic en cualquier fila de cita para expandir sus detalles.</p>

          <h2 id="agregar-una-nota-clinica-evolucion">Agregar una nota clínica (evolución)</h2>
          <p>Las notas clínicas capturan observaciones de una sesión — qué se realizó, dosis, reacciones o instrucciones de seguimiento. Cada nota está firmada por la persona que la creó.</p>
          <Steps>
            <Step title="Abre el formulario de evolución" number={1}>
              Con la ficha del cliente abierta, expande la sección <strong>Evolución</strong> y haz clic en <strong>+ Nueva</strong>.
            </Step>
            <Step title="Ingresa el servicio realizado" number={2}>
              Escribe el nombre del procedimiento en el campo <strong>Servicio Realizado</strong>. Aparecerá una lista de autocompletado con términos comunes y tus servicios existentes para ayudar con la nomenclatura consistente.
            </Step>
            <Step title="Escribe las observaciones clínicas" number={3}>
              Completa el área de texto <strong>Observaciones de la Evolución</strong> con los detalles clínicos de esta sesión.
            </Step>
            <Step title="Firma y guarda" number={4}>
              Haz clic en <strong>Firmar y Registrar</strong>. La nota se guarda con una marca de tiempo y firmada bajo tu nombre. Aparece en la parte superior de la línea de tiempo de Evolución.
            </Step>
          </Steps>
          <Tip>
            Las notas clínicas son permanentes una vez guardadas — no hay opción de editar o eliminar notas individuales. Escribe con cuidado y agrega una nueva nota si necesitas hacer una corrección.
          </Tip>

          <h2 id="editar-datos-del-cliente">Editar datos del cliente</h2>
          <p>Para actualizar la información de contacto de un cliente:</p>
          <Steps>
            <Step title="Abre el formulario de edición" number={1}>
              Con el cliente seleccionado, haz clic en el ícono de lápiz junto a su dirección de correo en el banner de perfil. Esto abre el modal <strong>Editar Paciente</strong>.
            </Step>
            <Step title="Actualiza los campos" number={2}>
              Modifica el número de documento, nombre completo, teléfono o correo según sea necesario.
            </Step>
            <Step title="Guarda" number={3}>
              Haz clic en <strong>Guardar Cambios</strong>. El directorio y todos los registros de citas reflejan la información actualizada de inmediato.
            </Step>
          </Steps>
          <Note>
            Solo los usuarios con rol de <strong>Administrador</strong> pueden editar los datos del cliente. El botón de edición está oculto para el rol de Especialista.
          </Note>

          <h2 id="archivar-un-cliente-eliminacion-suave">Archivar un cliente (eliminación suave)</h2>
          <p>Novagendas no elimina permanentemente los registros de clientes. Cuando se elimina un cliente, el registro se marca como eliminado suavemente — ya no aparece en el directorio ni en las búsquedas de citas, pero los datos se conservan internamente para informes históricos.</p>
          <p>Para archivar un cliente, contacta a tu administrador. Los clientes archivados pueden ser restaurados por el equipo de soporte si es necesario.</p>

          <h2 id="acceso-basado-en-roles-clientes">Acceso basado en roles</h2>
          <p>Los Especialistas ven una vista filtrada del directorio de clientes — solo son visibles los clientes que tienen una cita asignada a ellos, o cuyas notas clínicas fueron escritas por ese especialista. Los Administradores y el personal de recepción ven el directorio completo.</p>
        </div>
      )
    },
    // -------------------------------------------------------------
    // FEATURES: SERVICES (ES)
    // -------------------------------------------------------------
    "features/services": {
      id: "features/services",
      title: "Construye y configura tu catálogo de servicios en Novagendas",
      description: "Crea y gestiona tu catálogo de servicios en Novagendas. Establece nombre, categoría, duración, precio y color del calendario para cada procedimiento que ofrece tu clínica.",
      group: "Funcionalidades Principales",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>El catálogo de servicios define todos los procedimientos que ofrece tu clínica. Cada servicio que creas está disponible para su selección al reservar citas, y su duración controla directamente cuánto espacio ocupa la cita en el calendario. Configurar tu catálogo con precisión ahorra tiempo al agendar y garantiza que los precios sean consistentes en todos los pagos.</p>

          <h2 id="crear-una-categoria">Crear una categoría</h2>
          <p>Los servicios deben pertenecer a una categoría antes de que puedas crearlos. Las categorías te permiten agrupar procedimientos relacionados (por ejemplo, "Inyectables", "Cosmetología" o "Aparatología") y hacen el catálogo más fácil de navegar.</p>
          <Steps>
            <Step title="Abre el gestor de categorías" number={1}>
              Haz clic en <strong>Editar Categorías</strong> en la parte superior derecha de la página de Servicios. El gestor de categorías se abre como un modal lateral.
            </Step>
            <Step title="Agrega una nueva categoría" number={2}>
              Escribe el nombre de la categoría en el campo de entrada en la parte inferior del modal y haz clic en <strong>Añadir</strong>. La categoría aparece en la lista de inmediato.
            </Step>
            <Step title="Edita o elimina una categoría" number={3}>
              Cada fila de categoría tiene un ícono de lápiz para renombrarla y un ícono de papelera para eliminarla. No puedes eliminar una categoría que aún tenga servicios asignados — reasigna o desactiva esos servicios primero.
            </Step>
          </Steps>
          <Note>
            Debes crear al menos una categoría antes de poder registrar cualquier servicio. Si el catálogo está vacío y no existen categorías, un aviso en la página de Servicios te guiará a crear una.
          </Note>

          <h2 id="crear-un-servicio">Crear un servicio</h2>
          <Steps>
            <Step title="Abre el formulario de servicio" number={1}>
              Haz clic en <strong>Registrar Servicio</strong>. Si aún no existen categorías, un mensaje te pedirá que crees una primero.
            </Step>
            <Step title="Ingresa el nombre del servicio" number={2}>
              Escribe el nombre del procedimiento. Una lista de autocompletado sugerirá términos estéticos y de salud comunes para mantener una nomenclatura consistente en tu catálogo.
            </Step>
            <Step title="Selecciona una categoría" number={3}>
              Elige la categoría a la que pertenece este servicio en el menú desplegable.
            </Step>
            <Step title="Establece la duración" number={4}>
              Usa los campos de horas y minutos para ingresar la duración de la sesión. La duración mínima es de <strong>15 minutos</strong>. La duración se almacena en minutos internamente y se muestra como "Xh Ymin" o "Z min" en las tarjetas de servicio.
              <Tip>
                La duración controla directamente cómo aparece el bloque de la cita en el calendario. Un servicio de 90 minutos ocupa 1.5 filas de hora en las vistas de Día y Semana, lo que facilita ver la carga de trabajo del día de un vistazo.
              </Tip>
            </Step>
            <Step title="Establece el precio base (COP)" number={5}>
              Ingresa el precio en pesos colombianos. Este valor se usa como monto predeterminado al registrar un pago para este servicio — el cajero puede ajustar el monto en el momento del pago si aplica un descuento o promoción.
            </Step>
            <Step title="Elige un color para el calendario" number={6}>
              Elige un color usando el selector de colores. Este color se usa para el fondo del bloque de cita en el calendario, facilitando distinguir visualmente los tipos de servicio sin leer la etiqueta.
            </Step>
            <Step title="Guarda" number={7}>
              Haz clic en <strong>Registrar Servicio</strong>. La nueva tarjeta de servicio aparece en el catálogo de inmediato.
            </Step>
          </Steps>

          <h2 id="tarjetas-de-servicio">Tarjetas de servicio</h2>
          <p>Cada servicio se muestra como una tarjeta en la cuadrícula del catálogo. La tarjeta muestra:</p>
          <ul>
            <li>Insignia de categoría</li>
            <li>Nombre del servicio</li>
            <li>Duración de la sesión</li>
            <li>Precio base (COP)</li>
            <li>Interruptor de estado activo / inactivo</li>
          </ul>
          <CardGroup cols={2}>
            <Card title="Editar un servicio" icon="pencil">
              Haz clic en el ícono de lápiz en cualquier tarjeta, o haz clic en cualquier parte del cuerpo de la tarjeta, para abrir el formulario de edición. Todos los campos son editables. Los cambios aplican a citas futuras — las citas existentes no se actualizan retroactivamente.
            </Card>
            <Card title="Habilitar o deshabilitar un servicio" icon="toggle-on">
              Haz clic en el interruptor verde <strong>Habilitado</strong> / gris <strong>Inhabilitado</strong> en la tarjeta para cambiar el estado activo del servicio. Los servicios deshabilitados se ocultan del formulario de reserva de citas para que el personal no pueda reservarlos accidentalmente, pero sus datos históricos (citas, pagos) se conservan.
            </Card>
          </CardGroup>

          <h2 id="como-afecta-la-duracion-al-calendario">Cómo afecta la duración al calendario</h2>
          <p>Cuando un cliente reserva una cita con múltiples servicios, Novagendas suma las duraciones de todos los servicios seleccionados para determinar la duración total de la cita. Por ejemplo, si un cliente reserva un "Botox" (30 min) y un "Hydrafacial" (60 min) en una sesión, el bloque de cita abarca 90 minutos en el calendario y la verificación de conflictos usa la ventana completa de 90 minutos para evitar la doble reserva del especialista.</p>

          <h2 id="como-fluyen-los-precios-hacia-los-pagos">Cómo fluyen los precios hacia los pagos</h2>
          <p>Cuando registras un pago en el módulo de Pagos y seleccionas un servicio, el campo de precio se llena automáticamente con el precio base del servicio. Puedes ajustar el monto para registrar un pago parcial o una promoción. La diferencia entre el precio base y el monto pagado se rastrea como saldo pendiente.</p>

          <h2 id="preguntas-frecuentes-servicios">Preguntas frecuentes</h2>
          <AccordionGroup>
            <Accordion title="¿Puedo tener dos servicios con el mismo nombre?">
              Sí, pero no es recomendable. La búsqueda de servicios en el formulario de cita devuelve todos los servicios que coincidan con el nombre, lo que puede confundir al personal. Dale a cada servicio un nombre único y descriptivo.
            </Accordion>
            <Accordion title="¿Qué sucede con las citas si cambio el precio de un servicio?">
              Cambiar el precio de un servicio no actualiza retroactivamente los registros de pago existentes. Los pagos pasados conservan el monto que se registró en el momento de la transacción. Solo los pagos futuros toman el nuevo precio como predeterminado.
            </Accordion>
            <Accordion title="¿Puedo eliminar un servicio permanentemente?">
              No. Los servicios se desactivan (deshabilitan), no se eliminan. Esto conserva los datos históricos de citas y pagos vinculados al servicio. Si necesitas renombrar o reorganizar, edita el servicio en su lugar.
            </Accordion>
          </AccordionGroup>
        </div>
      )
    },
    // -------------------------------------------------------------
    // FEATURES: PAYMENTS (ES)
    // -------------------------------------------------------------
    "features/payments": {
      id: "features/payments",
      title: "Registra y gestiona pagos y depósitos en Novagendas",
      description: "Registra pagos completos y depósitos parciales, ve el historial de pagos por cliente, filtra por fecha o estado y gestiona saldos pendientes en Novagendas.",
      group: "Funcionalidades Principales",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>El módulo de pagos es tu libro mayor financiero. Separa dos tipos distintos de transacciones — pagos completos (pagos) y depósitos anticipados (abonos) — y rastrea saldos parciales para que siempre sepas qué clientes tienen montos pendientes. Cada transacción lleva una marca de fecha, método y cliente vinculado, lo que facilita conciliar los ingresos en cualquier momento.</p>

          <h2 id="tipos-de-transacciones">Tipos de transacciones</h2>
          <CardGroup cols={2}>
            <Card title="Pagos" icon="circle-dollar-sign">
              Pagos completos o parciales por un servicio ya prestado o por prestarse. Un pago puede registrarse como <strong>Pagado</strong> (pagado completamente) o <strong>Pago Parcial</strong> (pago parcial) con el saldo pendiente rastreado automáticamente.
            </Card>
            <Card title="Abonos" icon="piggy-bank">
              Prepagos que un cliente deposita por anticipado sin vincularlos aún a una cita específica. El abono mantiene un saldo que puede aplicarse a cualquier cita futura. Consulta los abonos en la pestaña <strong>Abonos</strong>.
            </Card>
          </CardGroup>

          <h2 id="tarjetas-de-resumen">Tarjetas de resumen</h2>
          <p>En la parte superior de la página de pagos, cuatro tarjetas te dan una instantánea financiera de un vistazo:</p>
          <ul>
            <li><strong>Ingresos Totales</strong> — monto acumulado de todos los pagos registrados</li>
            <li><strong>Ingresos de Hoy</strong> — total recaudado hoy (según la fecha de tu calendario local)</li>
            <li><strong>Transacciones</strong> — número total de registros de pago</li>
            <li><strong>Saldo Pendiente</strong> — saldo total pendiente en todos los pagos parciales</li>
          </ul>

          <h2 id="registrar-un-pago">Registrar un pago</h2>
          <Steps>
            <Step title="Abre el formulario de pago" number={1}>
              Haz clic en <strong>Registrar Pago</strong>. Se abre el modal de pago.
            </Step>
            <Step title="Selecciona el cliente" number={2}>
              Busca por nombre o número de documento en el campo <strong>Paciente</strong>.
            </Step>
            <Step title="Elige un servicio (opcional)" number={3}>
              Seleccionar un servicio llena automáticamente el campo <strong>Monto Cobrado</strong> con el precio base del servicio. Puedes cambiar el monto — si ingresas menos que el precio del servicio, aparece un aviso de "pago parcial" que muestra el saldo restante.
            </Step>
            <Step title="Selecciona el método de pago" number={4}>
              <p>Elige entre los métodos de pago configurados para tu cuenta. Los métodos de pago predeterminados incluyen:</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Método</th>
                      <th>Ícono</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Efectivo</td>
                      <td>💵</td>
                    </tr>
                    <tr>
                      <td>Tarjeta</td>
                      <td>💳</td>
                    </tr>
                    <tr>
                      <td>Transferencia</td>
                      <td>🏦</td>
                    </tr>
                    <tr>
                      <td>Nequi / Daviplata</td>
                      <td>📱</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Step>
            <Step title="Ingresa el monto" number={5}>
              Escribe el monto en COP. Si el monto es menor que el precio del servicio seleccionado, la transacción se registra como <strong>Pago Parcial</strong> y el saldo aparece en la columna <strong>Saldo Pendiente</strong>.
            </Step>
            <Step title="Agrega una nota (opcional)" number={6}>
              Usa el campo <strong>Nota u Observación</strong> para registrar cualquier información relevante — un código de descuento, un arreglo especial o un número de referencia.
            </Step>
            <Step title="Confirma" number={7}>
              Haz clic en <strong>Confirmar Pago</strong>. La transacción aparece en la tabla de pagos y se envía un correo de confirmación al cliente si tiene una dirección de correo registrada.
            </Step>
          </Steps>

          <h2 id="registrar-un-deposito-abono">Registrar un depósito (abono)</h2>
          <Steps>
            <Step title="Abre el formulario de abono" number={1}>
              Haz clic en <strong>Nuevo Abono</strong>. Se abre el modal de abono.
            </Step>
            <Step title="Selecciona el cliente e ingresa el monto" number={2}>
              Elige el cliente e ingresa el monto del depósito en COP.
            </Step>
            <Step title="Vincula a un servicio (opcional)" number={3}>
              Opcionalmente puedes asociar el depósito con un servicio específico. Esto es útil cuando un cliente prepaga un paquete pero las sesiones aún no han sido agendadas.
            </Step>
            <Step title="Elige el método de pago y agrega una nota" number={4}>
              Selecciona cómo se recibió el depósito y opcionalmente agrega una nota (por ejemplo, "Paquete de 5 sesiones").
            </Step>
            <Step title="Guarda" number={5}>
              Haz clic en <strong>Registrar Abono</strong>. El depósito se almacena con su monto completo como saldo disponible. Aparecerá en la pestaña <strong>Abonos</strong> y puede aplicarse a citas futuras desde la agenda.
            </Step>
          </Steps>
          <Tip>
            Para aplicar un depósito a una cita, abre la cita en la Agenda, selecciona el cliente y elige el depósito en el menú desplegable <strong>Abono disponible</strong>. El monto aplicado se descuenta automáticamente del saldo del depósito al guardar.
          </Tip>

          <h2 id="ver-el-historial-de-pagos-de-un-cliente">Ver el historial de pagos de un cliente</h2>
          <p>Haz clic en cualquier fila de la tabla de pagos para abrir el panel de detalles del pago. El panel muestra:</p>
          <ul>
            <li>Monto total pagado y estado actual (Pagado / Pago Parcial)</li>
            <li>Saldo pendiente (si es parcial)</li>
            <li>Nombre del cliente, fecha, servicio y método de pago</li>
            <li><strong>Historial de pagos</strong> — una línea de tiempo de cada cuota registrada para este pago, incluyendo el pago inicial y cualquier cuota posterior</li>
          </ul>

          <h2 id="completar-un-pago-parcial">Completar un pago parcial</h2>
          <p>Cuando un pago tiene saldo pendiente, aparece un botón <strong>Pagar</strong> en la columna de estado. Haz clic en él para abrir el modal de cuota, que muestra:</p>
          <ul>
            <li>Precio total del servicio</li>
            <li>Monto ya pagado</li>
            <li>Saldo restante</li>
          </ul>
          <p>Ingresa el monto para esta cuota y el método de pago. La cuota se agrega al historial del pago y el saldo se recalcula. Si la cuota cubre el saldo restante completo, el estado del pago cambia a <strong>Pagado</strong> y se envía un correo de confirmación al cliente.</p>

          <h2 id="buscar-y-filtrar">Buscar y filtrar</h2>
          <p>Usa la <strong>barra de búsqueda</strong> sobre la tabla para filtrar por nombre de cliente o número de documento. Activa la píldora <strong>Pendientes</strong> para mostrar solo los pagos con saldo pendiente. Cambia entre <strong>Pagos</strong> y <strong>Abonos</strong> usando las píldoras de pestañas.</p>

          <h2 id="eliminar-un-pago">Eliminar un pago</h2>
          <p>Haz clic en una fila de pago para abrir el panel de detalles, luego haz clic en el botón <strong>Eliminar</strong>. Un cuadro de confirmación advierte que la eliminación es irreversible y afectará los informes financieros. Confirma para eliminar suavemente el registro — ya no aparecerá en la tabla ni en las estadísticas.</p>
          <Warning>
            Eliminar un pago no se puede deshacer. La transacción quedará excluida de todos los informes de ingresos. Si cometiste un error, considera agregar una nota correctiva en lugar de eliminar.
          </Warning>
        </div>
      )
    },
    // -------------------------------------------------------------
    // FEATURES: INVENTORY (ES)
    // -------------------------------------------------------------
    "features/inventory": {
      id: "features/inventory",
      title: "Gestiona el inventario de productos y alertas de stock en Novagendas",
      description: "Agrega productos, establece umbrales mínimos de stock, responde a alertas de stock bajo, rastrea el consumo por sesión y busca o filtra tu inventario en Novagendas.",
      group: "Funcionalidades Principales",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>El módulo de inventario te da visibilidad sobre cada insumo que usa tu clínica — jeringas, sueros, consumibles u otros productos. Estableces un umbral mínimo de stock para cada artículo, y Novagendas te alerta cuando las cantidades caen por debajo de ese nivel para que puedas reponer antes de quedarte sin existencias. Los productos también pueden vincularse a las citas, manteniendo los conteos de stock precisos sin necesidad de registro manual después de cada sesión.</p>

          <h2 id="agregar-una-categoria-de-productos">Agregar una categoría de productos</h2>
          <p>Los productos deben pertenecer a una categoría. Las categorías mantienen tu inventario organizado (por ejemplo, "Insumos Médicos", "Cosméticos" o "Equipamiento").</p>
          <Steps>
            <Step title="Abre la gestión de categorías" number={1}>
              Haz clic en <strong>Categorías</strong> en la parte superior derecha de la página de Inventario.
            </Step>
            <Step title="Agrega una categoría" number={2}>
              Escribe el nombre de la categoría y haz clic en <strong>Añadir</strong>. La categoría aparece en la lista.
            </Step>
            <Step title="Edita o elimina" number={3}>
              Usa el ícono de lápiz para renombrar una categoría y el ícono de papelera para eliminarla. No puedes eliminar una categoría que tenga productos asignados.
            </Step>
          </Steps>

          <h2 id="agregar-un-producto">Agregar un producto</h2>
          <Steps>
            <Step title="Abre el formulario de producto" number={1}>
              Haz clic en <strong>Nuevo Insumo</strong>. Si aún no existen categorías, un mensaje te pedirá que crees una primero.
            </Step>
            <Step title="Ingresa el nombre del producto" number={2}>
              Escribe el nombre del producto. Aparecen sugerencias de autocompletado con términos de insumos comunes mientras escribes.
            </Step>
            <Step title="Selecciona una categoría" number={3}>
              Elige la categoría de almacenamiento a la que pertenece este producto.
            </Step>
            <Step title="Agrega un número de lote (opcional)" number={4}>
              Ingresa el número de lote si aplica — útil para la trazabilidad de insumos médicos regulados.
            </Step>
            <Step title="Establece stock inicial y stock mínimo" number={5}>
              <ul>
                <li><strong>Existencias</strong> — la cantidad actual disponible. Este es el valor inicial; los cambios posteriores ocurren a través de los botones <strong>+</strong> / <strong>−</strong> en la tabla de inventario o automáticamente cuando los productos se consumen en las citas.</li>
                <li><strong>Stock Mínimo</strong> — el umbral al que se activa una alerta de stock bajo. Cuando la cantidad llega o cae por debajo de este número, el producto se marca como crítico.</li>
              </ul>
            </Step>
            <Step title="Ingresa el costo unitario (opcional)" number={6}>
              Registra el precio de compra por unidad en COP. Este valor se usa en el módulo de Estadísticas para calcular el valor total del inventario.
            </Step>
            <Step title="Guarda" number={7}>
              Haz clic en <strong>Confirmar Cambios</strong>. El producto aparece en la tabla de inventario.
            </Step>
          </Steps>

          <h2 id="la-tabla-de-inventario">La tabla de inventario</h2>
          <p>La tabla principal lista todos los productos activos con las siguientes columnas:</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Columna</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Producto</strong></td>
                  <td>Nombre del producto</td>
                </tr>
                <tr>
                  <td><strong>Lote</strong></td>
                  <td>Insignia de número de lote (si está configurado)</td>
                </tr>
                <tr>
                  <td><strong>Categoría</strong></td>
                  <td>Categoría de almacenamiento</td>
                </tr>
                <tr>
                  <td><strong>Valor Unitario</strong></td>
                  <td>Costo unitario de compra en COP</td>
                </tr>
                <tr>
                  <td><strong>Nivel de Stock</strong></td>
                  <td>Barra de progreso visual que muestra la cantidad actual relativa al umbral mínimo × 2</td>
                </tr>
                <tr>
                  <td><strong>Cantidad</strong></td>
                  <td>Cantidad actual y el umbral mínimo debajo de ella</td>
                </tr>
                <tr>
                  <td><strong>Acciones</strong></td>
                  <td>Editar, habilitar/deshabilitar y botones rápidos de ajuste de stock <strong>+</strong> / <strong>−</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>La barra de stock cambia de color según qué tan cerca está la cantidad del mínimo:</p>
          <ul>
            <li><strong>Verde</strong> — el stock está saludable (por encima del 60% del nivel objetivo)</li>
            <li><strong>Ámbar</strong> — el stock es moderado (entre 0% y 60%)</li>
            <li><strong>Rojo</strong> — el stock está en o por debajo del umbral mínimo (crítico)</li>
          </ul>

          <h2 id="alertas-de-stock-bajo">Alertas de stock bajo</h2>
          <p>Cuando la cantidad de un producto cae a o por debajo de su <strong>Stock Mínimo</strong>, Novagendas lo marca como alerta crítica. Puedes ver:</p>
          <ul>
            <li>La <strong>insignia del encabezado</strong> en la tabla de inventario — muestra "X Alertas Críticas" en rojo, o "✓ Stock Saludable" en verde.</li>
            <li>El <strong>Panel</strong> — un widget de stock bajo muestra los productos que necesitan atención inmediata sin navegar al inventario completo.</li>
            <li>La pestaña <strong>Estadísticas &gt; Inventario</strong> — un panel de "Productos en stock crítico" lista cada artículo por debajo de su mínimo con las cantidades actuales y mínimas.</li>
          </ul>
          <Warning>
            Un producto con cantidad cero se excluye del selector de productos en el formulario de cita de la Agenda. Repón el stock antes de la próxima sesión para asegurarse de que pueda registrarse como consumido.
          </Warning>

          <h2 id="rastrear-el-consumo-por-sesion">Rastrear el consumo por sesión</h2>
          <p>Cuando un especialista registra productos usados en una cita (a través del formulario de agenda), Novagendas descuenta automáticamente el stock de cada producto por la cantidad ingresada. Esto mantiene tu inventario preciso sin requerir un ajuste manual después de cada sesión.</p>
          <p>El consumo se aplica solo cuando se crea una cita <strong>nueva</strong>. Editar una cita existente no aplica un segundo descuento para evitar el doble conteo.</p>

          <h2 id="ajustar-el-stock-manualmente">Ajustar el stock manualmente</h2>
          <p>Usa los botones <strong>+</strong> y <strong>−</strong> en la columna de Acciones de la tabla de inventario para incrementar o decrementar la cantidad de cualquier producto de a una unidad. Para ajustes masivos mayores, abre el formulario de edición del producto y cambia el campo <strong>Existencias</strong> directamente.</p>

          <h2 id="buscar-y-filtrar-productos">Buscar y filtrar productos</h2>
          <Tabs>
            <Tab title="Buscar por nombre o lote">
              Escribe en la barra de búsqueda sobre la tabla para filtrar por nombre de producto, número de lote o descripción. La tabla se actualiza en tiempo real.
            </Tab>
            <Tab title="Ordenar">
              <p>Usa el menú desplegable de ordenamiento para ordenar por:</p>
              <ul>
                <li><strong>Más recientes</strong> — agregados más recientemente (predeterminado)</li>
                <li><strong>Editados recientemente</strong> — últimos modificados</li>
                <li><strong>Más antiguos</strong> — los más antiguos primero</li>
                <li><strong>Nombre A–Z</strong> — alfabético</li>
              </ul>
            </Tab>
            <Tab title="Filtrar por fecha">
              Haz clic en el botón <strong>Fechas</strong> para mostrar un filtro de rango de fechas. Elige filtrar por fecha de creación o fecha de última edición, luego establece una fecha Desde y Hasta. Haz clic en <strong>Limpiar</strong> para eliminar el filtro de fechas.
            </Tab>
          </Tabs>

          <h2 id="habilitar-y-deshabilitar-productos">Habilitar y deshabilitar productos</h2>
          <p>Haz clic en el interruptor <strong>Habilitado</strong> / <strong>Inhabilitado</strong> en la columna de Acciones para cambiar el estado activo de un producto. Los productos deshabilitados se ocultan del selector de productos del formulario de cita, pero su historial y datos de stock se conservan.</p>
        </div>
      )
    },
    // -------------------------------------------------------------
    // FEATURES: STATISTICS (ES)
    // -------------------------------------------------------------
    "features/statistics": {
      id: "features/statistics",
      title: "Analiza el rendimiento con los informes de estadísticas de Novagendas",
      description: "Explora siete pestañas de informes en Estadísticas de Novagendas que cubren citas, ingresos, clientes, servicios, inventario y actividad del equipo. Exporta cualquier conjunto de datos a Excel.",
      group: "Funcionalidades Principales",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>El módulo de Estadísticas te ofrece una vista estructurada del desempeño de tu clínica. Siete pestañas dedicadas dividen los datos de rendimiento en áreas específicas para que puedas responder preguntas concretas — ¿cuánto ganamos este mes?, ¿cuál es el servicio más popular?, ¿qué clientes no han regresado en 60 días? y más. Cada gráfico y tabla puede exportarse a Excel para compartir con tu equipo o importar a otras herramientas.</p>
          <Note>
            Estadísticas está disponible solo para usuarios con el rol de <strong>Administrador</strong>. Los Especialistas y el personal de recepción no tienen acceso a esta sección.
          </Note>

          <h2 id="navegar-por-las-pestanas">Navegar por las pestañas</h2>
          <p>Cambia entre secciones de informes usando la barra de pestañas en la parte superior de la página. Cada pestaña carga su propio conjunto de tarjetas KPI, gráficos y tablas. Cambiar de pestaña restablece cualquier filtro de rango de fechas activo para esa sección.</p>
          <CardGroup cols={2}>
            <Card title="General" icon="chart-bar">
              Resumen ejecutivo de alto nivel: citas este mes, ingresos este mes, pacientes activos en los últimos 90 días y tasa de cancelación — todo comparado con el mes anterior.
            </Card>
            <Card title="Citas" icon="calendar">
              Volumen de citas por día de la semana y hora del día, los 5 especialistas principales por conteo de citas y una lista de citas canceladas del período.
            </Card>
            <Card title="Pacientes" icon="users">
              Total de pacientes, nuevos registros este mes, activos en los últimos 30 días y pacientes en riesgo (sin cita en más de 60 días). Incluye nuevos pacientes por mes y una tabla de los 10 pacientes más frecuentes.
            </Card>
            <Card title="Servicios" icon="stethoscope">
              Conteo de servicios activos, servicio más solicitado este mes e ingresos generados. Muestra un gráfico de los 8 servicios principales y una tabla de ranking ordenable con citas, ingresos y precio por servicio.
            </Card>
            <Card title="Pagos & Abonos" icon="dollar-sign">
              Ingresos este mes y hoy, número de depósitos con saldo disponible y monto total en depósitos. Incluye desglose por método de pago y un gráfico de línea de ingresos acumulados diarios.
            </Card>
            <Card title="Inventario" icon="package">
              Total de productos, conteo y lista de artículos con stock crítico, valor total del inventario y un gráfico relativo de stock que muestra los 10 productos más cercanos a su umbral mínimo.
            </Card>
          </CardGroup>
          <p>También existe una pestaña de <strong>Usuarios (Equipo)</strong>, que muestra los conteos de usuarios activos por rol (Administrador, Especialista, Recepción), un gráfico de dona de distribución de roles y una tabla de la actividad de citas de cada miembro del equipo para el mes actual.</p>

          <h2 id="kpis-principales-por-seccion">KPIs principales por sección</h2>
          <AccordionGroup>
            <Accordion title="KPIs Generales">
              <ul>
                <li><strong>Citas este mes</strong> — total de citas en el mes actual, con cambio porcentual vs. el mes anterior</li>
                <li><strong>Ingresos este mes</strong> — total de pagos recaudados este mes vs. el mes pasado</li>
                <li><strong>Pacientes activos (90d)</strong> — pacientes distintos con al menos una cita en los últimos 90 días</li>
                <li><strong>Tasa de cancelación</strong> — porcentaje de citas de este mes que fueron canceladas</li>
              </ul>
            </Accordion>
            <Accordion title="KPIs de Citas">
              <ul>
                <li><strong>Total citas</strong> — citas en el rango de fechas seleccionado</li>
                <li><strong>Completadas</strong> — porcentaje de citas marcadas como completadas</li>
                <li><strong>Canceladas</strong> — porcentaje de citas canceladas</li>
                <li><strong>Promedio diario</strong> — promedio de citas por día en el período</li>
              </ul>
            </Accordion>
            <Accordion title="KPIs de Clientes">
              <ul>
                <li><strong>Total pacientes</strong> — todos los clientes registrados</li>
                <li><strong>Nuevos este mes</strong> — clientes registrados en el mes calendario actual</li>
                <li><strong>Activos (últimos 30d)</strong> — clientes con una cita en los últimos 30 días</li>
                <li><strong>En riesgo (+60d sin cita)</strong> — clientes que tuvieron al menos una cita pasada pero no han regresado en más de 60 días</li>
              </ul>
            </Accordion>
            <Accordion title="KPIs de Pagos">
              <ul>
                <li><strong>Ingresos este mes</strong> — total de pagos en el mes actual</li>
                <li><strong>Ingresos hoy</strong> — pagos recaudados hoy</li>
                <li><strong>Abonos con saldo</strong> — conteo de depósitos con saldo positivo restante</li>
                <li><strong>Monto en abonos</strong> — total en COP en depósitos no redimidos</li>
              </ul>
            </Accordion>
            <Accordion title="KPIs de Inventario">
              <ul>
                <li><strong>Total productos</strong> — todos los productos en inventario</li>
                <li><strong>Stock crítico</strong> — productos en o por debajo de su umbral mínimo</li>
                <li><strong>Valor del inventario</strong> — valor total calculado como cantidad × costo unitario</li>
              </ul>
            </Accordion>
          </AccordionGroup>

          <h2 id="filtrar-por-rango-de-fechas">Filtrar por rango de fechas</h2>
          <p>La pestaña de <strong>Citas</strong> admite un filtro de rango de fechas personalizado. Usa las entradas de fecha <strong>Desde</strong> y <strong>Hasta</strong> para limitar los datos a cualquier período. Haz clic en <strong>Este mes</strong> para restablecer al mes actual.</p>
          <p>Las demás pestañas (General, Pacientes, Servicios, Pagos, Inventario, Equipo) calculan datos para períodos fijos (mes actual, últimos 6 meses, últimos 90 días) y no ofrecen una entrada de rango personalizado.</p>

          <h2 id="graficos">Gráficos</h2>
          <p>Novagendas usa cuatro tipos de gráficos en las pestañas de estadísticas:</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tipo de gráfico</th>
                  <th>Usado para</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Gráfico de barras</strong></td>
                  <td>Ingresos por mes, citas por hora del día, nuevos pacientes por mes</td>
                </tr>
                <tr>
                  <td><strong>Gráfico de línea</strong></td>
                  <td>Citas por semana, ingresos acumulados diarios</td>
                </tr>
                <tr>
                  <td><strong>Barras horizontales</strong></td>
                  <td>Distribución de estados de citas, servicios principales, ingresos por método de pago, niveles de stock de inventario</td>
                </tr>
                <tr>
                  <td><strong>Gráfico de dona</strong></td>
                  <td>Distribución de roles de usuario (pestaña Equipo)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Los gráficos muestran un mensaje de estado vacío cuando no hay datos para el período seleccionado, en lugar de mostrar una visualización vacía o engañosa.</p>

          <h2 id="exportar-a-excel">Exportar a Excel</h2>
          <p>Cada tabla principal del módulo de Estadísticas tiene un botón <strong>Exportar</strong> que descarga los datos subyacentes como un archivo Excel (.xlsx). Las exportaciones disponibles incluyen:</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Pestaña</th>
                  <th>Qué se exporta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Citas</td>
                  <td>Todos los registros de citas del período: fecha, hora, paciente, especialista, estado, notas</td>
                </tr>
                <tr>
                  <td>Pacientes</td>
                  <td>Todos los clientes con conteo de citas y fecha de última visita</td>
                </tr>
                <tr>
                  <td>Servicios</td>
                  <td>Catálogo de servicios con conteo de citas, ingresos y precio</td>
                </tr>
                <tr>
                  <td>Pagos</td>
                  <td>Transacciones de pago: fecha, cliente, servicio, método, monto, estado</td>
                </tr>
                <tr>
                  <td>Abonos</td>
                  <td>Registros de depósitos con saldo restante</td>
                </tr>
                <tr>
                  <td>Inventario</td>
                  <td>Productos con cantidades, stock mínimo, costo unitario, valor total y estado de stock</td>
                </tr>
                <tr>
                  <td>Usuarios</td>
                  <td>Miembros del equipo con rol y citas atendidas este mes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Tip>
            Las acciones de exportación se registran en el historial de auditoría del sistema para que tengas un registro de quién exportó datos y cuándo.
          </Tip>
        </div>
      )
    },
    // -------------------------------------------------------------
    // INTEGRATIONS: GOOGLE CALENDAR (ES)
    // -------------------------------------------------------------
    "integrations/google-calendar": {
      id: "integrations/google-calendar",
      title: "Conecta Novagendas con Google Calendar para sincronización automática",
      description: "Conecta la cuenta de Google de tu negocio para crear, actualizar y eliminar automáticamente eventos del calendario cada vez que gestiones citas en Novagendas.",
      group: "Integraciones",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Cuando conectas Google Calendar, cada cita que creas en Novagendas aparece de inmediato como un evento en tu cuenta de Google vinculada. Tanto el cliente como el especialista reciben una invitación al calendario por correo electrónico, para que todos tengan la cita en su propio calendario sin ningún trabajo manual. Las ediciones y cancelaciones en Novagendas se propagan a Google Calendar en tiempo real.</p>
          <Note>
            La conexión con Google Calendar es compartida en todo tu negocio — una cuenta de Google por subdominio. Los miembros del personal no necesitan conectar sus propias cuentas.
          </Note>

          <h2 id="conectar-google-calendar">Conectar Google Calendar</h2>
          <Steps>
            <Step title="Abre la Agenda" number={1}>
              En el menú lateral izquierdo, haz clic en <strong>Agenda</strong>. En la parte superior de la vista del calendario verás el botón de conexión con Google Calendar.
            </Step>
            <Step title="Inicia la conexión" number={2}>
              Haz clic en <strong>Conectar Google Calendar</strong>. Aparece un cuadro de confirmación que explica qué acceso solicitará Novagendas. Haz clic en <strong>Conectar</strong> para continuar.
            </Step>
            <Step title="Inicia sesión con Google" number={3}>
              Tu navegador te redirige a la pantalla de inicio de sesión y consentimiento de Google. Selecciona la cuenta de Google que deseas usar para el calendario de tu negocio y otorga los permisos solicitados.
            </Step>
            <Step title="Regresa a Novagendas" number={4}>
              Después de aprobar el acceso, Google te redirige de vuelta a tu Agenda de Novagendas. Un banner de confirmación indica que la conexión fue exitosa. El botón en la barra de herramientas ahora refleja el estado conectado.
            </Step>
          </Steps>
          <Tip>
            Usa una cuenta de Google compartida del negocio (como <code>agenda@tuclinica.com</code>) en lugar de una cuenta personal para que todo el personal pueda ver los eventos del calendario.
          </Tip>

          <h2 id="que-se-sincroniza">Qué se sincroniza</h2>
          <p>Cada vez que creas, editas o eliminas una cita en Novagendas, el evento correspondiente en Google Calendar se actualiza automáticamente.</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Acción en la cita</th>
                  <th>Resultado en Google Calendar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Creada</td>
                  <td>Se crea un nuevo evento; se envían invitaciones al cliente y al especialista</td>
                </tr>
                <tr>
                  <td>Editada (fecha, hora o servicio)</td>
                  <td>El evento existente se actualiza; los asistentes son notificados del cambio</td>
                </tr>
                <tr>
                  <td>Cancelada o eliminada</td>
                  <td>El evento se elimina del calendario; los asistentes son notificados de la cancelación</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="detalles-del-evento">Detalles del evento</h3>
          <p>Cada evento del calendario incluye:</p>
          <ul>
            <li><strong>Título</strong> — nombre del paciente y servicio(s)</li>
            <li><strong>Fecha y hora</strong> — inicio y fin exactos, configurados en la zona horaria de Colombia (America/Bogota)</li>
            <li><strong>Descripción</strong> — servicios, duración estimada, precio estimado, datos de contacto del paciente e información del especialista</li>
            <li><strong>Asistentes</strong> — la dirección de correo electrónico del cliente y del especialista</li>
            <li><strong>Recordatorios</strong> — un recordatorio por correo 24 horas antes de la cita y un recordatorio emergente 30 minutos antes</li>
          </ul>
          <Note>
            Los asistentes pueden ver los nombres de los demás en la invitación. Google envía correos de notificación a todos los asistentes cada vez que se crea, actualiza o cancela un evento.
          </Note>

          <h2 id="desconectar-google-calendar">Desconectar Google Calendar</h2>
          <Steps>
            <Step title="Abre la Agenda" number={1}>
              Ve a <strong>Agenda</strong> en el menú lateral.
            </Step>
            <Step title="Desconecta" number={2}>
              Haz clic en el botón de Google Calendar en la barra de herramientas (aparecerá como conectado). Selecciona <strong>Desconectar</strong> en el cuadro de confirmación.
            </Step>
          </Steps>
          <p>Después de desconectar, las nuevas citas ya no crearán eventos del calendario. Los eventos existentes que ya fueron creados en Google Calendar no se eliminan — permanecen en tu cuenta de Google.</p>

          <h2 id="solucion-de-problemas-calendar">Solución de problemas</h2>
          <AccordionGroup>
            <Accordion title="La página regresó con un error después del inicio de sesión en Google">
              Si Novagendas te redirige de vuelta con un banner de error, la autorización no se completó correctamente. Esto puede ocurrir si cerraste la pantalla de consentimiento de Google antes de tiempo, denegaste los permisos solicitados o si Google devolvió un error. Intenta conectar nuevamente desde la barra de herramientas de la Agenda. Si el error persiste, asegúrate de iniciar sesión con una cuenta de Google que tenga permisos para gestionar su calendario.
            </Accordion>
            <Accordion title="Una nueva cita no apareció en Google Calendar">
              Los fallos de sincronización del calendario no son bloqueantes — la cita se guarda en Novagendas aunque el evento del calendario no haya podido crearse. Verifica que la integración siga conectada (el botón de la barra de herramientas debe reflejar un estado conectado). Si aparece como desconectado, reconecta tu cuenta de Google. También verifica que los correos electrónicos del cliente y del especialista estén ingresados, ya que son necesarios para crear la invitación.
            </Accordion>
            <Accordion title="El especialista o el cliente no recibió una invitación">
              Las invitaciones se envían a las direcciones de correo almacenadas en Novagendas para el cliente y el especialista. Si un correo está ausente o incorrecto, actualiza el registro y luego edita y vuelve a guardar la cita para activar una nueva sincronización con la lista de asistentes corregida.
            </Accordion>
            <Accordion title="Desconecté Google Calendar — ¿se eliminarán mis eventos existentes?">
              No. Desconectar elimina el vínculo entre Novagendas y tu cuenta de Google a partir de ese momento. Los eventos que ya fueron creados en Google Calendar permanecen en tu calendario y no se ven afectados.
            </Accordion>
          </AccordionGroup>
        </div>
      )
    },
    // -------------------------------------------------------------
    // INTEGRATIONS: WHATSAPP BOT (ES)
    // -------------------------------------------------------------
    "integrations/whatsapp-bot": {
      id: "integrations/whatsapp-bot",
      title: "Automatiza el agendamiento con el bot de WhatsApp de Novagendas",
      description: "Permite que los clientes consulten disponibilidad y agenden citas enviando un mensaje a tu número de WhatsApp Business — sin ninguna intervención manual de tu equipo.",
      group: "Integraciones",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>El bot de WhatsApp de Novagendas se conecta a tu número de WhatsApp Business y gestiona automáticamente las conversaciones de agendamiento. Los clientes escriben a tu número de negocio, exploran los servicios disponibles y los horarios, y confirman sus citas — todo a través de WhatsApp. Tu equipo recibe una notificación y la cita aparece en la Agenda de inmediato.</p>
          <Note>
            Necesitas una cuenta activa de <strong>WhatsApp Business</strong> para usar esta función. Los números personales de WhatsApp no son compatibles. La conexión se completa a través del flujo oficial de registro integrado de Meta.
          </Note>

          <h2 id="conecta-tu-numero-de-whatsapp-business">Conecta tu número de WhatsApp Business</h2>
          <Steps>
            <Step title="Abre Configuración del Bot" number={1}>
              En el menú lateral izquierdo, haz clic en <strong>Config. Bot</strong>.
            </Step>
            <Step title="Inicia la conexión" number={2}>
              Desplázate hasta la sección <strong>Número de WhatsApp</strong> y haz clic en <strong>Conectar número de WhatsApp</strong>. Esto lanza el flujo de registro integrado de Meta en una ventana emergente.
            </Step>
            <Step title="Completa el inicio de sesión en Meta" number={3}>
              Inicia sesión en tu cuenta de Facebook (la vinculada a tu cuenta de WhatsApp Business) y sigue los pasos en pantalla para seleccionar tu Cuenta de WhatsApp Business (WABA) y número de teléfono.
            </Step>
            <Step title="Confirma la conexión" number={4}>
              Una vez que completes el flujo de Meta, la ventana emergente se cierra y Configuración del Bot muestra <strong>Número conectado</strong> con un indicador verde. El bot está ahora activo en tu número de WhatsApp Business.
            </Step>
          </Steps>
          <Warning>
            Debes tener acceso de administrador a la cuenta de Facebook Business que es propietaria de la Cuenta de WhatsApp Business. Si la ventana emergente se cierra sin mostrar "Número conectado", la conexión no se completó — inténtalo de nuevo o verifica que tienes los permisos correctos de la cuenta de Facebook.
          </Warning>

          <h2 id="configura-el-bot">Configura el bot</h2>
          <p>Después de conectar, configura el bot para que solo ofrezca citas durante tus horas de trabajo reales y con los servicios correctos. Todos los cambios tienen efecto inmediato después de guardar.</p>
          
          <h3>Días disponibles</h3>
          <p>Selecciona los días de la semana en que tu negocio acepta citas. El bot no ofrecerá horarios en días que no estén seleccionados.</p>
          <p>Los días disponibles son de lunes a domingo. Por defecto, el bot está configurado de lunes a sábado (el domingo está desactivado).</p>

          <h3>Franjas horarias</h3>
          <p>Para cada día activo puedes habilitar hasta tres turnos:</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Turno</th>
                  <th>Horario por defecto</th>
                  <th>Habilitado por defecto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mañana</td>
                  <td>08:00 – 12:00</td>
                  <td>Sí</td>
                </tr>
                <tr>
                  <td>Tarde</td>
                  <td>13:00 – 18:00</td>
                  <td>Sí</td>
                </tr>
                <tr>
                  <td>Noche</td>
                  <td>18:00 – 21:00</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Haz clic en cualquier día activo en la sección <strong>Horario de atención</strong> para expandirlo. Activa o desactiva cada turno y ajusta los horarios de inicio y fin según sea necesario.</p>
          <Note>
            Cada día activo debe tener al menos un turno habilitado, y la hora de inicio debe ser anterior a la hora de fin. El bot mostrará un error cuando intentes guardar si estas condiciones no se cumplen.
          </Note>

          <h3>Horarios personalizados por día</h3>
          <p>Para establecer horarios diferentes para un día específico — por ejemplo, horario reducido el sábado — expande ese día en la sección <strong>Horario de atención</strong> y ajusta sus turnos de forma independiente. La configuración por día reemplaza el horario predeterminado solo para ese día.</p>

          <h3>Servicios disponibles</h3>
          <p>Por defecto, todos los servicios activos aparecen en el catálogo del bot. Para evitar que los clientes reserven un servicio específico a través del bot, desmárcalo en la sección <strong>Servicios disponibles en el bot</strong>. Los servicios excluidos siguen apareciendo en Novagendas y pueden reservarse manualmente por tu equipo.</p>

          <h3>Precios de servicios</h3>
          <p>Usa el interruptor <strong>Mostrar precios en catálogo</strong> para controlar si el bot muestra precios a los clientes:</p>
          <ul>
            <li><strong>Activado</strong> — los clientes ven el precio de cada servicio en el catálogo.</li>
            <li><strong>Desactivado</strong> — los precios están ocultos para todos los servicios.</li>
          </ul>
          <p>Cuando los precios están habilitados de forma global, puedes ocultar el precio de servicios individuales desmarcando <strong>Mostrar precio</strong> junto a cada servicio en la lista de servicios.</p>

          <h3>Notificaciones y datos de contacto</h3>
          <CardGroup cols={2}>
            <Card title="Correo de notificación" icon="envelope">
              Ingresa un correo de administrador para recibir una notificación cada vez que el bot cree, modifique o cancele una cita. Déjalo en blanco para omitir las notificaciones por correo.
            </Card>
            <Card title="Teléfono de contacto" icon="phone">
              Un número de teléfono directo que se muestra a los clientes cuando el bot encuentra un error o no puede encontrar disponibilidad. Déjalo en blanco para ocultar la opción de contacto.
            </Card>
            <Card title="Número Nequi" icon="credit-card">
              Tu número de Nequi del negocio. Cuando se proporciona, el bot ofrece a los clientes la opción de enviar un depósito vía Nequi antes de su cita.
            </Card>
            <Card title="Clave Bre-B" icon="key">
              Tu clave de pago Bre-B. Cuando se proporciona junto con el número Nequi, los clientes también pueden pagar un depósito a través de Bre-B. Deja ambos en blanco para omitir el paso de prepago.
            </Card>
          </CardGroup>

          <h2 id="guarda-tu-configuracion">Guarda tu configuración</h2>
          <p>Haz clic en <strong>Guardar configuración</strong> al final de la página. El bot aplica la nueva configuración de inmediato — no se requiere reinicio.</p>
          <Tip>
            Después de guardar, envía un mensaje de prueba a tu número de WhatsApp Business para confirmar que el bot responde con los días, horarios y servicios correctos.
          </Tip>

          <h2 id="desconectar-whatsapp">Desconectar WhatsApp</h2>
          <p>Para desvincular tu número de WhatsApp Business, desplázate hasta la sección <strong>Número de WhatsApp</strong> en Configuración del Bot. Cuando un número está conectado, aparece una opción de desconexión junto al indicador de estado conectado. Confirma la acción para eliminar la integración. El bot deja de responder inmediatamente después de desconectarse.</p>

          <h2 id="solucion-de-problemas-whatsapp">Solución de problemas</h2>
          <AccordionGroup>
            <Accordion title="La ventana emergente de Meta se cerró pero el número sigue apareciendo como desconectado">
              La conexión requiere completar todo el flujo de registro integrado de Meta, incluyendo la selección de una Cuenta de WhatsApp Business y un número de teléfono. Si cerraste la ventana emergente antes de tiempo o no completaste todos los pasos, la conexión no se guarda. Haz clic nuevamente en <strong>Conectar número de WhatsApp</strong> y completa cada paso del flujo de Meta.
            </Accordion>
            <Accordion title="El bot no está respondiendo a los mensajes">
              Confirma que el número aparece como <strong>Número conectado</strong> (indicador verde) en Configuración del Bot. Si aparece como desconectado, reconéctalo a través del flujo de Meta. También verifica que al menos un día y un turno estén habilitados y guardados en la configuración de horarios.
            </Accordion>
            <Accordion title="Los clientes no pueden reservar ciertos servicios a través del bot">
              Revisa la sección <strong>Servicios disponibles en el bot</strong>. Si un servicio está desmarcado, está excluido del catálogo del bot. Marca el servicio para rehabilitarlo y guarda la configuración.
            </Accordion>
            <Accordion title="El bot está ofreciendo horarios fuera del horario de atención">
              Revisa la sección <strong>Horario de atención</strong> para cada día activo. Asegúrate de que los turnos habilitados reflejen tus horas de trabajo reales y que hayas guardado la configuración después de hacer cualquier cambio.
            </Accordion>
            <Accordion title="Los clientes no están viendo los precios">
              El interruptor <strong>Mostrar precios en catálogo</strong> debe estar activado. Además, verifica que el servicio individual no tenga <strong>Mostrar precio</strong> desmarcado en la lista de servicios.
            </Accordion>
          </AccordionGroup>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ADMIN: TEAM MANAGEMENT (ES)
    // -------------------------------------------------------------
    "admin/team-management": {
      id: "admin/team-management",
      title: "Agrega, gestiona y desactiva miembros del equipo en Novagendas",
      description: "Aprende cómo invitar miembros del equipo, asignar roles con los niveles de acceso correctos, actualizar perfiles y desactivar cuentas en Novagendas.",
      group: "Administración",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>La sección de <strong>Equipo</strong> te permite construir y gestionar a cada persona que trabaja en tu negocio — desde recepcionistas hasta especialistas. Solo los Administradores pueden acceder a esta sección. Cada miembro del equipo obtiene sus propias credenciales de inicio de sesión y solo ve los módulos que su rol permite.</p>
          <Note>
            Cada cuenta de negocio admite exactamente un Administrador (el titular principal de la cuenta). Todos los demás miembros del equipo se crean como Recepcionistas o Especialistas.
          </Note>

          <h2 id="comprendiendo-los-roles-team">Comprendiendo los roles</h2>
          <p>Novagendas tiene tres roles. Asigna el que mejor se ajuste a las responsabilidades de cada persona.</p>
          <Tabs>
            <Tab title="Administrador">
              <p>Acceso completo a todos los módulos de Novagendas, incluyendo informes financieros, pagos, inventario, gestión de usuarios y configuración.</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Módulo</th>
                      <th>Acceso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Panel</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Agenda</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Clientes</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Servicios</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Inventario</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Pagos</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Equipo (Usuarios)</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Días bloqueados</td>
                      <td>Completo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab title="Recepcionista">
              <p>Ideal para el personal de recepción que gestiona citas y registros de clientes pero no debe ver datos financieros.</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Módulo</th>
                      <th>Acceso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Agenda</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Clientes</td>
                      <td>Completo</td>
                    </tr>
                    <tr>
                      <td>Servicios</td>
                      <td>Lectura</td>
                    </tr>
                    <tr>
                      <td>Inventario</td>
                      <td>Lectura</td>
                    </tr>
                    <tr>
                      <td>Pagos</td>
                      <td>Ninguno</td>
                    </tr>
                    <tr>
                      <td>Equipo (Usuarios)</td>
                      <td>Ninguno</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab title="Especialista">
              <p>Diseñado para profesionales que necesitan ver sus propias citas agendadas y actualizar notas clínicas solo de sus propios pacientes.</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Módulo</th>
                      <th>Acceso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Agenda</td>
                      <td>Solo citas propias</td>
                    </tr>
                    <tr>
                      <td>Clientes</td>
                      <td>Solo clientes propios</td>
                    </tr>
                    <tr>
                      <td>Todos los demás módulos</td>
                      <td>Ninguno</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab>
          </Tabs>

          <h2 id="agregar-un-nuevo-miembro-del-equipo">Agregar un nuevo miembro del equipo</h2>
          <Steps>
            <Step title="Abre la sección Equipo" number={1}>
              En el menú lateral, navega a <strong>Equipo</strong>. Verás una lista de todos los miembros actuales del equipo de tu negocio.
            </Step>
            <Step title="Haz clic en Nuevo Miembro" number={2}>
              Selecciona <strong>Nuevo Miembro</strong> en la esquina superior derecha. Se abrirá un modal de creación.
            </Step>
            <Step title="Ingresa los datos del miembro" number={3}>
              <p>Completa los campos requeridos:</p>
              <ul>
                <li><strong>Nombre</strong> y <strong>Apellido</strong> (p. ej., <em>María López</em>)</li>
                <li><strong>Correo electrónico</strong> — la dirección que usará para iniciar sesión</li>
                <li><strong>Rol</strong> — selecciona <strong>Administrador</strong>, <strong>Recepcionista</strong> o <strong>Especialista</strong></li>
              </ul>
            </Step>
            <Step title="Configura el acceso a módulos" number={4}>
              Una cuadrícula de <strong>Módulos Permitidos</strong> preselecciona los permisos estándar para el rol elegido. Activa o desactiva módulos individuales para ajustar exactamente a qué puede acceder esta persona antes de guardar.
            </Step>
            <Step title="Establece una contraseña" number={5}>
              Ingresa una contraseña para la nueva cuenta. Compártela de forma segura con el miembro del equipo — podrá actualizarla desde su <strong>Perfil</strong> después de su primer inicio de sesión.
            </Step>
            <Step title="Guarda la cuenta" number={6}>
              Haz clic en <strong>Confirmar Miembro</strong>. La cuenta se crea de inmediato y el miembro del equipo puede iniciar sesión en el subdominio de tu negocio de inmediato.
            </Step>
          </Steps>
          <Note>
            Los miembros del equipo inician sesión en el subdominio de tu negocio (p. ej., <code>tunombre.novagendas.com</code>) usando su correo y contraseña. No usan la página principal de Novagendas para iniciar sesión.
          </Note>

          <h2 id="editar-un-miembro-del-equipo">Editar un miembro del equipo</h2>
          <p>Puedes actualizar los datos de un miembro del equipo o ajustar su acceso a módulos en cualquier momento.</p>
          <Steps>
            <Step title="Abre la sección Usuarios" number={1}>
              Navega a <strong>Usuarios</strong> en el menú lateral.
            </Step>
            <Step title="Haz clic en el ícono de edición" number={2}>
              Haz clic en el ícono de lápiz en la fila del miembro del equipo para abrir su formulario de edición. Actualiza el nombre, correo, rol o contraseña según sea necesario, luego haz clic en <strong>Guardar Cambios</strong>.
            </Step>
            <Step title="Ajusta el acceso a módulos (opcional)" number={3}>
              Para cambiar a qué módulos puede acceder un miembro del equipo sin cambiar su rol, haz clic en el ícono de candado en su fila. El panel <strong>Permisos de Acceso</strong> se abre con la cuadrícula de módulos actual. Activa o desactiva permisos, luego haz clic en <strong>Guardar Permisos</strong>.
            </Step>
          </Steps>
          <Note>
            El Administrador puede actualizar su propio nombre, correo y contraseña desde su página de <strong>Perfil</strong>.
          </Note>

          <h2 id="desactivar-un-miembro-del-equipo">Desactivar un miembro del equipo</h2>
          <p>Desactivar a un miembro del equipo bloquea su inicio de sesión sin eliminar su historial ni registros.</p>
          <Steps>
            <Step title="Localiza al miembro del equipo" number={1}>
              Encuentra a la persona en la lista del Equipo.
            </Step>
            <Step title="Cambia su insignia de estado" number={2}>
              Haz clic en la insignia <strong>Activo</strong> / <strong>Inactivo</strong> en su tarjeta. El estado cambia de inmediato.
            </Step>
          </Steps>
          <Warning>
            Un miembro del equipo desactivado no puede iniciar sesión, pero sus citas pasadas, registros de clientes y entradas del registro de auditoría se conservan. Puedes reactivarlo en cualquier momento haciendo clic en la insignia nuevamente.
          </Warning>

          <h2 id="restablecer-la-contrasena-de-un-miembro-del-equipo">Restablecer la contraseña de un miembro del equipo</h2>
          <p>Si un miembro del equipo olvida su contraseña, puede solicitar un restablecimiento desde la página de inicio de sesión, o puedes iniciar el proceso en su nombre.</p>
          <AccordionGroup>
            <Accordion title="El miembro del equipo restablece su propia contraseña">
              En la página de inicio de sesión del subdominio de tu negocio, el miembro del equipo hace clic en <strong>¿Olvidaste tu contraseña?</strong> e ingresa su correo. Novagendas envía un enlace de restablecimiento a esa dirección. Después de hacer clic en el enlace, ingresa y confirma una nueva contraseña.
            </Accordion>
            <Accordion title="El Administrador establece una nueva contraseña directamente">
              <p>Mientras edita el perfil de un miembro del equipo, ingresa una nueva contraseña en el campo <strong>Contraseña</strong> y confírmala, luego guarda. El miembro del equipo puede usar la nueva contraseña de inmediato.</p>
              <Tip>
                Comparte la nueva contraseña de forma segura y pídele al miembro del equipo que la cambie después de su próximo inicio de sesión.
              </Tip>
            </Accordion>
          </AccordionGroup>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ADMIN: LOCATIONS (ES)
    // -------------------------------------------------------------
    "admin/locations": {
      id: "admin/locations",
      title: "Configura y gestiona las sedes de tu negocio en Novagendas",
      description: "Agrega, edita y elimina las sucursales físicas donde opera tu negocio. Filtra la Agenda por sede y asigna especialistas a sitios específicos.",
      group: "Administración",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Las sedes en Novagendas representan las sucursales físicas o puntos de servicio donde opera tu negocio. Si tu clínica tiene varios locales — una oficina en el centro y una segunda sede en otro lugar, por ejemplo — cada una puede registrarse como una sede separada. Las citas en la Agenda pueden luego filtrarse por sede, y los especialistas pueden asignarse a sitios específicos.</p>
          <Note>
            La gestión de sedes está disponible solo para Administradores. Puedes acceder a ella desde tu página de <strong>Perfil</strong> en la sección <strong>Sedes del Negocio</strong>.
          </Note>

          <h2 id="agregar-una-sede">Agregar una sede</h2>
          <Steps>
            <Step title="Abre Sedes del Negocio" number={1}>
              Haz clic en tu avatar de perfil o ve a <strong>Perfil</strong>, luego expande la sección <strong>Sedes del Negocio</strong>.
            </Step>
            <Step title="Haz clic en Agregar sede" number={2}>
              Selecciona <strong>Agregar sede</strong> para abrir el formulario de sede.
            </Step>
            <Step title="Ingresa los datos de la sede" number={3}>
              <p>Completa los campos para tu nueva sede:</p>
              <ul>
                <li><strong>Nombre de la sede</strong> <em>(obligatorio)</em> — un nombre corto y reconocible como <em>Sede Centro</em> o <em>Clínica Norte</em></li>
                <li><strong>País</strong> — selecciona del menú desplegable; el formulario trae por defecto Colombia</li>
                <li><strong>Departamento</strong> — disponible una vez que se selecciona el país</li>
                <li><strong>Ciudad</strong> — disponible una vez que se selecciona el departamento</li>
                <li><strong>Dirección</strong> — la dirección de la calle (p. ej., <em>Calle 10 # 5-23</em>)</li>
                <li><strong>Barrio</strong> — el barrio o sector local</li>
                <li><strong>Teléfono</strong> — un número de contacto para esta sede específica</li>
              </ul>
            </Step>
            <Step title="Elige un color de etiqueta" number={4}>
              Elige uno de los ocho colores predeterminados para identificar visualmente esta sede en toda la Agenda. Cada sede tiene su propio color para que el personal pueda distinguir entre sitios de un vistazo.
            </Step>
            <Step title="Guarda la sede" number={5}>
              Haz clic en <strong>Crear sede</strong>. La nueva sede aparece en la lista de inmediato.
            </Step>
          </Steps>

          <h2 id="como-aparecen-las-sedes-en-la-agenda">Cómo aparecen las sedes en la Agenda</h2>
          <p>Una vez que tienes más de una sede, la Agenda muestra un filtro de sedes. Seleccionar una sede reduce el calendario para mostrar solo las citas programadas en ese sitio.</p>
          <p>Cada cita puede vincularse a una sede cuando se reserva, y la etiqueta de color que asignaste aparece junto a esa cita en la vista del calendario.</p>
          <Tip>
            Usa colores distintos y de alto contraste para cada sede para que el personal que cambia entre sitios pueda identificar instantáneamente a qué sucursal pertenecen las entradas del calendario.
          </Tip>

          <h2 id="editar-una-sede">Editar una sede</h2>
          <Steps>
            <Step title="Encuentra la sede" number={1}>
              En la lista de <strong>Sedes del Negocio</strong>, localiza la sede que deseas actualizar.
            </Step>
            <Step title="Haz clic en el botón de edición" number={2}>
              Selecciona el ícono de lápiz en el lado derecho de la tarjeta de la sede.
            </Step>
            <Step title="Actualiza los datos" number={3}>
              Cambia cualquier campo — nombre, dirección, barrio, teléfono, color o selección geográfica — luego haz clic en <strong>Guardar cambios</strong>.
            </Step>
          </Steps>

          <h2 id="eliminar-una-sede">Eliminar una sede</h2>
          <Steps>
            <Step title="Encuentra la sede" number={1}>
              En la lista de <strong>Sedes del Negocio</strong>, localiza la sede que deseas eliminar.
            </Step>
            <Step title="Haz clic en el botón de eliminar" number={2}>
              Selecciona el ícono de papelera en el lado derecho de la tarjeta de la sede. Aparecerá un cuadro de confirmación.
            </Step>
            <Step title="Confirma la eliminación" number={3}>
              Haz clic en <strong>Sí, eliminar</strong> para confirmar. La sede se elimina de todos los menús desplegables y filtros.
            </Step>
          </Steps>
          <Warning>
            Eliminar una sede no elimina ninguna cita existente que estuviera vinculada a ella. Esas citas permanecerán en el sistema pero ya no tendrán una sede asignada. Revisa y actualiza las citas afectadas después de eliminar una sede.
          </Warning>

          <h2 id="asignar-especialistas-a-una-sede">Asignar especialistas a una sede</h2>
          <p>Al agregar o editar un miembro del equipo, puedes asociar a un Especialista con una o más sedes. Esto ayuda a filtrar la Agenda por especialista y sede cuando tu equipo trabaja en diferentes sucursales.</p>
          <Note>
            La asignación de especialistas a sedes se gestiona a través de la sección <strong>Equipo</strong>. Consulta la guía de <a style={{cursor:'pointer'}} onClick={() => setPage('admin/team-management')}>Agregar y gestionar tu equipo</a> para más detalles.
          </Note>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ADMIN: AUDIT LOGS (ES)
    // -------------------------------------------------------------
    "admin/audit-logs": {
      id: "admin/audit-logs",
      title: "Revisa y monitorea la actividad del equipo en los registros de auditoría de Novagendas",
      description: "Usa el registro de auditoría de Novagendas para rastrear cada acción de creación, actualización y eliminación realizada por los miembros de tu equipo, con marcas de tiempo y atribución de usuario.",
      group: "Administración",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>El registro de auditoría te proporciona un historial completo y cronológico de cada acción significativa realizada dentro de tu cuenta de Novagendas. Cada vez que un miembro del equipo crea, actualiza o elimina un registro — ya sea un perfil de cliente, una cita, un pago o una cuenta de usuario — el sistema escribe una entrada con marca de tiempo en el registro.</p>
          <Note>
            El registro de auditoría es accesible solo para Administradores. Los miembros del equipo con el rol de Recepcionista o Especialista no ven esta sección.
          </Note>

          <h2 id="que-rastrea-el-registro-de-auditoria">Qué rastrea el registro de auditoría</h2>
          <p>Cada entrada en el registro de auditoría captura la siguiente información:</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Fecha y hora</strong></td>
                  <td>La marca de tiempo exacta de la acción (día, mes, año, horas, minutos)</td>
                </tr>
                <tr>
                  <td><strong>Usuario</strong></td>
                  <td>El nombre del miembro del equipo que realizó la acción</td>
                </tr>
                <tr>
                  <td><strong>Acción</strong></td>
                  <td>Uno de tres tipos: <code>CREATE</code>, <code>UPDATE</code> o <code>DELETE</code></td>
                </tr>
                <tr>
                  <td><strong>Entidad</strong></td>
                  <td>El tipo de registro que fue afectado (p. ej., <em>Cita</em>, <em>Cliente</em>, <em>Usuario</em>, <em>Sede</em>)</td>
                </tr>
                <tr>
                  <td><strong>Descripción</strong></td>
                  <td>Un resumen en lenguaje simple de lo que cambió (p. ej., <em>"Perfil de cliente actualizado: Ana Torres"</em>)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Las acciones están codificadas por colores para que puedas escanear el registro rápidamente:</p>
          <ul>
            <li><strong>CREATE</strong> — se agregó un nuevo registro</li>
            <li><strong>UPDATE</strong> — se modificó un registro existente</li>
            <li><strong>DELETE</strong> — se eliminó o desactivó un registro</li>
          </ul>

          <h2 id="ver-el-registro-de-auditoria">Ver el registro de auditoría</h2>
          <Steps>
            <Step title="Abre la sección Registro de Auditoría" number={1}>
              En el menú lateral, navega a <strong>Registro de Auditoría</strong> (etiquetado como <em>Movimientos y Auditoría</em> en la interfaz). El registro se carga automáticamente, ordenado del más reciente al más antiguo.
            </Step>
            <Step title="Navega por las entradas" number={2}>
              Desplázate por la tabla para revisar la actividad. Cada fila muestra la fecha, el usuario, la insignia de acción, la entidad afectada y una descripción del cambio.
            </Step>
            <Step title="Actualiza la vista" number={3}>
              Para cargar las entradas más recientes, haz clic en el botón <strong>Actualizar</strong> en la esquina superior derecha del registro.
            </Step>
          </Steps>

          <h2 id="por-que-importa-el-registro-de-auditoria">Por qué importa el registro de auditoría</h2>
          <CardGroup cols={3}>
            <Card title="Responsabilidad" icon="user-check">
              Cada acción está atribuida a un miembro específico del equipo, lo que facilita identificar quién hizo un cambio y cuándo.
            </Card>
            <Card title="Cumplimiento normativo" icon="shield-check">
              Los negocios de salud y servicios estéticos a menudo están sujetos a requisitos de manejo de datos. El registro de auditoría proporciona un historial de actividad listo para usar.
            </Card>
            <Card title="Solución de problemas" icon="magnifying-glass">
              Cuando algo no cuadra — un registro eliminado, un cambio inesperado — el registro de auditoría te permite rastrear exactamente qué sucedió y revertirlo manualmente si es necesario.
            </Card>
          </CardGroup>

          <h2 id="escenarios-comunes-auditoria">Escenarios comunes</h2>
          <AccordionGroup>
            <Accordion title="Un registro de cliente fue eliminado inesperadamente">
              Filtra o desplázate por el registro y busca una entrada <code>DELETE</code> con la entidad <strong>Cliente</strong>. La descripción nombrará al cliente, y la columna <strong>Usuario</strong> mostrará quién eliminó el registro y a qué hora.
            </Accordion>
            <Accordion title="Una cita fue modificada sin mi conocimiento">
              Busca una entrada <code>UPDATE</code> con la entidad <strong>Cita</strong>. La descripción describirá qué cambió, y la marca de tiempo confirmará cuándo ocurrió.
            </Accordion>
            <Accordion title="Se agregó un nuevo miembro del equipo a la cuenta">
              Busca una entrada <code>CREATE</code> con la entidad <strong>Usuario</strong>. La descripción incluirá el nombre del nuevo usuario y el Administrador que creó la cuenta.
            </Accordion>
            <Accordion title="Una sede o servicio fue modificado">
              Busca entradas <code>UPDATE</code> o <code>CREATE</code> con la entidad <strong>Sede</strong> o <strong>Servicio</strong> para revisar los cambios de configuración.
            </Accordion>
          </AccordionGroup>
          <Tip>
            Haz de la revisión del registro de auditoría parte de tu rutina regular de administración — un escaneo semanal rápido puede detectar eliminaciones accidentales o cambios no autorizados antes de que se conviertan en problemas.
          </Tip>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ADMIN: HOLIDAYS (ES)
    // -------------------------------------------------------------
    "admin/holidays": {
      id: "admin/holidays",
      title: "Bloquea festivos y días no disponibles en el calendario",
      description: "Marca fechas específicas como festivos, no disponibles o en mantenimiento en Novagendas para que esos días aparezcan claramente en la Agenda y puedan prevenir nuevas reservas.",
      group: "Administración",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>La función de <strong>Días Bloqueados</strong> te permite marcar fechas específicas del calendario como no disponibles para citas. Cuando una fecha está bloqueada, aparece resaltada en el calendario de la Agenda para que todo tu equipo pueda ver que no se deben hacer nuevas reservas ese día. Úsala para festivos, períodos de vacaciones de la clínica, días de capacitación del personal o mantenimiento programado.</p>
          <Note>
            Solo los Administradores y usuarios con el permiso <strong>Editar Días Bloqueados</strong> pueden agregar o eliminar fechas bloqueadas. Los demás miembros del equipo pueden ver los días bloqueados en el calendario pero no pueden modificarlos.
          </Note>

          <h2 id="tipos-de-bloqueo">Tipos de bloqueo</h2>
          <p>Novagendas admite tres tipos de días bloqueados, cada uno mostrado con un color distinto en el calendario:</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Color</th>
                  <th>Uso típico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Día Feriado</strong></td>
                  <td>Rojo</td>
                  <td>Festivos nacionales o locales</td>
                </tr>
                <tr>
                  <td><strong>No Disponible</strong></td>
                  <td>Ámbar</td>
                  <td>Períodos de vacaciones, días de ausencia del personal</td>
                </tr>
                <tr>
                  <td><strong>Mantenimiento</strong></td>
                  <td>Morado</td>
                  <td>Mantenimiento de instalaciones, renovaciones, días de limpieza profunda</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="bloquear-una-fecha">Bloquear una fecha</h2>
          <Steps>
            <Step title="Abre el calendario de Días Bloqueados" number={1}>
              En el menú lateral, navega a <strong>Días Bloqueados</strong> (o accédelo desde tu <strong>Perfil</strong> si tu rol tiene el permiso correspondiente). La vista del calendario mensual se carga con las fechas bloqueadas existentes resaltadas.
            </Step>
            <Step title="Navega al mes correcto" number={2}>
              Usa las flechas <strong>‹</strong> y <strong>›</strong> para moverte entre meses hasta llegar a la fecha que deseas bloquear.
            </Step>
            <Step title="Haz clic en la fecha" number={3}>
              Haz clic en cualquier fecha futura no bloqueada en la cuadrícula del calendario. Se abrirá un cuadro de diálogo para esa fecha.
            </Step>
            <Step title="Elige un tipo de bloqueo" number={4}>
              <p>Selecciona uno de los tres tipos del menú desplegable <strong>Tipo de bloqueo</strong>:</p>
              <ul>
                <li><strong>Feriado</strong> — para festivos nacionales o locales</li>
                <li><strong>No Disponible</strong> — para cierres planificados o vacaciones</li>
                <li><strong>Mantenimiento</strong> — para tiempo de inactividad operativa</li>
              </ul>
            </Step>
            <Step title="Ingresa un motivo" number={5}>
              Escribe una descripción corta en el campo <strong>Motivo</strong> (p. ej., <em>Festivo Nacional</em>, <em>Cierre por Semana Santa</em>, <em>Mantenimiento de equipos</em>). Este texto aparece en el tooltip del calendario y en la barra lateral de días bloqueados próximos.
            </Step>
            <Step title="Confirma el bloqueo" number={6}>
              Haz clic en <strong>Bloquear día</strong>. La fecha cambia inmediatamente al color del tipo de bloqueo seleccionado en el calendario, y un indicador de punto lo marca para todos los usuarios que ven la Agenda.
            </Step>
          </Steps>

          <h2 id="como-aparecen-los-dias-bloqueados-en-la-agenda">Cómo aparecen los días bloqueados en la Agenda</h2>
          <p>Una vez que una fecha está bloqueada, cualquier miembro del equipo que abra la Agenda o el calendario de Días Bloqueados la verá resaltada con el color del tipo de bloqueo. Pasar el cursor o hacer clic en una fecha bloqueada muestra el tipo de bloqueo y el motivo que ingresaste.</p>
          <p>Un panel de <strong>Próximos días bloqueados</strong> en el lado derecho del calendario lista las próximas fechas bloqueadas en orden cronológico, para que tu equipo siempre tenga una vista rápida de los próximos cierres.</p>
          <Warning>
            Bloquear una fecha no cancela automáticamente ni notifica a los clientes sobre las citas existentes ese día. Antes de confirmar un bloqueo, haz clic en la fecha para revisar una lista de citas ya agendadas — luego contacta a esos clientes para reprogramar.
          </Warning>

          <h2 id="revisar-las-citas-afectadas-antes-de-bloquear">Revisar las citas afectadas antes de bloquear</h2>
          <p>Cuando haces clic en una fecha que ya tiene citas agendadas, Novagendas te muestra una lista de cada cita afectada, incluyendo:</p>
          <ul>
            <li>Nombre del cliente</li>
            <li>Hora de la cita</li>
            <li>Servicio(s) reservado(s)</li>
            <li>Especialista asignado</li>
            <li>Número de teléfono del cliente</li>
          </ul>
          <p>Usa esta información para contactar a cada cliente y reprogramar antes de finalizar el bloqueo.</p>

          <h2 id="eliminar-un-dia-bloqueado">Eliminar un día bloqueado</h2>
          <Steps>
            <Step title="Haz clic en la fecha bloqueada" number={1}>
              En el calendario, haz clic en la fecha resaltada que deseas desbloquear. El panel de detalles se abre, mostrando el tipo de bloqueo, el motivo y las citas afectadas.
            </Step>
            <Step title="Haz clic en Desbloquear día" number={2}>
              Selecciona el botón <strong>Desbloquear día</strong> en la parte inferior del panel de detalles.
            </Step>
            <Step title="Confirma" number={3}>
              La fecha vuelve a su estado normal en el calendario y está disponible para nuevas reservas de inmediato.
            </Step>
          </Steps>

          <h2 id="consejos-escenarios-comunes-bloqueos">Consejos para escenarios comunes</h2>
          <AccordionGroup>
            <Accordion title="Bloquear festivos nacionales">
              Usa el tipo <strong>Feriado</strong> e ingresa el nombre oficial del festivo como motivo (p. ej., <em>Día de la Independencia</em>). Bloquea los festivos nacionales al inicio de cada año para que todo el equipo tenga visibilidad para la planificación.
            </Accordion>
            <Accordion title="Bloquear un período de vacaciones">
              Bloquea cada día del período de vacaciones individualmente usando el tipo <strong>No Disponible</strong>. Ingresa el mismo motivo para cada día (p. ej., <em>Vacaciones de fin de año</em>) para que el contexto sea claro en la barra lateral del calendario.
            </Accordion>
            <Accordion title="Programar días de mantenimiento">
              Usa el tipo <strong>Mantenimiento</strong> con un motivo específico (p. ej., <em>Mantenimiento de equipos láser</em>). Primero verifica si hay citas existentes y reprogramalas antes de bloquear.
            </Accordion>
          </AccordionGroup>
          <Tip>
            Bloquea los festivos y fechas de cierre conocidas con anticipación. Los clientes y el personal que revisan la Agenda verán de inmediato que ciertas fechas no están disponibles, reduciendo las solicitudes de reprogramación de último momento.
          </Tip>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ACCOUNT: LOGIN (ES)
    // -------------------------------------------------------------
    "account/login": {
      id: "account/login",
      title: "Inicia sesión y accede a tu cuenta de negocio en Novagendas",
      description: "Accede a tu espacio de trabajo de Novagendas iniciando sesión en el subdominio de tu negocio. Cubre la duración de la sesión, solución de problemas y cómo recuperar el acceso.",
      group: "Cuenta",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Cada negocio en Novagendas tiene su propia página de inicio de sesión dedicada en un subdominio único. No inicias sesión a través de un portal compartido — vas directamente a la URL de tu clínica e inicias sesión desde allí. Esto mantiene los datos y el acceso de cada negocio separados.</p>

          <h2 id="tu-url-de-inicio-de-sesion">Tu URL de inicio de sesión</h2>
          <p>Tu dirección de inicio de sesión sigue este formato:</p>
          <pre><code>tunegocio.novagendas.com</code></pre>
          <p>Tu Administrador puede decirte el subdominio exacto de tu negocio. Asegúrate de visitar el subdominio correcto — iniciar sesión en la URL de otro negocio no funcionará aunque tengas credenciales válidas.</p>
          <Note>
            Guardar en favoritos la página de inicio de sesión de tu negocio es la forma más fácil de volver a ella rápidamente.
          </Note>

          <h2 id="iniciar-sesion">Iniciar sesión</h2>
          <Steps>
            <Step title="Abre la página de inicio de sesión de tu negocio" number={1}>
              Navega a <code>tunegocio.novagendas.com</code> en tu navegador. Verás la tarjeta de inicio de sesión de Novagendas con el nombre de tu negocio.
            </Step>
            <Step title="Ingresa tu correo electrónico" number={2}>
              Escribe la dirección de correo electrónico asociada a tu cuenta de Novagendas en el campo <strong>Correo</strong>.
            </Step>
            <Step title="Ingresa tu contraseña" number={3}>
              Escribe tu contraseña en el campo <strong>Contraseña</strong>. Haz clic en el ícono de ojo para mostrar u ocultar los caracteres mientras escribes.
            </Step>
            <Step title="Haz clic en Iniciar sesión" number={4}>
              Haz clic en <strong>Iniciar Sesión</strong>. Si tus credenciales son correctas, serás llevado directamente a tu panel.
            </Step>
          </Steps>

          <h2 id="duracion-de-la-sesion">Duración de la sesión</h2>
          <p>Tu sesión dura <strong>24 horas</strong>. Después de eso, se cerrará tu sesión automáticamente y se te pedirá que inicies sesión nuevamente. Esto aplica incluso si no has cerrado tu navegador.</p>
          <Tip>
            Si estás en un computador compartido o público, cierra sesión manualmente cuando termines para proteger tu cuenta.
          </Tip>

          <h2 id="solucion-de-problemas-login">Solución de problemas</h2>
          <AccordionGroup>
            <Accordion title="Olvidé mi contraseña">
              Haz clic en <strong>¿Olvidaste tu contraseña?</strong> en la página de inicio de sesión. Se te guiará a través de un proceso de restablecimiento — ingresa tu dirección de correo y revisa tu bandeja de entrada para encontrar un enlace de restablecimiento. Consulta la guía de <a style={{cursor:'pointer'}} onClick={() => setPage('account/password-reset')}>Restablecer tu contraseña de Novagendas</a> para los pasos completos.
            </Accordion>
            <Accordion title="Mis credenciales no están funcionando">
              Verifica que estás en el subdominio correcto para tu negocio y que el correo y la contraseña que ingresas son correctos. Si el error persiste, tu cuenta puede estar inactiva o puede que no estés asociado con este negocio. Contacta a tu Administrador para verificar el estado de tu cuenta.
            </Accordion>
            <Accordion title="No sé mi URL de inicio de sesión">
              Pídele a tu Administrador el subdominio de tu negocio. La URL tiene la forma <code>tunegocio.novagendas.com</code>. No hay una página de inicio de sesión compartida en <code>novagendas.com</code> — cada negocio tiene la suya.
            </Accordion>
          </AccordionGroup>
          <Warning>
            Cada negocio tiene una URL de inicio de sesión única. No intentes iniciar sesión en una dirección genérica de <code>novagendas.com</code> — debes usar el subdominio específico de tu negocio.
          </Warning>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ACCOUNT: PASSWORD RESET (ES)
    // -------------------------------------------------------------
    "account/password-reset": {
      id: "account/password-reset",
      title: "Recupera el acceso restableciendo tu contraseña de Novagendas",
      description: "Recupera el acceso a tu cuenta de Novagendas solicitando un enlace de restablecimiento de contraseña. Incluye qué hacer si no recibes el correo o el enlace ha expirado.",
      group: "Cuenta",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Si olvidaste tu contraseña o necesitas establecer una nueva, Novagendas puede enviarte un enlace de restablecimiento a la dirección de correo de tu cuenta. El proceso completo toma solo unos minutos, y podrás volver a tu espacio de trabajo tan pronto como guardes tu nueva contraseña.</p>

          <h2 id="antes-de-comenzar-reset">Antes de comenzar</h2>
          <p>El correo de restablecimiento se envía a la dirección registrada en tu cuenta. Asegúrese de que tu cuenta tenga una dirección de correo válida configurada. Si no estás seguro, o si no hay ningún correo registrado, pídele a tu Administrador que verifique y actualice los datos de tu cuenta antes de proceder.</p>

          <h2 id="restablecer-tu-contrasena">Restablecer tu contraseña</h2>
          <Steps>
            <Step title="Abre la página de inicio de sesión y haz clic en ¿Olvidaste tu contraseña?" number={1}>
              Ve a la página de inicio de sesión de tu negocio en <code>tunegocio.novagendas.com</code>. Debajo del campo de Contraseña, haz clic en <strong>¿Olvidaste tu contraseña?</strong>
            </Step>
            <Step title="Ingresa tu dirección de correo electrónico" number={2}>
              En la pantalla de recuperación de contraseña, ingresa la dirección de correo electrónico asociada a tu cuenta de Novagendas y haz clic en <strong>Enviar enlace de restablecimiento</strong>.
            </Step>
            <Step title="Revisa tu bandeja de entrada" number={3}>
              Verás una pantalla de confirmación indicándote que revises tu correo. Abre el mensaje de Novagendas — contiene un enlace para restablecer tu contraseña. El correo puede tardar unos minutos en llegar.
            </Step>
            <Step title="Haz clic en el enlace de restablecimiento" number={4}>
              Haz clic en el enlace del correo. Serás llevado a la página <strong>Nueva Contraseña</strong> dentro de Novagendas. El enlace es de un solo uso y tiene límite de tiempo — si no funciona, inicia el proceso nuevamente.
            </Step>
            <Step title="Establece tu nueva contraseña" number={5}>
              Ingresa tu nueva contraseña en el campo <strong>Nueva Contraseña</strong>. Un indicador de fortaleza mostrará si tu contraseña es Débil, Regular, Buena o Fuerte — apunta a al menos Buena. Luego ingresa la misma contraseña en <strong>Confirmar Contraseña</strong> y haz clic en <strong>Guardar nueva contraseña</strong>.
            </Step>
            <Step title="Inicia sesión con tu nueva contraseña" number={6}>
              Una vez guardada, serás redirigido a la página de inicio de sesión. Inicia sesión usando tu correo y la nueva contraseña que acabas de crear.
            </Step>
          </Steps>
          <Tip>
            Una contraseña segura incluye al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.
          </Tip>

          <h2 id="si-no-recibes-el-correo">Si no recibes el correo</h2>
          <AccordionGroup>
            <Accordion title="Revisa tu carpeta de spam o correo no deseado">
              Los correos de restablecimiento a veces son filtrados como spam. Revisa tu carpeta de spam o correo no deseado y marca el mensaje como no spam si lo encuentras ahí.
            </Accordion>
            <Accordion title="Asegúrate de haber usado la dirección de correo correcta">
              El enlace de restablecimiento se envía solo al correo registrado en tu cuenta. Si ingresaste una dirección diferente, inicia el proceso nuevamente con tu correo correcto.
            </Accordion>
            <Accordion title="Mi cuenta no tiene dirección de correo electrónico">
              El restablecimiento de contraseña requiere una dirección de correo válida en tu cuenta. Si tu cuenta no tiene una configurada, no recibirás el correo de restablecimiento. Contacta a tu Administrador y pídele que agregue o corrija tu dirección de correo, luego inténtalo de nuevo.
            </Accordion>
            <Accordion title="El enlace de restablecimiento no funciona">
              Los enlaces de restablecimiento expiran después de un período corto y solo pueden usarse una vez. Si el enlace muestra un error, regresa a tu página de inicio de sesión y haz clic nuevamente en <strong>¿Olvidaste tu contraseña?</strong> para solicitar uno nuevo.
            </Accordion>
          </AccordionGroup>
          <Note>
            Si aún no puedes recuperar el acceso después de seguir estos pasos, contacta a tu Administrador. Pueden verificar el estado de tu cuenta y tu dirección de correo electrónico.
          </Note>
        </div>
      )
    },
    // -------------------------------------------------------------
    // ACCOUNT: PROFILE (ES)
    // -------------------------------------------------------------
    "account/profile": {
      id: "account/profile",
      title: "Edita tu perfil y datos de cuenta en Novagendas",
      description: "Edita tu nombre, dirección de correo electrónico, foto de perfil y contraseña desde tu página de perfil de Novagendas. Aprende qué puedes y no puedes cambiar sin ayuda del Administrador.",
      group: "Cuenta",
      lang: "es",
      content: (setPage) => (
        <div className="doc-body">
          <p>Tu página de perfil es donde gestionas tu información personal, actualizas tu foto y cambias tu contraseña. Cualquier cambio que realices aquí aplica solo a tu propia cuenta — tu rol y la configuración del negocio son gestionados por separado por tu Administrador.</p>

          <h2 id="abre-tu-perfil">Abre tu perfil</h2>
          <p>Haz clic en tu nombre o avatar en el menú lateral izquierdo. Esto abre tu página de perfil, que está organizada en secciones colapsables. Haz clic en cualquier encabezado de sección para expandirlo.</p>

          <h2 id="edita-tu-informacion-personal">Edita tu información personal</h2>
          <p>Expande la sección <strong>Información Personal</strong> para actualizar los datos de tu cuenta.</p>
          <Steps>
            <Step title="Actualiza tu nombre" number={1}>
              Edita los campos <strong>Nombre</strong> y <strong>Apellido</strong> con tu nombre actual.
            </Step>
            <Step title="Actualiza tu dirección de correo electrónico" number={2}>
              Ingresa una nueva dirección de correo en el campo <strong>Correo</strong>. Esta es la dirección que se usa para identificar tu cuenta y recibir correos de restablecimiento de contraseña, así que asegúrate de que esté actualizada y sea accesible.
            </Step>
            <Step title="Guarda los cambios" number={3}>
              Haz clic en <strong>Actualizar Perfil</strong>. Aparecerá un mensaje de confirmación en la parte superior de la página una vez que los cambios se hayan guardado.
            </Step>
          </Steps>
          <Note>
            Tu <strong>número de cédula</strong> está bloqueado y no se puede editar desde tu perfil. Si necesita ser corregido, contacta a tu Administrador.
          </Note>

          <h2 id="cambia-tu-foto-de-perfil">Cambia tu foto de perfil</h2>
          <p>Tu foto aparece en el menú lateral y en tu tarjeta de perfil. Para cambiarla:</p>
          <Steps>
            <Step title="Abre la sección Mi Perfil" number={1}>
              Expande la sección <strong>Mi Perfil</strong> en la parte superior de tu página de perfil. Verás tu foto actual o tus iniciales si no se ha configurado ninguna foto.
            </Step>
            <Step title="Haz clic en tu avatar" number={2}>
              Haz clic directamente en tu foto o iniciales. Se abrirá un selector de archivos.
            </Step>
            <Step title="Selecciona una imagen" number={3}>
              Elige un archivo de imagen desde tu dispositivo. Los formatos admitidos incluyen JPEG, PNG y otros tipos de imagen comunes. El tamaño máximo del archivo es <strong>15 MB</strong>.
            </Step>
          </Steps>
          <p>Tu nueva foto se guarda de inmediato — no necesitas hacer clic en un botón de guardar por separado. Se actualizará en el menú lateral enseguida.</p>
          <Tip>
            Para mejores resultados, usa una imagen cuadrada o una que sea aproximadamente igual en ancho y alto. Novagendas redimensiona las fotos automáticamente, pero un recorte cuadrado evita recortes inesperados.
          </Tip>

          <h2 id="cambia-tu-contrasena">Cambia tu contraseña</h2>
          <p>Expande la sección <strong>Seguridad</strong> para actualizar tu contraseña. Necesitarás conocer tu contraseña actual para hacer un cambio.</p>
          <Steps>
            <Step title="Ingresa tu contraseña actual" number={1}>
              Escribe tu contraseña existente en el campo <strong>Contraseña Actual</strong>.
            </Step>
            <Step title="Ingresa tu nueva contraseña" number={2}>
              Escribe tu nueva contraseña en el campo <strong>Nueva Contraseña</strong>. Debe tener al menos 6 caracteres.
            </Step>
            <Step title="Confirma tu nueva contraseña" number={3}>
              Vuelve a ingresar la nueva contraseña en el campo <strong>Confirmar Nueva Contraseña</strong>. Ambas entradas deben coincidir exactamente.
            </Step>
            <Step title="Guarda el cambio" number={4}>
              Haz clic en <strong>Cambiar Contraseña</strong>. Si todo es correcto, verás un mensaje de éxito. Usa tu nueva contraseña la próxima vez que inicies sesión.
            </Step>
          </Steps>
          <Warning>
            Si no recuerdas tu contraseña actual, no puedes cambiarla desde esta página. Usa el <a style={{cursor:'pointer'}} onClick={() => setPage('account/password-reset')}>flujo de restablecimiento de contraseña</a> en su lugar, que envía un enlace de restablecimiento a tu correo registrado.
          </Warning>

          <h2 id="cerrar-sesion">Cerrar sesión</h2>
          <p>Para cerrar sesión en tu cuenta, expande la sección <strong>Mi Perfil</strong> y haz clic en <strong>Cerrar Sesión</strong> en la parte inferior de la tarjeta. Serás redirigido de inmediato a la página de inicio de sesión de tu negocio.</p>

          <h2 id="que-no-puedes-cambiar-desde-tu-perfil">Qué no puedes cambiar desde tu perfil</h2>
          <AccordionGroup>
            <Accordion title="Tu rol">
              Tu rol — Administrador, Especialista o Recepcionista — controla a qué puedes acceder en Novagendas. Los roles son asignados por tu Administrador y no pueden cambiarse desde tu página de perfil. Contacta a tu Administrador si tu rol necesita ser actualizado.
            </Accordion>
            <Accordion title="Tu número de cédula">
              El campo de Cédula es de solo lectura. Si esta información es incorrecta, pídele a tu Administrador que lo actualice.
            </Accordion>
          </AccordionGroup>
        </div>
      )
    }
  };

  // ==========================================
  // Client-Side Search Engine
  // ==========================================
  
  // Search index built statically with rich text snippets
  const searchIndex = [
    { id: 'introduction', title: 'Introducción', group: 'Comenzar', desc: 'Qué es Novagendas, multi-tenant, subdominios', text: 'plataforma web de gestión de citas clínicas estéticas spas salud interna subdominio' },
    { id: 'quickstart', title: 'Primeros Pasos', group: 'Comenzar', desc: 'Guía rápida de inicio, servicios, agenda', text: 'iniciar sesion administrador especialista recepcionista cita google calendar configurar' },
    { id: 'roles-and-permissions', title: 'Roles y Permisos', group: 'Comenzar', desc: 'Resumen de roles de acceso, usuarios', text: 'administrador recepcionista especialista perfil citas inventario reportes de auditoria permisos' },
    { id: 'features/agenda', title: 'Agenda y Citas', group: 'Funcionalidades Principales', desc: 'Calendario interactivo, arrastrar y soltar', text: 'vista dia semana mes citas clientes especialistas productos abonos cancelar imprimir recibo' },
    { id: 'features/clients', title: 'Clientes', group: 'Funcionalidades Principales', desc: 'Registros clínicos, ficha, historial', text: 'aperturar paciente habeas data consentimiento cédula buscar evolución nota clínica firmar archivar' },
    { id: 'features/services', title: 'Servicios', group: 'Funcionalidades Principales', desc: 'Catálogo de servicios, duraciones, precios', text: 'procedimientos categoría duracion precio base color cop inyectables aparatologia habilitar' },
    { id: 'features/payments', title: 'Pagos', group: 'Funcionalidades Principales', desc: 'Libro de transacciones financieras, abonos', text: 'depósito cobro efectivo tarjeta transferencia nequi daviplata abonos cuota saldo pendiente' },
    { id: 'features/inventory', title: 'Inventario', group: 'Funcionalidades Principales', desc: 'Insumos, existencias, alertas stock bajo', text: 'productos stock minimo critico alerta lote valor unitario consumo manual habilitar' },
    { id: 'features/statistics', title: 'Estadísticas', group: 'Funcionalidades Principales', desc: 'Reportes e informes de rendimiento', text: 'kpis citas ingresos pacientes servicios pagos inventario graficos barras excel exportar' },
    { id: 'integrations/google-calendar', title: 'Google Calendar', group: 'Integraciones', desc: 'Sincronizar citas con Google Calendar', text: 'conectar correo recordatorios invitacion asistentes sincroniza zona horaria bogota error' },
    { id: 'integrations/whatsapp-bot', title: 'Bot de WhatsApp', group: 'Integraciones', desc: 'Agendamiento automatizado por chat', text: 'whatsapp business meta facebook catalogo precios turnos nequi bre-b notificaciones fallas' },
    { id: 'admin/team-management', title: 'Gestión de Equipo', group: 'Administración', desc: 'Crear personal, roles, desactivar usuarios', text: 'equipo usuarios modulos permitidos contraseña perfil credenciales activo inactivo' },
    { id: 'admin/locations', title: 'Sedes', group: 'Administración', desc: 'Sucursales físicas del negocio, colores', text: 'local sucursal pais departamento ciudad direccion barrio telefono etiqueta' },
    { id: 'admin/audit-logs', title: 'Auditoría', group: 'Administración', desc: 'Historial de movimientos y logs de equipo', text: 'registro auditoria create update delete marca tiempo usuario descripcion' },
    { id: 'admin/holidays', title: 'Días Bloqueados', group: 'Administración', desc: 'Feriados, vacaciones, mantenimiento calendario', number: 15, text: 'bloquear fecha motivo vacaciones feriado no disponible desbloquear citas afectadas' },
    { id: 'account/login', title: 'Iniciar Sesión', group: 'Cuenta', desc: 'Logueo de usuarios en subdominios', text: 'credenciales duracion sesion 24 horas contraseña favoritos recuperar link url' },
    { id: 'account/password-reset', title: 'Restablecer Contraseña', group: 'Cuenta', desc: 'Recuperación de clave por correo', text: 'correo enlace bandeja spam expiracion fortaleza clave' },
    { id: 'account/profile', title: 'Perfil de Usuario', group: 'Cuenta', desc: 'Configuración personal, foto, clave', text: 'avatar cambiar contraseña correo cedula rol cerrar sesion' },
    { id: 'index', title: 'Welcome / Overview', group: 'English Portal', desc: 'General features of Novagendas and quick start guide', text: 'appointment aesthetic clinics scheduling records dashboard inventory location log activity audit' }
  ];


  // Parse headings + set up IntersectionObserver scroll spy for TOC
  useEffect(() => {
    if (!contentRef.current) return;

    // Disconnect previous observer
    if (observerRef.current) observerRef.current.disconnect();

    const headingElements = contentRef.current.querySelectorAll('h2, h3');
    const parsedHeadings = Array.from(headingElements).map((el: any) => ({
      id: el.id || el.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      text: el.textContent,
      level: parseInt(el.tagName.substring(1))
    }));

    // Assign IDs to DOM elements if they don't have one
    headingElements.forEach((el: any, idx) => {
      if (!el.id && parsedHeadings[idx]) {
        el.id = parsedHeadings[idx].id;
      }
    });

    setHeadings(parsedHeadings);
    if (parsedHeadings.length > 0) setActiveHeading(parsedHeadings[0].id);

    // Scroll spy: highlight the heading closest to the top of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // Find entries that are intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveHeading(visible[0].target.id);
        }
      },
      {
        rootMargin: '-60px 0px -70% 0px',
        threshold: 0
      }
    );

    headingElements.forEach(el => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [activePage]);

  // Deep linking: read from window.location.hash on load and state changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && pagesDb[hash]) {
        setActivePage(hash);
        // Scroll to top
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changePage = (pageId: string) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Find next/prev pages for navigation footer
  const currentPageIdx = flatPages.findIndex(p => p.id === activePage);
  const prevPage = currentPageIdx > 0 ? flatPages[currentPageIdx - 1] : null;
  const nextPage = currentPageIdx < flatPages.length - 1 ? flatPages[currentPageIdx + 1] : null;

  const currentPageData = pagesDb[activePage] || pagesDb['introduction'];

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <div className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <img 
            className="brand-logo" 
            src="https://media.brand.dev/0301ad28-baa3-4afb-a235-cdc96ad72116.jpg" 
            alt="Novagendas Logo"
          />
          <span className="brand-name">Novagendas</span>
        </div>



        <nav className="sidebar-nav">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="nav-group">
              <div className="nav-group-title">{group.title}</div>
              {group.pages.map((page) => (
                <div
                  key={page.id}
                  className={`nav-item ${activePage === page.id ? 'active' : ''}`}
                  onClick={() => changePage(page.id)}
                >
                  {page.title}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href="https://novagendas.com" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button className="sidebar-footer-btn">
              Ir a la Aplicación ➔
            </button>
          </a>
        </div>
      </div>

      {/* Hamburger Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${isMobileOpen ? 'mobile-open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* Main Layout Area */}
      <div className="main-layout">
        {/* Top Header */}
        <header className="top-header">
          <button 
            className="mobile-menu-trigger"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          
          <div className="breadcrumbs">
            <span className="breadcrumb-root">Documentación</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-root">{currentPageData.group}</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-active">{currentPageData.title}</span>
          </div>


        </header>

        {/* Content Portal Grid */}
        <div className="content-wrapper">
          {/* Main Doc Content Body */}
          <main className="doc-content" ref={contentRef}>
            <h1 className="doc-title">{currentPageData.title}</h1>
            <p className="doc-description">{currentPageData.description}</p>
            <div className="doc-divider"></div>
            
            {/* Dynamically loads transcribed React TSX nodes */}
            {currentPageData.content(changePage)}

            {/* Pagination Footer */}
            <div className="page-nav-footer">
              {prevPage ? (
                <div className="page-nav-btn prev" onClick={() => changePage(prevPage.id)}>
                  <span className="nav-label">Anterior</span>
                  <span className="nav-page-title">◀ {prevPage.title}</span>
                </div>
              ) : <div></div>}
              {nextPage ? (
                <div className="page-nav-btn next" onClick={() => changePage(nextPage.id)}>
                  <span className="nav-label">Siguiente</span>
                  <span className="nav-page-title">{nextPage.title} ▶</span>
                </div>
              ) : <div></div>}
            </div>
          </main>

          {/* Floating Table of Contents Sidebar */}
          <aside className="toc-sidebar">
            {headings.length > 0 && (
              <>
                <div className="toc-title">En esta página</div>
                <ul className="toc-list">
                  {headings.map((h, index) => (
                    <li
                      key={index}
                      className={`toc-item ${h.level === 3 ? 'level-3' : ''} ${activeHeading === h.id ? 'active' : ''}`}
                      onClick={() => {
                        const el = document.getElementById(h.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          setActiveHeading(h.id);
                        }
                      }}
                    >
                      {h.text}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
