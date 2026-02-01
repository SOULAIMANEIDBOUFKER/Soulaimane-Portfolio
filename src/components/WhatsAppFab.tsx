/**
 * Floating WhatsApp button (portfolio/demo).
 * Uses an inline SVG icon (no extra libraries).
 */
type WhatsAppFabProps = {
  href?: string;
};

const WhatsAppFab = ({ href }: WhatsAppFabProps) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-strong transition-all duration-200 hover:scale-[1.06] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.11 17.2c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.48-.89-.79-1.49-1.77-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.8.37c-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
    <path d="M16.02 3C8.84 3 3 8.82 3 15.98c0 2.51.74 4.95 2.14 7.04L3 29l6.17-2.02c2.02 1.1 4.3 1.68 6.63 1.68h.01c7.18 0 13.02-5.82 13.02-12.98C28.83 8.82 23.2 3 16.02 3zm7.59 20.48c-2.02 2.01-4.71 3.12-7.58 3.12h-.01c-2.12 0-4.2-.6-5.99-1.74l-.43-.26-3.66 1.2 1.19-3.57-.28-.46C5.5 20.02 4.78 18.02 4.78 16c0-6.2 5.05-11.24 11.26-11.24 6.21 0 11.26 5.04 11.26 11.24 0 3.01-1.18 5.83-3.69 8.48z" />
  </svg>
);

export default WhatsAppFab;
