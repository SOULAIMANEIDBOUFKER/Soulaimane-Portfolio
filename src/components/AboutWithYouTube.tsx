/**
 * About section with embedded YouTube video
 * Senior note: Lazy loads iframe for performance, responsive embed with aspect ratio, enhanced for professional presentation
 */
import { useTranslation } from 'react-i18next';

interface AboutWithYouTubeProps {
  youtubeUrl: string;
}

const AboutWithYouTube = ({ youtubeUrl }: AboutWithYouTubeProps) => {
  const { t } = useTranslation();

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0] || url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            {t('about.watch_video')}
          </p>

          <div className="relative w-full rounded-xl overflow-hidden shadow-glow bg-card transition-shadow hover:shadow-glow-strong">
            {/* 16:9 aspect ratio container */}
            <div className="relative pb-[56.25%]">
              <iframe
                src={getYouTubeEmbedUrl(youtubeUrl)}
                title="Professional Introduction Video"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWithYouTube;