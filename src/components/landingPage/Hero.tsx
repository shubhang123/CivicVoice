
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Send, Search } from 'lucide-react';

// Typing animation for headline
const TypingAnimation: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <div className="typing-container">
      <span>{displayText}</span>
      {!isTypingComplete && <span className="typing-cursor">|</span>}
    </div>
  );
};

const Illustration = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] animate-float">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          {/* Central Circular Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-primary to-blue-dark flex items-center justify-center glass-card z-20 animate-pulse-soft">
            <div className="text-white text-3xl">AI</div>
          </div>
          
          {/* Orbital Elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-lg glass-card flex items-center justify-center animate-spin-slow origin-bottom">
            <Send className="text-blue-primary" />
          </div>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-lg glass-card flex items-center justify-center animate-spin-slow origin-top">
            <Search className="text-blue-primary" />
          </div>
          
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-lg glass-card flex items-center justify-center animate-spin-slow origin-right">
            <div className="w-6 h-6 rounded-full bg-orange-accent"></div>
          </div>
          
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-lg glass-card flex items-center justify-center animate-spin-slow origin-left">
            <div className="w-6 h-6 rounded-full bg-blue-primary"></div>
          </div>
          
          {/* Connecting Lines - These are the "orbital paths" */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-dashed border-white/20 animate-spin-slow"></div>
          
          {/* Data Flow Animation */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-orange-accent animate-flow-1"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-primary animate-flow-2"></div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-6 text-center md:text-left mb-12 md:mb-0">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20 text-sm text-blue-primary font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Next-Generation Public Service
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
              <TypingAnimation text="AI-Powered Complaint Resolution System" />
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Transforming public grievances into actionable insights with advanced machine learning algorithms and streamlined processes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button className="bg-orange-accent hover:bg-orange-accent/90 text-white rounded-lg px-6 py-6 text-lg transition-transform hover:scale-105">
                <a href="/submit">Submit Complaint</a>
                <Send className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" className="border-blue-primary text-blue-primary hover:bg-blue-primary/10 hover:text-black rounded-lg px-6 py-6 text-lg">
                <a href="/track">Track Complaint</a>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <Illustration />
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-[50px] md:h-[70px]"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
