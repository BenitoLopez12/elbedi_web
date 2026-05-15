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
        .to({}, { duration: 0.5 })
        .to(sectionSecondRef.current, {
          autoAlpha: 0,
          ease: "power1.ease",
          duration: 0.3,
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SectionContainer id="">
        <div className="">
          <div
            className="min-h-svh w-full flex overflow-hidden "
            ref={sectionRef}>
            <div
              className="w-full flex lg:flex-row flex-col lg:items-center lg:justify-center justify-between relative"
              ref={pinRef}>
              <LimitContainer className="flex-1 lg:pt-0 pt-20 flex flex-col justify-center">
                <div className="flex flex-col gap-8 lg:max-w-3xl md:w-full lg:text-left text-center relative z-10">
                  <h1
                    className="text-5xl 2xl:text-7xl font-bold leading-tight tracking-tight"
                    ref={titleRef}>
                    Definimos la identidad{" "}
                    <span className="text-cyan-200"> web </span>
                    de tu negocio.
                  </h1>
                  <p
                    className="text-lg 2xl:text-xl leading-relaxed lg:max-w-xl"
                    ref={descriptionRef}>
                    ELBEDI es un estudio digital especializado en crear sitios
                    modernos, rápidos y memorables para marcas que buscan
                    destacar.
                  </p>
                  <div
                    className="flex gap-3 justify-center lg:justify-start"
                    ref={buttonRef}>
                    <Button whatsappMessage="Hola, me gustaría cotizar mi sitio web.">
                      Cotizar mi sitio web
                    </Button>
                    <Button variant="glass" href="#plans">
                      Planes y precios
                    </Button>
                  </div>
                </div>
              </LimitContainer>
              <div className="lg:absolute flex-1 relative z-0 lg:right-1/20 bottom-0 lg:h-svh 2xl:w-62/100 xl:w-7/11 w-full flex items-end">
                <div className="absolute z-5 w-full h-full" ref={targetsRef}>
                  <div
                    className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl 2xl:px-6 2xl:py-3 xl:px-4 xl:py-2 px-2 py-1 absolute lg:bottom-3/5 bottom-4/5 right-7/13 z-20 text-shadow-md target-float"
                    style={{ animationDelay: "-7000ms" }}>
                    <span className="font-bold 2xl:text-lg text-sm">
                      Tu Logo
                    </span>
                  </div>
                  <div
                    className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl 2xl:px-6 2xl:py-3 xl:px-4 xl:py-2 px-2 py-1 absolute lg:bottom-1/3 bottom-1/3 lg:right-0 right-10 z-20 text-shadow-md target-float"
                    style={{ animationDelay: "-15000ms" }}>
                    <span className="font-bold 2xl:text-lg text-sm">
                      Tu Marca
                    </span>
                  </div>
                  <div className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl 2xl:px-6 2xl:py-3 xl:px-4 xl:py-2 px-2 py-1 absolute lg:bottom-1/3 bottom-2/4 right-11/18 z-20 text-shadow-md target-float">
                    <span className="font-bold 2xl:text-lg text-sm">
                      Tu Producto
                    </span>
                  </div>
                </div>
                <img
                  src="/images/hero-lap.png"
                  alt="Laptop mostrando tu sitio web"
                  ref={imageRef}
                  className="relative z-2 w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>
          <div className="min-h-[200svh]" ref={sectionSecondRef}>
            <div className="min-h-svh w-full flex">
              <div
                className="w-full flex lg:flex-row flex-col items-center justify-between relative"
                ref={pinSecondRef}>
                <LimitContainer className="flex-1 lg:pt-0 pt-20 flex flex-col justify-center lg:text-left text-center">
                  <div className="flex flex-col gap-8 max-w-3xl relative z-10">
                    <h2
                      className="text-5xl 2xl:text-7xl font-bold leading-tight tracking-tight "
                      ref={titleSecondRef}>
                      Tú te enfocas en tus ventas; nosotros, en tu sitio{" "}
                      <span className="text-cyan-200"> web </span>
                    </h2>
                    <p
                      className="text-lg 2xl:text-xl leading-relaxed lg:max-w-xl"
                      ref={descriptionSecondRef}>
                      Nos encargamos de todos los aspectos técnicos y creativos
                      de tu página web para que tú puedas concentrarte en tu
                      negocio y en tus ventas.
                    </p>
                    <div className="" ref={buttonSecondRef}>
                      <Button whatsappMessage="Hola, me interesa una asesoría personalizada para mi sitio web.">
                        Asesoría personalizada
                      </Button>
                    </div>
                  </div>
                </LimitContainer>
                <div className="lg:absolute relative lg:right-[6%] bottom-0 lg:h-[80svh] lg:w-3/6 w-full flex flex-1 justify-end items-end max-h-[50svh]">
                  <div
                    className="absolute z-10 w-full h-full"
                    ref={targetsSecondRef}>
                    <div
                      className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl 2xl:px-6 2xl:py-3 xl:px-4 xl:py-2 px-2 py-1 absolute bottom-4/5 right-7/14 z-20 text-shadow-md target-float"
                      style={{ animationDelay: "-7000ms" }}>
                      <span className="font-bold 2xl:text-lg text-sm">
                        Tu Logo
                      </span>
                    </div>
                    <div
                      className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl 2xl:px-6 2xl:py-3 xl:px-4 xl:py-2 px-2 py-1 absolute bottom-3/5 right-1/5 z-20 text-shadow-md target-float"
                      style={{ animationDelay: "-15000ms" }}>
                      <span className="font-bold 2xl:text-lg text-sm">
                        Tu Marca
                      </span>
                    </div>
                    <div className="w-auto bg-white/20 border border-white/30 backdrop-blur-xs rounded-xl shadow-xl 2xl:px-6 2xl:py-3 xl:px-4 xl:py-2 px-2 py-1 absolute bottom-1/3 right-4/7 z-20 text-shadow-md target-float">
                      <span className="font-bold 2xl:text-lg text-sm">
                        Tu Producto
                      </span>
                    </div>
                  </div>
                  <img
                    src="/images/hero-phone.png"
                    alt="Teléfono mostrando tu sitio web"
                    ref={imageSecondRef}
                    className="w-full h-full object-contain object-bottom"
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
