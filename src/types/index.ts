export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface StatItem {
  value: string;
  label: string;
  highlightColor?: string;
}

export interface HighlightCard {
  icon: string;
  tag: string;
  title: string;
  description: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: string;
  title: string;
  category: string;
  topics: string[];
  keySkill: string;
}

export interface TargetProfile {
  icon: string;
  tag: string;
  title: string;
  description: string;
  outcomeLabel: string;
  outcomeText: string;
}

export interface WhyChooseItem {
  number: string;
  icon: string;
  title: string;
  description: string;
  footerTag: string;
}

export interface FAQItem {
  id: string;
  questionNumber: string;
  question: string;
  answer: string;
}

export interface EnquiryFormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  profileType: 'Student / Job Seeker' | 'Working Professional' | 'Exporter / Business Owner' | string;
  courseInterest: string;
  message?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: {
    id?: string;
    timestamp?: string;
  };
  errors?: Record<string, string>;
}
