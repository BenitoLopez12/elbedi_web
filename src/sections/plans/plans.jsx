import { useEffect, useRef, useState } from "react";
import SectionContainer from "../../components/common/SectionContainer.jsx";
import LimitContainer from "../../components/common/LimitContainer.jsx";
import Button from "@/components/ui/Button";

const BILLING_OPTIONS = [
  { key: "monthly", label: "Mensual" },
  { key: "yearly", label: "Anual" },
  { key: "oneTime", label: "Pago unico" },
];

const BILLING_CYCLE_MESSAGE_LABEL = {
  monthly: "al mes",
  yearly: "anual",
  oneTime: "pago unico",
};

const BILLING_THEME = {
  monthly: {
    switchBg: "bg-cyan-100",
    activeCard:
      "border-cyan-200/70 bg-cyan-100/10 shadow-[0_0_45px_rgba(125,211,252,0.25)]",
    badge: "bg-cyan-100 text-slate-900",
    price: "text-cyan-100",
    bullet: "bg-cyan-200",
  },
  yearly: {
    switchBg: "bg-amber-200",
    activeCard:
      "border-amber-300/70 bg-amber-200/10 shadow-[0_0_45px_rgba(251,207,232,0.25)]",
    badge: "bg-amber-200 text-slate-900",
    price: "text-amber-200",
    bullet: "bg-amber-300",
  },
  oneTime: {
    switchBg: "bg-rose-200",
    activeCard:
      "border-rose-300/70 bg-rose-200/10 shadow-[0_0_45px_rgba(221,214,254,0.25)]",
    badge: "bg-rose-200 text-slate-900",
    price: "text-rose-200",
    bullet: "bg-rose-300",
  },
};

const getPriceDisplay = (priceData) => {
  if (typeof priceData === "string") {
    return { previous: null, current: priceData };
  }

  return {
    previous: priceData?.previous ?? null,
    current: priceData?.current ?? "",
  };
};

