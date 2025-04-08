// import React, { useMemo, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { 
//   fetchComplaints, 
//   getSeverityStats, 
//   getDepartmentStats, 
//   getLocationStats,
//   getPlatformStats,
//   getSentimentStats,
//   getTrendData,
// } from '../services/analyticsService';

// import { Skeleton } from '../components/ui/skeleton';
// import AnalyticsHeader from '../components/Analyse/AnalyticsHeader';
// import SeverityChart from '../components/Complaints/SeverityChart';
// import DepartmentChart from '../components/Complaints/DepartmentChart';
// import LocationMap from '../components/Complaints/LocationMap';
// import ComplaintFilter from '@/components/Analyse/ComplaintFilter';
// import PlatformChart from '@/components/Analyse/PlatformChart';
// import SentimentGauge from '@/components/Analyse/SentimentGauge';
// import ComplaintCard from '@/components/Complaints/ComplaintCart';
// import HeatmapComponent from '@/components/HeatmapComponent';

// // Define Complaint interface
// interface Complaint {   
//   _id: string;   
//   referenceNumber: string;   
//   content_platform: string;   
//   content_platform_details: {     
//     post_id: string;     
//     date: string;     
//     content: string;     
//     username: string;     
//     url: string;   
//   };   
//   department: string;   
//   // location: string;   
//   name: string;   
//   severity: string;   
//   summary: string;   
//   complaint_score: number; 
// }

// const SkeletonCard = () => (
//   <div className="space-y-3">
//     <Skeleton className="h-[180px] w-full rounded-xl" />
//     <div className="space-y-2">
//       <Skeleton className="h-4 w-[250px]" />
//       <Skeleton className="h-4 w-[200px]" />
//     </div>
//   </div>
// );

// interface FilterState {
//   departments: string[];
//   // locations: string[];
//   platforms: string[];
//   severities: string[];
// }

// const Analyse = () => {
//   console.log("Analytics component rendering");
  
//   const { data: complaints, isLoading, error } = useQuery<Complaint[]>({
//     queryKey: ['complaints'],
//     queryFn: fetchComplaints,
//   });

//   console.log("Query state:", { complaints, isLoading, error });

//   // Filter state
//   const [filters, setFilters] = useState<FilterState>({
//     departments: [],
//     // locations: [],
//     platforms: [],
//     severities: []
//   });

//   // Ensure complaints is always an array
//   const complaintsArray = Array.isArray(complaints) ? complaints : [];

//   // Apply filters to complaints
//   const filteredComplaints = useMemo(() => {
//     return complaintsArray.filter(complaint => {
//       // Only apply filter if it has selected values
//       const departmentMatch = filters.departments.length === 0 || 
//         filters.departments.includes(complaint.department);
      
//       // const locationMatch = filters.locations.length === 0 || 
//       //   filters.locations.includes(complaint.location);
      
//       const platformMatch = filters.platforms.length === 0 || 
//         filters.platforms.includes(complaint.content_platform);
      
//       const severityMatch = filters.severities.length === 0 || 
//         filters.severities.includes(complaint.severity);
      
//       return departmentMatch && platformMatch && severityMatch;
//     });
//   }, [complaintsArray, filters]);

//   // Extract unique values for filter options
//   const filterOptions = useMemo(() => {
//     const departments = [...new Set(complaintsArray.map(c => c.department))];
//     // const locations = [...new Set(complaintsArray.map(c => c.location))];
//     const platforms = [...new Set(complaintsArray.map(c => c.content_platform))];
//     const severities = [...new Set(complaintsArray.map(c => c.severity))];
    
//     return { departments, platforms, severities };
//   }, [complaintsArray]);

//   // Handle filter changes
//   const handleFilterChange = (newFilters: FilterState) => {
//     setFilters(newFilters);
//   };

//   if (error) {
//     console.error("Error loading data:", error);
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <h2 className="text-2xl font-semibold">Failed to load data</h2>
//           <p className="text-muted-foreground">Please try again later</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container py-8 md:py-12 space-y-8 max-w-7xl">
//         {isLoading ? (
//           <div className="space-y-4">
//             <Skeleton className="h-12 w-[300px]" />
//             <Skeleton className="h-4 w-full max-w-3xl" />
//             <Skeleton className="h-4 w-full max-w-2xl" />
//             <div className="flex gap-4 pt-4">
//               <Skeleton className="h-16 w-24" />
//               <Skeleton className="h-16 w-24" />
//               <Skeleton className="h-16 w-24" />
//             </div>
//           </div>
//         ) : (
//           <AnalyticsHeader 
//             totalComplaints={filteredComplaints.length} 
//             trendData={getTrendData(complaintsArray)}
//           />
//         )}

//         {!isLoading && (
//           <ComplaintFilter 
//             departments={filterOptions.departments}
//             // locations={filterOptions.locations}
//             platforms={filterOptions.platforms}
//             severities={filterOptions.severities}
//             onFilterChange={handleFilterChange}
//           />
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-7">
//           {isLoading ? (
//             <>
//               <SkeletonCard />
//               <SkeletonCard />
//               <SkeletonCard />
//               <SkeletonCard />
//               <SkeletonCard />
//               <SkeletonCard />
//             </>
//           ) : (
//             <>
//               <SeverityChart data={getSeverityStats(filteredComplaints)} />
//               <DepartmentChart data={getDepartmentStats(filteredComplaints)} />
//               <PlatformChart data={getPlatformStats(filteredComplaints)} />
//               <LocationMap locations={getLocationStats(filteredComplaints)} />
              
