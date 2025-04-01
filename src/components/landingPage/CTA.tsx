
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-primary to-blue-dark opacity-90 z-0"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-10 left-1/4 w-24 h-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-white/10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your complaint resolution process?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join the growing number of departments using our AI-powered system to improve citizen satisfaction and operational efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button className="bg-orange-accent hover:bg-orange-accent/90 text-white rounded-lg px-8 py-6 text-lg group transition-transform hover:scale-105">
              <a href="/submit">Get Started Now</a>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            {/* <Button variant="outline" className="border-white text-black hover:bg-white/10 rounded-lg px-8 py-6 text-lg">
              Schedule Demo
            </Button> */}
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-primary font-bold text-xl">
                25
              </div>
              <span className="ml-2 text-white font-medium">Departments</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-primary font-bold text-l">
                10K+
              </div>
              <span className="ml-2 text-white font-medium">Complaints Processed</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-primary font-bold text-l">
                95%
              </div>
              <span className="ml-2 text-white font-medium">Categorization Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
