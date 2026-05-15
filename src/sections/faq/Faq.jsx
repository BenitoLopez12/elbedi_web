import SectionContainer from "@/components/common/SectionContainer.jsx";
import LimitContainer from "@/components/common/LimitContainer.jsx";
import Button from "@/components/ui/Button.jsx";
import { SEO_FAQS } from "@/content/seoContent.js";

export default function Faq() {
  return (
    <SectionContainer id="faq" className="relative">
      <LimitContainer className="py-24 md:py-28">
        <h2 className="2xl:text-6xl xl:text-5xl text-4xl text-center">
          Preguntas frecuentes sobre tu sitio web
        </h2>
        <p className="mt-4 text-center text-white/75 2xl:max-w-5xl max-w-3xl mx-auto text-base 2xl:text-lg">
          Resolvemos dudas comunes sobre diseño web, SEO en México,
          mantenimiento y alcance para que tomes una decisión con claridad.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {SEO_FAQS.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6"
              itemScope
              itemType="https://schema.org/Question">
              <h3 className="text-2xl leading-tight" itemProp="name">
                {item.question}
              </h3>
              <p
                className="mt-3 text-white/85 leading-relaxed"
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer">
                <span itemProp="text">{item.answer}</span>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button whatsappMessage="Hola, quiero resolver algunas dudas sobre mi proyecto web.">
            Quiero asesoría personalizada
          </Button>
        </div>
      </LimitContainer>
    </SectionContainer>
  );
}
