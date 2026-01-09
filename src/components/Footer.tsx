/**
 * Footer component
 * Senior note: Minimal, professional footer with tech stack reference
 */
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {currentYear} Soulaimane Id boufker. {t('footer.rights')}.
          </p>
          <p className="text-xs text-muted-foreground">
            {t('footer.built_with')} React, TypeScript, Three.js, Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
