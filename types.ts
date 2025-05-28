
import React from 'react';
import type { Chat } from '@google/genai';

export type Page = 
  'home' | 
  'login' | 
  'signup' | 
  'dashboard' | 
  'features' | 
  'how-it-works' | 
  'pricing' | 
  'testimonials' |
  'agentList' |
  'agentCreate' |
  'agentEdit' | // Params: id
  'agentDetail'; // Params: id

export interface NavLink {
  href: Page | string; 
  label: string;
  isPageLink?: boolean; 
  requiresAuth?: boolean;
  params?: NavigationParams;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingPlan {
  name: string;
  price: string;
  frequency: string;
  features: string[];
  ctaText: string;
  highlight?: boolean;
  actionPage?: Page; 
  actionParams?: NavigationParams;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Theme Context
export type Theme = 'light' | 'dark';
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Auth Context
export interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: () => void; 
  logoutUser: () => void;
}

// Navigation Context
export interface NavigationParams {
  [key: string]: string;
}
export interface NavigationContextType {
  currentPage: Page;
  currentParams: NavigationParams;
  navigateTo: (page: Page, params?: NavigationParams, sectionId?: string) => void;
}

// Agent Management
export type AgentStatus = 'active' | 'inactive' | 'draft';

export interface AgentPerformanceMetrics {
  tasksCompleted: number;
  successRate: number; // Percentage 0-100
  averageResponseTime: number; // Milliseconds
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  config?: Record<string, any>; // For agent-specific settings
  performance: AgentPerformanceMetrics;
}

export interface AgentContextType {
  agents: Agent[];
  isLoading: boolean;
  getAgentById: (id: string) => Agent | undefined;
  createAgent: (agentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'performance'> & { performance?: Partial<AgentPerformanceMetrics> }) => Promise<Agent>;
  updateAgent: (id: string, updates: Partial<Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<Agent | undefined>;
  deleteAgent: (id: string) => Promise<void>;
  generateSampleAgents: (count: number) => void; // For populating with dummy data
}

// Analytics
export interface KpiCardData {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string; // e.g., "+5% vs last month"
}

export interface BarChartDataItem {
  label: string;
  value: number;
  color?: string;
}

export interface AnalyticsData {
  kpis: KpiCardData[];
  agentTaskDistribution: BarChartDataItem[];
  // Potentially more chart data types
}

// Table Component Types
export interface TableColumn<T> {
  key: keyof T | string; // Allow string for custom render columns (e.g., 'actions')
  header: string;
  render?: (item: T) => React.ReactNode; // Custom render function for a cell
  className?: string; // Class for <th>
  cellClassName?: string; // Class for <td>
}

// AI Assistant Types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  error?: boolean;
}

export interface AssistantContextType {
  isAssistantOpen: boolean;
  toggleAssistant: () => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  chatSession: Chat | null; // Store the active chat session
}