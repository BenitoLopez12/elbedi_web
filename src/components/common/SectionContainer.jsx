export default function SectionContainer({
  children,
  className = "",
  ...props
}) {
  return (
    <section className={`${className}`} {...props}>
      {children}
    </section>
  );
}
