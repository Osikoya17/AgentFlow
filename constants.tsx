
import React from 'react';
import { NavLink, Feature, HowItWorksStep, PricingPlan, Testimonial, SocialLink, Page, AgentStatus } from './types';

// SVG Icons (existing and completed)
export const CodeBracketIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  </svg>
);

export const BoltIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export const PuzzlePieceIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.083A12.034 12.034 0 0 0 12 5.917a12.034 12.034 0 0 0-2.25.166m0 0A11.953 11.953 0 0 1 12 2.25c1.503 0 2.93.274 4.25.75m-8.5.417v.666C5.75 7.583 5.75 8.5 5.75 8.5s0 .917.25 1.583m2.25-.166a11.953 11.953 0 0 0-2.25-.166m2.25 .166c.084.015.167.03.25.045m2.25.083A12.034 12.034 0 0 0 12 5.917m2.25.166A11.953 11.953 0 0 1 12 2.25c-1.503 0-2.93.274-4.25.75m8.5.417V12a8.986 8.986 0 0 1-1.036 4.25M12 12V5.917m0 0A11.953 11.953 0 0 0 9.75 5.75M12 12v8.25m0 0A8.986 8.986 0 0 1 13.036 16.25m-1.036 4.083A12.034 12.034 0 0 1 12 22.083a12.034 12.034 0 0 1-2.25-.166m0 0A11.953 11.953 0 0 0 12 17.75c-1.503 0-2.93.274-4.25.75m8.5.417c.084.015.167.03.25.045M12 17.75c.083.015.167.03.25.045m0 0A8.986 8.986 0 0 1 10.964 13.75M12 17.75A8.986 8.986 0 0 0 13.036 13.75M9.75 12.25A2.25 2.25 0 0 0 12 14.5a2.25 2.25 0 0 0 2.25-2.25M12 12.25c.083.015.167.03.25.045M12 12.25A8.986 8.986 0 0 0 10.964 8.25m1.036 4.005A8.986 8.986 0 0 1 13.036 8.25" />
  </svg>
);

export const RocketLaunchIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.543A14.975 14.975 0 0 0 3 10.291v-2.072A14.975 14.975 0 0 0 9.512 1.211L9.512 1.211A14.975 14.975 0 0 0 12.861 8.211L12.861 8.211Z" />
    </svg>
);

export const CogIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 1.905c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.333.183-.583.495-.646.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 0 1 0-1.905c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a2.25 2.25 0 0 0-2.25 2.25m0 0a2.25 2.25 0 0 0 2.25 2.25m2.25-2.25a2.25 2.25 0 0 0-2.25-2.25m0 0A2.25 2.25 0 0 0 9.75 12m2.25-2.25A2.25 2.25 0 0 0 12 7.5m0 2.25A2.25 2.25 0 0 0 14.25 12m0 0a2.25 2.25 0 0 0 2.25 2.25m0 0a2.25 2.25 0 0 0 2.25-2.25m0 0a2.25 2.25 0 0 0-2.25-2.25m-2.25 0A2.25 2.25 0 0 0 12 7.5m0 0V3m0 0a2.25 2.25 0 0 0-2.25 2.25M12 3a2.25 2.25 0 0 0 2.25 2.25m0 0A2.25 2.25 0 0 1 12 7.5m0 0a2.25 2.25 0 0 0-2.25 2.25m2.25 0a2.25 2.25 0 0 0 2.25 2.25" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

// New Icons & Completed Icons from previous step
export const ChipIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => ( // For "My Agents" or AI related
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5M19.5 8.25H21M19.5 12H21m-3.75 3.75H21m-3.75 3.75H21M12 8.25v7.5M12 8.25a2.25 2.25 0 0 1-2.25-2.25V3.75A2.25 2.25 0 0 1 12 1.5h0A2.25 2.25 0 0 1 14.25 3.75v2.25A2.25 2.25 0 0 1 12 8.25Zm0 7.5a2.25 2.25 0 0 1-2.25 2.25v2.25a2.25 2.25 0 0 1 2.25 2.25h0a2.25 2.25 0 0 1 2.25-2.25V18a2.25 2.25 0 0 1-2.25-2.25Z" />
    </svg>
);

export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.678-.113 1.017-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-3.741-5.458M12 12.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-4.243 5.972a9.093 9.093 0 0 1-3.741-.48 3 3 0 0 1 3.741-5.457m0 0a3 3 0 0 0 4.498 0M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 4.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-6-4.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
);


