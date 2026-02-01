// src/components/certificates/CertificatesSection.tsx
import { useTranslation } from 'react-i18next';
import CertGroup from './CertGroup';
import CertItem from './CertItem';
import type { CertificateGroup, CertModule } from '@/types/portfolio';

interface CertificatesSectionProps {
  groups: CertificateGroup[];
  standalone: CertModule[];
}

const CertificatesSection = ({ groups, standalone }: CertificatesSectionProps) => {
  const { t } = useTranslation();

  const professionalCerts = standalone.filter(cert => cert.type === 'Professional');
  const educationCerts = standalone.filter(cert => 
    cert.type === 'Education' || cert.type === 'Language'
  );

  return (
    <section id="certificates" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('certificates.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('certificates.subtitle')}
            </p>
          </div>

          {/* Professional Certificates Groups */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h3 className="text-2xl font-semibold text-foreground whitespace-nowrap">
                {t('certificates.professional_certificates')}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {groups.map((group) => (
                <CertGroup key={group.id} group={group} />
              ))}
            </div>

          </div>

          {/* Education & Language Section */}
          {educationCerts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h3 className="text-2xl font-semibold text-foreground whitespace-nowrap">
                  {t('certificates.education_language')}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {educationCerts.map((cert, index) => (
                  <CertItem 
                    key={cert.id} 
                    module={cert} 
                    index={index}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;