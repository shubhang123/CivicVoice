// export interface Complaint {
//   department: string;
//   summary: string;
//   severity: string;
//   raw: string;
//   location: string;
//   name: string;
//   content_platform: string;
//   post_id: string;
//   date: string;
//   content: string;
//   username: string;
//   subreddit?: string;
//   url: string;
//   complaint_score: number;
// }
// import { fetchComplaintsFromApi } from './api';

// // Mock data as fallback in case the API is not available
// const mockComplaints: Complaint[] = [
//   {
//       department: "Health and Sanitation Department",
//       summary: "Missing public dustbins in Indore",
//       severity: "Moderate",
//       raw: "Where Did All the Dustbins in Indore Go? Okay, seriously, am I going crazy, or did Indore just make all the public dustbins disappear overnight? A year ago, you could find a dustbin at almost every street corner, and now it's like they've all vanished. I walked around Sapna-Sangeeta and even MG Road today, and not a single dustbin in sight. What's the logic behind this? Do they expect people to just carry their trash home now? Indore Municipal Corporation, if you guys removed them, at least tell us why! The city was much cleaner when they were around",
//       location: "Indore",
//       name: "N/A",
//       content_platform: "Reddit",
//       post_id: "1j2j3rb",
//       date: "2025-03-03 13:51:54",
//       content: "Where Did All the Dustbins in Indore Go?\nOkay, seriously, am I going crazy, or did Indore just make all the public dustbins disappear overnight? A year ago, you could find a dustbin at almost every street corner, and now it's like they've all vanished. I walked around Sapna-Sangeeta and even MG Road today, and not a single dustbin in sight. What's the logic behind this? Do they expect people to just carry their trash home now? Indore Municipal Corporation, if you guys removed them, at least tell us why! The city was much cleaner when they were around",
//       username: "GeologistBusy2288",
//       subreddit: "complaintsIndia",
//       url: "https://www.reddit.com/r/complaintsIndia/comments/1j2j3rb/where_did_all_the_dustbins_in_indore_go/",
//       complaint_score: 0.9387473464012146
//   },
//   {
//       department: "Public Amenities Department",
//       summary: "Public toilets near Rajwada are insufficient, often locked or unhygienic",
//       severity: "Moderate",
//       raw: "Public Toilets Near Rajwada Rajwada is one of Indore's main attractions, but finding a public toilet here is like finding treasure. The ones that exist are either locked or smell so bad you'd rather hold it in. Indore Municipal Corporation, do tourists and locals not deserve basic facilities?",
//       location: "Rajwada, Indore",
//       name: "N/A",
//       content_platform: "Manual",
//       post_id: "1j2j2xr",
//       date: "2025-03-03 13:50:49",
//       content: "Public Toilets Near Rajwada\nRajwada is one of Indore's main attractions, but finding a public toilet here is like finding treasure. The ones that exist are either locked or smell so bad you'd rather hold it in. Indore Municipal Corporation, do tourists and locals not deserve basic facilities?",
//       username: "GeologistBusy2288",
//       subreddit: "complaintsIndia",
//       url: "https://www.reddit.com/r/complaintsIndia/comments/1j2j2xr/public_toilets_near_rajwada/",
//       complaint_score: 0.9727470278739929
//   }
// ];



// // Fetch complaints with API and fallback to mock data if needed
// export const fetchComplaints = async (): Promise<Complaint[]> => {
//   try {
//       const complaints = await fetchComplaintsFromApi();
//       return complaints;
//   } catch (error) {
//       console.warn('Falling back to mock data due to API error:', error);
//       // Simulate API call delay
//       return new Promise((resolve) => {
//           setTimeout(() => {
//               resolve(mockComplaints);
//           }, 800);
//       });
//   }
// };

// // Analytics utilities
// export const getSeverityStats = (complaints: Complaint[]) => {
//   const stats = {
//       High: 0,
//       Moderate: 0,
//       Low: 0,
//   };

//   // Ensure complaints is an array
//   if (!Array.isArray(complaints)) {
//       complaints = [];
//   }

//   complaints.forEach(complaint => {
//       if (complaint.severity in stats) {
//           stats[complaint.severity as keyof typeof stats]++;
//       }
//   });

//   return Object.entries(stats).map(([name, value]) => ({ name, value }));
// };

// export const getDepartmentStats = (complaints: Complaint[]) => {
//   const departments: Record<string, number> = {};

//   // Ensure complaints is an array
//   if (!Array.isArray(complaints)) {
//       complaints = [];
//   }

//   complaints.forEach(complaint => {
//       if (departments[complaint.department]) {
//           departments[complaint.department]++;
//       } else {
//           departments[complaint.department] = 1;
//       }
//   });

//   return Object.entries(departments).map(([name, value]) => ({ name, value }));
// };

// export const getLocationStats = (complaints: Complaint[]) => {
//   const locations: Record<string, number> = {};

//   // Ensure complaints is an array
//   if (!Array.isArray(complaints)) {
//       complaints = [];
//   }

//   complaints.forEach(complaint => {
//       if (locations[complaint.location]) {
//           locations[complaint.location]++;
//       } else {
//           locations[complaint.location] = 1;
//       }
//   });

//   return Object.entries(locations).map(([name, value]) => ({ name, value }));
// };

// export const getPlatformStats = (complaints: Complaint[]) => {
//   const platforms: Record<string, number> = {};

//   // Ensure complaints is an array
//   if (!Array.isArray(complaints)) {
//       complaints = [];
//   }

//   complaints.forEach(complaint => {
//       if (platforms[complaint.content_platform]) {
//           platforms[complaint.content_platform]++;
//       } else {
//           platforms[complaint.content_platform] = 1;
//       }
//   });

//   return Object.entries(platforms).map(([name, value]) => ({ name, value }));
// };

 
//  export const getTimelineData = (complaints: Complaint[]) => {
//     // Implementation for getTimelineData

//  };






import { Complaint, fetchComplaintsFromApi } from './api';

// Mock data as fallback in case the API is not available
const mockComplaints: Complaint[] = [
  {
    _id: "67c7602bb67ffa803580312e",
    referenceNumber: "4b4cf05a-489d-4085-a851-16d2b61a16ae",
    content_platform: "Twitter",
    content_platform_details: {
      post_id: "1550000000000000000",
      date: "2022-07-15 15:10:24",
      content:
        "Innuendos and worse against former Vice President Hamid Ansari are reprehensible. As Ambassador of #India in key countries and #UN he had a distinguished record and even received a Padma Award in early career.",
      username: "earthphysician",
      url: "https://twitter.com/earthphysician/status/1547961786044784640",
    },
    department: "N/A",
    location: "N/A",
    name: "N/A",
    severity: "Low",
    summary: "Innuendos against former Vice President Hamid Ansari",
    complaint_score: 2,
  },
  {
    _id: "67c7602bb67ffa803580312f",
    referenceNumber: "d3b9c7d0-8f2c-4a27-b3e5-2f7c87691bd4",
    content_platform: "Reddit",
    content_platform_details: {
      post_id: "r1234567890",
      date: "2023-02-10 10:35:12",
      content:
        "This is an outrageous claim against a well-respected journalist. Unverified accusations should not be spread online.",
      username: "newswatcher99",
      url: "https://reddit.com/r/politics/comments/r1234567890",
    },
    department: "Media Affairs",
    location: "USA",
    name: "John Doe",
    severity: "Medium",
    summary: "False allegations against journalist",
    complaint_score: 5,
  },
  {
    _id: "67c7602bb67ffa8035803130",
    referenceNumber: "a7f9e0b1-45c2-4d8e-a925-ef23bd84b2c5",
    content_platform: "Facebook",
    content_platform_details: {
      post_id: "fbpost123456",
      date: "2024-01-05 20:20:45",
      content:
        "A misleading video is being circulated, falsely claiming government involvement in a scam.",
      username: "concerned_citizen",
      url: "https://facebook.com/posts/fbpost123456",
    },
    department: "Public Relations",
    location: "India",
    name: "Jane Smith",
    severity: "High",
    summary: "Misleading government-related video",
    complaint_score: 8,
  },
];

export default mockComplaints;


// Fetch complaints with API and fallback to mock data if needed
export const fetchComplaints = async (): Promise<Complaint[]> => { 
  try {
    console.log("Attempting to fetch complaints from API");
    const complaints = await fetchComplaintsFromApi();
    console.log("API response:", complaints);

    return complaints.filter(complaint => 
      !(complaint.summary === "No Summary Available" || 
        complaint.department === "NA" || 
        complaint.department === "No Department Specified")
    );
  } catch (error) {
    console.warn('Falling back to mock data due to API error:', error);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Returning mock data");

        resolve(mockComplaints.filter(complaint => 
          !(complaint.summary === "No Summary Available" &&
            complaint.department === "N/A" || 
            complaint.department === "No Department Specified")
        ));
      }, 800);
    });
  }
};



// Analytics utilities
export const getSeverityStats = (complaints: Complaint[]) => {
  const stats = {
    High: 0,
    Moderate: 0,
    Low: 0,
  };

  // Ensure complaints is an array
  if (!Array.isArray(complaints)) {
    complaints = [];
  }

  complaints.forEach(complaint => {
    if (complaint.severity in stats) {
      stats[complaint.severity as keyof typeof stats]++;
    }
  });

  return Object.entries(stats).map(([name, value]) => ({ name, value }));
};

