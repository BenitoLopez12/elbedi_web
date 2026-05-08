import { useEffect, useRef } from "react";
import SectionContainer from "@/components/common/SectionContainer.jsx";
import LimitContainer from "@/components/common/LimitContainer.jsx";
import Button from "@/components/ui/Button.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  const sectionSecondRef = useRef(null);
  const pinSecondRef = useRef(null);
  const titleSecondRef = useRef(null);
  const descriptionSecondRef = useRef(null);
  const buttonSecondRef = useRef(null);
  const imageSecondRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([pinRef.current, pinSecondRef.current], { autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: pinRef.current,
          anticipatePin: 1,
          onEnter: () => gsap.set(pinRef.current, { autoAlpha: 1 }),
          onLeave: () => gsap.set(pinRef.current, { autoAlpha: 0 }),
          onEnterBack: () => gsap.set(pinRef.current, { autoAlpha: 1 }),
          onLeaveBack: () => gsap.set(pinRef.current, { autoAlpha: 0 }),
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionSecondRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: pinSecondRef.current,
          anticipatePin: 1,
          onEnter: () => gsap.set(pinSecondRef.current, { autoAlpha: 1 }),
          onLeave: () => gsap.set(pinSecondRef.current, { autoAlpha: 0 }),
          onEnterBack: () => gsap.set(pinSecondRef.current, { autoAlpha: 1 }),
          onLeaveBack: () => gsap.set(pinSecondRef.current, { autoAlpha: 0 }),
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SectionContainer>
        <div className="h-[200svh]">
          <div className="min-h-svh w-full flex" ref={sectionRef}>
            <div className="w-full flex items-center relative" ref={pinRef}>
              <LimitContainer>
                <div className="max-w-3xl relative z-10">
                  <h1
                    className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
                    ref={titleRef}>
                    Definimos la identidad{" "}
                    <span className="text-cyan-200"> Web </span>
                    de tu negocio.
                  </h1>
                  <p
                    className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl "
                    ref={descriptionRef}>
                    Estudio digital especializado en crear sitios modernos,
                    rapidos y memorables para marcas que buscan destacar.
                  </p>
                  <div className="mt-10 ">
                    <Button href="#contacto" ref={buttonRef}>
                      cotizar mi nueva Web
                    </Button>
                  </div>
                </div>
              </LimitContainer>
              <div className="absolute right-[6%] h-svh w-3/5 flex items-end">
                <img
                  src="/images/hero-lap.png"
                  alt="Laptop mostrando mi web"
                  ref={imageRef}
                />
              </div>
            </div>
          </div>

          <div className="min-h-svh w-full flex" ref={sectionSecondRef}>
            <div
              className="w-full flex items-center relative"
              ref={pinSecondRef}>
              <LimitContainer>
                <div className="max-w-3xl relative z-10">
                  <h2
                    className="text-5xl md:text-7xl font-bold leading-tight tracking-tight "
                    ref={titleSecondRef}>
                    Tu
                    <span className="text-cyan-200"> Web </span>
                    no termina cuando se publica.
                  </h2>
                  <p
                    className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl "
                    ref={descriptionSecondRef}>
                    Ofrecemos{" "}
                    <span className="font-bold text-white">
                      {" "}
                      mantenimiento y mejora continua{" "}
                    </span>{" "}
                    para asegurar que tu sitio web se mantenga actualizado,
                    seguro y funcionando a largo del tiempo.
                  </p>
                  <div className="mt-10 ">
                    <Button href="#contacto" ref={buttonSecondRef}>
                      cotizar mi nueva Web
                    </Button>
                  </div>
                </div>
              </LimitContainer>
              <div className="absolute right-[6%] bottom-0 h-[80svh] w-3/5 flex items-end">
                <img
                  src="/images/hero-phone.png"
                  alt="Phone mostrando mi web"
                  ref={imageSecondRef}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
