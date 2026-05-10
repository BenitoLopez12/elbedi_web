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
  const targetsRef = useRef(null);

  const sectionSecondRef = useRef(null);
  const pinSecondRef = useRef(null);
  const titleSecondRef = useRef(null);
  const descriptionSecondRef = useRef(null);
  const buttonSecondRef = useRef(null);
  const imageSecondRef = useRef(null);
  const targetsSecondRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([pinRef.current, pinSecondRef.current], { autoAlpha: 0 });
      gsap.set(
        [
          titleSecondRef.current,
          descriptionSecondRef.current,
          buttonSecondRef.current,
          targetsSecondRef.current,
        ],
        {
          clipPath: "inset(0% 0% 100% 0%)",
          autoAlpha: 0,
          yPercent: -50,
        },
      );
      gsap.set(imageSecondRef.current, {
        rotation: -20,
        yPercent: 140,
        transformOrigin: "0% 100%",
      });

      gsap
        .timeline({
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
        })
        .to(imageRef.current, {
          rotation: -20,
          yPercent: 150,
          transformOrigin: "0% 100%",
          ease: "none",
          duration: 1,
        })
        .to(
          [
            titleRef.current,
            descriptionRef.current,
            buttonRef.current,
            targetsRef.current,
          ],
          {
            duration: 0.5,
            clipPath: "inset(100% 0% 0% 0%)",
            ease: "none",
            autoAlpha: 0,
            yPercent: 50,
          },
          "-=0.5",
        );

      gsap
        .timeline({
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
        })
        .to(imageSecondRef.current, {
          rotation: 0,
          yPercent: 0,
          transformOrigin: "0% 100%",
          ease: "power9.ease",
          duration: 1,
        })
        .to(
          [
            titleSecondRef.current,
            descriptionSecondRef.current,
            buttonSecondRef.current,
            targetsSecondRef.current,
          ],
          {
            duration: 0.5,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.ease",
            autoAlpha: 1,
            yPercent: 0,
          },
          "<",
        )
        .to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SectionContainer>
        <div className="">
          <div
            className="min-h-svh w-full flex overflow-hidden"
            ref={sectionRef}>
            <div className="w-full flex items-center relative" ref={pinRef}>
              <LimitContainer>
                <div className="flex flex-col gap-8 max-w-3xl relative z-10">
                  <h1
                    className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
                    ref={titleRef}>
                    Definimos la identidad{" "}
                    <span className="text-cyan-200"> Web </span>
                    de tu negocio.
                  </h1>
                  <p
                    className="text-lg md:text-xl leading-relaxed max-w-xl "
                    ref={descriptionRef}>
                    Estudio digital especializado en crear sitios modernos,
                    rápidos y memorables para marcas que buscan destacar.
                  </p>
                  <div className="" ref={buttonRef}>
                    <Button href="#contacto">cotizar mi nueva Web</Button>
                  </div>
                </div>
              </LimitContainer>
              <div className="absolute right-[6%] h-svh w-3/5 flex items-end">
                <div className="absolute z-10 w-full h-full" ref={targetsRef}>
                  <div
                    className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl px-6 py-3 absolute bottom-2/3 right-7/13 z-20 text-shadow-md target-float"
                    style={{ animationDelay: "-7000ms" }}>
                    <span className="font-bold text-lg">Tu Logo</span>
                  </div>
                  <div
                    className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl px-6 py-3 absolute bottom-1/3 right-0 z-20 text-shadow-md target-float"
                    style={{ animationDelay: "-15000ms" }}>
                    <span className="font-bold text-lg">Tu Marca</span>
                  </div>
                  <div className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl px-6 py-3 absolute bottom-1/3 right-11/18 z-20 text-shadow-md target-float">
                    <span className="font-bold text-lg">Tu Producto</span>
                  </div>
                </div>
                <img
                  src="/images/hero-lap.png"
                  alt="Laptop mostrando mi web"
                  ref={imageRef}
                />
              </div>
            </div>
          </div>
          <div className="min-h-[200svh]" ref={sectionSecondRef}>
            <div className="min-h-svh w-full flex">
              <div
                className="w-full flex items-center relative"
                ref={pinSecondRef}>
                <LimitContainer>
                  <div className="flex flex-col gap-8 max-w-3xl relative z-10">
                    <h2
                      className="text-5xl md:text-7xl font-bold leading-tight tracking-tight "
                      ref={titleSecondRef}>
                      Tu
                      <span className="text-cyan-200"> Web </span>
                      no termina cuando se publica.
                    </h2>
                    <p
                      className="text-lg md:text-xl leading-relaxed max-w-xl "
                      ref={descriptionSecondRef}>
                      Ofrecemos{" "}
                      <span className="font-bold text-white">
                        {" "}
                        mantenimiento y mejora continua{" "}
                      </span>{" "}
                      para asegurar que tu sitio web se mantenga actualizado,
                      seguro y funcionando a largo del tiempo.
                    </p>
                    <div className="" ref={buttonSecondRef}>
                      <Button href="#contacto">cotizar mi nueva Web</Button>
                    </div>
                  </div>
                </LimitContainer>
                <div className="absolute right-[6%] bottom-0 h-[80svh] w-3/5 flex justify-end items-end">
                  <div
                    className="absolute z-10 w-full h-full"
                    ref={targetsSecondRef}>
                    <div
                      className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl px-6 py-3 absolute bottom-4/5 right-7/14 z-20 text-shadow-md target-float"
                      style={{ animationDelay: "-7000ms" }}>
                      <span className="font-bold text-lg">Tu Logo</span>
                    </div>
                    <div
                      className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl px-6 py-3 absolute bottom-3/5 right-1/4 z-20 text-shadow-md target-float"
                      style={{ animationDelay: "-15000ms" }}>
                      <span className="font-bold text-lg">Tu Marca</span>
                    </div>
                    <div className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl px-6 py-3 absolute bottom-1/3 right-4/7 z-20 text-shadow-md target-float">
                      <span className="font-bold text-lg">Tu Producto</span>
                    </div>
                  </div>
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
        </div>
      </SectionContainer>
    </>
  );
}
