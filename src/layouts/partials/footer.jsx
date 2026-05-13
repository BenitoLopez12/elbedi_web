import { useEffect, useState } from "react";
import LimitContainer from "@/components/common/LimitContainer.jsx";

const defaultLinks = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#services" },
  { label: "Portafolio", href: "#portfolio" },
  { label: "Planes y Precios", href: "#plans" },
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
    updatedAt: "Ultima actualizacion: 13 de mayo de 2026",
    content: `ELBEDI, con operaciones en Mexico y contacto a traves del correo electronico contact@elbedi.com, es responsable del uso, tratamiento y proteccion de los datos personales recopilados a traves de este sitio web y de los servicios relacionados.

El presente Aviso de Privacidad tiene como finalidad informar como se recopilan, utilizan, almacenan y protegen los datos personales proporcionados por los usuarios, clientes y visitantes del sitio web.

1. DATOS PERSONALES RECOPILADOS

ELBEDI podra recopilar informacion personal y tecnica, incluyendo pero no limitada a:

Nombre completo
Nombre comercial o empresa
Correo electronico
Numero telefonico
WhatsApp
Direccion IP
Ciudad o pais
Informacion de navegacion
Datos del dispositivo y navegador
Informacion enviada mediante formularios
Informacion relacionada con solicitudes de servicio
Datos de facturacion cuando sean necesarios
Cookies y tecnologias de seguimiento
Informacion estadistica y analitica

Adicionalmente, en el futuro podran recopilarse otros datos relacionados con herramientas digitales, automatizaciones, campanas, formularios, integraciones y plataformas utilizadas por ELBEDI.

2. FINALIDAD DEL USO DE DATOS

Los datos recopilados podran utilizarse para:

Contactar a usuarios y clientes
Dar seguimiento a solicitudes y cotizaciones
Brindar soporte tecnico y atencion al cliente
Gestionar proyectos y servicios contratados
Procesar pagos y suscripciones
Enviar informacion relacionada con servicios
Mejorar la experiencia del usuario
Analizar metricas de rendimiento y comportamiento
Implementar herramientas analiticas y publicitarias
Cumplir obligaciones legales y contractuales
Proteger la seguridad del sitio web y los servicios

3. COOKIES Y TECNOLOGIAS DE SEGUIMIENTO

Este sitio web puede utilizar cookies, herramientas analiticas y tecnologias de terceros para recopilar informacion relacionada con navegacion, comportamiento y rendimiento.

Entre las herramientas que pueden utilizarse se incluyen:

Google Analytics
Meta Pixel
Stripe
Herramientas de formularios
Plataformas publicitarias
Herramientas de automatizacion
Herramientas de chat y comunicacion
Integraciones de video y contenido multimedia

Estas herramientas pueden recopilar informacion tecnica y estadistica para mejorar los servicios y la experiencia del usuario.

4. PROTECCION DE DATOS

ELBEDI implementa medidas razonables de seguridad para proteger la informacion recopilada y evitar accesos no autorizados, perdida, alteracion o uso indebido de los datos.

Sin embargo, ningun sistema en internet puede garantizar seguridad absoluta.

5. TRANSFERENCIA DE DATOS

ELBEDI podra compartir informacion con proveedores tecnologicos, plataformas de pago, servicios de hosting, herramientas analiticas y proveedores de soporte unicamente cuando sea necesario para operar los servicios contratados.

ELBEDI no vende datos personales a terceros.

6. DERECHOS DEL USUARIO

Los usuarios podran solicitar acceso, correccion o eliminacion de sus datos personales enviando una solicitud al correo:

contact@elbedi.com

ELBEDI podra solicitar informacion adicional para validar la identidad del solicitante.

7. CAMBIOS AL AVISO DE PRIVACIDAD

ELBEDI podra modificar el presente Aviso de Privacidad en cualquier momento para adaptarlo a cambios legales, tecnologicos, operativos o comerciales.

Las modificaciones seran publicadas en este sitio web.`,
  },
  terms: {
    label: "Términos y condiciones",
    updatedAt: "Ultima actualizacion: 13 de mayo de 2026",
    content: `El acceso y uso de este sitio web implica la aceptacion total de los presentes Terminos y Condiciones.

Si el usuario no esta de acuerdo con estos terminos, debera abstenerse de utilizar el sitio web y los servicios ofrecidos.

1. SOBRE LOS SERVICIOS

ELBEDI ofrece servicios relacionados con:

Diseno web
Desarrollo web
Mantenimiento de sitios web
Soporte tecnico
Optimizacion y mejora continua
Diseno visual y experiencia digital
Automatizacion y herramientas digitales
Integraciones y soluciones web

Los servicios pueden variar segun el plan contratado.

2. PLANES Y SUSCRIPCIONES

Algunos servicios funcionan bajo modalidad de suscripcion mensual o anual.

Los planes incluyen permanencia minima de 12 meses cuando asi se especifique.

El incumplimiento de pagos podra ocasionar:

Suspension temporal del servicio
Limitacion de acceso
Desactivacion del sitio web
Cancelacion de servicios relacionados

ELBEDI se reserva el derecho de suspender servicios por falta de pago.

3. PROPIEDAD DEL SITIO WEB

Los sitios web desarrollados por ELBEDI permaneceran bajo administracion y control operativo de ELBEDI durante el periodo activo del servicio.

La propiedad y entrega de archivos finales podra realizarse unicamente cuando:

El cliente haya cumplido el periodo minimo contratado
No existan adeudos pendientes
El cliente solicite formalmente la entrega
No exista incumplimiento de terminos y condiciones

ELBEDI se reserva el derecho de negar la entrega de archivos en casos de incumplimiento contractual, fraude, uso indebido o adeudos pendientes.

4. LIMITACIONES DEL SOPORTE

El soporte tecnico se proporciona unicamente dentro del alcance del plan contratado.

Los tiempos de respuesta pueden variar dependiendo de:

Disponibilidad operativa
Dias habiles
Nivel de prioridad
Complejidad de la solicitud

El soporte se brinda mediante:

WhatsApp
Correo electronico
Llamadas en linea
Plataformas de videollamadas

ELBEDI podra limitar o rechazar solicitudes consideradas excesivas, abusivas, fuera del alcance contratado o tecnicamente inviables.

5. CAMBIOS Y ACTUALIZACIONES

Los planes pueden incluir ajustes, mejoras o actualizaciones periodicas.

No se consideran cambios incluidos:

Redisenos completos
Reconstrucciones totales
Nuevos sistemas complejos
Funcionalidades avanzadas no contempladas originalmente
Solicitudes fuera del alcance contratado

ELBEDI podra cotizar por separado solicitudes adicionales.

6. OBLIGACIONES DEL CLIENTE

El cliente se compromete a:

Proporcionar informacion y contenido necesario
Entregar materiales en tiempo razonable
Mantener comunicacion activa
No utilizar el sitio para actividades ilegales o fraudulentas
No utilizar los servicios para distribuir malware, spam o contenido danino
No infringir derechos de terceros

Los retrasos ocasionados por falta de contenido, respuestas tardias o incumplimientos del cliente podran modificar tiempos de entrega sin responsabilidad para ELBEDI.

7. TIEMPOS DE ENTREGA

Los tiempos estimados de entrega pueden variar dependiendo de:

Complejidad del proyecto
Disponibilidad de contenido
Cambios solicitados
Tiempo de respuesta del cliente

ELBEDI no sera responsable por retrasos ocasionados por:

Falta de informacion
Cambios excesivos
Solicitudes fuera del alcance original
Retrasos del cliente
Problemas externos o servicios de terceros

8. LIMITACION DE RESPONSABILIDAD

ELBEDI no garantiza resultados comerciales especificos, posicionamiento en buscadores, incremento de ventas o resultados financieros derivados del uso del sitio web.

ELBEDI no sera responsable por:

Caidas de servicios de terceros
Problemas de proveedores externos
Ataques informaticos
Fallos de internet
Interrupciones ajenas a su control
Perdida indirecta de ingresos
Problemas ocasionados por modificaciones externas realizadas por terceros

9. USO INDEBIDO

ELBEDI podra suspender o cancelar servicios si detecta:

Actividades ilegales
Fraude
Spam
Abuso de soporte
Uso ofensivo o amenazante hacia el equipo
Uso indebido de plataformas o herramientas
Incumplimientos de pago

10. PROPIEDAD INTELECTUAL

Todo el contenido, diseno, estructura, elementos visuales y materiales desarrollados por ELBEDI podran estar protegidos por derechos de autor y propiedad intelectual.

No podran ser revendidos, redistribuidos o reutilizados sin autorizacion.

11. MODIFICACIONES

ELBEDI podra modificar los presentes terminos y condiciones en cualquier momento.

Las modificaciones seran publicadas en este sitio web.`,
  },
  cookies: {
    label: "Política de cookies",
    updatedAt: "Ultima actualizacion: 13 de mayo de 2026",
    content: `Este sitio web utiliza cookies y tecnologias similares para mejorar la experiencia del usuario, analizar el comportamiento del sitio y optimizar servicios.

1. QUE SON LAS COOKIES?

Las cookies son pequenos archivos almacenados en el dispositivo del usuario que permiten recordar informacion relacionada con navegacion, preferencias y comportamiento dentro del sitio web.

2. TIPOS DE COOKIES UTILIZADAS

ELBEDI podra utilizar:

Cookies esenciales

Necesarias para el funcionamiento basico del sitio web.

Cookies analiticas

Permiten analizar comportamiento, trafico y rendimiento.

Cookies de marketing

Utilizadas para campanas publicitarias y remarketing.

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
Herramientas de automatizacion
Servicios de chat y soporte

4. CONTROL DE COOKIES

El usuario puede modificar la configuracion de cookies desde su navegador.

La desactivacion de ciertas cookies puede afectar funcionalidades del sitio web.

5. MODIFICACIONES

ELBEDI podra actualizar la presente Politica de Cookies en cualquier momento.

Las modificaciones seran publicadas en este sitio web.`,
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
      <LimitContainer className="min-h-svh flex flex-col justify-between pt-30 pb-10">
        <div className="w-full">
          <img
            src="/images/logo.png"
            alt="Logo de ELBEDI"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-between">
          <nav>
            <p className="font-bold">Navegacion</p>
            <ul className="mt-3 space-y-2">
              {links.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <a href={item.href} className="hover:underline transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-bold	">Contacto</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  className="transition hover:text-white"
                  href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li>
                <a
                  className="transition hover:text-white"
                  href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mt-5 flex flex-col items-start gap-2">
              <p className="font-bold">Legal</p>
              <button
                type="button"
                onClick={() => setActiveNoticeKey("privacy")}
                className=" transition hover:underline cursor-pointer">
                Aviso de privacidad
              </button>
              <button
                type="button"
                onClick={() => setActiveNoticeKey("terms")}
                className=" transition hover:underline cursor-pointer">
                Términos y condiciones
              </button>
              <button
                type="button"
                onClick={() => setActiveNoticeKey("cookies")}
                className=" transition hover:underline cursor-pointer">
                Política de cookies
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-10">
          <div className="flex items-center justify-between">
            <p className="text-sm ">
              {year} {brand}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="h-6 w-6 object-contain"
                  />
                </a>
              ))}
            </div>
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
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#0f172a] text-white shadow-2xl">
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
