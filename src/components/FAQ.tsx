
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
  isVisible: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  onClick, 
  delay,
  isVisible
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      className={`border-b border-border last:border-b-0 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none"
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-blue-primary transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 0}px` : '0px',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="pb-5 text-foreground/80">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
  
  const faqs = [
    {
      question: "How does the AI categorize my complaint?",
      answer: "Our AI system analyzes the text content of your complaint using natural language processing. It identifies key words, phrases, and context to categorize it accurately among hundreds of predefined categories. The system continuously learns from new complaints to improve accuracy over time."
    },
    {
      question: "What information should I include in my complaint?",
      answer: "To ensure the most efficient processing, include: (1) A detailed description of the issue, (2) The exact location, (3) When the problem started, (4) Any previous communication about the issue, and (5) Photos or documents if relevant. The more information you provide, the better our AI can categorize and prioritize your complaint."
    },
    {
      question: "How long will it take to resolve my complaint?",
      answer: "Resolution times vary based on the nature and complexity of the issue. Our system provides an estimated timeframe based on historical data for similar complaints. The current average resolution time is 24 hours for high-priority issues and 3-5 business days for standard issues. You'll receive real-time updates throughout the process."
    },
    {
      question: "Can I track the status of my complaint?",
      answer: "Yes! Once you submit a complaint, you'll receive a unique tracking ID. You can use this ID on our website or mobile app to check real-time status updates. The system provides detailed information about which department is handling your complaint, what actions have been taken, and the estimated time to resolution."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use enterprise-grade encryption to protect all personal data. Your information is only shared with the necessary government departments to resolve your specific complaint. We comply with all relevant data protection regulations and never use your personal data for any purpose other than resolving your complaint."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section ref={sectionRef} className="section-padding" id="faq">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20 text-sm text-blue-primary font-medium mb-4">
            Common Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Find answers to the most common questions about our AI-powered complaint resolution system.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
