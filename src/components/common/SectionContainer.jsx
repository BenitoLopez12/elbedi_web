export default function SectionContainer({ children, className = "" }) {
  return <section className={`${className}`}>{children}</section>;
}
