// Small inline SVG icons, so no icon library is needed.
// They use currentColor, so they take the text color of their parent.

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Logo(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="9" fill="var(--accent)" />
      <path d="M10 16.5l4 4 8-9" fill="none" stroke="var(--accent-contrast)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
