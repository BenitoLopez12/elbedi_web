import LimitContainer from "@/components/common/LimitContainer.jsx";
import { buildWhatsAppUrl } from "@/lib/whatsapp.js";

const defaultLinks = [
  { label: "Servicios", href: "#services" },
  { label: "Portafolio", href: "#portfolio" },
  { label: "Sectores", href: "#sectors" },
  { label: "Planes y Precios", href: "#price" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({
  brand = "ELBEDI",
  brandHref = "/#inicio",
  links = defaultLinks,
}) {
  const whatsappHref = buildWhatsAppUrl(
    "Hola, me gustaría recibir asesoría para mi sitio web",
  );

  return (
    <header className="fixed top-3 w-full z-100">
      <LimitContainer>
        <div className="flex h-13 items-center justify-between bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl sm:px-8 px-4 py-2 shadow-2xl">
          <a href={brandHref} className="block h-5 relative">
            <img
              src="/images/logo.webp"
              alt="Logo de ELBEDI"
              title="ELBEDI"
              className="w-full h-full object-contain"
            />
          </a>

          <nav aria-label="Navegación principal" className="hidden md:block">
            <ul className="flex items-center lg:gap-6 gap-3">
              {links.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <a href={item.href} className="text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="block items-center rounded-lg bg-white text-slate-900 px-4 py-2 text-xs">
              <span className="sm:block hidden">ASESORÍA GRATUITA</span>{" "}
              <span className="sm:hidden block">ASESORÍA</span>
            </a>
            <details className="relative md:hidden">
              <summary className="list-none cursor-pointer rounded-lg h-7 w-7 text-xs uppercase tracking-wide">
                <img src="/images/icons/menu.svg" alt="Menú" />
              </summary>
              <nav
                aria-label="Navegación móvil"
                className="fixed right-0 left-0 mt-4 min-w-55 rounded-xl border border-white/30 bg-slate-900/95 p-3 shadow-2xl">
                <ul className="flex flex-col gap-2">
                  {links.map((item) => (
                    <li key={`mobile-${item.href}-${item.label}`}>
                      <a
                        href={item.href}
                        className="block rounded-md px-2 py-1 text-sm text-white/90 hover:bg-white/10">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </LimitContainer>
    </header>
  );
}
