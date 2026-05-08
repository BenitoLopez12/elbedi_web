import { useEffect, useRef, useState } from "react";
import SectionContainer from "@/components/common/SectionContainer.jsx";
import LimitContainer from "@/components/common/LimitContainer.jsx";
import Button from "@/components/ui/Button";

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
    <footer className="bg-white/20 border border-white/30 text-lg">
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
                  href={`tel:${phone}`}>
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-10">
          <div className="flex items-center justify-between">
            <p className="text-xs ">
              {year} {brand}. Todos los derechos reservados.
            </p>
            <div>
              <a href="">Aviso de privacidad</a>
            </div>
          </div>
        </div>
      </LimitContainer>
    </footer>
  );
}
