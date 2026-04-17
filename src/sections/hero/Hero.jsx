import { useEffect, useRef } from "react";
import SectionContainer from "../../components/common/SectionContainer.jsx";
import LimitContainer from "../../components/common/LimitContainer.jsx";
import Button from "../../components/ui/Button.jsx";
import { fadeUp } from "../../lib/animations.js";

export default function HeroBasic() {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    fadeUp(headingRef.current, { delay: 0.1 });
    fadeUp(subRef.current, { delay: 0.3 });
    fadeUp(ctaRef.current, { delay: 0.5 });
  }, []);

  return (
    <>
      <SectionContainer className="relative min-h-screen flex items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.55) 45%, rgba(10, 10, 10, 0.75)), url('/images/heroBack.webp')",
          }}
        />
        <LimitContainer>
          <div className="relative z-10 max-w-3xl py-32 md:py-40">
            <h1
              ref={headingRef}
              className="text-5xl md:text-7xl font-bold leading-tight tracking-tight opacity-0">
              Diseñamos experiencias digitales que impulsan resultados
            </h1>
            <p
              ref={subRef}
              className="mt-6 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl opacity-0">
              Estudio digital especializado en crear sitios modernos, rápidos y
              memorables para marcas que buscan destacar.
            </p>
            <div ref={ctaRef} className="mt-10 opacity-0">
              <Button href="#contacto">Comienza tu proyecto</Button>
            </div>
          </div>
        </LimitContainer>
      </SectionContainer>
    </>
  );
}
