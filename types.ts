
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  discountAmount: number;
  discountPercentage: number;
  sacCode: string;
}

export interface CompanyDetails {
  name: string;
  specialization: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
  phone: string;
  website: string;
}

export interface ClientDetails {
  companyName: string;
  contactPerson: string;
  location: string;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  company: CompanyDetails;
  client: ClientDetails;
  items: InvoiceItem[];
  notes: string;
  terms: string[];
  logoUrl?: string;
  signatureUrl?: string;
}
