
import { useEffect } from 'react';
import ParticleBackground from '@/components/landingPage/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/landingPage/Hero';
import Metrics from '@/components/landingPage/Metrics';
import HowItWorks from '@/components/landingPage/HowItWorks';
import AIFeatures from '@/components/landingPage/AIFeatures';
import Testimonials from '@/components/landingPage/Testimonials';
import FAQ from '@/components/FAQ';
import SubmitSection from '@/components/landingPage/SubmitSection';
import CTA from '@/components/landingPage/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth scroll implementation for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')!.substring(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <HowItWorks />
        <AIFeatures />
        <Testimonials />
        <FAQ />
        <SubmitSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
