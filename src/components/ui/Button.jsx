import { buildWhatsAppUrl } from "@/lib/whatsapp.js";

export default function Button({
  children,
  href = "#",
  className = "",
  variant = "solid",
  size = "md",
  whatsappMessage,
  target,
  rel,
}) {
  const isWhatsAppButton = Boolean(whatsappMessage);
  const resolvedHref = isWhatsAppButton
    ? buildWhatsAppUrl(whatsappMessage)
    : href;
  const resolvedTarget = isWhatsAppButton ? "_blank" : target;
  const resolvedRel = isWhatsAppButton ? "noreferrer" : rel;
  const variantClasses = {
    solid: "text-slate-900 bg-cyan-100 hover:bg-white",
    glass:
      "text-white border border-white bg-slate-900/20 hover:bg-slate-900/50 backdrop-blur-xs",
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm uppercase",
    lg: "px-8 py-4 text-base uppercase",
  };
  const buttonVariantClass = variantClasses[variant] ?? variantClasses.solid;
  const buttonSizeClass = sizeClasses[size] ?? sizeClasses.md;

  return (
    <a
      href={resolvedHref}
      target={resolvedTarget}
      rel={resolvedRel}
      className={`inline-block font-medium tracking-wide rounded-xl duration-300 ${buttonVariantClass} ${buttonSizeClass} ${className}`}>
      {children}
    </a>
  );
}