const PLANS = [
  {
    key: "ia-express",
    name: "Express",
    subtitle:
      "Presencia digital rapida y accesible para negocios que necesitan una pagina web profesional sin procesos complejos.",
    setupLabel: "DISEÑO Y DESARROLLO",
    setupPrice: {
      monthly: { previous: "$69 USD", current: "GRATIS" },
      yearly: { previous: "$99 USD", current: "GRATIS" },
      oneTime: { previous: "", current: "$299 USD" },
    },
    billing: {
      monthly: { previous: "$16 USD / mes", current: "$13 USD / mes" },
      yearly: { previous: "$16 USD / mes", current: "$11 USD / mes" },
    },
    forWho: [
      "Freelancers",
      "Negocios locales",
      "Emprendimientos",
      "Locales de comida rapida",
      "Estetica",
      "Marcas personales",
    ],
    points: [
      "Dominio personalizado sin costo extra",
      "Hosting incluido sin costo extra",
      "Diseno generado y optimizado con IA",
      "Tiempo de entrega rapido",
      "Pagina web que carga rapidamente",
      "Diseno para dispositivos moviles y escritorio",
      "Certificado de seguridad SSL incluido",
      "Hasta 5 secciones",
      "Integracion de tu WhatsApp",
      "Formulario de contacto",
      "SEO basico",
      "Publicacion del sitio",
      "Mantenimiento y soporte tecnico",
      "Cambios mensuales",
    ],
    excludedPointsByCycle: {
      oneTime: ["Mantenimiento y soporte tecnico", "Cambios mensuales"],
    },
    cta: "Solicitar plan",
  },
  {
    key: "business",
    name: "Business",
    subtitle:
      "Una solucion mas solida y personalizada para empresas y negocios que necesitan una presencia digital mas profesional y estrategica.",
    setupLabel: "DISEÑO Y DESARROLLO",
    setupPrice: {
      monthly: { previous: "$329 USD", current: "$299 USD" },
      yearly: { previous: "$329 USD", current: "$279 USD" },
      oneTime: { previous: "", current: "$499 USD" },
    },
    billing: {
      monthly: { previous: "", current: "$32 USD / mes" },
      yearly: { previous: "$32 USD / mes", current: "$29 USD / mes" },
    },
    forWho: [
      "Empresas pequenas y medianas",
      "Clinicas",
      "Despachos",
      "Inmobiliarias",
      "Restaurantes premium",
      "Negocios en crecimiento",
    ],
    points: [
      "Todo lo incluido en el plan Express y mas",
      "Diseno profesional personalizado",
      "Estructura web profesional",
      "Multiples paginas",
      "Optimizacion para dispositivos moviles avanzada",
      "Configuracion de accesibilidad Web: Content Accessibility Guidelines (WCAG)",
      "SEO optimizado para motores de busqueda, redes sociales y chats de IA",
      "Multiples formularios avanzados",
      "Integracion de multiples redes sociales",
      "Soporte y mantenimiento continuo",
      "Cambios y actualizaciones",
      "Optimizacion continua",
      "Velocidad optimizada",
    ],
    excludedPointsByCycle: {
      oneTime: [
        "Soporte y mantenimiento continuo",
        "Cambios y actualizaciones",
        "Optimizacion continua",
      ],
    },
    highlighted: true,
    cta: "Quiero este plan",
  },
  {
    key: "CORPORATE-PARTNER",
    name: "Corporate Partner",
    subtitle:
      "Acompanamiento continuo para marcas y empresas que buscan evolucionar constantemente su presencia digital con soporte prioritario y mejoras continuas.",
    setupLabel: "DISEÑO Y DESARROLLO",
    setupPrice: {
      monthly: { previous: "", current: "$699 USD" },
      yearly: { previous: "$699 USD", current: "$599 USD" },
      oneTime: { previous: "", current: "$999 USD" },
    },
    billing: {
      monthly: { previous: "", current: "$69 USD / mes" },
      yearly: { previous: "$69 USD / mes", current: "$59 USD / mes" },
    },
    forWho: [
      "Marcas premium",
      "Empresas consolidadas",
      "Proyectos de alto valor",
      "Experiencias digitales avanzadas",
      "Negocios que requieren cambios frecuentes",
    ],
    points: [
      "Todo lo incluido en el plan Express, Business y mas",
      "Diseno y direccion visual premium, Rebranding para Sitios Webs",
      "Experiencia web avanzada",
      "Animaciones 3D e interacciones personalizadas",
      "Soporte, mantenimiento y consultoria prioritaria",
      "Mejora continua",
      "Cambios recurrentes",
      "Correos corporativos",
      "Rediseños y Campañas digitales con formularios y registros de eventos",
      "Diseño de la UI de correos corporativos para usuarios y clientes",
      "Mejoras visuales y funcionales segun las ultimas tendencias digitales",
      "Asesoria estrategica",
      "Integracion de nuevas secciones",
      "Seguimiento, monitoreo y evolucion del sitio",
      "Reportes de rendimiento y analitica avanzada",
    ],
    excludedPointsByCycle: {
      oneTime: [
        "Soporte, mantenimiento y consultoria prioritaria",
        "Mejora continua",
        "Cambios recurrentes",
        "Rediseños y Campañas digitales con formularios y registros de eventos",
        "Mejoras visuales y funcionales segun las ultimas tendencias digitales",
        "Integracion de nuevas secciones",
        "Seguimiento, monitoreo y evolucion del sitio",
      ],
    },
    cta: "Agendar una llamada",
  },
];

