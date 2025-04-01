
import { useEffect, useRef, useState } from 'react';
import { FileText, Brain, CheckCircle, BarChart3 } from 'lucide-react';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
  isVisible?: boolean;
  delay: number;
}

const Step: React.FC<StepProps> = ({ 
  number, 
  icon, 
  title, 
  description, 
  isLast = false,
  isVisible = false,
  delay
}) => {
  return (
    <div 
      className={`relative pl-12 pb-10 transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Step number circle */}
      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold z-10">
        {number}
      </div>
      
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-5 top-10 w-[2px] h-[calc(100%-20px)] bg-gradient-to-b from-blue-primary to-blue-dark"></div>
      )}
      
      <div>
        <div className="flex items-center mb-2">
          <div className="mr-3 text-blue-primary">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-foreground/80">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const steps = [
    {
      number: 1,
      icon: <FileText className="w-6 h-6" />,
      title: "Submit",
      description: "Fill out an intuitive form with your complaint details and relevant documentation."
    },
    {
      number: 2,
      icon: <Brain className="w-6 h-6" />,
      title: "Analyze",
      description: "Our AI engine automatically categorizes, prioritizes, and routes your complaint based on content analysis."
    },
    {
      number: 3,
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Resolve",
      description: "The appropriate department addresses your complaint with the insights provided by our AI system."
    },
    {
      number: 4,
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Track",
      description: "Monitor the status of your complaint in real-time with detailed updates throughout the resolution process."
    }
  ];
  
  return (
    <section ref={sectionRef} className="section-padding bg-muted" id="howworks">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20 text-sm text-blue-primary font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our streamlined process makes submitting and tracking complaints effortless,
            while our AI engine ensures efficient resolution.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <Step
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
