import { useEffect } from "react";
import ParticleBackground from "@/components/landingPage/ParticleBackground";
import Navbar from "@/components/Navbar";
 // Adjust the path based on your project structure
import Footer from "@/components/Footer";
import ComplaintForm from "@/components/ComplaintForm/ComplaintForm";

const SubmitComplaint = () => {
  // Smooth scroll implementation for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")!.substring(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100, // Offset for fixed header
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main>
        <ComplaintForm/> 
      </main>
      <Footer />
    </div>
  );
};

export default SubmitComplaint;