// Icons for AI Assistant
export const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-2.184-1.253-1.059-1.865c-.213-.376-.323-.79-.323-1.208V14.25c0-1.136.847-2.1 1.98-2.193.34-.027.68-.052 1.02-.072Zm-7.007 0c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-2.184-1.253-1.059-1.865c-.213-.376-.323-.79-.323-1.208V14.25c0-1.136.847-2.1 1.98-2.193.34-.027.68-.052 1.02-.072ZM7.5 8.25c0-1.136-.847-2.1-1.98-2.193C5.18 6.03 4.84 6 4.5 6H1.875c-1.136 0-1.98.964-1.98 2.1v4.286c0 1.136.847 2.1 1.98 2.193.34.027.68.052 1.02.072v3.091l2.184-1.253 1.059-1.865c.213-.376.323-.79.323-1.208V8.25Z" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);


// Data Constants
export const NAV_LINKS_PUBLIC: NavLink[] = [
  { href: 'home', label: 'Features', isPageLink: true }, // Will scroll to #features on home
  { href: 'home', label: 'How It Works', isPageLink: true }, // Will scroll to #how-it-works on home
  { href: 'home', label: 'Pricing', isPageLink: true }, // Will scroll to #pricing on home
  { href: 'home', label: 'Testimonials', isPageLink: true }, // Will scroll to #testimonials on home
];

export const NAV_LINKS_AUTHENTICATED: NavLink[] = [
  { href: 'dashboard', label: 'Dashboard', isPageLink: true },
  { href: 'agentList', label: 'My Agents', isPageLink: true },
  ...NAV_LINKS_PUBLIC, // Include public links like Features, Pricing etc. for logged-in users too
];

export const FEATURES_DATA: Feature[] = [
  {
    icon: <CodeBracketIcon className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
    title: 'Intuitive Agent Builder',
    description: 'Design and configure AI agents with our easy-to-use visual interface. No coding required for many use cases!',
  },
  {
    icon: <BoltIcon className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
    title: 'Rapid Deployment',
    description: 'Launch your agents into production in minutes and start automating tasks immediately.',
  },
  {
    icon: <ChartBarIcon className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
    title: 'Performance Analytics',
    description: 'Monitor your agents\' effectiveness with real-time dashboards and detailed reporting.',
  },
  {
    icon: <PuzzlePieceIcon className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
    title: 'Seamless Integrations',
    description: 'Connect AgentFlow with your existing tools and platforms for a unified workflow.',
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: '1',
    title: 'Define Your Goal',
    description: 'Clearly outline the task or process you want your AI agent to automate or assist with.',
    icon: <PencilIcon className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
  },
  {
    id: '2',
    title: 'Configure Your Agent',
    description: 'Use our intuitive builder to set up your agent\'s behavior, knowledge, and integrations.',
    icon: <CogIcon className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
  },
  {
    id: '3',
    title: 'Deploy & Monitor',
    description: 'Launch your agent and track its performance, making adjustments as needed for optimal results.',
    icon: <RocketLaunchIcon className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$29',
    frequency: '/month',
    features: ['1 AI Agent', 'Basic Analytics', '1,000 Tasks/Month', 'Community Support'],
    ctaText: 'Choose Starter',
    actionPage: 'signup',
  },
  {
    name: 'Professional',
    price: '$99',
    frequency: '/month',
    features: ['5 AI Agents', 'Advanced Analytics', '10,000 Tasks/Month', 'Priority Email Support', 'API Access'],
    ctaText: 'Choose Professional',
    highlight: true,
    actionPage: 'signup',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: '',
    features: ['Unlimited Agents', 'Custom Analytics', 'Volume Task Pricing', 'Dedicated Support Manager', 'Custom Integrations'],
    ctaText: 'Contact Sales',
    // actionPage: 'contact' // Or handle differently
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: 'AgentFlow has transformed how we handle customer support. Our response times are down by 60%!',
    name: 'Alice Johnson',
    role: 'CEO, TechSolutions Inc.',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote: 'The agent builder is incredibly intuitive. We had our first agent operational in less than an hour.',
    name: 'Bob Williams',
    role: 'Operations Manager, GlobalMart',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote: 'The analytics dashboard provides invaluable insights into our automation efforts. Highly recommended!',
    name: 'Carol Davis',
    role: 'Data Scientist, Innovate Ltd.',
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
    { name: 'Twitter', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> },
    { name: 'LinkedIn', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg> },
    { name: 'GitHub', href: '#', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.522 2 12 2Z" clipRule="evenodd" /></svg> }
];

export const AGENT_STATUS_OPTIONS: { value: AgentStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'draft', label: 'Draft' },
];
