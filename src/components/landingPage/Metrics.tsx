
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Clock, Heart } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetValue = parseInt(value.replace(/,/g, ''));
  
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
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = targetValue;
    const duration = 2000;
    const step = end < 100 ? 1 : Math.floor(end / 100);
    const stepTime = duration / (end / step);
    
    setTimeout(() => {
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }, delay);
  }, [isVisible, targetValue, delay]);
  
  return (
    <div
      ref={cardRef}
      className={`glass-card rounded-2xl p-6 transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="w-14 h-14 rounded-full bg-blue-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-blue-primary mb-2">
          {isVisible ? (
            <span>
              {typeof count === 'number' && !isNaN(count)
                ? count.toLocaleString()
                : value}
              {value.includes('%') ? '%' : ''}
            </span>
          ) : (
            '0'
          )}
        </div>
        <p className="text-foreground/90 font-medium">{label}</p>
      </div>
    </div>
  );
};

const Metrics = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Difference</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our AI-powered system has transformed how public complaints are handled,
            delivering faster resolutions and greater citizen satisfaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            icon={<CheckCircle className="w-8 h-8 text-blue-primary" />}
            value="1,234"
            label="Complaints Resolved"
            delay={0}
          />
          <MetricCard
            icon={<Clock className="w-8 h-8 text-blue-primary" />}
            value="24"
            label="Hour Average Response Time"
            delay={200}
          />
          <MetricCard
            icon={<Heart className="w-8 h-8 text-blue-primary" />}
            value="92"
            label="Satisfaction Rate"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Metrics;
