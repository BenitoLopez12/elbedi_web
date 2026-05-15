import { useEffect, useState } from "react";
import LimitContainer from "@/components/common/LimitContainer.jsx";

const defaultLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#services" },
  { label: "Portafolio", href: "#portfolio" },
  { label: "Planes y Precios", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];

const defaultSocials = [
  { label: "Facebook", href: "#", icon: "/images/icons/facebook.svg" },
  { label: "Instagram", href: "#", icon: "/images/icons/instagram.svg" },
  { label: "TikTok", href: "#", icon: "/images/icons/tiktok.svg" },
  { label: "LinkedIn", href: "#", icon: "/images/icons/linkedin.svg" },
  { label: "WhatsApp", href: "#", icon: "/images/icons/whatsapp.svg" },
];

const legalNotices = {
  privacy: {
    label: "Aviso de privacidad",
    updatedAt: "Última actualización: 13 de mayo de 2026",
    content: `ELBEDI, con operaciones en México y contacto a través del correo electrónico contact@elbedi.com, es responsable del uso, tratamiento y protección de los datos personales recopilados a través de este sitio web y de los servicios relacionados.

El presente Aviso de Privacidad tiene como finalidad informar cómo se recopilan, utilizan, almacenan y protegen los datos personales proporcionados por los usuarios, clientes y visitantes del sitio web.

1. DATOS PERSONALES RECOPILADOS

ELBEDI podrá recopilar información personal y técnica, incluyendo, de forma enunciativa más no limitativa:

Nombre completo
Nombre comercial o empresa
Correo electrónico
Número telefónico
WhatsApp
Dirección IP
Ciudad o país
Información de navegación
Datos del dispositivo y navegador
Información enviada mediante formularios
Información relacionada con solicitudes de servicio
Datos de facturación cuando sean necesarios
Cookies y tecnologías de seguimiento
Información estadística y analítica

Adicionalmente, en el futuro podrán recopilarse otros datos relacionados con herramientas digitales, automatizaciones, campañas, formularios, integraciones y plataformas utilizadas por ELBEDI.

2. FINALIDAD DEL USO DE DATOS

Los datos recopilados podrán utilizarse para:

Contactar a usuarios y clientes
Dar seguimiento a solicitudes y cotizaciones
Brindar soporte técnico y atención al cliente
Gestionar proyectos y servicios contratados
Procesar pagos y suscripciones
Enviar información relacionada con servicios
Mejorar la experiencia del usuario
Analizar métricas de rendimiento y comportamiento
Implementar herramientas analíticas y publicitarias
Cumplir obligaciones legales y contractuales
Proteger la seguridad del sitio web y los servicios

3. COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO

Este sitio web puede utilizar cookies, herramientas analíticas y tecnologías de terceros para recopilar información relacionada con navegación, comportamiento y rendimiento.

Entre las herramientas que pueden utilizarse se incluyen:

Google Analytics
Meta Pixel
Stripe
Herramientas de formularios
Plataformas publicitarias
Herramientas de automatización
Herramientas de chat y comunicación
Integraciones de video y contenido multimedia

Estas herramientas pueden recopilar información técnica y estadística para mejorar los servicios y la experiencia del usuario.

4. PROTECCIÓN DE DATOS

ELBEDI implementa medidas razonables de seguridad para proteger la información recopilada y evitar accesos no autorizados, pérdida, alteración o uso indebido de los datos.

Sin embargo, ningún sistema en internet puede garantizar seguridad absoluta.

5. TRANSFERENCIA DE DATOS

ELBEDI podrá compartir información con proveedores tecnológicos, plataformas de pago, servicios de hosting, herramientas analíticas y proveedores de soporte, únicamente cuando sea necesario para operar los servicios contratados.

ELBEDI no vende datos personales a terceros.

6. DERECHOS DEL USUARIO

Los usuarios podrán solicitar acceso, corrección, actualización o eliminación de sus datos personales enviando una solicitud al correo:

contact@elbedi.com

ELBEDI podrá solicitar información adicional para validar la identidad del solicitante.

7. CAMBIOS AL AVISO DE PRIVACIDAD

ELBEDI podrá modificar el presente Aviso de Privacidad en cualquier momento para adaptarlo a cambios legales, tecnológicos, operativos o comerciales.

Las modificaciones serán publicadas en este sitio web.`,
  },
  terms: {
    label: "Términos y condiciones",
    updatedAt: "Última actualización: 13 de mayo de 2026",
    content: `El acceso y uso de este sitio web implica la aceptación total de los presentes Términos y Condiciones.

Si el usuario no está de acuerdo con estos términos, deberá abstenerse de utilizar el sitio web y los servicios ofrecidos.

1. SOBRE LOS SERVICIOS

ELBEDI ofrece servicios relacionados con:

Diseño web
Desarrollo web
Mantenimiento de sitios web
Soporte técnico
Optimización y mejora continua
Diseño visual y experiencia digital
Automatización y herramientas digitales
Integraciones y soluciones web

Los servicios pueden variar según el plan contratado.

2. PLANES Y SUSCRIPCIONES

Algunos servicios funcionan bajo modalidad de suscripción mensual o anual.

Los planes incluyen permanencia mínima de 12 meses cuando así se especifique.

El incumplimiento de pagos podrá ocasionar:

Suspensión temporal del servicio
Limitación de acceso
Desactivación del sitio web
Cancelación de servicios relacionados

ELBEDI se reserva el derecho de suspender servicios por falta de pago.

3. PROPIEDAD DEL SITIO WEB

Los sitios web desarrollados por ELBEDI permanecerán bajo administración y control operativo de ELBEDI durante el periodo activo del servicio.

La propiedad y entrega de archivos finales podrá realizarse únicamente cuando:

El cliente haya cumplido el periodo mínimo contratado
No existan adeudos pendientes
El cliente solicite formalmente la entrega
No exista incumplimiento de términos y condiciones

ELBEDI se reserva el derecho de negar la entrega de archivos en casos de incumplimiento contractual, fraude, uso indebido o adeudos pendientes.

4. LIMITACIONES DEL SOPORTE

El soporte técnico se proporciona únicamente dentro del alcance del plan contratado.

Los tiempos de respuesta pueden variar dependiendo de:

Disponibilidad operativa
Días hábiles
Nivel de prioridad
Complejidad de la solicitud

El soporte se brinda mediante:

WhatsApp
Correo electrónico
Llamadas en línea
Plataformas de videollamadas

ELBEDI podrá limitar o rechazar solicitudes consideradas excesivas, abusivas, fuera del alcance contratado o técnicamente inviables.

5. CAMBIOS Y ACTUALIZACIONES

Los planes pueden incluir ajustes, mejoras o actualizaciones periódicas.

No se consideran cambios incluidos:

Rediseños completos
Reconstrucciones totales
Nuevos sistemas complejos
Funcionalidades avanzadas no contempladas originalmente
Solicitudes fuera del alcance contratado

ELBEDI podrá cotizar por separado solicitudes adicionales.

6. OBLIGACIONES DEL CLIENTE

El cliente se compromete a:

Proporcionar información y contenido necesario
Entregar materiales en tiempo razonable
Mantener comunicación activa
No utilizar el sitio para actividades ilegales o fraudulentas
No utilizar los servicios para distribuir malware, spam o contenido dañino
No infringir derechos de terceros

Los retrasos ocasionados por falta de contenido, respuestas tardías o incumplimientos del cliente podrán modificar tiempos de entrega sin responsabilidad para ELBEDI.

7. TIEMPOS DE ENTREGA

Los tiempos estimados de entrega pueden variar dependiendo de:

Complejidad del proyecto
Disponibilidad de contenido
Cambios solicitados
Tiempo de respuesta del cliente

ELBEDI no será responsable por retrasos ocasionados por:

Falta de información
Cambios excesivos
Solicitudes fuera del alcance original
Retrasos del cliente
Problemas externos o servicios de terceros

8. LIMITACIÓN DE RESPONSABILIDAD

ELBEDI no garantiza resultados comerciales específicos, posicionamiento en buscadores, incremento de ventas o resultados financieros derivados del uso del sitio web.

ELBEDI no será responsable por:

Caídas de servicios de terceros
Problemas de proveedores externos
Ataques informáticos
Fallos de internet
Interrupciones ajenas a su control
Pérdida indirecta de ingresos
Problemas ocasionados por modificaciones externas realizadas por terceros

9. USO INDEBIDO

ELBEDI podrá suspender o cancelar servicios si detecta:

Actividades ilegales
Fraude
Spam
Abuso de soporte
Uso ofensivo o amenazante hacia el equipo
Uso indebido de plataformas o herramientas
Incumplimientos de pago

10. PROPIEDAD INTELECTUAL

Todo el contenido, diseño, estructura, elementos visuales y materiales desarrollados por ELBEDI podrán estar protegidos por derechos de autor y propiedad intelectual.

No podrán ser revendidos, redistribuidos o reutilizados sin autorización.

11. MODIFICACIONES

ELBEDI podrá modificar los presentes términos y condiciones en cualquier momento.

Las modificaciones serán publicadas en este sitio web.`,
  },
  cookies: {
    label: "Política de cookies",
    updatedAt: "Última actualización: 13 de mayo de 2026",
    content: `Este sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el comportamiento del sitio y optimizar servicios.

1. ¿QUÉ SON LAS COOKIES?

Las cookies son pequeños archivos almacenados en el dispositivo del usuario que permiten recordar información relacionada con navegación, preferencias y comportamiento dentro del sitio web.

2. TIPOS DE COOKIES UTILIZADAS

ELBEDI podrá utilizar:

Cookies esenciales

Necesarias para el funcionamiento básico del sitio web.

Cookies analíticas

Permiten analizar comportamiento, tráfico y rendimiento.

Cookies de marketing

Utilizadas para campañas publicitarias y remarketing.

Cookies funcionales

Ayudan a recordar configuraciones y preferencias.

Cookies de terceros

Provenientes de herramientas integradas o plataformas externas.

3. HERRAMIENTAS QUE PUEDEN UTILIZAR COOKIES

Entre las herramientas que pueden utilizarse se incluyen:

Google Analytics
Meta Pixel
Stripe
Herramientas de formularios
YouTube
Google Maps
Plataformas publicitarias
Herramientas de automatización
Servicios de chat y soporte

4. CONTROL DE COOKIES

El usuario puede modificar la configuración de cookies desde su navegador.

La desactivación de ciertas cookies puede afectar funcionalidades del sitio web.

5. MODIFICACIONES

ELBEDI podrá actualizar la presente Política de Cookies en cualquier momento.

Las modificaciones serán publicadas en este sitio web.`,
  },
};

