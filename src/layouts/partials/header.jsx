import LimitContainer from "@/components/common/LimitContainer.jsx";
import { buildWhatsAppUrl } from "@/lib/whatsapp.js";

const defaultLinks = [
  { label: "Servicios", href: "#services" },
  { label: "Portafolio", href: "#portfolio" },
  { label: "Sectores", href: "#sectors" },
  { label: "Planes y Precios", href: "#plans" },
];

export default function Header({
  brand = "ELBEDI",
  brandHref = "/#",
  links = defaultLinks,
}) {
  const whatsappHref = buildWhatsAppUrl(
    "Hola, me gustaria recibir asesosria para mi sitio web",
  );

  return (
    <header className="fixed top-3 w-full z-100">
      <LimitContainer>
        <div className="flex h-13 items-center justify-between bg-white/20 border border-white/30 backdrop-blur-[1px] rounded-xl px-8 py-2 shadow-2xl">
          <a href={brandHref} className="block h-5 relative">
            <img
              src="/images/logo.png"
              alt="Logo de ELBEDI"
              className="w-full h-full object-contain"
            />
          </a>

          <nav aria-label="Navegacion principal" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {links.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <a href={item.href} className="text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="block items-center rounded-lg bg-white text-slate-900 px-4 py-2 text-xs">
              ASESORÍA GRATUITA
            </a>
          </div>
        </div>
      </LimitContainer>
    </header>
  );
}
