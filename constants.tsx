
import { InvoiceData } from './types';

export const DEFAULT_INVOICE_DATA: InvoiceData = {
  invoiceNo: "1567",
  date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  company: {
    name: "NEXUSZEN SERVICES PRIVATE LIMITED",
    specialization: "SOFTWARE DEVELOPMENT COMPANY",
    addressLine1: "Floor No.: 18th Floor Building No./Flat No.: 1806 Navi",
    addressLine2: "Mumbai District: Thane State: Maharashtra",
    email: "support@nexuszen.in",
    phone: "+91 8260397998",
    website: "WWW.NEXUSZEN.IN"
  },
  client: {
    companyName: "Qiyam Business Solutions",
    contactPerson: "Faris Sir",
    location: "Kerala"
  },
  items: [
    { id: '1', description: 'Complete User app ( Android & Ios)', quantity: 2, price: 12500, discountAmount: 0, discountPercentage: 0, sacCode: 'SAC9804' },
    { id: '2', description: 'Complete Shop Owner app ( Android & Ios)', quantity: 2, price: 10000, discountAmount: 500, discountPercentage: 0, sacCode: 'SAC9805' },
    { id: '3', description: 'Complete Delivery man app ( Android & Ios)', quantity: 2, price: 4000, discountAmount: 0, discountPercentage: 10, sacCode: 'SAC9806' },
    { id: '4', description: 'Admin Panel', quantity: 1, price: 12000, discountAmount: 1000, discountPercentage: 5, sacCode: 'SAC9807' },
  ],
  notes: "* Server & Domain , Playstore , Appstore Account , Maintenance Not Included",
  terms: [
    "50% advance payment is required to initiate the project.",
    "The remaining 50% payment must be cleared within 1 week of work submission.",
    "Final delivery and deployment will be completed after receipt of the full payment."
  ]
};
