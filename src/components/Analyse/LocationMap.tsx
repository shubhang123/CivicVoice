import React, { useMemo } from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  locations: {
    name: string;
    value: number;
  }[];
}

const LocationMap: React.FC<LocationMapProps> = ({ locations }) => {
  // Sort locations by count in descending order
  const sortedLocations = useMemo(() => {
    return [...locations].sort((a, b) => b.value - a.value);
  }, [locations]);

  // Calculate the maximum value for scaling
  const maxValue = useMemo(() => {
    return locations.length > 0 
      ? Math.max(...locations.map(item => item.value)) 
      : 0;
  }, [locations]);

  // Generate a color based on the count relative to the max
  const getColor = (value: number) => {
    if (maxValue === 0) return '#e2e8f0';
    
    const intensity = (value / maxValue) * 0.8 + 0.2; // Scale from 0.2 to 1.0
    return `rgba(15, 158, 255, ${intensity})`;
  };

  // Generate circle size based on the count relative to the max
  const getSize = (value: number) => {
    if (maxValue === 0) return 8;
    const minSize = 8;
    const maxSize = 20;
    return minSize + ((value / maxValue) * (maxSize - minSize));
  };

  return (
    <div className="chart-container flex flex-col" style={{ '--delay': 3 } as React.CSSProperties}>
      <div className="mb-2 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-chart-purple" />
        <h3 className="chart-title">Complaint Locations</h3>
      </div>
      
      <div className="relative flex-1 min-h-[200px] glass-card bg-white/10 rounded-xl p-6">
        <div className="absolute inset-0 opacity-10 overflow-hidden rounded-xl">
          {/* Placeholder for actual map - could be replaced with a real map implementation */}
          <svg 
            className="w-full h-full" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M20,20 Q40,60 80,80 T160,120 L180,160 L140,180 L60,160 L20,100 Z" 
              stroke="#0F9EFF" 
              strokeWidth="0.5" 
              fill="none" 
            />
            <path 
              d="M40,40 L100,40 L120,80 L80,120 L40,100 Z" 
              stroke="#0F9EFF" 
              strokeWidth="0.5" 
              fill="none" 
            />
            <path 
              d="M100,100 L140,80 L160,100 L140,140 L100,140 Z" 
              stroke="#0F9EFF" 
              strokeWidth="0.5" 
              fill="none" 
            />
            <path 
              d="M20,120 L60,140 L40,180 L10,160 Z" 
              stroke="#0F9EFF" 
              strokeWidth="0.5" 
              fill="none" 
            />
          </svg>
        </div>
        
        {locations.length > 0 ? (
          <>
            {/* Display top 5 locations with dot indicators */}
            <div className="relative h-full">
              {sortedLocations.slice(0, 7).map((location, index) => (
                <div 
                  key={location.name}
                  className="absolute animate-float transform transition-all duration-500"
                  style={{
                    // Pseudo-random positioning - in a real app you'd use actual coordinates
                    left: `${(index * 13 + 15) % 85}%`,
                    top: `${(index * 17 + 20) % 75}%`,
                    animationDelay: `${index * 0.7}s`
                  }}
                >
                  <div 
                    className="relative flex flex-col items-center"
                    data-location={location.name}
                  >
                    <div 
                      className="rounded-full shadow-sm z-10 animate-pulse-soft"
                      style={{
                        width: `${getSize(location.value)}px`,
                        height: `${getSize(location.value)}px`,
                        backgroundColor: getColor(location.value)
                      }}
                    />
                    <div 
                      className="absolute -bottom-1 rounded-full opacity-30 animate-pulse-soft"
                      style={{
                        width: `${getSize(location.value) * 1.5}px`,
                        height: `${getSize(location.value) * 1.5}px`,
                        backgroundColor: getColor(location.value)
                      }}
                    />
                    <div className="absolute white-space-nowrap mt-1 pt-3">
                      <span className="text-[10px] font-medium bg-white/90 px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                        {location.name} ({location.value})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Location legend */}
            <div className="absolute bottom-2 left-2 right-2 glass-card p-2 text-xs">
              <p className="font-medium mb-1">Most Affected Areas</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {sortedLocations.slice(0, 4).map((location) => (
                  <div key={location.name} className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getColor(location.value) }}
                    />
                    <span className="truncate">{location.name}</span>
                    <span className="text-muted-foreground">({location.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">No location data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;