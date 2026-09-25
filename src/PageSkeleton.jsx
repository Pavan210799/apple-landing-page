export default function PageSkeleton({ className = "" }) {
  return (
    <div
      className={`page-skeleton${className ? ` ${className}` : ""}`}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="page-skeleton__nav">
        <span className="page-skeleton__bone page-skeleton__bone--sm" />
        <span className="page-skeleton__bone page-skeleton__bone--logo" />
        <span className="page-skeleton__nav-side">
          <span className="page-skeleton__bone page-skeleton__bone--icon" />
          <span className="page-skeleton__bone page-skeleton__bone--icon" />
        </span>
      </div>
      <div className="page-skeleton__chapter">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="page-skeleton__chapter-item">
            <span className="page-skeleton__bone page-skeleton__bone--circle" />
            <span className="page-skeleton__bone page-skeleton__bone--label" />
          </span>
        ))}
      </div>
      <div className="page-skeleton__hero">
        <span className="page-skeleton__bone page-skeleton__bone--kicker" />
        <span className="page-skeleton__bone page-skeleton__bone--title" />
        <span className="page-skeleton__bone page-skeleton__bone--title page-skeleton__bone--short" />
        <span className="page-skeleton__bone page-skeleton__bone--price" />
        <span className="page-skeleton__cta">
          <span className="page-skeleton__bone page-skeleton__bone--pill" />
          <span className="page-skeleton__bone page-skeleton__bone--link" />
        </span>
        <span className="page-skeleton__bone page-skeleton__bone--media" />
      </div>
      <div className="page-skeleton__hero page-skeleton__hero--dark">
        <span className="page-skeleton__bone page-skeleton__bone--title page-skeleton__bone--on-dark" />
        <span className="page-skeleton__bone page-skeleton__bone--price page-skeleton__bone--on-dark" />
        <span className="page-skeleton__cta">
          <span className="page-skeleton__bone page-skeleton__bone--pill" />
          <span className="page-skeleton__bone page-skeleton__bone--link page-skeleton__bone--on-dark" />
        </span>
        <span className="page-skeleton__bone page-skeleton__bone--media page-skeleton__bone--on-dark" />
      </div>
      <div className="page-skeleton__grid">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="page-skeleton__card">
            <span className="page-skeleton__bone page-skeleton__bone--card-title" />
            <span className="page-skeleton__bone page-skeleton__bone--card-body" />
            <span className="page-skeleton__bone page-skeleton__bone--card-media" />
          </span>
        ))}
      </div>
    </div>
  );
}