export default function Plans() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [displayedBillingCycle, setDisplayedBillingCycle] = useState("yearly");
  const [isSwitchingPrice, setIsSwitchingPrice] = useState(false);
  const switchTimeoutRef = useRef(null);
  const activeBillingIndex = BILLING_OPTIONS.findIndex(
    (option) => option.key === billingCycle,
  );
  const currentTheme = BILLING_THEME[billingCycle] ?? BILLING_THEME.monthly;

  const handleBillingChange = (nextCycle) => {
    if (nextCycle === billingCycle) return;

    setBillingCycle(nextCycle);
    setIsSwitchingPrice(true);

    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
    }

    switchTimeoutRef.current = setTimeout(() => {
      setDisplayedBillingCycle(nextCycle);
      setIsSwitchingPrice(false);
    }, 160);
  };

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SectionContainer id="plans">
      <LimitContainer className="py-24 md:py-35">
        <h2 className="text-4xl md:text-6xl font-bold text-center leading-tight">
          Planes disenados para crecer contigo
        </h2>
        <p className="mt-4 text-center text-white/75 max-w-5xl mx-auto text-base md:text-lg">
          Estos costos son estimados y pueden variar dependiendo de las
          necesidades especificas de tu proyecto. Contamos con planes flexibles
          y personalizados para adaptarnos a diferentes tipos de negocios y
          presupuestos.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="relative inline-grid grid-cols-3 rounded-full border border-white/20 bg-white/5 p-1">
            <span
              className={`absolute inset-y-1 left-1 w-[calc((100%-8px)/3)] rounded-full transition-all duration-300 ease-out ${currentTheme.switchBg}`}
              style={{ transform: `translateX(${activeBillingIndex * 100}%)` }}
            />
            {BILLING_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => handleBillingChange(option.key)}
                className={`relative z-10 rounded-full px-5 py-2 text-sm transition-colors ${
                  billingCycle === option.key
                    ? "text-slate-900"
                    : "text-white/80 hover:text-white"
                }`}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PLANS.map((plan) =>
            (() => {
              const isOneTimeCycle = displayedBillingCycle === "oneTime";
              const currentSetupLabel = isOneTimeCycle
                ? "DESARROLLO COMPLETO Y PUBLICACION"
                : plan.setupLabel;
              const excludedPointsInCurrentCycle =
                plan.excludedPointsByCycle?.[displayedBillingCycle] ?? [];
              const visiblePoints = plan.points.filter(
                (point) => !excludedPointsInCurrentCycle.includes(point),
              );
              const setupPriceDisplay = getPriceDisplay(
                plan.setupPrice[displayedBillingCycle],
              );
              const billingPriceDisplay = !isOneTimeCycle
                ? getPriceDisplay(plan.billing[displayedBillingCycle])
                : null;
              const billingCycleMessageLabel =
                BILLING_CYCLE_MESSAGE_LABEL[displayedBillingCycle] ?? "al mes";
              const whatsappPlanMessage = `Hola, me interesa el plan ${plan.name} con modalidad ${billingCycleMessageLabel}. Quiero mas informacion.`;

              return (
                <article
                  key={plan.key}
                  className={`rounded-3xl border p-7 md:p-8 backdrop-blur-sm transition-all duration-300 flex flex-col ${
                    plan.highlighted
                      ? currentTheme.activeCard
                      : "border-white/20 bg-white/5"
                  } ${isSwitchingPrice ? "scale-[0.99]" : "scale-100"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-3xl md:text-4xl leading-tight">
                      {plan.name}
                    </h3>
                    {plan.highlighted ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide font-semibold ${currentTheme.badge}`}>
                        Recomendado
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-white/80">{plan.subtitle}</p>

                  <div className="mt-6 rounded-2xl border border-white/15 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-white">
                      {currentSetupLabel}
                    </p>
                    {setupPriceDisplay.previous ? (
                      <p className="mt-2 text-sm md:text-base text-white/75 line-through decoration-white/70">
                        {setupPriceDisplay.previous}
                      </p>
                    ) : null}
                    <p
                      className={`mt-1 text-2xl md:text-3xl font-bold ${currentTheme.price}`}>
                      {setupPriceDisplay.current}
                    </p>
                    {!isOneTimeCycle ? (
                      <>
                        <p className="mt-3 text-sm text-white">
                          Soporte técnico y Mejora Continua
                        </p>
                        {billingPriceDisplay?.previous ? (
                          <p
                            className={`text-sm text-white/75 line-through decoration-white/70 transition-all duration-200 ${
                              isSwitchingPrice
                                ? "opacity-0 translate-y-1"
                                : "opacity-100 translate-y-0"
                            }`}>
                            {billingPriceDisplay.previous}
                          </p>
                        ) : null}
                        <p
                          className={`text-lg font-bold ${currentTheme.price} transition-all duration-200 ${
                            isSwitchingPrice
                              ? "opacity-0 translate-y-1"
                              : "opacity-100 translate-y-0"
                          }`}>
                          {billingPriceDisplay?.current}
                        </p>
                      </>
                    ) : (
                      <p className="mt-3 text-sm text-white/70">
                        En Pago Unico no se ofrece servicio de mantenimiento y
                        mejora continua
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <p className="text-sm uppercase tracking-wide text-white/65">
                      Pensado para
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {plan.forWho.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/85">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm uppercase tracking-wide text-white/65">
                      Incluye
                    </p>
                  </div>

                  <ul className="mt-3 space-y-3 text-white/85">
                    {visiblePoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          className={`mt-2 inline-block h-2 w-2 shrink-0 rounded-full ${currentTheme.bullet}`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    whatsappMessage={whatsappPlanMessage}
                    className="mt-8 w-full text-center">
                    {plan.cta}
                  </Button>
                </article>
              );
            })(),
          )}
        </div>

        <div className="mt-10 text-center max-w-2xl mx-auto">
          <p>¿No sabes qué plan elegir? </p>
          <p className="text-white/80 text-lg">
            Podemos ayudarte a encontrar la mejor opción según tu negocio y
            objetivos.
          </p>
          <Button
            whatsappMessage="Hola, necesito asesoria para elegir el plan ideal para mi negocio."
            variant="glass"
            size="md"
            className="mt-6">
            Asesoramiento personalizado
          </Button>
        </div>
      </LimitContainer>
    </SectionContainer>
  );
}
