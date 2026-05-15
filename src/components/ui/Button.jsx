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
    solid: "text-slate-900 bg-cyan-100 border border-slate-500 hover:bg-white ",
    glass:
      "text-white border border-white bg-slate-900/20 hover:bg-slate-900/50 backdrop-blur-xs",
  };
  const sizeClasses = {
    sm: "2xl:px-6 2xl:py-3 px-4 py-2 2xl:text-xs xl:text-xs text-xs",
    md: "2xl:px-6 2xl:py-3 px-4 py-2 2xl:text-sm xl:text-xs text-xs uppercase",
    lg: "2xl:px-8 2xl:py-4 px-6 py-3 2xl:text-base xl:text-sm text-xs uppercase",
  };
  const buttonVariantClass = variantClasses[variant] ?? variantClasses.solid;
  const buttonSizeClass = sizeClasses[size] ?? sizeClasses.md;

  return (
    <a
      href={resolvedHref}
      target={resolvedTarget}
      rel={resolvedRel}
      className={`inline-block text-center text-balance font-medium tracking-wide rounded-xl shadow-lg duration-300 ${buttonVariantClass} ${buttonSizeClass} ${className}`}>
      {children}
    </a>
  );
}
