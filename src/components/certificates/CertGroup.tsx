/**
 * مجموعة شهادات قابلة للتوسع بأسلوب أكورديون.
 * تبدأ مغلقة لعرض نظيف.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CertItem from './CertItem';
import type { CertificateGroup } from '@/types/portfolio';

interface CertGroupProps {
  group: CertificateGroup;
}

const CertGroup = ({ group }: CertGroupProps) => {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false); // تبدأ مغلقة

  const title = i18n.language === 'de' ? group.title_de : group.title_en;

  return (
    <div className="bg-card rounded-lg shadow-soft hover:shadow-medium transition-smooth border border-border">
      {/* رأس المجموعة */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={isExpanded}
        aria-controls={`cert-group-${group.id}`}
      >
        <div className="flex items-center gap-4">
          <img
            src={group.thumbnail || '/placeholder.svg'}
            alt={title}
            className="w-12 h-12 object-contain rounded-md"
          />
          <div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-smooth">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {group.modules.length} {t('certificates.modules')}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-primary" />
        ) : (
          <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-smooth" />
        )}
      </button>

      {/* الشهادات المتوسعة */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`cert-group-${group.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-6 space-y-4 bg-muted/10">
              {group.modules.map((module, index) => (
                <CertItem key={module.id} module={module} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertGroup;