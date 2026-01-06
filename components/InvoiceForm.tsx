
import React from 'react';
import { InvoiceData, InvoiceItem } from '../types';
import { Plus, Trash2, Printer, Image as ImageIcon, Upload, Layout } from 'lucide-react';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
  onPrint: () => void;
}

const InvoiceForm: React.FC<Props> = ({ data, onChange, onPrint }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      onChange({
        ...data,
        [parent]: {
          ...(data[parent as keyof InvoiceData] as any),
          [child]: value
        }
      });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'logoUrl' | 'signatureUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, [key]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      price: 0,
      discountAmount: 0,
      discountPercentage: 0,
      sacCode: ''
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: newItems });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Layout className="text-[#3a86ff]" size={20} />
          Invoice Builder
        </h2>
        <button 
          onClick={onPrint}
          className="flex items-center gap-2 bg-[#0f172a] hover:bg-black text-white px-5 py-2.5 rounded-lg transition-all shadow-lg font-bold text-sm"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>
      </div>

      {/* Asset Upload Section */}
      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2">
            <ImageIcon size={12} /> Upload Logo PNG
          </label>
          <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-lg p-3 hover:border-[#3a86ff] hover:bg-white transition-all text-center">
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => handleImageUpload(e, 'logoUrl')}
            />
            <div className="text-[10px] font-bold text-slate-500 uppercase flex flex-col items-center gap-1">
              <Upload size={14} className="text-slate-300" />
              {data.logoUrl ? 'Update Logo' : 'Select Logo'}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2">
            <ImageIcon size={12} /> Upload Signature PNG
          </label>
          <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-lg p-3 hover:border-[#3a86ff] hover:bg-white transition-all text-center">
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => handleImageUpload(e, 'signatureUrl')}
            />
            <div className="text-[10px] font-bold text-slate-500 uppercase flex flex-col items-center gap-1">
              <Upload size={14} className="text-slate-300" />
              {data.signatureUrl ? 'Update Signature' : 'Select Sign'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 border-l-4 border-[#3a86ff] pl-2 uppercase text-[10px] tracking-widest">Metadata</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quotation #</label>
              <input 
                name="invoiceNo" 
                placeholder="Inv No"
                value={data.invoiceNo} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date</label>
              <input 
                name="date" 
                placeholder="Date"
                value={data.date} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 border-l-4 border-[#3a86ff] pl-2 uppercase text-[10px] tracking-widest">Client Details</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Company Name</label>
              <input 
                name="client.companyName" 
                placeholder="Client Name" 
                value={data.client.companyName} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold text-slate-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact Person</label>
                <input 
                  name="client.contactPerson" 
                  placeholder="e.g. Faris Sir" 
                  value={data.client.contactPerson} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold text-slate-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                <input 
                  name="client.location" 
                  placeholder="e.g. Kerala" 
                  value={data.client.location} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-700 border-l-4 border-[#3a86ff] pl-2 uppercase text-[10px] tracking-widest">Services</h3>
          <button onClick={addItem} className="text-[10px] flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded text-slate-600 font-black uppercase tracking-widest transition-colors">
            <Plus size={12} /> Add Row
          </button>
        </div>
        
        <div className="overflow-x-auto border rounded-xl border-slate-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-3 py-3 text-left w-12">#</th>
                <th className="px-3 py-3 text-left">Description</th>
                <th className="px-3 py-3 text-left w-16">Qty</th>
                <th className="px-3 py-3 text-left w-24">Price</th>
                <th className="px-3 py-3 text-left w-16">Disc %</th>
                <th className="px-3 py-3 text-left w-16">Disc ₹</th>
                <th className="px-3 py-3 text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-3 py-3 text-slate-300 font-black text-[10px]">{index + 1}</td>
                  <td className="px-3 py-3">
                    <input 
                      value={item.description} 
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full bg-transparent focus:outline-none font-bold text-slate-900"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input 
                      type="number"
                      value={item.quantity} 
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent focus:outline-none font-bold text-slate-900"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input 
                      type="number"
                      value={item.price} 
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent focus:outline-none font-bold text-slate-900"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input 
                      type="number"
                      value={item.discountPercentage} 
                      onChange={(e) => updateItem(index, 'discountPercentage', parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent focus:outline-none font-bold text-slate-900"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input 
                      type="number"
                      value={item.discountAmount} 
                      onChange={(e) => updateItem(index, 'discountAmount', parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent focus:outline-none font-bold text-slate-900"
                    />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button onClick={() => removeItem(index)} className="text-slate-200 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-50">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Service Notes</label>
        <textarea 
          name="notes" 
          value={data.notes} 
          onChange={handleChange} 
          className="w-full px-4 py-3 border border-slate-100 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 text-sm font-medium text-slate-900"
        />
      </div>
    </div>
  );
};

export default InvoiceForm;
