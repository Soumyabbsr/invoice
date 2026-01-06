
import React, { useState, useCallback } from 'react';
import { InvoiceData } from './types';
import { DEFAULT_INVOICE_DATA } from './constants';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { FileText, ArrowLeftRight } from 'lucide-react';

const App: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(DEFAULT_INVOICE_DATA);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-['Inter']">
      {/* Professional Navbar */}
      <header className="no-print bg-[#0f172a] text-white py-4 px-8 flex justify-between items-center shadow-xl z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="bg-[#3a86ff] p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <FileText size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none uppercase">Nexuszen <span className="text-[#3a86ff]">Pro</span></h1>
            <p className="text-[9px] font-bold text-slate-400 tracking-widest mt-1 uppercase">Smart Billing Solution</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-1 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <ArrowLeftRight size={14} className="text-[#3a86ff]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live Sync Active</span>
          </div>
          <button 
             onClick={handlePrint}
             className="bg-[#3a86ff] hover:bg-[#2563eb] text-white text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shadow-lg active:scale-95"
          >
            Generate PDF
          </button>
        </div>
      </header>

      {/* Studio Layout */}
      <main className="flex-grow flex flex-col lg:flex-row bg-[#f8fafc]">
        
        {/* Editor (Left Pane) */}
        <section className="no-print w-full lg:w-[480px] xl:w-[540px] border-r border-slate-200 bg-white p-6 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#0f172a] tracking-tight">Invoice Details</h2>
            <p className="text-xs text-slate-400 font-medium mt-1">Changes are reflected in the preview in real-time.</p>
          </div>
          <InvoiceForm 
            data={invoiceData} 
            onChange={setInvoiceData} 
            onPrint={handlePrint} 
          />
          
          <div className="mt-8 p-5 bg-[#f0f7ff] rounded-2xl border border-[#3a86ff]/10">
            <h4 className="font-black text-[#0f172a] text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#3a86ff] rounded-full"></span>
                Printing Instructions
            </h4>
            <p className="text-[11px] text-[#475569] leading-relaxed font-medium">
              1. Click <span className="font-bold">Generate PDF</span>.<br/>
              2. Select <span className="font-bold">Save as PDF</span> as destination.<br/>
              3. Check <span className="font-bold">Background Graphics</span> in settings.<br/>
              4. Paper size should be <span className="font-bold">A4</span>.
            </p>
          </div>
        </section>

        {/* Live Preview (Right Pane) */}
        <section className="flex-grow bg-[#e2e8f0] flex items-center justify-center p-6 lg:p-16 overflow-y-auto print:p-0 print:bg-white custom-scrollbar">
          <div className="transform scale-[0.55] sm:scale-[0.75] md:scale-90 lg:scale-[0.85] xl:scale-100 origin-center print:scale-100 transition-all duration-500 ease-out">
            <InvoicePreview data={invoiceData} />
          </div>
        </section>

      </main>

      {/* Footer Branding (Hidden on Print) */}
      <footer className="no-print bg-white border-t border-slate-200 py-3 px-8 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 italic">
          Nexuszen Services Private Limited &copy; {new Date().getFullYear()} - Professional Billing Suite
        </p>
      </footer>
    </div>
  );
};

export default App;
