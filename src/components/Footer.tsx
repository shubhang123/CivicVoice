
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const departments = [
    'Transportation',
    'Water Utilities',
    'Public Health',
    'Sanitation',
    'Parks & Recreation',
    'Public Safety',
    'Education'
  ];
  
  const quickLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Submit Complaint', href: '/submit' },
    { name: 'Track Status', href: '/track' },
    { name: 'Admin Login', href: '/login' },
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' }
  ];
  
  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Data Protection', href: '#' }
  ];
  
  return (
    <footer className="bg-blue-dark text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-white">
                CivicVoice
              </span>
            </div>
            <p className="text-white/70 mb-4">
              Transforming public service complaint resolution with advanced AI technology
              for faster, more accurate, and transparent citizen services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-orange-accent hover:after:w-full after:transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Departments */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Participating Departments</h3>
            <ul className="grid grid-cols-2 gap-2">
              {departments.map((dept) => (
                <li key={dept} className="text-white/70">
                  {dept}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-orange-accent mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-white/70">
                  123 Government Center, City Hall Plaza, Metropolis, MC 12345
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-accent mr-3 flex-shrink-0" />
                <p className="text-white/70">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-accent mr-3 flex-shrink-0" />
                <p className="text-white/70">support@resolveai.gov</p>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CivicVoice. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {legalLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
