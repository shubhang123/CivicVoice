
// import { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   return (
//     <nav
//       className={`fixed mt-0 pt-0 h-20 top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled || isMobileMenuOpen
//           ? 'bg-white/10 backdrop-blur-md border-b border-white/20 py-3'
//           : 'bg-transparent py-5'
//       }`}
//     >
//       <div className="container h-16 mx-auto px-4 md:px-6 flex bg-slate-300 items-center justify-between">
//         {/* Logo */}
//         <a href="#" className="flex items-center">
//           <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
//             <span className="text-white font-bold text-xl">AI</span>
//           </div>
//           <span className="ml-2 text-xl font-semibold text-foreground">
//             CivicVoice
//           </span>
//         </a>
        
//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center justify-center space-x-8">
//           {['Complaints','Log Out'].map((item) => (
//            <a
//            key={item}
//            href={`${item.toLowerCase().trim()}`}
//            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
//                       hover:bg-blue-700 transition-all duration-300 
//                       inline-flex items-center justify-center"
//          >
//            {item}
//          </a>
         
//           ))}
//         </div>
        
//         {/* Login Button */}
//         {/* <div className="hidden md:block">
//           <Button className="bg-orange-accent hover:bg-orange-accent/90 text-white">
//             Login
//           </Button>
//         </div> */}
        
//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-foreground"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>
      
//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden px-4 py-4 bg-white/10 backdrop-blur-md animate-fade-in">
//           <div className="flex flex-col space-y-4">
//             {['Home', 'Submit', 'Track', 'Admin'].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="text-foreground/90 py-2 px-4 hover:bg-white/10 rounded-md transition-colors"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {item}
//               </a>
//             ))}
//             <Button className="bg-orange-accent hover:bg-orange-accent/90 text-white w-full">
//               Login
//             </Button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Determine which buttons to show based on the current path
//   const getNavButtons = () => {
//     if (location.pathname === "/analyse") {
//       return ["Complaints", "Log Out"];
//     } else if (location.pathname === "/complaints") {
//       return ["Analyse", "Log Out"];
//     }
//     return [];
//   };

//   return (
//     <nav
//       className={`fixed mt-0 pt-0 h-20 top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled || isMobileMenuOpen
//           ? "bg-white/10 backdrop-blur-md border-b border-white/20 py-3"
//           : "bg-transparent py-5"
//       }`}
//     >
//       <div className="container h-16 mx-auto px-4 md:px-6 flex bg-slate-300 items-center justify-between">
//         {/* Logo */}
//         <a href="#" className="flex items-center">
//           <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
//             <span className="text-white font-bold text-xl">AI</span>
//           </div>
//           <span className="ml-2 text-xl font-semibold text-foreground">
//             CivicVoice
//           </span>
//         </a>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center justify-center space-x-8">
//           {getNavButtons().map((item) => (
//             <a
//               key={item}
//               href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
//               className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
//                          hover:bg-blue-700 transition-all duration-300 
//                          inline-flex items-center justify-center"
//             >
//               {item}
//             </a>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-foreground"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden px-4 py-4 bg-white/10 backdrop-blur-md animate-fade-in">
//           <div className="flex flex-col space-y-4">
//             {getNavButtons().map((item) => (
//               <a
//                 key={item}
//                 href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
//                 className="text-foreground/90 py-2 px-4 hover:bg-white/10 rounded-md transition-colors"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear stored user token
    localStorage.removeItem("user"); // Remove user details if stored
    navigate("/login"); // Redirect to login page
  };

  // Determine which buttons to show based on the current path
  const getNavButtons = () => {
    if (location.pathname === "/analyse" || location.pathname === "/admin") {
      return ["Complaints", "Log Out"];
    } else if (location.pathname === "/complaints") {
      return ["Analyse", "Log Out"];
    }
    return [];
  };

  return (
    <nav
      className={`fixed mt-0 pt-0 h-20 top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/10 backdrop-blur-md border-b border-white/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container h-16 mx-auto px-4 md:px-6 flex bg-slate-300 items-center justify-between">
        {/* Logo */}
        <a href="/home" className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <span className="ml-2 text-xl font-semibold text-foreground">
            CivicVoice
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {getNavButtons().map((item) =>
            item === "Log Out" ? (
              <button
                key={item}
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md 
                           hover:bg-red-700 transition-all duration-300 
                           inline-flex items-center justify-center"
              >
                {item}
              </button>
            ) : (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
                           hover:bg-blue-700 transition-all duration-300 
                           inline-flex items-center justify-center"
              >
                {item}
              </a>
            )
          )}
        </div>

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
            {getNavButtons().map((item) =>
              item === "Log Out" ? (
                <button
                  key={item}
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md 
                             hover:bg-red-700 transition-all duration-300"
                >
                  {item}
                </button>
              ) : (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-foreground/90 py-2 px-4 hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

