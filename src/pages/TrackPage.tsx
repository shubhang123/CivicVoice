import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "@/components/TrackComplaint/SearchComponent";
import StatusTimeline from "@/components/TrackComplaint/StatusTimeline";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { type Status } from "@/components/TrackComplaint/StatusTimeline";
import axios from "axios";

const TrackPage: React.FC = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [complaintData, setComplaintData] = useState<{
    id: string;
    title: string;
    status: Status;
    progressPercentage: number;
    category: string;
    submittedDate: string;
    lastUpdated: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!referenceNumber.trim()) {
      setError("Please enter a reference number.");
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .post(`http://localhost:3000/api/complaints/track`, { referenceNumber })
      .then((response) => {
        console.log(response.data)
        setComplaintData(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching complaint:", err);
        setError("Complaint not found. Please check your reference number.");
        setComplaintData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Complaint Tracking</h1>
          <p className="text-muted-foreground">
            Track the status and progress of your complaint
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Reference Number Input */}
      <div className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Enter Reference Number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
        <Button onClick={handleSearch} variant="default">
          Track
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading complaint details...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : complaintData ? (
        <>
          <div className="bg-muted/30 border rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Complaint ID</div>
                <div className="text-xl font-medium">{complaintData.id}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Category</div>
                <div>{complaintData.category}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Submitted Date</div>
                <div>{complaintData.submittedDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                <div>{complaintData.lastUpdated}</div>
              </div>
            </div>
          </div>

          <StatusTimeline 
            currentStatus={complaintData.status} 
            progressPercentage={complaintData.progressPercentage} 
          />
        </>
      ) : null}
    </div>
  );
};

export default TrackPage;
