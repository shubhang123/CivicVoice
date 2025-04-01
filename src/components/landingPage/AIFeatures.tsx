
import { useEffect, useRef, useState } from 'react';
import { Check, X, Clock, Zap, FileSearch, BarChart4, FileDigit, MessageSquare } from 'lucide-react';

interface ComparisonItemProps {
  traditional: {
    icon: React.ReactNode;
    text: string;
  };
  ai: {
    icon: React.ReactNode;
    text: string;
  };
  delay: number;
  isVisible: boolean;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({ traditional, ai, delay, isVisible }) => {
  return (
    <div className="flex flex-col md:flex-row mb-8">
      <div 
        className={`flex-1 flex items-start p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 mb-4 md:mb-0 md:mr-4 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="p-2 bg-red-100 rounded-full mr-4">
          <X className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {traditional.icon}
            <h4 className="font-semibold ml-2">Traditional Approach</h4>
          </div>
          <p className="text-sm text-foreground/70">{traditional.text}</p>
        </div>
      </div>
      
      <div 
        className={`flex-1 flex items-start p-4 bg-gradient-to-br from-blue-primary/10 to-blue-dark/10 backdrop-blur-sm rounded-lg border border-blue-primary/20 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
        style={{ transitionDelay: `${delay + 200}ms` }}
      >
        <div className="p-2 bg-green-100 rounded-full mr-4">
          <Check className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {ai.icon}
            <h4 className="font-semibold ml-2">Our AI Approach</h4>
          </div>
          <p className="text-sm text-foreground/70">{ai.text}</p>
        </div>
      </div>
    </div>
  );
};

const AIFeatures = () => {
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
  
  const comparisons = [
    {
      traditional: {
        icon: <Clock className="w-5 h-5 text-foreground/80" />,
        text: "Manual categorization taking hours or days, often with errors."
      },
      ai: {
        icon: <Zap className="w-5 h-5 text-blue-primary" />,
        text: "Instant AI categorization with over 95% accuracy, saving hours of work."
      }
    },
    {
      traditional: {
        icon: <FileSearch className="w-5 h-5 text-foreground/80" />,
        text: "One-size-fits-all prioritization based on rigid criteria."
      },
      ai: {
        icon: <BarChart4 className="w-5 h-5 text-blue-primary" />,
        text: "Dynamic prioritization based on urgency, impact, and sentiment analysis."
      }
    },
    {
      traditional: {
        icon: <FileDigit className="w-5 h-5 text-foreground/80" />,
        text: "Limited data insights from complaints, missing valuable patterns."
      },
      ai: {
        icon: <MessageSquare className="w-5 h-5 text-blue-primary" />,
        text: "Rich insights extraction identifying trends, systemic issues, and improvement opportunities."
      }
    }
  ];
  
  return (
    <section ref={sectionRef} className="section-padding" id="features">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-primary/10 px-4 py-1 rounded-full text-sm text-blue-primary font-medium mb-4">
            Advanced Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Advantage</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            See how our AI-driven approach transforms the traditional complaint management process, 
            delivering faster and more accurate results.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {comparisons.map((comparison, index) => (
            <ComparisonItem
              key={index}
              traditional={comparison.traditional}
              ai={comparison.ai}
              delay={index * 300}
              isVisible={isVisible}
            />
          ))}
        </div>
        
        <div 
          className={`mt-12 p-6 rounded-xl glass-card max-w-3xl mx-auto text-center transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <h3 className="text-xl font-bold mb-3">Sentiment Analysis Visualization</h3>
          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <div className="h-12 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-md relative">
              <div className="absolute top-[-10px] right-[30%] w-6 h-6 bg-white rounded-full border-2 border-blue-primary"></div>
              <div className="absolute top-16 left-0 text-sm">Negative</div>
              <div className="absolute top-16 right-0 text-sm">Positive</div>
            </div>
          </div>
          <p className="text-sm text-foreground/70">
            Our AI analyzes the tone and sentiment of each complaint to better understand 
            citizen emotions and prioritize responses accordingly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
