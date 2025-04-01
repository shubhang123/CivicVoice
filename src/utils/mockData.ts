import { Complaint, DepartmentManager } from '@/types';

// Sample department managers
export const departmentManagers: DepartmentManager[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    department: 'Customer Service',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    department: 'Product',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    department: 'Finance',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    department: 'Operations',
  },
];

// Function to generate random date within last 3 months
const getRandomRecentDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  const randomTimestamp = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime());
  return new Date(randomTimestamp).toISOString();
};

// Sample complaints data
export const mockComplaints: Complaint[] = [
  // Customer Service complaints
  {
    _id: 'cs001',
    referenceNumber: 'REF-CS-001',
    content_platform: 'Twitter',
    content_platform_details: {
      post_id: 'tweet123456',
      date: getRandomRecentDate(),
      content: 'Waited on hold for 45 minutes and then got disconnected. Terrible service!',
      username: 'frustratedCustomer1',
      url: 'https://twitter.com/frustratedCustomer1/status/123456',
    },
    department: 'Customer Service',
    location: 'New York',
    name: 'Alex Rodriguez',
    severity: 'high',
    summary: 'Long wait time and call disconnection',
    complaint_score: 87,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'cs002',
    referenceNumber: 'REF-CS-002',
    content_platform: 'Facebook',
    content_platform_details: {
      post_id: 'fb987654',
      date: getRandomRecentDate(),
      content: 'Representative was rude and unhelpful with my billing issue.',
      username: 'jennifer.smith',
      url: 'https://facebook.com/company/posts/987654',
    },
    department: 'Customer Service',
    location: 'Chicago',
    name: 'Jennifer Smith',
    severity: 'medium',
    summary: 'Rude customer service representative',
    complaint_score: 65,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'cs003',
    referenceNumber: 'REF-CS-003',
    content_platform: 'Email',
    content_platform_details: {
      post_id: 'email-442233',
      date: getRandomRecentDate(),
      content: 'I need help with my account but no one is responding to my emails.',
      username: 'maria.garcia@email.com',
      url: 'N/A',
    },
    department: 'Customer Service',
    location: 'Miami',
    name: 'Maria Garcia',
    severity: 'low',
    summary: 'No response to customer inquiry',
    complaint_score: 45,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'cs004',
    referenceNumber: 'REF-CS-004',
    content_platform: 'Review Site',
    content_platform_details: {
      post_id: 'review-112233',
      date: getRandomRecentDate(),
      content: 'They promised to resolve my issue in 24 hours but it\'s been a week with no resolution.',
      username: 'davidW',
      url: 'https://reviewsite.com/company/review/112233',
    },
    department: 'Customer Service',
    location: 'Dallas',
    name: 'David Wilson',
    severity: 'high',
    summary: 'Unresolved customer issue beyond promised timeframe',
    complaint_score: 82,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'cs005',
    referenceNumber: 'REF-CS-005',
    content_platform: 'Chat Support',
    content_platform_details: {
      post_id: 'chat-332211',
      date: getRandomRecentDate(),
      content: 'Chat disconnected in the middle of my support session. Very frustrating.',
      username: 'taylor_j',
      url: 'N/A',
    },
    department: 'Customer Service',
    location: 'Seattle',
    name: 'Taylor Johnson',
    severity: 'medium',
    summary: 'Chat support disconnection',
    complaint_score: 58,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'cs006',
    referenceNumber: 'REF-CS-006',
    content_platform: 'Instagram',
    content_platform_details: {
      post_id: 'ig-post-556677',
      date: getRandomRecentDate(),
      content: 'Absolutely appalled at how my complaint was handled. Will be taking my business elsewhere.',
      username: 'angry_customer_92',
      url: 'https://instagram.com/p/556677',
    },
    department: 'Customer Service',
    location: 'Boston',
    name: 'Chris Miller',
    severity: 'critical',
    summary: 'Extremely dissatisfied customer threatening to leave',
    complaint_score: 95,
    createdAt: getRandomRecentDate(),
  },
  
  // Product complaints
  {
    _id: 'pr001',
    referenceNumber: 'REF-PR-001',
    content_platform: 'Review Site',
    content_platform_details: {
      post_id: 'review-445566',
      date: getRandomRecentDate(),
      content: 'Product broke after just two weeks of normal use. Poor quality.',
      username: 'qualityMatters',
      url: 'https://reviewsite.com/product/review/445566',
    },
    department: 'Product',
    location: 'San Francisco',
    name: 'Jordan Lee',
    severity: 'high',
    summary: 'Product quality issue - early failure',
    complaint_score: 78,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'pr002',
    referenceNumber: 'REF-PR-002',
    content_platform: 'YouTube',
    content_platform_details: {
      post_id: 'yt-comment-667788',
      date: getRandomRecentDate(),
      content: 'The advertised features don\'t work as described. Feels like false advertising.',
      username: 'TechReviewer',
      url: 'https://youtube.com/watch?v=video&comment=667788',
    },
    department: 'Product',
    location: 'Los Angeles',
    name: 'Sam Taylor',
    severity: 'high',
    summary: 'Product not meeting advertised functionality',
    complaint_score: 81,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'pr003',
    referenceNumber: 'REF-PR-003',
    content_platform: 'Forum',
    content_platform_details: {
      post_id: 'forum-post-998877',
      date: getRandomRecentDate(),
      content: 'The user interface is confusing and makes simple tasks difficult.',
      username: 'UXmatters',
      url: 'https://techforum.com/threads/998877',
    },
    department: 'Product',
    location: 'Portland',
    name: 'Riley Morgan',
    severity: 'medium',
    summary: 'Poor user interface design',
    complaint_score: 59,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'pr004',
    referenceNumber: 'REF-PR-004',
    content_platform: 'Email',
    content_platform_details: {
      post_id: 'email-113344',
      date: getRandomRecentDate(),
      content: 'Product arrived damaged and customer service won\'t help me.',
      username: 'jamie.parker@email.com',
      url: 'N/A',
    },
    department: 'Product',
    location: 'Phoenix',
    name: 'Jamie Parker',
    severity: 'high',
    summary: 'Damaged product on arrival',
    complaint_score: 75,
    createdAt: getRandomRecentDate(),
  },
  
  // Finance complaints
  {
    _id: 'fn001',
    referenceNumber: 'REF-FN-001',
    content_platform: 'Email',
    content_platform_details: {
      post_id: 'email-224455',
      date: getRandomRecentDate(),
      content: 'I was charged twice for my subscription and can\'t get a refund.',
      username: 'robert.chen@email.com',
      url: 'N/A',
    },
    department: 'Finance',
    location: 'Atlanta',
    name: 'Robert Chen',
    severity: 'high',
    summary: 'Double billing issue',
    complaint_score: 80,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'fn002',
    referenceNumber: 'REF-FN-002',
    content_platform: 'Twitter',
    content_platform_details: {
      post_id: 'tweet-667788',
      date: getRandomRecentDate(),
      content: 'Hidden fees not disclosed during signup. Very deceptive!',
      username: 'money_matters',
      url: 'https://twitter.com/money_matters/status/667788',
    },
    department: 'Finance',
    location: 'Denver',
    name: 'Pat Johnson',
    severity: 'critical',
    summary: 'Undisclosed fees complaint',
    complaint_score: 92,
    createdAt: getRandomRecentDate(),
  },
  
  // Operations complaints
  {
    _id: 'op001',
    referenceNumber: 'REF-OP-001',
    content_platform: 'Email',
    content_platform_details: {
      post_id: 'email-335566',
      date: getRandomRecentDate(),
      content: 'Order has been pending for over a week with no updates.',
      username: 'waiting.patiently@email.com',
      url: 'N/A',
    },
    department: 'Operations',
    location: 'Minneapolis',
    name: 'Jesse Kim',
    severity: 'medium',
    summary: 'Delayed order processing',
    complaint_score: 68,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'op002',
    referenceNumber: 'REF-OP-002',
    content_platform: 'Review Site',
    content_platform_details: {
      post_id: 'review-779900',
      date: getRandomRecentDate(),
      content: 'Package arrived with items missing. Very disappointing.',
      username: 'honest_reviewer',
      url: 'https://reviewsite.com/company/review/779900',
    },
    department: 'Operations',
    location: 'Houston',
    name: 'Morgan Smith',
    severity: 'high',
    summary: 'Incomplete order delivered',
    complaint_score: 77,
    createdAt: getRandomRecentDate(),
  },
  {
    _id: 'op003',
    referenceNumber: 'REF-OP-003',
    content_platform: 'Facebook',
    content_platform_details: {
      post_id: 'fb-112233',
      date: getRandomRecentDate(),
      content: 'Delivery person was extremely rude and damaged my property.',
      username: 'concerned.homeowner',
      url: 'https://facebook.com/company/posts/112233',
    },
    department: 'Operations',
    location: 'Detroit',
    name: 'Alex Thompson',
    severity: 'critical',
    summary: 'Delivery misconduct and property damage',
    complaint_score: 90,
    createdAt: getRandomRecentDate(),
  },
];

// Function to get complaints by department
export const getComplaintsByDepartment = (department: string): Complaint[] => {
  return mockComplaints.filter(complaint => complaint.department === department);
};

// Function to get manager by email
export const getManagerByEmail = (email: string): DepartmentManager | undefined => {
  return departmentManagers.find(manager => manager.email === email);
};

// Authentication related mock functions
export const mockLogin = (email: string, password: string): Promise<DepartmentManager> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const manager = getManagerByEmail(email);
      if (manager && password === 'password') { // Simple password check for demo
        resolve(manager);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800); // Simulate network delay
  });
};
