// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Check, ChevronDown, Filter, X } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from '@/components/ui/badge';

// interface ComplaintFilterProps {
//   departments: string[];
//   // locations: string[];
//   platforms: string[];
//   severities: string[];
//   onFilterChange: (filters: FilterState) => void;
// }

// interface FilterState {
//   departments: string[];
//   // locations: string[];
//   platforms: string[];
//   severities: string[];
// }

// const ComplaintFilter: React.FC<ComplaintFilterProps> = ({
//   departments,
//   // locations,
//   platforms,
//   severities,
//   onFilterChange
// }) => {
//   const [filters, setFilters] = useState<FilterState>({
//     departments: [],
//     // locations: [],
//     platforms: [],
//     severities: []
//   });

//   // Toggle a filter value
//   const toggleFilter = (category: keyof FilterState, value: string) => {
//     setFilters((prev) => {
//       const updated = { ...prev };
      
//       if (updated[category].includes(value)) {
//         updated[category] = updated[category].filter(v => v !== value);
//       } else {
//         updated[category] = [...updated[category], value];
//       }
      
//       // Notify parent about filter changes
//       onFilterChange(updated);
//       return updated;
//     });
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     const emptyFilters = {
//       departments: [],
//       // locations: [],
//       platforms: [],
//       severities: []
//     };
//     setFilters(emptyFilters);
//     onFilterChange(emptyFilters);
//   };

//   // Total active filters count
//   const activeFiltersCount = Object.values(filters).flat().length;

//   return (
//     <div className="flex flex-wrap items-center gap-2 mb-4">
//       <span className="text-sm font-medium flex items-center gap-1">
//         <Filter className="h-4 w-4" />
//         Filters:
//       </span>
      
//       {/* Department Filter */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" size="sm" className="h-8">
//             Department
//             <ChevronDown className="ml-1 h-4 w-4" />
//             {filters.departments.length > 0 && (
//               <Badge variant="secondary" className="ml-1 h-5 px-1">
//                 {filters.departments.length}
//               </Badge>
//             )}
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup className="max-h-[200px] overflow-y-auto">
//             {departments.map((dept) => (
//               <DropdownMenuItem 
//                 key={dept}
//                 onClick={() => toggleFilter('departments', dept)}
//                 className="flex items-center gap-2"
//               >
//                 {filters.departments.includes(dept) ? (
//                   <Check className="h-4 w-4" />
//                 ) : (
//                   <div className="w-4" />
//                 )}
//                 <span className="truncate">{dept}</span>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
      
//       {/* Location Filter */}
//       {/* <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" size="sm" className="h-8">
//             Location
//             <ChevronDown className="ml-1 h-4 w-4" />
//             {filters.locations.length > 0 && (
//               <Badge variant="secondary" className="ml-1 h-5 px-1">
//                 {filters.locations.length}
//               </Badge>
//             )}
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-48">
//           <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup className="max-h-[200px] overflow-y-auto">
//             {locations.map((loc) => (
//               <DropdownMenuItem 
//                 key={loc}
//                 onClick={() => toggleFilter('locations', loc)}
//                 className="flex items-center gap-2"
//               >
//                 {filters.locations.includes(loc) ? (
//                   <Check className="h-4 w-4" />
//                 ) : (
//                   <div className="w-4" />
//                 )}
//                 <span className="truncate">{loc}</span>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu> */}
      
//       {/* Severity Filter */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" size="sm" className="h-8">
//             Severity
//             <ChevronDown className="ml-1 h-4 w-4" />
//             {filters.severities.length > 0 && (
//               <Badge variant="secondary" className="ml-1 h-5 px-1">
//                 {filters.severities.length}
//               </Badge>
//             )}
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-40">
//           <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup>
//             {severities.map((severity) => (
//               <DropdownMenuItem 
//                 key={severity}
//                 onClick={() => toggleFilter('severities', severity)}
//                 className="flex items-center gap-2"
//               >
//                 {filters.severities.includes(severity) ? (
//                   <Check className="h-4 w-4" />
//                 ) : (
//                   <div className="w-4" />
//                 )}
//                 <span>{severity}</span>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
      
//       {/* Platform Filter */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" size="sm" className="h-8">
//             Platform
//             <ChevronDown className="ml-1 h-4 w-4" />
//             {filters.platforms.length > 0 && (
//               <Badge variant="secondary" className="ml-1 h-5 px-1">
//                 {filters.platforms.length}
//               </Badge>
//             )}
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-40">
//           <DropdownMenuLabel>Filter by Platform</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup>
//             {platforms.map((platform) => (
//               <DropdownMenuItem 
//                 key={platform}
//                 onClick={() => toggleFilter('platforms', platform)}
//                 className="flex items-center gap-2"
//               >
//                 {filters.platforms.includes(platform) ? (
//                   <Check className="h-4 w-4" />
//                 ) : (
//                   <div className="w-4" />
//                 )}
//                 <span>{platform}</span>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
      
//       {/* Clear filters button - only show when filters are active */}
//       {activeFiltersCount > 0 && (
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           className="h-8 text-muted-foreground" 
//           onClick={clearFilters}
//         >
//           <X className="mr-1 h-3.5 w-3.5" />
//           Clear all
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ComplaintFilter;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface ComplaintFilterProps {
  departments: string[];
  locations: string[];
  platforms: string[];
  severities: string[];
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  departments: string[];
  locations: string[];
  platforms: string[];
  severities: string[];
}

const ComplaintFilter: React.FC<ComplaintFilterProps> = ({
  departments = [],
  locations = [],
  platforms = [],
  severities = [],
  onFilterChange
}) => {
  const [filters, setFilters] = useState<FilterState>({
    departments: [],
    locations: [],
    platforms: [],
    severities: []
  });

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(v => v !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      onFilterChange(updated);
      return updated;
    });
  };

  const clearFilters = () => {
    const emptyFilters = {
      departments: [],
      locations: [],
      platforms: [],
      severities: []
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFiltersCount = Object.values(filters).flat().length;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm font-medium flex items-center gap-1">
        <Filter className="h-4 w-4" />
        Filters:
      </span>

      {[
        { label: 'Department', key: 'departments', data: departments },
        { label: 'Location', key: 'locations', data: locations },
        { label: 'Severity', key: 'severities', data: severities },
        { label: 'Platform', key: 'platforms', data: platforms }
      ].map(({ label, key, data }) => (
        <DropdownMenu key={key}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              {label}
              <ChevronDown className="ml-1 h-4 w-4" />
              {filters[key as keyof FilterState].length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1">
                  {filters[key as keyof FilterState].length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by {label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="max-h-[200px] overflow-y-auto">
              {(data || []).map((item, idx) => (
                <DropdownMenuItem
                  key={`${key}-${item}-${idx}`} // Unique key
                  onClick={() => toggleFilter(key as keyof FilterState, item)}
                  className="flex items-center gap-2"
                >
                  {filters[key as keyof FilterState].includes(item) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <div className="w-4" />
                  )}
                  <span className="truncate">{item}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-muted-foreground"
          onClick={clearFilters}
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Clear all
        </Button>
      )}
    </div>
  );
};

export default ComplaintFilter;