export default function Footer({
  brand = "ELBEDI",
  email = "hola@elbedi.com",
  phone = "+52 55 0000 0000",
  links = defaultLinks,
  socials = defaultSocials,
}) {
  const year = new Date().getFullYear();
  const [activeNoticeKey, setActiveNoticeKey] = useState(null);
  const activeNotice = activeNoticeKey ? legalNotices[activeNoticeKey] : null;
  const validSocials = socials.filter(
    (social) => social?.href && social.href !== "#",
  );

  useEffect(() => {
    if (!activeNotice) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveNoticeKey(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeNotice]);

  return (
    <footer className="bg-white/10 border border-white/30 text-lg">
      <LimitContainer className="min-h-svh flex flex-col justify-between 2xl:pt-30 pt-20">
        <div className="w-full">
          <img
            src="/images/logo.webp"
            alt="Logo de ELBEDI"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-between md:flex-row flex-col gap-10">
          <nav aria-label="Enlaces del sitio en footer">
            <p className="font-bold 2xl:text-lg lg:text-sm">Navegación</p>
            <ul className="2xl:mt-3 lg:mt-0 2xl:space-y-2 lg:space-y-0">
              {links.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <a
                    href={item.href}
                    className="hover:underline transition 2xl:text-md lg:text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-bold 2xl:text-lg lg:text-sm">Contacto</p>
            <ul className="2xl:mt-3 lg:mt-0 2xl:space-y-2 lg:space-y-0">
              <li>
                <a
                  className="transition hover:text-white 2xl:text-md lg:text-sm"
                  href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li>
                <a
                  className="transition hover:text-white 2xl:text-md lg:text-sm"
                  href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-bold 2xl:text-lg lg:text-sm">Legal</p>
              <button
                type="button"
                onClick={() => setActiveNoticeKey("privacy")}
                className=" transition hover:underline cursor-pointer 2xl:text-md lg:text-sm">
                Aviso de privacidad
              </button>
              <button
                type="button"
                onClick={() => setActiveNoticeKey("terms")}
                className=" transition hover:underline cursor-pointer 2xl:text-md lg:text-sm">
                Términos y condiciones
              </button>
              <button
                type="button"
                onClick={() => setActiveNoticeKey("cookies")}
                className=" transition hover:underline cursor-pointer 2xl:text-md lg:text-sm">
                Política de cookies
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 2xl:py-10 py-5">
          <div className="flex items-center justify-between">
            <p className="2xl:text-sm text-xs">
              &copy; {year} {brand}. Todos los derechos reservados.
            </p>
            {validSocials.length ? (
              <div className="flex items-center gap-3">
                {validSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex 2xl:h-10 2xl:w-10 w-7 h-7 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10"
                    target="_blank"
                    rel="noreferrer">
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="2xl:h-6 2xl:w-6 h-5 w-5 object-contain"
                    />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {activeNotice && (
          <div className="fixed inset-0 z-90 flex items-center justify-center p-4 sm:p-6">
            <button
              type="button"
              aria-label="Cerrar modal"
              className="absolute inset-0 bg-black/70"
              onClick={() => setActiveNoticeKey(null)}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-modal-title"
              className="relative z-10 w-full max-w-4xl mt-20 h-9/10 overflow-hidden rounded-2xl border border-white/20 bg-[#0f172a] text-white shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/15 p-4 sm:p-6">
                <div>
                  <h3
                    id="legal-modal-title"
                    className="text-lg font-semibold sm:text-xl">
                    {activeNotice.label}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
                    {activeNotice.updatedAt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNoticeKey(null)}
                  className="rounded-md border border-white/30 px-3 py-1 text-sm transition hover:bg-white/10">
                  Cerrar
                </button>
              </div>

              <div className="max-h-[72vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/90">
                  {activeNotice.content}
                </pre>
              </div>
            </div>
          </div>
        )}
      </LimitContainer>
    </footer>
  );
}
