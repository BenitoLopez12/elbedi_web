import { useEffect, useState } from "react";
import SectionContainer from "@/components/common/SectionContainer";
import LimitContainer from "@/components/common/LimitContainer";
import Button from "@/components/ui/Button";
import Lottie from "lottie-react";

export default function Contact() {
  const [animationDataContact, setAnimationDataContact] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <SectionContainer>
        <LimitContainer className="py-20">
          <div className="min-h-svh w-full flex justify-center relative">
            <div className=" flex flex-col items-center justify-between py-20">
              <h2
                className="text-4xl md:text-6xl font-bold leading-tight text-center max-w-xl mx-auto "
                style={{ lineHeight: "65px" }}>
                Construyamos tu Sitio Web hoy mismo
              </h2>

              <Button href="#" className="relative z-10">
                Crear mi Sitio Web
              </Button>
            </div>
            <div className="absolute inset-0 m-auto w-full h-2/3 mx-auto translate-y-10">
              {animationDataContact ? (
                <Lottie
                  animationData={animationDataContact}
                  loop
                  autoplay
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full aspect-square bg-white/10 rounded-2xl animate-pulse" />
              )}
            </div>
          </div>
        </LimitContainer>
      </SectionContainer>
    </>
  );
}
