import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SubmissionSuccess = () => {
  const [searchParams] = useSearchParams();
  const referenceNumber = searchParams.get('ref') || '000000';
  const [copied, setCopied] = useState(false);

  const copyReferenceNumber = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.6 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Confetti animation on load
  useEffect(() => {
    // This would be where we'd integrate a confetti library if we had one
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </motion.div>

        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold text-center mb-2">Submission Successful!</h1>
              <p className="text-center text-muted-foreground mb-8">
                Thank you for submitting your complaint. We have received your information and will process it promptly.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-muted/30 p-6 rounded-lg mb-8"
            >
              <p className="text-sm text-muted-foreground mb-2">Your Reference Number:</p>
              <div className="flex items-center justify-between bg-background rounded-md p-3">
                <span className="font-mono text-xl font-bold tracking-wider">{referenceNumber}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyReferenceNumber}
                  className="gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Please save this reference number for tracking your complaint status.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <p className="text-sm text-center">
                What happens next? Our team will review your complaint and contact you via your provided email address within 2-3 business days.
              </p>
              
              <Link to="/" className="self-center">
                <Button variant="outline" className="gap-2 mt-4">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubmissionSuccess;