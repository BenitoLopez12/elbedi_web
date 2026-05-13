import { useEffect, useState, useRef } from "react";

import SectionContainer from "@/components/common/SectionContainer";
import LimitContainer from "@/components/common/LimitContainer";
import Button from "@/components/ui/Button";
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    key: "uxui",
    animationPath: "/lottie/uxui.json",
    title: "Diseño Profesional",
    description:
      "Diseñamos experiencias profesionales enfocadas en la experiencia de usuario que generan un efecto WOW y son funcionales.",
    buttonLabel: "Quiero un diseño personalizado",
  },
  {
    key: "seo",
    animationPath: "/lottie/seo.json",
    title: "SEO y Motores de Busqueda",
    description:
      "Mejoramos la visibilidad de tu sitio web en los motores de busqueda alcanzando a mas clientes potenciales.",
    buttonLabel: "Quiero mejorar mi SEO",
  },
  {
    key: "security",
    animationPath: "/lottie/security.json",
    title: "Certificados de Seguridad",
    description:
      "Implementamos certificados de seguridad para proteger tus datos y garantizar la privacidad de tus usuarios.",
    buttonLabel: "Quiero seguridad para mi sitio",
  },
  {
    key: "maintenance",
    animationPath: "/lottie/maintenance.json",
    title: "Mantenimiento y Mejora Continua",
    description:
      "Mantenimiento, soporte tecnico y mejora continua para asegurar que tu sitio web funcione de manera optima.",
    buttonLabel: "Quiero soporte técnico",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const [animationsByService, setAnimationsByService] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 40%",
            scrub: true,
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        },
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    // Animaciones Lottie
    let isMounted = true;

    const loadAnimations = async () => {
      const loadedAnimations = await Promise.all(
        SERVICES.map(async (service) => {
          try {
            const response = await fetch(service.animationPath);
            const data = await response.json();
            return [service.key, data];
          } catch (error) {
            console.error(
              `No se pudo cargar la animacion Lottie de ${service.key}:`,
              error,
            );
            return [service.key, null];
          }
        }),
      );

      if (isMounted) {
        setAnimationsByService(Object.fromEntries(loadedAnimations));
      }
    };

    loadAnimations();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SectionContainer className="mt-150" id="services">
        <div ref={sectionRef}>
          <LimitContainer className="pt-1">
            <div ref={contentRef}>
              <h2 className="text-6xl font-bold text-center mt-30">
                Servicios para tu sitio{" "}
                <span className="text-cyan-200"> Web </span>
              </h2>
              <div className="mt-10 grid grid-cols-2 ">
                {SERVICES.map((service, index) => {
                  const reverseOnDesktop = index % 2 !== 0;
                  const isFirst = index === 0;
                  const isLast = index === SERVICES.length - 1;
                  return (
                    <div
                      key={service.key}
                      className={`flex items-center gap-2 px-2 
                    ${isFirst ? "border-b border-r border-white/50" : ""} 
                    ${isLast ? "border-t border-l border-white/50" : ""} 
                    ${isFirst ? "translate-y-px" : ""}
                    ${isLast ? "-translate-x-px" : ""}`}>
                      <div
                        className={`w-full h-full aspect-square mx-auto flex-1 ${reverseOnDesktop ? "" : "order-2"}`}>
                        {animationsByService[service.key] ? (
                          <Lottie
                            animationData={animationsByService[service.key]}
                            loop
                            autoplay
                            className="w-full h-full"
                          />
                        ) : (
                          <div className="w-full aspect-square bg-white/10 rounded-2xl animate-pulse" />
                        )}
                      </div>
                      <div
                        className={`${reverseOnDesktop ? "md:order-1" : ""} flex-1`}>
                        <h3 className="text-4xl leading-tight">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-md ">{service.description}</p>
                        <div className="mt-4">
                          <Button
                            variant="glass"
                            size="sm"
                            whatsappMessage={`Hola, me interesa el servicio de ${service.title.toLowerCase()} para mi sitio web.`}>
                            {service.buttonLabel}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </LimitContainer>
        </div>
      </SectionContainer>
    </>
  );
}
