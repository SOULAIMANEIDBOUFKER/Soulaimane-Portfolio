/**
 * Contact section with prominent CTA and floating WhatsApp button
 * Senior note: High contrast, accessible links, external link security
 */
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MessageCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactSectionProps {
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    whatsapp: string;
  };
  lebenslaufPdf: string;
}

const ContactSection = ({ contact, lebenslaufPdf }: ContactSectionProps) => {
  const { t } = useTranslation();

  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: contact.phone,
      href: `tel:${contact.phone}`,
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: contact.linkedin,
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      href: contact.github,
    },
  ];

  return (
    <>
      <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('contact.subtitle')}
              </p>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  asChild
                  className="shadow-glow animate-glow"
                >
                  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t('contact.cta_text')}
                  </a>
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <a href={lebenslaufPdf} download>
                    <Download className="mr-2 h-5 w-5" />
                    {t('contact.download_cv')}
                  </a>
                </Button>
              </div>

              {/* Contact Links */}
              <p className="text-sm text-muted-foreground mb-4">
                {t('contact.or')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {contactLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-smooth border border-border"
                  >
                    <div className="text-primary">{link.icon}</div>
                    <span className="font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-accent hover:bg-accent-glow rounded-full shadow-strong flex items-center justify-center text-white animate-float"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </>
  );
};

export default ContactSection;