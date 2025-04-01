
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <span className="ml-2 text-xl font-semibold text-foreground">
            CivicVoice
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {['Home', 'Submit', 'Track', 'Admin'].map((item) => (
            <a
              key={item}
              href={`${item.toLowerCase()}`}
              className="text-foreground/90 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-primary hover:after:w-full after:transition-all"
            >
              {item}
            </a>
          ))}
        </div>
        
        {/* Login Button */}
        {/* <div className="hidden md:block">
          <Button className="bg-orange-accent hover:bg-orange-accent/90 text-white">
            Login
          </Button>
        </div> */}
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-white/10 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col space-y-4">
            {['Home', 'Submit', 'Track', 'Admin'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground/90 py-2 px-4 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="bg-orange-accent hover:bg-orange-accent/90 text-white w-full">
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
