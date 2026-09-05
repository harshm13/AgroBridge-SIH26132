import React, { useState } from 'react';
import { LifeBuoy, Send, MessageSquare, PhoneCall } from 'lucide-react';

export default function Support() {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setIssue('');
    }, 3000);
  };

  return (
    <div className="ab-container py-6 sm:py-8 space-y-6 max-w-3xl">
      <div className="ab-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-800 text-white border-emerald-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-3"><LifeBuoy className="w-8 h-8 text-emerald-300" /> Help & Support</h1>
          <p className="text-emerald-100 font-medium mt-1">Report disputes or get help with the platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="ab-card p-6 flex items-center gap-4 hover:border-emerald-500 transition cursor-pointer">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><PhoneCall className="w-6 h-6"/></div>
              <div>
                  <h3 className="font-bold text-slate-800">Call Toll-Free</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">1800-123-4567</p>
              </div>
          </div>
          <div className="ab-card p-6 flex items-center gap-4 hover:border-emerald-500 transition cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><MessageSquare className="w-6 h-6"/></div>
              <div>
                  <h3 className="font-bold text-slate-800">WhatsApp Help</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">+91 98765 43210</p>
              </div>
          </div>
      </div>

      <div className="ab-card p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Raise a Grievance</h2>
        {submitted ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-200 text-center">
                <h3 className="text-lg font-black mb-2">Ticket Submitted Successfully</h3>
                <p className="text-sm font-medium">Our support team will contact you within 24 hours.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Describe your issue</label>
                    <textarea 
                        value={issue} 
                        onChange={e => setIssue(e.target.value)}
                        className="ab-input min-h-[150px] resize-none" 
                        placeholder="e.g., Buyer rejected crop at gate despite AI Quality Check grade..."
                        required
                    ></textarea>
                </div>
                <button type="submit" className="ab-primary-btn !py-3 flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Send className="w-4 h-4" /> Submit Ticket
                </button>
            </form>
        )}
      </div>
    </div>
  );
}
