import { useEffect, useRef, useState } from "react";
import SectionContainer from "@/components/common/SectionContainer";
import LimitContainer from "@/components/common/LimitContainer";
import Button from "@/components/ui/Button";
import Lottie from "lottie-react";

export default function Contact() {
  const [animationDataContact, setAnimationDataContact] = useState(null);
  const [shouldLoadAnimation, setShouldLoadAnimation] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement || shouldLoadAnimation) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadAnimation(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px 0px",
      },
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, [shouldLoadAnimation]);

  useEffect(() => {
    if (!shouldLoadAnimation) return undefined;

    let isMounted = true;

    const loadAnimation = async () => {
      try {
        const response = await fetch("/lottie/contact.json");
        const data = await response.json();
        if (isMounted) {
          setAnimationDataContact(data);
        }
      } catch (error) {
        console.error(
          "No se pudo cargar la animacion Lottie de contacto:",
          error,
        );
      }
    };

    loadAnimation();

    return () => {
      isMounted = false;
    };
  }, [shouldLoadAnimation]);

  return (
    <>
      <SectionContainer>
        <div ref={sectionRef}>
          <LimitContainer className="py-20">
            <div className="min-h-svh w-full flex justify-center relative">
              <div className=" flex flex-col items-center justify-between py-20">
                <h2
                  className="text-4xl md:text-6xl font-bold leading-tight text-center max-w-xl mx-auto "
                  style={{ lineHeight: "65px" }}>
                  Construyamos tu sitio web para crecer tu negocio
                </h2>

                <Button
                  size="lg"
                  whatsappMessage="Hola, quiero crear mi sitio web con ustedes."
                  className="relative z-10">
                  Crear mi sitio web
                </Button>
              </div>
              <div
                className="absolute inset-0 m-auto w-full h-2/3 mx-auto translate-y-10"
                role="img"
                aria-label="Animación de contacto para asesoría web">
                {animationDataContact ? (
                  <Lottie
                    animationData={animationDataContact}
                    loop
                    autoplay
                    aria-hidden="true"
                    className="w-full h-full"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="w-full aspect-square bg-white/10 rounded-2xl animate-pulse"
                  />
                )}
              </div>
            </div>
          </LimitContainer>
        </div>
      </SectionContainer>
    </>
  );
}
