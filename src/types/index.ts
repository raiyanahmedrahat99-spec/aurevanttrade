export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  heroImage: string;
  categoryId: string;
  authorName: string;
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  imageUrl?: string;
  order: number;
  tier: 'board' | 'executive';
  status: 'draft' | 'verified';
}

export interface RegionalOffice {
  id: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  status: 'unverified' | 'verified' | 'active';
  imageUrl?: string;
  order: number;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  organization?: string;
  enquiryType: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}
