
import React from 'react';
import { InvoiceData, InvoiceItem } from '../types';
import { Phone, Mail, Globe } from 'lucide-react';

interface Props {
  data: InvoiceData;
}

const InvoicePreview: React.FC<Props> = ({ data }) => {
  const calculateItemDiscount = (item: InvoiceItem) => {
    const base = item.price * item.quantity;
    const fromPercentage = base * (item.discountPercentage / 100);
    return fromPercentage + (item.discountAmount || 0);
  };

  const subTotal = data.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = data.items.reduce((acc, item) => acc + calculateItemDiscount(item), 0);
  const grandTotal = subTotal - totalDiscount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val).replace('₹', '₹ ');
  };

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto p-[15mm] shadow-2xl print-shadow-none text-[#1e293b] relative flex flex-col font-['Inter'] overflow-hidden">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-16">
        <div className="flex items-center gap-6">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt="Logo" className="w-20 h-20 object-contain" />
          ) : (
            <div className="w-20 h-20 bg-slate-50 border border-dashed border-slate-200 rounded flex items-center justify-center text-[8px] font-black uppercase text-slate-300 text-center">
              Upload Logo
            </div>
          )}
          <div>
            <h1 className="text-[#0f172a] text-2xl font-black tracking-tight uppercase leading-none">{data.company.name}</h1>
            <p className="text-[#64748b] text-[10px] font-black tracking-[0.3em] mt-2 uppercase">{data.company.specialization}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-black text-[#f1f5f9] tracking-tighter mb-[-15px] select-none">QUOTATION</h2>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Invoice Ref</p>
            <p className="text-lg font-black text-[#0f172a]">#{data.invoiceNo}</p>
            <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">{data.date}</p>
          </div>
        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className="grid grid-cols-2 gap-20 mb-16">
        <div className="border-l-2 border-[#3a86ff] pl-6 py-1">
          <h3 className="font-black text-slate-300 text-[10px] uppercase tracking-[0.3em] mb-3">Our Office</h3>
          <p className="text-[11px] font-bold leading-relaxed text-[#475569]">{data.company.addressLine1}</p>
          <p className="text-[11px] font-bold leading-relaxed text-[#475569]">{data.company.addressLine2}</p>
        </div>
        <div className="text-right pr-2">
          <h3 className="font-black text-slate-300 text-[10px] uppercase tracking-[0.3em] mb-3">Billed To</h3>
          <p className="text-[15px] font-black text-[#0f172a] tracking-tight">{data.client.companyName}</p>
          <p className="text-[11px] font-bold text-[#64748b] mt-1">{data.client.contactPerson}</p>
          <p className="text-[10px] font-black text-[#3a86ff] uppercase tracking-widest mt-1 opacity-80">{data.client.location}</p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <div className="flex-grow">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-100">
              <th className="py-4 px-6 text-left font-black text-[9px] tracking-[0.2em] uppercase text-slate-400 w-16">No</th>
              <th className="py-4 px-6 text-left font-black text-[9px] tracking-[0.2em] uppercase text-slate-400">Description of Service</th>
              <th className="py-4 px-6 text-center font-black text-[9px] tracking-[0.2em] uppercase text-slate-400 w-20">Qty</th>
              <th className="py-4 px-6 text-right font-black text-[9px] tracking-[0.2em] uppercase text-slate-400 w-40">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.items.map((item, index) => {
              const itemDisc = calculateItemDiscount(item);
              const itemTotal = (item.price * item.quantity) - itemDisc;
              return (
                <tr key={item.id}>
                  <td className="py-5 px-6 text-center text-[10px] font-black text-slate-300">{index + 1}</td>
                  <td className="py-5 px-6">
                    <p className="text-[12px] font-black text-[#0f172a] tracking-tight">{item.description}</p>
                    {itemDisc > 0 && <span className="text-[8px] font-black text-[#64748b] uppercase tracking-widest mt-1 inline-block opacity-60 italic">Discount Applied: {formatCurrency(itemDisc)}</span>}
                  </td>
                  <td className="py-5 px-6 text-center text-[12px] font-black text-slate-500">{item.quantity}</td>
                  <td className="py-5 px-6 text-right text-[13px] font-black text-[#0f172a]">{formatCurrency(itemTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SUMMARY AREA (GRAND TOTAL) - REFINED */}
      <div className="mt-12 mb-16 pt-8 border-t border-slate-100">
        <div className="flex justify-between items-start">
          <div className="w-[50%]">
            <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 italic">Project Notes</h4>
            <div className="border-l-2 border-slate-100 pl-4">
              <p className="text-[#64748b] font-bold text-[10px] leading-relaxed uppercase whitespace-pre-wrap">
                {data.notes}
              </p>
            </div>
          </div>
          <div className="w-[35%]">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Total Items</span>
                <span>{data.items.length} Units</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Gross Sub-Total</span>
                <span className="text-slate-900 font-black">{formatCurrency(subTotal)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                  <span>Total Discount</span>
                  <span className="font-black">-{formatCurrency(totalDiscount)}</span>
                </div>
              )}
              <div className="h-px bg-slate-100 my-4"></div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0f172a] mb-1">Total Payable</span>
                  <span className="text-[8px] font-bold text-slate-300 uppercase italic">Taxes Included</span>
                </div>
                <span className="text-2xl font-black text-[#0f172a] tracking-tighter leading-none">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
              <div className="h-0.5 bg-[#0f172a] w-full mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNATURE & TERMS */}
      <div className="flex justify-between items-end mb-12">
        <div className="w-[45%]">
          <h4 className="font-black text-slate-300 text-[9px] uppercase tracking-[0.4em] mb-4 pb-1 border-b border-slate-50">Legal Terms</h4>
          <ul className="space-y-1.5">
            {data.terms.map((term, i) => (
              <li key={i} className="text-[9px] text-slate-400 font-bold leading-tight flex gap-2 uppercase tracking-tight">
                <span className="text-[#3a86ff] opacity-40">•</span> {term}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center relative">
          <div className="relative h-28 flex items-center justify-center mb-1">
            {data.signatureUrl ? (
              <img src={data.signatureUrl} alt="Signature & Stamp" className="max-w-[180px] max-h-24 object-contain mix-blend-multiply" />
            ) : (
              <div className="w-40 h-20 border border-dashed border-slate-100 rounded flex items-center justify-center text-[8px] font-black text-slate-200 uppercase tracking-[0.2em]">
                Stamp & Sign Here
              </div>
            )}
          </div>
          <div className="border-t border-[#0f172a] w-52 mx-auto pt-2">
            <p className="text-[9px] text-[#0f172a] font-black uppercase tracking-[0.4em]">Authorized Official</p>
          </div>
        </div>
      </div>

      {/* CORPORATE FOOTER STRIP */}
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={10} className="text-[#3a86ff]" />
            <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">{data.company.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={10} className="text-[#3a86ff]" />
            <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">{data.company.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={10} className="text-[#3a86ff]" />
            <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">{data.company.website}</span>
          </div>
        </div>
        <div className="text-[9px] font-black uppercase tracking-widest text-slate-300 italic">
          Nexuszen Group Corporate Office
        </div>
      </div>
      
    </div>
  );
};

export default InvoicePreview;
