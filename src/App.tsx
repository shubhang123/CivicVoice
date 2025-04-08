
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import SubmitComplaint from "./pages/Submit";
// import SubmissionSuccess from "./pages/SubmissionSuccess";
// import TrackPage from "./pages/TrackPage";
// import Dashboard from "./pages/Dashboard";
//  //import Login from "./pages/Login";
// import Analytics from "./pages/Complaints";
// import Analyse from "./pages/Analyse";
// import FAQ from "./components/FAQ";
// import { LogOut } from "lucide-react";
// // import LoginForm from "./components/DeptDashboard/auth/LoginForm";
// // import DeptDashboard from "./pages/DeptDashboard";


// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/home" element={<Index />} />
//           <Route path="/submit" element={<SubmitComplaint />} /> {/* Placeholder until SubmitComplaint page is created */}
//           <Route path="success" element = {<SubmissionSuccess/>} />
//           <Route path="/track" element={<TrackPage />} />
//           <Route path="/admin" element={<Analyse />} />
//           {/* <Route path="/login" element={<Login />} /> */}
//           <Route path="/logout" element={<LogOut />} />
//           <Route path="/FAQ" element={<FAQ />} />
//           <Route path="/complaints" element={<Analytics />} />
//           <Route path="/analyse" element={<Analyse />} />
//           {/* <Route path="/signin" element={<LoginForm />} /> */}
           
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubmitComplaint from "./pages/Submit";
import SubmissionSuccess from "./pages/SubmissionSuccess";
import TrackPage from "./pages/TrackPage";

 //import Login from "./pages/Login";
import Analytics from "./pages/Complaints";
import Analyse from "./pages/Analyse";
import FAQ from "./components/FAQ";
import { LogOut } from "lucide-react";
import DashboardPage from "./components/dashboard/Department";
import AnalyticsPage from "./components/dashboard/AnalyticsPage";
import ComplaintsPage from "./components/dashboard/ComplaintsPage";
import StaffPage from "./components/dashboard/StaffPage";
import SLAMonitoringPage from "./components/dashboard/SLAMonitoringPage";
import SettingsPage from "./components/dashboard/SettingsPage";
// import LoginForm from "./components/DeptDashboard/auth/LoginForm";
// import DeptDashboard from "./pages/DeptDashboard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/submit" element={<SubmitComplaint />} /> {/* Placeholder until SubmitComplaint page is created */}
          <Route path="success" element = {<SubmissionSuccess/>} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/admin" element={<Analyse />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/logout" element={<LogOut />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/complaints" element={<Analytics />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/department" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/complaint" element={<ComplaintsPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/sla" element={<SLAMonitoringPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* <Route path="/signin" element={<LoginForm />} /> */}
           
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;