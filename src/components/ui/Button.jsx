export default function Button({ children, href = "#", className = "" }) {
  return (
    <a
      href={href}
      className={`inline-block px-8 py-3 text-slate-900 bg-cyan-100  font-medium text-sm tracking-wide uppercase rounded-full hover:bg-white duration-300 ${className}`}>
      {children}
    </a>
  );
}
