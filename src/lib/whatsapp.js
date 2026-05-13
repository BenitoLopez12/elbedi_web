import site from "@/content/site.js";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, me gustaria recibir asesoria para mi sitio web";

export function buildWhatsAppUrl(
  message = DEFAULT_WHATSAPP_MESSAGE,
  phone = site.phone,
) {
  const whatsappPhone = String(phone ?? "").replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    message || DEFAULT_WHATSAPP_MESSAGE,
  );

  if (!whatsappPhone) {
    return `https://wa.me/?text=${whatsappMessage}`;
  }

  return `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;
}
