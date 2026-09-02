import { useRef, useState } from "react";
import {
  AGENTES,
  ANALITICAS,
  CONTACTO,
  ESTUDIO,
  FAQS,
  PROCESO,
  WEBSITES,
  WHATSAPP_IA,
} from "@/content/experience.js";
import { SERVICE_PAGE_BY_SECTION } from "@/content/servicePages.js";
import { useCinematicScroll } from "@/experience/motion/useCinematicScroll.js";
import SmartScrollNav from "@/experience/navigation/SmartScrollNav.jsx";
import ExperienceBackdrop from "@/experience/ExperienceBackdrop.jsx";
import ActionButton from "@/experience/ui/ActionButton.jsx";
import Icon from "@/experience/ui/icons.jsx";
import TiltFrame from "@/experience/ui/TiltFrame.jsx";
import { BrowserFrame, PanelFrame, PhoneFrame } from "@/experience/ui/frames.jsx";
import MockWebsite from "@/experience/ui/mockups/MockWebsite.jsx";
import MockWhatsApp from "@/experience/ui/mockups/MockWhatsApp.jsx";
import MockAgentsGraph from "@/experience/ui/mockups/MockAgentsGraph.jsx";
import MockDashboard from "@/experience/ui/mockups/MockDashboard.jsx";
import FooterSection from "@/experience/sections/FooterSection.jsx";
import HeroAgenticSolarSystem from "@/experience/three/HeroAgenticSolarSystem.jsx";
import { dispatchIntent } from "@/experience/state/experienceStore.js";
import { buildWhatsAppUrl } from "@/lib/whatsapp.js";

const SERVICE_META = {
  websites: {
    number: "01",
    eyebrow: "Experiencias web cinematográficas",
    title: "Tu marca no necesita otra página.",
    accent: "Necesita una escena imposible de olvidar.",
    description: WEBSITES.description,
    bullets: WEBSITES.bullets,
    icon: "monitor",
    tone: "sky",
    note: "Scroll, dirección de arte, 3D y conversión en una sola toma.",
  },
  "whatsapp-ia": {
    number: "02",
    eyebrow: "Agentes para WhatsApp",
    title: "Cada mensaje encuentra una respuesta.",
    accent: "Cada conversación, un siguiente paso.",
    description: WHATSAPP_IA.description,
    bullets: WHATSAPP_IA.agents.map((agent) => ({
      title: agent.name,
      text: agent.role,
    })),
    icon: "whatsapp",
    tone: "mint",
    note: "Atención, venta y administración operando 24/7.",
  },
  agentes: {
    number: "03",
    eyebrow: "Sistemas agénticos",
    title: "De una tarea automatizada",
    accent: "a una operación que piensa en conjunto.",
    description: AGENTES.description,
    bullets: AGENTES.bullets,
    icon: "network",
    tone: "violet",
    note: "Especialistas, supervisores y humanos bajo un mismo sistema.",
  },
  analiticas: {
    number: "04",
    eyebrow: "Inteligencia de negocio",
    title: "Tus datos dejan de ser gráficas.",
    accent: "Se convierten en decisiones.",
    description: ANALITICAS.description,
    bullets: ANALITICAS.bullets,
    icon: "chart",
    tone: "rose",
    note: "Pregunta en lenguaje natural. Recibe contexto y acciones.",
  },
};

