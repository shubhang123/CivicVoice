
// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Send } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const SubmitSection = () => {
//   const navigate = useNavigate();

//   const handleSubmitClick = () => {
//     navigate('/submit-complaint');
//   };

//   return (
//     <section id="submit" className="py-24 bg-muted relative overflow-hidden">
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
//       </div>
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="max-w-3xl mx-auto text-center"
//         >
//           <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Submit Your Complaint?</h2>
//           <p className="text-lg text-muted-foreground mb-8">
//             Our streamlined process makes it easy to report issues and get the response you deserve. Start your submission now and track its progress in real-time.
//           </p>
          
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="flex flex-col sm:flex-row justify-center gap-4"
//           >
//             <Button 
//               onClick={handleSubmitClick}
//               size="lg" 
//               className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto"
//             >
//               Submit a Complaint <Send className="ml-2 h-5 w-5" />
//             </Button>
            
//             <Button 
//               variant="outline" 
//               size="lg"
//               onClick={() => navigate('/faq')}
//               className="border-primary text-primary hover:bg-primary/10 font-medium px-8 py-6 h-auto"
//             >
//               Learn More <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//           </motion.div>
          
//           <motion.div 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="mt-12 text-sm text-muted-foreground"
//           >
//             <p>Your privacy matters. All submissions are secured with end-to-end encryption.</p>
//             <p className="mt-2">Average response time: 2-3 business days</p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default SubmitSection;

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubmitSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations when the component mounts
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const handleSubmitClick = () => {
    navigate("/submit");
  };

  return (
    <section id="submit" className="py-24 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-3xl mx-auto text-center transition-opacity duration-500 ease-in-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Submit Your Complaint?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our streamlined process makes it easy to report issues and get the
            response you deserve. Start your submission now and track its
            progress in real-time.
          </p>

          <div
            className={`flex flex-col sm:flex-row justify-center gap-4 transition-opacity duration-500 ease-in-out transform ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Button
              onClick={handleSubmitClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto"
            >
              Submit a Complaint <Send className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/faq")}
              className="border-primary text-primary hover:bg-primary/10 font-medium px-8 py-6 h-auto"
            >
              <a href="/FAQ">Learn More </a><ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div
            className={`mt-12 text-sm text-muted-foreground transition-opacity duration-500 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>Your privacy matters. All submissions are secured with end-to-end encryption.</p>
            <p className="mt-2">Average response time: 2-3 business days</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmitSection;
