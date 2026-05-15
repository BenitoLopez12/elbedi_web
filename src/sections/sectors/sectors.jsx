import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionContainer from "../../components/common/SectionContainer.jsx";
import Button from "@/components/ui/Button.jsx";

const getSectorWhatsappMessage = (sectorName) =>
  `Hola, necesito un sitio web para el sector de ${sectorName}.`;

export default function Sectors({ children = null }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 640px)", () => {
        const sectionEl = sectionRef.current;
        const trackEl = trackRef.current;

        if (!sectionEl || !trackEl) return undefined;

        const initialScrollY = window.scrollY;
        const sectionBottom = sectionEl.offsetTop + sectionEl.offsetHeight;
        const navigationEntry = performance
          .getEntriesByType("navigation")
          .at(0);
        const isReload = navigationEntry?.type === "reload";
        const wasBelowSectionOnReload =
          isReload && initialScrollY > sectionBottom;

        const getDistance = () =>
          Math.max(0, trackEl.scrollWidth - sectionEl.clientWidth);

        const tween = gsap.to(trackEl, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (wasBelowSectionOnReload) {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            window.scrollTo({
              top: initialScrollY + getDistance(),
              behavior: "auto",
            });
          });
        }

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(trackEl, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <SectionContainer id="sectors" className="relative">
      <div className="mx-auto w-full">
        <div
          ref={sectionRef}
          className="relative sm:overflow-hidden overflow-auto w-full h-svh flex flex-col"
          aria-label="Sección con recorrido horizontal por scroll vertical">
          <h2 className="2xl:text-6xl xl:text-5xl text-4xl text-center pt-15 pb-3">
            Sectores para los que trabajamos
          </h2>
          <div ref={trackRef} className="w-auto flex-1 min-h-0 flex">
            <div
              className="w-auto flex h-full mx-5 min-h-0 gap-6"
              id="content-articles-sectors">
              <div>
                <article className="flex-1">
                  <img
                    src="/images/sectors/restaurant.webp"
                    alt="Sector restaurantes"
                  />
                  <div className="box-info-sector">
                    <h3>Restaurantes</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage(
                        "Restaurantes",
                      )}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
              <div>
                <article className="flex-2">
                  <img src="/images/sectors/hotel.webp" alt="Sector hoteles" />
                  <div className="box-info-sector">
                    <h3>Hoteles</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Hoteles")}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img
                    src="/images/sectors/tourism.webp"
                    alt="Sector turismo"
                  />
                  <div className="box-info-sector">
                    <h3>Turismo</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Turismo")}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
              <div>
                <article className="flex-1">
                  <img
                    src="/images/sectors/freelancer.webp"
                    alt="Sector freelancers"
                  />
                  <div className="box-info-sector">
                    <h3>Freelancers</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Freelancers")}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img
                    src="/images/sectors/influencer.webp"
                    alt="Sector influencers"
                  />
                  <div className="box-info-sector">
                    <h3>Influencers</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Influencers")}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img
                    src="/images/sectors/artist.webp"
                    alt="Sector artistas"
                  />
                  <div className="box-info-sector">
                    <h3>Artistas</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Artistas")}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
              <div>
                <article className="flex-1">
                  <img
                    src="/images/sectors/building.webp"
                    alt="Sector constructoras"
                  />
                  <div className="box-info-sector">
                    <h3>Constructoras</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage(
                        "Constructoras",
                      )}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
              <div>
                <article className="flex-1">
                  <img
                    src="/images/sectors/realty.webp"
                    alt="Sector inmobiliarias"
                  />
                  <div className="box-info-sector">
                    <h3>Inmobiliarias</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage(
                        "Inmobiliarias",
                      )}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img
                    src="/images/sectors/transport.webp"
                    alt="Sector transporte"
                  />
                  <div className="box-info-sector">
                    <h3>Transporte</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Transporte")}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
              <div>
                <article className="flex-1">
                  <img src="/images/sectors/events.webp" alt="Sector eventos" />
                  <div className="box-info-sector">
                    <h3>Planificación de Eventos</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage(
                        "Planificación de Eventos",
                      )}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img src="/images/sectors/gym.webp" alt="Sector gimnasios" />
                  <div className="box-info-sector">
                    <h3>Gimnasios</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Gimnasios")}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img src="/images/sectors/salud.webp" alt="Sector salud" />
                  <div className="box-info-sector">
                    <h3>Salud</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Salud")}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
              <div>
                <article className="flex-1">
                  <img
                    src="/images/sectors/legal.webp"
                    alt="Sector legal y contable"
                  />
                  <div className="box-info-sector">
                    <h3>
                      Despachos <br /> Legales / Contables
                    </h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage(
                        "Despachos Legales / Contables",
                      )}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
              <div>
                <article className="flex-1">
                  <img
                    src="/images/sectors/startups.webp"
                    alt="Sector empresas y startups"
                  />
                  <div className="box-info-sector">
                    <h3>Empresas / Startups</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage(
                        "Empresas / Startups",
                      )}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img
                    src="/images/sectors/school.webp"
                    alt="Sector educación"
                  />
                  <div className="box-info-sector">
                    <h3>Educación</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Educación")}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>

              <div>
                <article className="flex-1">
                  <img
                    src="/images/sectors/bar.webp"
                    alt="Sector antros y bares"
                  />
                  <div className="box-info-sector">
                    <h3>Antros / Bares</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage(
                        "Antros / Bares",
                      )}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img
                    src="/images/sectors/barber.webp"
                    alt="Sector barberías"
                  />
                  <div className="box-info-sector">
                    <h3>Barberías</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Barberías")}>
                      Más información
                    </Button>
                  </div>
                </article>
                <article className="flex-1">
                  <img
                    src="/images/sectors/tattoo.webp"
                    alt="Sector tatuajes"
                  />
                  <div className="box-info-sector">
                    <h3>Tatuajes</h3>
                    <Button
                      size="sm"
                      variant="glass"
                      whatsappMessage={getSectorWhatsappMessage("Tatuajes")}>
                      Más información
                    </Button>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
