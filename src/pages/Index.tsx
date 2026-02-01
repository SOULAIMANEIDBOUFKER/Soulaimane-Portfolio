import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Hero3D from '@/components/Hero3D';
import AboutWithYouTube from '@/components/AboutWithYouTube';
import SkillsGrid from '@/components/SkillsGrid';
import CertificatesSection from '@/components/certificates/CertificatesSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import type { PortfolioData } from '@/types/portfolio';

const Index = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch portfolio data
    fetch('/data/portfolio.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load portfolio data');
        return res.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((err) => {
        console.error('Error loading portfolio data:', err);
        setError('Failed to load portfolio. Please refresh the page.');
      });
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero3D candidate={data.candidate} />

        <AboutWithYouTube youtubeUrl={data.candidate.youtube_about} />

        <SkillsGrid skills={data.candidate.skills} />

        <CertificatesSection
          groups={data.certificate_groups}
          standalone={data.standalone_certificates}
        />

        <ProjectsGrid projects={data.projects} />


        <ContactSection
          contact={data.candidate.contact}
          lebenslaufPdf={data.candidate.downloadables.lebenslauf_pdf}
        />
      </main>

      <Footer />

      {/* Floating WhatsApp button */}
      <WhatsAppFab href={data.candidate.contact?.whatsapp} />
    </div>
  );
};

export default Index;