function HeroChapter() {
  const [curtainState, setCurtainState] = useState("idle");

  return (
    <>
      <section id="inicio" data-chapter className="cine-hero">
        <div className="cine-sticky cine-hero__stage">
          <div className="cine-hero__grid" aria-hidden="true" />
          <HeroAgenticSolarSystem />
          <div className="cine-scroll-cue" data-scroll-cue aria-hidden="true">
            <i />
          </div>
        </div>
        <div className="cine-hero__copy">
          <p className="cine-kicker" data-hero-kicker>
            <span data-hero-kicker-enter>ELBEDI</span>
            <span data-hero-kicker-enter>ESTUDIO DE INTELIGENCIA ARTIFICIAL · MX</span>
          </p>
          <h1 className="cine-hero__title" aria-label="Diseñamos la inteligencia de tu negocio">
            <span data-hero-line><span data-hero-line-enter>Diseñamos la</span></span>
            <span data-hero-line><span data-hero-line-enter>inteligencia</span></span>
            <span data-hero-line><span data-hero-line-enter>de tu negocio.</span></span>
          </h1>
          <p className="cine-hero__lead" data-hero-lead>
            <span data-hero-lead-enter>
              Integramos agentes y sistemas de IA en los procesos reales de tu empresa
              para vender, decidir y operar con mayor inteligencia.
            </span>
          </p>
          <div className="cine-hero__actions" data-hero-actions>
            <button
              type="button"
              data-hero-actions-enter
              className="cine-button cine-button--primary cine-button--curtain"
              data-curtain-state={curtainState}
              onPointerEnter={() => setCurtainState("enter")}
              onPointerLeave={() => setCurtainState("exit")}
              onFocus={() => setCurtainState("enter")}
              onBlur={() => setCurtainState("exit")}
              onClick={() =>
                dispatchIntent({ type: "navigate", section: "agentes", source: "hero" })
              }>
              <span className="cine-button__content">
                <span>Explorar soluciones de IA</span>
                <Icon name="arrow" size={16} />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="cine-prologue" aria-labelledby="prologue-title">
        <div className="cine-prologue__inner">
          <p className="cine-kicker cine-reveal">El cambio ya empezó</p>
          <h2 id="prologue-title" className="cine-prologue__title">
            La inteligencia artificial no es otra herramienta.
            <span data-prologue-accent>
              Es una nueva capa de operación.
            </span>
          </h2>
          <div className="cine-prologue__axis" aria-hidden="true">
            <span>ANTES</span>
            <i />
            <span>AHORA</span>
          </div>
          <p className="cine-prologue__body cine-reveal">
            Convertimos procesos, datos y conocimiento empresarial en sistemas de IA
            claros, medibles y gobernables. Tu equipo mantiene el control; la tecnología
            multiplica su capacidad.
          </p>
        </div>
      </section>
    </>
  );
}

function WebsiteVisual() {
  return (
    <div className="service-visual service-visual--web">
      <div className="service-visual__ghost service-visual__ghost--a" />
      <div className="service-visual__ghost service-visual__ghost--b" />
      <TiltFrame max={5}>
        <BrowserFrame url="elbedi.com / immersive-experience">
          <MockWebsite />
        </BrowserFrame>
      </TiltFrame>
      <a className="service-visual__link" href="/websites">
        Explorar ELBEDI Websites <Icon name="arrow" size={14} />
      </a>
    </div>
  );
}

function WhatsAppVisual() {
  return (
    <div className="service-visual service-visual--phone">
      <div className="phone-orbit" aria-hidden="true">
        <span><Icon name="spark" size={15} /> Intención detectada</span>
        <span><Icon name="bot" size={15} /> Respuesta verificada</span>
        <span><Icon name="chart" size={15} /> Prospecto calificado</span>
      </div>
      <div className="service-phone">
        <TiltFrame max={7}>
          <PhoneFrame className="aspect-[9/18.5]">
            <MockWhatsApp />
          </PhoneFrame>
        </TiltFrame>
      </div>
    </div>
  );
}

