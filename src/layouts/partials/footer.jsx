const defaultLinks = [
	{ label: "Inicio", href: "#inicio" },
	{ label: "Servicios", href: "#servicios" },
	{ label: "Portafolio", href: "#portafolio" },
	{ label: "Contacto", href: "#contacto" },
];

export default function Footer({
	brand = "ELBEDI",
	email = "hola@elbedi.com",
	phone = "+52 55 0000 0000",
	links = defaultLinks,
}) {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-white/10 bg-neutral-950">
			<div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
				<div>
					<p className="text-sm font-semibold tracking-[0.18em] text-neutral-100 uppercase">
						{brand}
					</p>
					<p className="mt-3 max-w-xs text-sm text-neutral-400">
						Construimos experiencias digitales modernas, escalables y centradas
						en resultados.
					</p>
				</div>

				<div>
					<p className="text-sm font-medium text-neutral-200">Navegacion</p>
					<ul className="mt-3 space-y-2">
						{links.map((item) => (
							<li key={`${item.href}-${item.label}`}>
								<a
									href={item.href}
									className="text-sm text-neutral-400 transition hover:text-white">
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="text-sm font-medium text-neutral-200">Contacto</p>
					<ul className="mt-3 space-y-2 text-sm text-neutral-400">
						<li>
							<a className="transition hover:text-white" href={`mailto:${email}`}>
								{email}
							</a>
						</li>
						<li>
							<a className="transition hover:text-white" href={`tel:${phone}`}>
								{phone}
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-white/10">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
					<p className="text-xs text-neutral-500">
						{year} {brand}. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
