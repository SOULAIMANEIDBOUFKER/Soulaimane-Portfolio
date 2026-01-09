/**
 * PDF viewer modal with toolbar controls
 * Senior note: Focus trap for accessibility, keyboard navigation (ESC to close)
 * Dynamic import prevents bloating initial bundle
 */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FocusTrap from 'focus-trap-react';
import { X, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PdfModalProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const PdfModal = ({ pdfUrl, title, onClose }: PdfModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Prevent body scroll when modal open
    document.body.style.overflow = 'hidden';

    // ESC key to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl);
    printWindow?.print();
  };

  return (
    <FocusTrap>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-modal-title"
      >
        <div
          className="bg-card rounded-lg shadow-strong w-full max-w-6xl max-h-[90vh] flex flex-col m-4 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 id="pdf-modal-title" className="text-lg font-semibold truncate pr-4">
              {title}
            </h2>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                aria-label={t('pdf_modal.download')}
              >
                <Download className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrint}
                aria-label={t('pdf_modal.print')}
              >
                <Printer className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label={t('pdf_modal.close')}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto p-4 bg-muted/30">
            <iframe
              src={pdfUrl}
              className="w-full h-full min-h-[600px] rounded border border-border"
              title={title}
              onError={(e) => {
                console.error('PDF load error:', e);
              }}
            />
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default PdfModal;