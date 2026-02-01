import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PdfModal from './PdfModal';
import type { CertModule } from '@/types/portfolio';

interface CertItemProps {
  module: CertModule;
  index: number;
    variant?: 'default' | 'compact' | 'grouped';
}

const CertItem = ({ module, index }: CertItemProps) => {
  const { t, i18n } = useTranslation();
  const [showPdf, setShowPdf] = useState(false);

  const title = i18n.language === 'de' ? module.title_de : module.title_en;
  const description = i18n.language === 'de' ? module.short_de : module.short_en;

  const isInProgress = (module as any).status === 'in_progress';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-card rounded-lg p-4 shadow-soft hover:shadow-medium transition-smooth border border-border flex items-start gap-4"
      >
        <img
          src={module.thumbnail}
          alt={title}
          className="w-16 h-16 object-cover rounded-md border border-border"
          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            {isInProgress ? (
              <Badge variant="secondary" className="ml-2">
                <Clock className="w-3 h-3 mr-1" /> {t('certificates.in_progress_badge', 'In progress')}
              </Badge>
            ) : (
              <Badge variant="secondary" className="ml-2">
                <FileText className="w-3 h-3 mr-1" /> PDF
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" /> {module.issuer}
            </div>
          </div>
          {isInProgress ? (
            <Button size="sm" variant="secondary" disabled>
              {t('certificates.in_progress', 'In progress')}
            </Button>
          ) : (
            <Button size="sm" onClick={() => setShowPdf(true)}>
              {t('certificates.view_certificate', t('certificates.view_pdf'))}
            </Button>
          )}
        </div>
      </motion.div>

      {showPdf && !isInProgress && (
        <PdfModal pdfUrl={module.pdf} title={title} onClose={() => setShowPdf(false)} />
      )}
    </>
  );
};

export default CertItem;