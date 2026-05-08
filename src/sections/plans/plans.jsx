import { useEffect, useRef, useState } from "react";
import SectionContainer from "../../components/common/SectionContainer.jsx";
import LimitContainer from "../../components/common/LimitContainer.jsx";
import Button from "@/components/ui/Button";

const PLANS = [
  {
    key: "ia-express",
    name: "Express",
    subtitle:
      "Presencia digital rapida y accesible para negocios que necesitan una pagina web profesional sin procesos complejos.",
    setupLabel: "Desde",
    setupPrice: "$1,999 MXN",
    billing: {
      monthly: "$199 / mes",
      yearly: "$2,990 / ano",
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
      "Diseno generado y optimizado con IA",
      "Desarrollo rapido",
      "Diseno responsive",
      "Hasta 5 secciones",
      "Integracion WhatsApp",
      "Formulario de contacto",
      "SEO basico",
      "Publicacion del sitio",
      "Mantenimiento tecnico basico",
      "Cambios menores mensuales",
    ],
    cta: "Solicitar plan",
  },
  {
    key: "business",
    name: "Business",
    subtitle:
      "Una solucion mas solida y personalizada para empresas y negocios que necesitan una presencia digital mas profesional y estrategica.",
    setupLabel: "Desde",
    setupPrice: "$5,999 MXN",
    billing: {
      monthly: "$599 / mes",
      yearly: "$5,990 / ano",
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
      "Diseno personalizado supervisado",
      "Estructura web profesional",
      "Multiples paginas",
      "Optimizacion movil avanzada",
      "SEO optimizado",
      "Formularios avanzados",
      "Integracion redes sociales",
      "Soporte prioritario",
      "Cambios y actualizaciones recurrentes",
      "Optimizacion continua",
      "Velocidad optimizada",
    ],
    highlighted: true,
    cta: "Quiero este plan",
  },
  {
    key: "partner",
    name: "Partner",
    subtitle:
      "Acompanamiento continuo para marcas y empresas que buscan evolucionar constantemente su presencia digital con soporte prioritario y mejoras continuas.",
    setupLabel: "Desde",
    setupPrice: "$13,999 MXN",
    billing: {
      monthly: "$1,399 / mes",
      yearly: "$9,990 / ano",
    },
    forWho: [
      "Marcas premium",
      "Empresas consolidadas",
      "Proyectos de alto valor",
      "Experiencias digitales avanzadas",
      "Negocios que requieren cambios frecuentes",
    ],
    points: [
      "Diseno y direccion visual premium",
      "Experiencia web avanzada",
      "Soporte prioritario",
      "Mantenimiento continuo",
      "Cambios recurrentes",
      "Optimizacion constante",
      "Mejoras visuales y funcionales",
      "Asesoria estrategica",
      "Integracion de nuevas secciones",
      "Seguimiento y evolucion del sitio",
    ],
    cta: "Agendar una llamada",
  },
];

export default function Plans() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [displayedBillingCycle, setDisplayedBillingCycle] = useState("yearly");
  const [isSwitchingPrice, setIsSwitchingPrice] = useState(false);
  const switchTimeoutRef = useRef(null);

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
    <SectionContainer>
      <LimitContainer className="py-24 md:py-30">
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
          <div className="relative inline-flex rounded-full border border-white/20 bg-white/5 p-1">
            <span
              className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-cyan-100 transition-transform duration-300 ease-out ${
                billingCycle === "yearly" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              type="button"
              onClick={() => handleBillingChange("monthly")}
              className={`relative z-10 rounded-full px-5 py-2 text-sm transition-colors ${
                billingCycle === "monthly"
                  ? "text-slate-900"
                  : "text-white/80 hover:text-white"
              }`}>
              Mensual
            </button>
            <button
              type="button"
              onClick={() => handleBillingChange("yearly")}
              className={`relative z-10 rounded-full px-5 py-2 text-sm transition-colors ${
                billingCycle === "yearly"
                  ? "text-slate-900"
                  : "text-white/80 hover:text-white"
              }`}>
              Anual
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <article
              key={plan.key}
              className={`rounded-3xl border p-7 md:p-8 backdrop-blur-sm transition-all duration-300 flex flex-col ${
                plan.highlighted
                  ? "border-cyan-200/70 bg-cyan-100/10 shadow-[0_0_45px_rgba(125,211,252,0.25)]"
                  : "border-white/20 bg-white/5"
              } ${isSwitchingPrice ? "scale-[0.99]" : "scale-100"}`}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-3xl md:text-4xl leading-tight">
                  {plan.name}
                </h3>
                {plan.highlighted ? (
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide bg-cyan-100 text-slate-900 font-semibold">
                    Recomendado
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-white/80">{plan.subtitle}</p>

              <div className="mt-6 rounded-2xl border border-white/15 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wide text-white/65">
                  {plan.setupLabel}
                </p>
                <p className="mt-1 text-2xl md:text-3xl text-cyan-100">
                  {plan.setupPrice}
                </p>
                <p className="mt-3 text-sm text-white/70">Mantenimiento</p>
                <p
                  className={`text-lg text-white transition-all duration-200 ${
                    isSwitchingPrice
                      ? "opacity-0 translate-y-1"
                      : "opacity-100 translate-y-0"
                  }`}>
                  {plan.billing[displayedBillingCycle]}
                </p>
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
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-200" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <Button href="#" className="mt-8 w-full text-center">
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center max-w-2xl mx-auto">
          <p>¿No sabes qué plan elegir? </p>
          <p className="text-white/80 text-lg">
            Podemos ayudarte a encontrar la mejor opción según tu negocio y
            objetivos.
          </p>
          <Button href="#" className="mt-6">
            Asesoramiento personalizado
          </Button>
        </div>
      </LimitContainer>
    </SectionContainer>
  );
}
