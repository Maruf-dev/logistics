import Link from "next/link";

type BrandProps = {
  /** When true, render only the wordmark (used inside the mobile drawer header). */
  wordmarkOnly?: boolean;
};

/** Harb Trucking logo + wordmark. */
export default function Brand({ wordmarkOnly = false }: BrandProps) {
  const wordmark = (
    <span className="wm">
      <b>HARB</b>
      <span>TRUCKING</span>
    </span>
  );

  if (wordmarkOnly) {
    return <span className="brand">{wordmark}</span>;
  }

  return (
    <Link href="#top" className="brand" aria-label="Harb Trucking">
      <svg className="logo" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="37" height="37" rx="7" fill="#fff" />
        <path
          d="M8 26 L18 12 L24 21 L28 16 L33 26"
          stroke="var(--ink)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="12" r="2.6" fill="var(--accent)" />
      </svg>
      {wordmark}
    </Link>
  );
}
