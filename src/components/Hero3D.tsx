import { useEffect, useRef, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Download, ArrowDown, Loader2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Loading component for 3D model
const ModelLoadingIndicator = () => {
  return (
    <div className="w-full h-full gradient-hero flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground animate-pulse">
        Loading 3D model...
      </p>
    </div>
  );
};

const LaptopModel = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const { scene } = useGLTF('/models/laptop.glb');
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.25,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.12,
        0.08
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.8} position={[0, -0.6, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
};

interface Hero3DProps {
  candidate: {
    name: string;
    role: { de: string; en: string };
    photo: string;
    downloadables: { lebenslauf_pdf: string };
    skills?: string[];
  };
}

const Hero3D = ({ candidate }: Hero3DProps) => {
  const { t, i18n } = useTranslation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative min-h-screen bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 min-h-[90vh] py-8 lg:py-0">
          
          {/* Left: Personal Info - Better balanced */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start space-y-8 lg:space-y-10">
            
            {/* Profile Image - Fixed positioning for face */}
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-70 animate-pulse"></div>
              
              {/* Main image with perfect circle - FACE POSITION FIX */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-glow-strong bg-gradient-to-br from-primary/10 to-accent/10">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                  style={{ objectPosition: '50% 20%' }} /* THIS IS THE FIX - moves face down */
                  onError={(e) => { 
                    (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; 
                  }}
                />
              </div>
              
              {/* Badge/Decoration */}
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium animate-scale-in shadow-glow">
                Available
              </div>
            </div>

            {/* Text Content - Centered on mobile, left aligned on desktop */}
            <div className="text-center lg:text-left space-y-6 max-w-2xl">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-2">
                  {t('hero.greeting')}
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent leading-tight">
                  {candidate.name}
                </h1>
                
                <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed font-medium">
                  {i18n.language === 'de' ? candidate.role.de : candidate.role.en}
                </p>
              </div>

              {/* Skills tags */}
              {candidate.skills && candidate.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={scrollToAbout} 
                  className="shadow-glow hover:shadow-glow-strong transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group"
                >
                  <span className="mr-2">{t('hero.cta')}</span>
                  <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                >
                  <a 
                    href={candidate.downloadables.lebenslauf_pdf} 
                    download 
                    className="flex items-center gap-2"
                  >
                    <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    {t('hero.download_cv')}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: 3D Canvas - Perfectly aligned */}
          <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] rounded-2xl overflow-hidden shadow-strong border border-border/50 relative mt-8 lg:mt-0">
            
            <Suspense fallback={<ModelLoadingIndicator />}>
              <Canvas 
                camera={{ 
                  position: [0, 0, 6], 
                  fov: 40,
                  near: 0.1,
                  far: 1000
                }}
                className="w-full h-full"
              >
                <ambientLight intensity={0.7} />
                <directionalLight 
                  position={[5, 10, 5]} 
                  intensity={1.2} 
                  castShadow
                />
                <pointLight 
                  position={[-6, -4, -6]} 
                  intensity={1.0} 
                  color="#7c3aed"
                />
                <hemisphereLight 
                  intensity={0.5}
                  groundColor="#3b82f6"
                />
                
                <LaptopModel mouse={mouse} />
                
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  autoRotate={true}
                  autoRotateSpeed={0.8}
                  rotateSpeed={0.6}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Canvas>
            </Suspense>

            {/* Info overlay */}
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border/50">
              🖱️ Drag to rotate
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="text-xs text-muted-foreground animate-pulse">
            Scroll down
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;