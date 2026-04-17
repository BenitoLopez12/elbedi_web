export default function Button({ children, href = "#", className = "" }) {
  return (
    <a
      href={href}
      className={`inline-block px-8 py-3 bg-white text-neutral-950 font-medium text-sm tracking-wide uppercase rounded-sm hover:bg-neutral-200 transition-colors duration-300 ${className}`}
    >
      {children}
    </a>
  );
}
