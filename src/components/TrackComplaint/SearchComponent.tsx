import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface RecentComplaint {
  id: string;
  title: string;
  date: string;
}

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isValidId, setIsValidId] = useState<boolean | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Mock recent complaints data
  const recentComplaints: RecentComplaint[] = [
    { id: "CMP-124578", title: "Water supply issue", date: "2 days ago" },
    { id: "CMP-985632", title: "Road maintenance", date: "1 week ago" },
    { id: "CMP-357159", title: "Electricity outage", date: "2 weeks ago" },
  ];

  const validateComplaintId = (id: string) => {
    // Ensure isValid is always a boolean
    const isValid = id.length >= 6 && (id.startsWith("CMP-") || !!id.match(/^\d{6}$/));
  
    // Reset progress and validation state
    setValidationProgress(0);
    setIsValidId(null);
  
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setValidationProgress(progress);
  
      if (progress >= 100) {
        clearInterval(interval);
        setIsValidId(isValid); // Ensure boolean type
      }
    }, 200);
  };

  const handleSearch = async () => {
    if (searchValue.trim()) {
      try {
        
        const res = await axios.post(`http://localhost:3000/api/complaints/validate/${searchValue}`);

        if (res.data.valid) {
          navigate(`/track/${searchValue}`);
        } else {
          setIsValidId(false);
        }
      } catch (error) {
        setIsValidId(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setIsValidId(null);
    setValidationProgress(0);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={searchRef}
      className="w-full max-w-2xl mx-auto mb-8 relative"
    >
      <div
        className={cn(
          "flex items-center gap-2 p-2 border rounded-lg transition-all duration-300",
          isSearchFocused ? "border-primary shadow-md" : "border-input",
          isValidId === true ? "bg-green-50 border-green-300" : "",
          isValidId === false ? "bg-red-50 border-red-300" : ""
        )}
      >
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setIsValidId(null);
          }}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Enter complaint reference number..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto shadow-none"
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Button onClick={handleSearch} size="sm">
          Track
        </Button>
      </div>

      {validationProgress > 0 && validationProgress < 100 && (
        <div className="mt-2">
          <Progress value={validationProgress} className="h-1" />
          <p className="text-xs text-muted-foreground mt-1">Validating complaint ID...</p>
        </div>
      )}

      {isValidId === false && (
        <p className="text-sm text-destructive mt-2 animate-fade-in">
          Invalid complaint ID format. Please check and try again.
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Recent complaints</p>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-sm text-primary flex items-center gap-1"
        >
          {isDropdownOpen ? "Hide" : "Show"}
          {isDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isDropdownOpen && (
        <div className="mt-2 border rounded-md shadow-sm bg-background animate-fade-in">
          {recentComplaints.map((complaint, index) => (
            <div
              key={complaint.id}
              className={cn(
                "p-3 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors",
                index !== recentComplaints.length - 1 && "border-b"
              )}
              onClick={() => {
                setSearchValue(complaint.id);
                setIsDropdownOpen(false);
                validateComplaintId(complaint.id);
              }}
            >
              <div>
                <p className="font-medium text-sm">{complaint.title}</p>
                <p className="text-muted-foreground text-xs">{complaint.id}</p>
              </div>
              <div className="flex items-center text-muted-foreground text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {complaint.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