export const getDepartmentStats = (complaints: Complaint[]) => {
  const departments: Record<string, number> = {};

  // Ensure complaints is an array
  if (!Array.isArray(complaints)) {
    complaints = [];
  }

  complaints.forEach(complaint => {
    if (departments[complaint.department]) {
      departments[complaint.department]++;
    } else {
      departments[complaint.department] = 1;
    }
  });

  // Sort by count in descending order
  return Object.entries(departments)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
};

export const getLocationStats = (complaints: Complaint[]) => {
  const locations: Record<string, number> = {};

  // Ensure complaints is an array
  if (!Array.isArray(complaints)) {
    complaints = [];
  }

  complaints.forEach(complaint => {
    if (locations[complaint.location]) {
      locations[complaint.location]++;
    } else {
      locations[complaint.location] = 1;
    }
  });

  return Object.entries(locations)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
};

export const getPlatformStats = (complaints: Complaint[]) => {
  const platforms: Record<string, number> = {};

  // Ensure complaints is an array
  if (!Array.isArray(complaints)) {
    complaints = [];
  }

  complaints.forEach(complaint => {
    if (platforms[complaint.content_platform]) {
      platforms[complaint.content_platform]++;
    } else {
      platforms[complaint.content_platform] = 1;
    }
  });

  return Object.entries(platforms).map(([name, value]) => ({ name, value }));
};

export const getTimelineData = (complaints: Complaint[]) => {
  if (!Array.isArray(complaints) || complaints.length === 0) {
    return [];
  }

  // Group complaints by month
  const groupedByMonth: Record<string, { total: number; high: number; moderate: number; low: number; }> = {};

  complaints.forEach(complaint => {
    try {
      const date = new Date(complaint.content_platform_details.date);
      // Fix: Use template literal with backticks and correct interpolation
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!groupedByMonth[monthKey]) {
        groupedByMonth[monthKey] = { total: 0, high: 0, moderate: 0, low: 0 };
      }
      groupedByMonth[monthKey].total++;
      
      if (complaint.severity === 'High') {
        groupedByMonth[monthKey].high++;
      } else if (complaint.severity === 'Moderate') {
        groupedByMonth[monthKey].moderate++;
      } else if (complaint.severity === 'Low') {
        groupedByMonth[monthKey].low++;
      }
    } catch (e) {
      console.error('Error processing date:', complaint.content_platform_details.date, e);
    }
  });

  // Convert to array and sort by date
  return Object.entries(groupedByMonth)
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const getSentimentStats = (complaints: Complaint[]) => {
  if (!Array.isArray(complaints) || complaints.length === 0) {
    return { average: 0.5, distribution: [] };
  }

  // Ensure complaint_score is a valid number, defaulting to 0.5 if not
  const scores = complaints.map(c =>
    typeof c.complaint_score === 'number' ? c.complaint_score : 0.5
  );

  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  // Create distribution buckets (0.0-0.2, 0.2-0.4, etc.)
  const distribution = [
    { range: '0.0-0.2', count: 0 },
    { range: '0.2-0.4', count: 0 },
    { range: '0.4-0.6', count: 0 },
    { range: '0.6-0.8', count: 0 },
    { range: '0.8-1.0', count: 0 }
  ];

  scores.forEach(score => {
    // Calculate the bucket index and clamp it between 0 and 4
    const bucketIndex = Math.max(0, Math.min(Math.floor(score * 5), 4));
    distribution[bucketIndex].count++;
  });

  return { average, distribution };
};
export const getTrendData = (complaints: Complaint[]) => {
  if (!Array.isArray(complaints) || complaints.length === 0) {
    return { 
      total: 0, 
      trend: 0, 
      direction: 'neutral' 
    };
  }

  // Filter out complaints without valid date
  const validComplaints = complaints.filter(complaint => 
    complaint.content_platform_details && 
    complaint.content_platform_details.date
  );

  // If no valid complaints, return default object
  if (validComplaints.length === 0) {
    return { 
      total: 0, 
      trend: 0, 
      direction: 'neutral' 
    };
  }

  // Sort complaints by date
  const sortedComplaints = validComplaints.sort((a, b) => 
    new Date(b.content_platform_details.date).getTime() - new Date(a.content_platform_details.date).getTime()
  );

  // Calculate total complaints
  const total = validComplaints.length;

  // Calculate trend based on recent complaints
  const recentPeriod = sortedComplaints.slice(0, Math.min(10, total));
  const previousPeriod = sortedComplaints.slice(
    Math.min(10, total), 
    Math.min(20, total)
  );

  const recentCount = recentPeriod.length;
  const previousCount = previousPeriod.length;

  // Calculate percentage change
  const trend = previousCount > 0 
    ? ((recentCount - previousCount) / previousCount) * 100 
    : 0;

  // Determine trend direction
  const direction = trend > 0 
    ? 'up' 
    : trend < 0 
      ? 'down' 
      : 'neutral';

  return {
    total,
    trend: Math.round(trend),
    direction
  };
};
