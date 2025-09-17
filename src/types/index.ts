// Core Types for Akwana Smart Farming Assistant

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  role: 'farmer' | 'extension_officer' | 'admin';
  language: 'en' | 'lg' | 'sw';
  farms: Farm[];
  points: number;
  createdAt: Date;
}

export interface Farm {
  id: string;
  name: string;
  location: {
    district: string;
    village: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  size: number; // in acres
  crops: Crop[];
}

export interface Crop {
  id: string;
  type: 'maize' | 'beans' | 'coffee' | 'cassava' | 'banana' | 'rice' | 'groundnuts';
  plantedDate: Date;
  expectedHarvest: Date;
  status: 'healthy' | 'warning' | 'critical';
  lastScan?: ScanResult;
}

export interface ScanResult {
  id: string;
  type: 'soil' | 'crop';
  imageUrl: string;
  diagnosis: {
    status: 'healthy' | 'warning' | 'critical';
    issues: string[];
    confidence: number;
  };
  recommendations: string[];
  timestamp: Date;
}

export interface MarketPrice {
  crop: string;
  district: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  unit: string;
  lastUpdated: Date;
  prediction?: {
    nextWeek: number;
    trend: 'up' | 'down' | 'stable';
  };
}

export interface PestAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  affectedDistricts: string[];
  description: string;
  preventiveMeasures: string[];
  reportedCases: number;
  timestamp: Date;
}

export interface Insurance {
  id: string;
  type: 'weather' | 'crop' | 'livestock';
  premium: number;
  coverage: number;
  crop: string;
  status: 'active' | 'pending' | 'expired';
  startDate: Date;
  endDate: Date;
}

export interface CommunityPost {
  id: string;
  author: User;
  title: string;
  content: string;
  images?: string[];
  likes: number;
  replies: Reply[];
  verified: boolean;
  timestamp: Date;
  tags: string[];
}

export interface Reply {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  isExpert: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language: 'en' | 'lg' | 'sw';
}