function AgentsVisual() {
  return (
    <div className="service-visual service-visual--agents">
      <div className="agents-orbit agents-orbit--one" aria-hidden="true" />
      <div className="agents-orbit agents-orbit--two" aria-hidden="true" />
      <TiltFrame max={4}>
        <PanelFrame title="ELBEDI OS · Sistema multi-agente">
          <MockAgentsGraph />
        </PanelFrame>
      </TiltFrame>
      <div className="agents-status" aria-hidden="true">
        <span><i /> 8 agentes coordinados</span>
        <span>Supervisión humana</span>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  return (
    <div className="service-visual service-visual--analytics">
      <div className="analytics-question" aria-hidden="true">
        <Icon name="bot" size={18} />
        <span>¿Qué cambió esta semana y qué hacemos ahora?</span>
      </div>
      <TiltFrame max={4}>
        <PanelFrame title="ELBEDI Inteligencia · En vivo">
          <MockDashboard />
        </PanelFrame>
      </TiltFrame>
      <div className="analytics-answer" aria-hidden="true">
        <span>Hallazgo detectado</span>
        <strong>+28% intención de compra</strong>
      </div>
    </div>
  );
}

const VISUALS = {
  websites: WebsiteVisual,
  "whatsapp-ia": WhatsAppVisual,
  agentes: AgentsVisual,
  analiticas: AnalyticsVisual,
};

const AI_NETWORK_NODES = [
  {
    icon: "monitor",
    signal: "EXPERIENCIA",
    title: "Sitios web inteligentes",
    text: "Canales digitales conectados con los procesos de tu empresa.",
  },
  {
    icon: "whatsapp",
    signal: "CONVERSACIÓN",
    title: "Agentes de mensajería",
    text: "Conversaciones que atienden, califican y convierten.",
  },
  {
    icon: "network",
    signal: "OPERACIÓN",
    title: "Operaciones multiagente",
    text: "Especialistas de IA coordinados alrededor de tu empresa.",
  },
  {
    icon: "chart",
    signal: "INTELIGENCIA",
    title: "Inteligencia estratégica",
    text: "Datos convertidos en contexto, decisiones y acción.",
  },
];

const NETWORK_PATHS = {
  desktop: [
    "M500 24 C500 178 125 146 125 458",
    "M500 24 C500 176 375 154 375 458",
    "M500 24 C500 176 625 154 625 458",
    "M500 24 C500 178 875 146 875 458",
  ],
  compact: [
    "M200 18 C200 116 100 118 100 260",
    "M200 18 C200 116 300 118 300 260",
    "M200 18 C200 286 100 300 100 570",
    "M200 18 C200 286 300 300 300 570",
  ],
};

function NetworkWires({ compact = false }) {
  const paths = compact ? NETWORK_PATHS.compact : NETWORK_PATHS.desktop;
  return (
    <svg
      className={`cine-ai-network__wires ${
        compact ? "cine-ai-network__wires--compact" : "cine-ai-network__wires--desktop"
      }`}
      viewBox={compact ? "0 0 400 620" : "0 0 1000 500"}
      preserveAspectRatio="none"
      aria-hidden="true"
      data-ai-flow>
      {paths.map((path) => (
        <g key={path}>
          <path className="cine-ai-network__wire" d={path} vectorEffect="non-scaling-stroke" />
          <path
            className="cine-ai-network__signal"
            d={path}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

function AiOperatingNetwork() {
  return (
    <div className="cine-ai-network" data-ai-network>
      <div className="cine-ai-network__core" data-ai-core>
        <span className="cine-ai-network__ring cine-ai-network__ring--outer" />
        <span className="cine-ai-network__ring cine-ai-network__ring--inner" />
        <div className="cine-ai-network__core-orb">
          <Icon name="bot" size={42} />
          <span>NÚCLEO DE IA</span>
          <small>Inteligencia orquestadora</small>
        </div>
      </div>

      <NetworkWires />
      <NetworkWires compact />

      <div className="cine-ai-network__nodes">
        {AI_NETWORK_NODES.map((node, index) => (
          <article
            className="cine-ai-terminal"
            data-ai-node
            key={node.title}
            style={{ "--terminal-delay": `${index * -180}ms` }}>
            <div className="cine-ai-terminal__device" aria-hidden="true">
              <div className="cine-ai-terminal__screen">
                <span className="cine-ai-terminal__status"><i /> EN LÍNEA</span>
                <Icon name={node.icon} size={24} />
                <small>{node.signal}</small>
                <div className="cine-ai-terminal__activity">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="cine-ai-terminal__base" />
            </div>
            <h3>{node.title}</h3>
            <p>{node.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ServiceChapter({ id, reverse = false }) {
  const meta = SERVICE_META[id];
  const servicePage = SERVICE_PAGE_BY_SECTION[id];
  const Visual = VISUALS[id];
  const whatsappMessage =
    id === "websites"
      ? WEBSITES.ctaWhatsapp
      : id === "whatsapp-ia"
        ? WHATSAPP_IA.ctaWhatsapp
        : id === "agentes"
          ? AGENTES.ctaWhatsapp
          : ANALITICAS.ctaWhatsapp;

  return (
    <section
      id={id}
      data-chapter
      data-service
      data-layout={reverse ? "reverse" : "normal"}
      className={`cine-service cine-service--${meta.tone}`}>
      <div className="cine-service__stage">
        <div className="cine-service__number" aria-hidden="true">{meta.number}</div>
        <div className="cine-service__line" aria-hidden="true" />
        <div className={`cine-service__layout ${reverse ? "cine-service__layout--reverse" : ""}`}>
          <div
            className="cine-service__act cine-service__act--promise"
            data-service-promise>
            <p className="cine-kicker">
              <span>SERVICIO {meta.number}</span>
              <span>{meta.eyebrow}</span>
            </p>
            <h2 className="cine-service__title cine-service__title--statement">
              {meta.title}
              <span>{meta.accent}</span>
            </h2>
          </div>

          <div className="cine-service__visual" data-service-visual>
            <Visual />
            <p className="cine-service__note">{meta.note}</p>
          </div>

          <div
            className="cine-service__act cine-service__act--details"
            data-service-details>
            <p className="cine-service__description" data-service-detail-item>
              {meta.description}
            </p>
            <ul className="cine-service__features">
              {meta.bullets.map((item, index) => (
                <li key={item.title} data-service-detail-item>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cine-service__actions" data-service-detail-item>
              <ActionButton
                className="cine-service__primary-action"
                variant={reverse ? "cool" : "solid"}
                whatsappMessage={whatsappMessage}>
                Diseñar esta solución
                <Icon name="arrow" size={16} />
              </ActionButton>
              <a className="cine-service__detail-link" href={servicePage.url}>
                Conocer el servicio
                <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessChapter() {
  return (
    <section id="proceso" data-chapter className="cine-process">
      <div className="cine-process__intro">
        <p className="cine-kicker cine-reveal">
          <span>DEL RETO AL SISTEMA</span>
          <span>Nuestra metodología</span>
        </p>
        <h2 className="cine-process__title cine-reveal">
          La inteligencia necesita
          <span> método.</span>
        </h2>
        <p className="cine-process__lead cine-reveal">{PROCESO.description}</p>
      </div>
      <div className="cine-process__track">
        <div className="cine-process__rail" aria-hidden="true"><i /></div>
        {PROCESO.steps.map((step, index) => (
          <article className="cine-process__step" key={step.num} data-process-step>
            <span className="cine-process__step-number">{step.num}</span>
            <div>
              <p>ACTO {index + 1}</p>
              <h3>{step.title}</h3>
              <span>{step.text}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StudioChapter() {
  return (
    <section id="estudio" data-chapter className="cine-studio">
      <div className="cine-studio__glow" aria-hidden="true" />
      <div className="cine-studio__inner">
        <p className="cine-kicker cine-reveal">
          <span>POR QUÉ ELBEDI</span>
          <span>Dirección humana · Escala inteligente</span>
        </p>
        <h2 className="cine-studio__title cine-reveal">
          Tu nuevo sistema de
          <span>operación inteligente.</span>
        </h2>
        <p className="cine-studio__lead cine-reveal">{ESTUDIO.description}</p>
        <AiOperatingNetwork />
        <blockquote className="cine-studio__quote cine-reveal">
          <span className="cine-studio__quote-accent">
            “La IA debe ampliar la capacidad de tu empresa.
          </span>
          <span className="cine-studio__quote-solid">
            La operación debe seguir siendo confiable, medible y humana.”
          </span>
        </blockquote>
      </div>
    </section>
  );
}

function FaqChapter() {
  const [open, setOpen] = useState(0);
  return (
    <section
      id="faq"
      data-chapter
      data-reversible-section
      className="cine-faq">
      <div className="cine-faq__heading">
        <p className="cine-kicker cine-reveal">
          <span>ANTES DE EMPEZAR</span>
          <span>Preguntas frecuentes</span>
        </p>
        <h2 className="cine-faq__title cine-reveal">
          Claridad antes
          <span> de construir.</span>
        </h2>
      </div>
      <div className="cine-faq__list">
        {FAQS.map((item, index) => {
          const isOpen = index === open;
          return (
            <article key={item.q} className={isOpen ? "is-open" : ""} data-faq-item>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpen(isOpen ? -1 : index)}>
                <span>0{index + 1}</span>
                <strong>{item.q}</strong>
                <i><span /><span /></i>
              </button>
              <div id={`faq-answer-${index}`} className="cine-faq__answer" aria-hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContactChapter() {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const message = `Hola ELBEDI, soy ${name || "..."}. ${idea || "Quiero platicar sobre un proyecto de inteligencia artificial."}`;

  return (
    <section
      id="contacto"
      data-chapter
      data-reversible-section
      className="cine-contact">
      <div className="cine-contact__orb" aria-hidden="true" />
      <div className="cine-contact__inner">
        <div className="cine-contact__copy">
          <p className="cine-kicker cine-reveal">
            <span>EL SIGUIENTE PASO</span>
            <span>Tu empresa, aumentada</span>
          </p>
          <h2 className="cine-contact__title cine-reveal">
            Construyamos algo
            <span> que trabaje por ti.</span>
          </h2>
          <p className="cine-contact__lead cine-reveal">{CONTACTO.description}</p>
        </div>

        <form
          className="cine-contact__form"
          onSubmit={(event) => {
            event.preventDefault();
            window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
          }}>
          <p>Diagnóstico inicial · 01 minuto</p>
          <label>
            <span>Tu nombre</span>
            <input
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="¿Cómo te llamas?"
              required
            />
          </label>
          <label>
            <span>El reto que quieres resolver</span>
            <textarea
              name="project"
              autoComplete="off"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Queremos vender, automatizar, entender nuestros datos..."
              rows={4}
              required
            />
          </label>
          <button type="submit" className="cine-button cine-button--primary">
            Continuar por WhatsApp
            <Icon name="whatsapp" size={17} />
          </button>
          <small>Sin compromiso · respuesta del equipo el mismo día.</small>
        </form>
      </div>
    </section>
  );
}

export default function Experience() {
  const rootRef = useRef(null);
  useCinematicScroll(rootRef);

  return (
    <div ref={rootRef} className="cine-page">
      <ExperienceBackdrop />
      <div className="cine-progress" aria-hidden="true"><i data-scroll-progress /></div>
      <SmartScrollNav />
      <main id="main-content" tabIndex={-1} className="cine-main">
        <HeroChapter />
        <ServiceChapter id="websites" />
        <ServiceChapter id="whatsapp-ia" reverse />
        <ServiceChapter id="agentes" />
        <ServiceChapter id="analiticas" reverse />
        <ProcessChapter />
        <StudioChapter />
        <FaqChapter />
        <ContactChapter />
      </main>
      <FooterSection />
    </div>
  );
}
