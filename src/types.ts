export type ServiceCategory = 'all' | 'mecanica' | 'seguranca' | 'preventiva' | 'climatizacao' | 'eletrica';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  itemsIncluded: string[];
  estimatedTime: string;
  startingPrice?: string;
  warranty: string;
  popular?: boolean;
  image: string;
}

export interface DifferentialItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlightText?: string;
}

export interface StepItem {
  step: number;
  title: string;
  description: string;
  iconName: string;
  detail: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  vehicleModel: string;
  serviceDone: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface DiagnosticSymptom {
  id: string;
  label: string;
  category: string;
  iconName: string;
  description: string;
  possibleCauses: string[];
  urgency: 'baixa' | 'media' | 'alta' | 'imediata';
  recommendedService: string;
  warningAlert?: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceId: string;
  problemDescription: string;
  preferredDate: string;
  preferredPeriod: 'manha' | 'tarde' | 'indiferente';
}

export type CustomerRequestType = 'quote' | 'appointment';
export type CustomerRequestStatus = 'new' | 'sent-whatsapp' | 'confirmed' | 'cancelled';

export interface CustomerRequestRecord {
  protocol: string;
  type: CustomerRequestType;
  status: CustomerRequestStatus;
  createdAt: string;
  name: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear?: string;
  serviceId: string;
  serviceName: string;
  problemDescription?: string;
  preferredDate?: string;
  preferredPeriod?: string;
  notes?: string;
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  locationNeighborhood: string;
  city: string;
  state: string;
  fullAddress: string;
  phone: string;
  formattedPhone: string;
  whatsapp: string;
  whatsappRaw: string;
  instagram: string;
  instagramHandle: string;
  email: string;
  openingHoursWeek: string;
  openingHoursSaturday: string;
  googleRating: number;
  totalReviewsCount: number;
}
