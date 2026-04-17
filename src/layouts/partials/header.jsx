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
		<header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
				<a
					href={brandHref}
					className="text-sm font-semibold tracking-[0.18em] text-neutral-100 uppercase">
					{brand}
				</a>

				<nav aria-label="Navegacion principal" className="hidden md:block">
					<ul className="flex items-center gap-6">
						{links.map((item) => (
							<li key={`${item.href}-${item.label}`}>
								<a
									href={item.href}
									className="text-sm text-neutral-300 transition hover:text-white">
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<a
					href={ctaHref}
					className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white transition hover:border-white hover:bg-white hover:text-neutral-950">
					{ctaLabel}
				</a>
			</div>
		</header>
	);
}
