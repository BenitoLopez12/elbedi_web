import LimitContainer from "@/components/common/LimitContainer.jsx";

const defaultLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header({
  brand = "ELBEDI",
  brandHref = "/",
  links = defaultLinks,
  ctaLabel = "Hablemos",
  ctaHref = "#contacto",
}) {
  return (
    <header className="fixed top-3 w-full z-100">
      <LimitContainer>
        <div className="flex items-center justify-between bg-white/20 border border-white/30 backdrop-blur-[1px] rounded-full px-8 py-2 shadow-2xl">
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

          <a
            href={ctaHref}
            className="inline-flex items-center rounded-full bg-white text-slate-900 px-4 py-2 text-xs">
            {ctaLabel}
          </a>
        </div>
      </LimitContainer>
    </header>
  );
}
