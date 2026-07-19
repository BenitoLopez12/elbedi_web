// Iconografía de la experiencia (stroke 1.6, estilo consistente).

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const ICONS = {
  home: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9.5V20a.8.8 0 0 0 .8.8h11.4a.8.8 0 0 0 .8-.8V9.5" />
      <path d="M9.8 20.5v-5.4a1 1 0 0 1 1-1h2.4a1 1 0 0 1 1 1v5.4" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <path d="M9.5 21h5M12 17.5V21" />
      <path d="m7 12 2-2 2.2 2.4L14.6 9l2.4 2.6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.8a8.2 8.2 0 0 0-7.1 12.3L4 20l4-.85A8.2 8.2 0 1 0 12 3.8Z" />
      <path d="M9.3 8.7c-.3 2.5 3.5 6.3 6 6l.4-1.5-2-1-.8.7c-.9-.4-1.7-1.2-2.1-2.1l.7-.8-1-2-1.2.7Z" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5.2" r="2.2" />
      <circle cx="5.2" cy="17.5" r="2.2" />
      <circle cx="18.8" cy="17.5" r="2.2" />
      <path d="M10.9 7.1 6.4 15.6M13.1 7.1l4.5 8.5M7.4 17.5h9.2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v15.2a.8.8 0 0 0 .8.8H20" />
      <path d="M7.5 15.5v-4M11.5 15.5V8M15.5 15.5v-5.5M19 8.5 15.8 5.5l-2.6 2.4L10.5 5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="5.5" r="2" />
      <circle cx="18" cy="18.5" r="2" />
      <path d="M8 5.5h7a3.5 3.5 0 0 1 0 7H9a3.5 3.5 0 0 0 0 7h7" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5c.7 4.2 2.3 5.8 6.5 6.5-4.2.7-5.8 2.3-6.5 6.5-.7-4.2-2.3-5.8-6.5-6.5 4.2-.7 5.8-2.3 6.5-6.5Z" />
      <path d="M18.5 15.5c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8Z" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.6 9.6a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2.9-1.2 1.8v.3" />
      <path d="M12 16.8v.2" />
    </>
  ),
  mail: (
    <>
      <rect x="3.2" y="5.5" width="17.6" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </>
  ),
  send: <path d="m4.5 11.2 15-7-4.2 15.6-3.4-6.3-7.4-2.3Zm7.4 2.3 7.6-9.3" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  chat: (
    <>
      <path d="M4 6.8A2.8 2.8 0 0 1 6.8 4h10.4A2.8 2.8 0 0 1 20 6.8v7.4a2.8 2.8 0 0 1-2.8 2.8H9l-4 3.5V6.8Z" />
      <path d="M8.5 9.5h7M8.5 12.5h4.5" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z" />
      <path d="m4.5 12.5 7.5 4 7.5-4M4.5 16.5l7.5 4 7.5-4" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="7.5" width="14" height="10.5" rx="3" />
      <path d="M12 4.5v3M9 4.5h6" />
      <circle cx="9.4" cy="12.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="12.4" r="1" fill="currentColor" stroke="none" />
      <path d="M9.5 15.4c1.6 1 3.4 1 5 0" />
    </>
  ),
};

export default function Icon({ name, size = 22, className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      {...base}
      {...props}>
      {ICONS[name] || ICONS.spark}
    </svg>
  );
}