//               {/* <SentimentGauge data={getSentimentStats(filteredComplaints)} /> */}
//             </>
//           )}
//         </div>
//         <HeatmapComponent/>
//         <div className="analytics-section" style={{ '--delay': 8 } as React.CSSProperties}>
//           <div className='flex justify-between'>
//             <h2 className="text-xl font-semibold mb-7">Recent Complaints</h2>
//             <button className=" mb-6 px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300">
//   <a href="/complaints">View More</a>
// </button>

//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//             {isLoading ? (
//               <>
//                 <SkeletonCard />
//                 <SkeletonCard />
//                 <SkeletonCard />
//               </>
//             ) : (
//               filteredComplaints.slice(0, 6).map((complaint, index) => (
//                 <ComplaintCard key={complaint._id || index} complaint={complaint} />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//       {/* <div>
//         <HeatmapComponent/>

//       </div> */}
//     </div>
//   );
// };

// export default Analyse;

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchComplaints,
  getSeverityStats,
  getDepartmentStats,
  getLocationStats,
  getPlatformStats,
  getTrendData,
} from '../services/analyticsService';

import { Skeleton } from '../components/ui/skeleton';
import AnalyticsHeader from '../components/Analyse/AnalyticsHeader';
import SeverityChart from '../components/Complaints/SeverityChart';
import DepartmentChart from '../components/Complaints/DepartmentChart';
import LocationMap from '../components/Complaints/LocationMap';
import ComplaintFilter from '@/components/Analyse/ComplaintFilter';
import PlatformChart from '@/components/Analyse/PlatformChart';
import ComplaintCard from '@/components/Complaints/ComplaintCart';
import HeatmapComponent from '@/components/HeatmapComponent';

interface Complaint {
  _id: string;
  referenceNumber: string;
  content_platform: string;
  content_platform_details: {
    post_id: string;
    date: string;
    content: string;
    username: string;
    url: string;
  };
  department: string;
  location:
    | string
    | {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        pincode: string;
      };
  name: string;
  severity: string;
  summary: string;
  complaint_score: number;
}

type NormalizedComplaint = Omit<Complaint, 'location'> & {
  location: string;
};

const SkeletonCard = () => (
  <div className="space-y-3">
    <Skeleton className="h-[180px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

interface FilterState {
  departments: string[];
  locations: string[];
  platforms: string[];
  severities: string[];
}

const Analyse = () => {
  const { data: complaints, isLoading, error } = useQuery<Complaint[]>({
    queryKey: ['complaints'],
    queryFn: fetchComplaints,
  });

  const [filters, setFilters] = useState<FilterState>({
    departments: [],
    locations: [],
    platforms: [],
    severities: [],
  });

  const complaintsArray = Array.isArray(complaints) ? complaints : [];

  const normalizedComplaints: NormalizedComplaint[] = useMemo(() => {
    return complaintsArray.map((c) => {
      let locationString = 'Unknown';
      if (typeof c.location === 'object' && c.location !== null) {
        const { addressLine1, city, state, pincode } = c.location;
        locationString = `${addressLine1}, ${city}, ${state} - ${pincode}`;
      } else if (typeof c.location === 'string') {
        locationString = c.location;
      }

      return {
        ...c,
        location: locationString,
      };
    });
  }, [complaintsArray]);

  const filteredComplaints = useMemo(() => {
    return normalizedComplaints.filter((complaint) => {
      const departmentMatch =
        filters.departments.length === 0 ||
        filters.departments.includes(complaint.department);

      const locationMatch =
        filters.locations.length === 0 ||
        filters.locations.includes(complaint.location);

      const platformMatch =
        filters.platforms.length === 0 ||
        filters.platforms.includes(complaint.content_platform);

      const severityMatch =
        filters.severities.length === 0 ||
        filters.severities.includes(complaint.severity);

      return departmentMatch && locationMatch && platformMatch && severityMatch;
    });
  }, [normalizedComplaints, filters]);

  const filterOptions = useMemo(() => {
    const departments = [...new Set(normalizedComplaints.map((c) => c.department))];
    const locations = [...new Set(normalizedComplaints.map((c) => c.location))];
    const platforms = [...new Set(normalizedComplaints.map((c) => c.content_platform))];
    const severities = [...new Set(normalizedComplaints.map((c) => c.severity))];

    return { departments, locations, platforms, severities };
  }, [normalizedComplaints]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Failed to load data</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 md:py-12 space-y-8 max-w-7xl">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-4 w-full max-w-3xl" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
            </div>
          </div>
        ) : (
          <AnalyticsHeader
            totalComplaints={filteredComplaints.length}
            trendData={getTrendData(filteredComplaints as Complaint[])}
          />
        )}

        {!isLoading && (
          <ComplaintFilter
            departments={filterOptions.departments}
            locations={filterOptions.locations}
            platforms={filterOptions.platforms}
            severities={filterOptions.severities}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <SeverityChart data={getSeverityStats(filteredComplaints as Complaint[])} />
              <DepartmentChart data={getDepartmentStats(filteredComplaints as Complaint[])} />
              <PlatformChart data={getPlatformStats(filteredComplaints as Complaint[])} />
              <LocationMap locations={getLocationStats(filteredComplaints as Complaint[])} />
            </>
          )}
        </div>

        <HeatmapComponent />

        {/* Complaints Section */}
        <div className="analytics-section space-y-6" style={{ '--delay': 8 } as React.CSSProperties}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <h2 className="text-xl font-semibold">Recent Complaints</h2>
            <button className="px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 w-max">
              <a href="/complaints">View More</a>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              filteredComplaints.slice(0, 6).map((complaint, index) => (
                <ComplaintCard key={complaint._id || index} complaint={complaint as Complaint} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyse;