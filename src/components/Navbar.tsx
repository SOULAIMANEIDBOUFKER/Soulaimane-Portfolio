/**
 * Sticky navigation bar matching the design in the image with theme/language controls
 * Senior note: Clean, minimalist design with smooth scroll and responsive menu
 */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['about', 'skills', 'certificates', 'projects', 'contact'];
      const scrollY = window.scrollY + 100; // تم تغيير scrollPosition إلى scrollY
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'certificates', href: '#certificates' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (href: string, key: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(key);
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-medium py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Left side */}
          <a
            href="#"
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow">
              <span className="text-lg font-bold text-primary-foreground">SE</span>
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:inline-block group-hover:text-primary transition-colors">
              Soulaimane
            </span>
          </a>

          {/* Desktop Navigation - Center aligned */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href, item.key)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeSection === item.key
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          {/* Right side - Theme, Language controls and Download CV */}
          <div className="flex items-center gap-2">
            {/* Theme toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={t('theme.toggle')}
              className="h-9 w-9 rounded-full hover:bg-secondary"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Language toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label={t('language.toggle')}
              className="h-9 w-9 rounded-full hover:bg-secondary"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Download CV button - Desktop only */}
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden lg:flex hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              asChild
            >
              <a 
                href="/cv.pdf" 
                download
                className="flex items-center gap-1"
              >
                <span className="text-xs font-medium">Download CV</span>
              </a>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-full hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-t border-border animate-fade-in shadow-strong">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href, item.key)}
                  className={`py-3 px-4 text-base font-medium rounded-lg transition-all duration-200 text-left ${
                    activeSection === item.key
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
              
              {/* Mobile controls section */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label={t('theme.toggle')}
                    className="h-10 w-10 rounded-full"
                  >
                    {theme === 'light' ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    aria-label={t('language.toggle')}
                    className="h-10 w-10 rounded-full"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Mobile Download CV button */}
                <a 
                  href="/cv.pdf" 
                  download
                  className="py-2 px-4 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  Download CV
                </a>
              </div>
              
              {/* Current language indicator */}
              <div className="text-xs text-muted-foreground text-center pt-2">
                Current language: {i18n.language === 'en' ? 'English' : 'German'}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;