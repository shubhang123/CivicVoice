
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, StarHalf } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  date: string;
  department: string;
  rating: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-orange-accent text-orange-accent" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-orange-accent text-orange-accent" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-orange-accent/30" />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      quote: "I was impressed by how quickly my water supply issue was addressed. The AI categorized it correctly and I received updates at every stage. This is a huge improvement!",
      name: "Sarah Johnson",
      date: "March 15, 2023",
      department: "Water Utilities",
      rating: 5
    },
    {
      quote: "The road repair complaint I submitted was handled efficiently. I appreciate the transparency and being able to track the status online instead of making multiple phone calls.",
      name: "Michael Chen",
      date: "April 23, 2023",
      department: "Transportation",
      rating: 4.5
    },
    {
      quote: "My experience with the new complaint system was seamless. The response was faster than expected and the resolution was satisfactory. The follow-up survey was a nice touch.",
      name: "Priya Patel",
      date: "May 7, 2023",
      department: "Public Health",
      rating: 4
    },
    {
      quote: "After years of frustration with the old system, this AI-powered approach is a breath of fresh air. My waste management issue was resolved in just 2 days!",
      name: "Robert Garcia",
      date: "June 14, 2023",
      department: "Sanitation",
      rating: 5
    }
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
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
  
  useEffect(() => {
    autoplayRef.current = setInterval(nextSlide, 6000);
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-muted to-background" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20 text-sm text-blue-primary font-medium mb-4">
            Citizen Feedback
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Read about real experiences from citizens who have used our AI-powered complaint resolution system.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden relative h-[280px] md:h-[220px]">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${testimonials.length * 100}%`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full px-4 flex-shrink-0"
                >
                  <div
                    className={`glass-card  p-6 bg-slate-200  h-full transition-all duration-500 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col h-full max-w-3xl">
                      <p className="italic text-foreground/90 mb-4">"{testimonial.quote}"</p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-foreground/70">
                              {testimonial.department} • {testimonial.date}
                            </p>
                          </div>
                          <StarRating rating={testimonial.rating} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-blue-primary rounded-full p-2 shadow-lg transition-transform hover:scale-110 z-10 md:translate-x-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-blue-primary rounded-full p-2 shadow-lg transition-transform hover:scale-110 z-10 md:translate-x-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-primary' : 'bg-blue-primary/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
