export default function LimitContainer({ children, className = "" }) {
  return (
    <div className={`w-9/10 max-w-7xl mx-auto ${className}`}>{children}</div>
  );
}
