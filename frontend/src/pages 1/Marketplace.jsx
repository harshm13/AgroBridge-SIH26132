import React, { useState } from 'react';
import { Store, ShieldCheck, MapPin, Truck, Scale, ChevronRight, CheckCircle2, AlertCircle, Info, Calculator, IndianRupee } from 'lucide-react';
import BuyerProfile from '../components/BuyerProfile';

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('matched');
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  
  // Simulated farmer lot size for calculation
  const lotSize = 24; // Quintals

  const buyers = [
    { 
        id: 1, name: 'FreshMart Inc.', type: 'Retail Chain', price: 3120, distance: 18, 
        trust: 98, verified: true, needs: 'Grade A', payment: 'Immediate (Escrow)',
        transportCostPerQtl: 45 // AI Calculated
    },
    { 
        id: 2, name: 'Nashik APMC', type: 'Mandi', price: 2600, distance: 12, 
        trust: 85, verified: true, needs: 'Any', payment: 'Same Day',
        transportCostPerQtl: 25
    },
    { 
        id: 3, name: 'AgriExport Ltd', type: 'Exporter', price: 3400, distance: 145, 
        trust: 92, verified: true, needs: 'Export Quality (Zero Residue)', payment: '7 Days',
        transportCostPerQtl: 210
    }
  ];

  // Calculate Net Realization (Price - Transport)
  const sortedBuyers = [...buyers].sort((a, b) => {
    const netA = (a.price - a.transportCostPerQtl) * lotSize;
    const netB = (b.price - b.transportCostPerQtl) * lotSize;
    return netB - netA;
  });

  return (
    <div className="ab-container py-6 sm:py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-3"><Store className="w-8 h-8 text-emerald-600" /> Opportunity Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Review AI-matched buyers and calculate your exact net profit.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
            {id: 'matched', label: 'Matched Buyers', icon: Store},
            {id: 'compare', label: 'Offer Comparison', icon: Scale},
            {id: 'calculator', label: 'Net Realization Calculator', icon: Calculator}
        ].map(t => (
            <button 
                key={t.id} 
                onClick={() => setActiveTab(t.id)} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${activeTab === t.id ? 'bg-emerald-800 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
            >
                <t.icon className="w-4 h-4" /> {t.label}
            </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
        {activeTab === 'matched' && (
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedBuyers.map((buyer, idx) => {
                        const netPrice = buyer.price - buyer.transportCostPerQtl;
                        const isBest = idx === 0;

                        return (
                            <div key={buyer.id} className={`ab-offer-card relative ${isBest ? 'ring-2 ring-emerald-500 shadow-lg' : ''}`}>
                                {isBest && (
                                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-widest flex items-center gap-1">
                                        Top Choice
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                            {buyer.name} 
                                            {buyer.verified && <ShieldCheck className="w-5 h-5 text-blue-500" />}
                                        </h3>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{buyer.type}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-4 border-emerald-50 flex items-center justify-center bg-white shadow-sm cursor-pointer" onClick={() => setSelectedBuyer(buyer)}>
                                        <span className={`text-xs font-black ${buyer.trust >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{buyer.trust}</span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Offered Price</span>
                                        <span className="font-bold text-slate-800">₹{buyer.price}/Qtl</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-amber-700">
                                        <span className="font-medium flex items-center gap-1"><Truck className="w-4 h-4" /> Transport Est.</span>
                                        <span className="font-bold">-₹{buyer.transportCostPerQtl}/Qtl</span>
                                    </div>
                                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Net in hand</span>
                                        <span className="font-black text-emerald-600 text-lg">₹{netPrice}/Qtl</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-6">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {buyer.distance} km</span>
                                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">{buyer.payment}</span>
                                </div>

                                <button className="w-full ab-primary-btn !py-3 flex items-center justify-center gap-2">
                                    Accept Offer <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}

        {activeTab === 'compare' && (
            <div className="p-0 overflow-x-auto">
                <table className="ab-comparison-table">
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th className="best-col border-l border-emerald-100 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                                FreshMart Inc. <span className="block text-xs font-bold text-emerald-600 mt-1">AI Recommendation</span>
                            </th>
                            <th>Nashik APMC</th>
                            <th>AgriExport Ltd</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-slate-500">Gross Price</td>
                            <td className="font-black text-slate-800 best-col border-l border-emerald-100">₹3,120 / Qtl</td>
                            <td className="font-bold text-slate-700">₹2,600 / Qtl</td>
                            <td className="font-black text-emerald-600">₹3,400 / Qtl</td>
                        </tr>
                        <tr>
                            <td className="text-slate-500">Transport Cost (Est)</td>
                            <td className="text-amber-600 font-bold best-col border-l border-emerald-100">-₹45 / Qtl</td>
                            <td className="text-amber-600 font-bold">-₹25 / Qtl</td>
                            <td className="text-red-500 font-bold">-₹210 / Qtl</td>
                        </tr>
                        <tr className="net-row">
                            <td className="font-bold text-slate-800">Net Price (In Hand)</td>
                            <td className="font-black text-emerald-600 text-lg best-col border-l border-emerald-100">₹3,075 / Qtl</td>
                            <td className="font-bold text-slate-700">₹2,575 / Qtl</td>
                            <td className="font-bold text-slate-800">₹3,190 / Qtl</td>
                        </tr>
                        <tr>
                            <td className="text-slate-500">Quality Required</td>
                            <td className="best-col border-l border-emerald-100"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Grade A</span></td>
                            <td><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">Any</span></td>
                            <td><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">Zero Residue</span></td>
                        </tr>
                        <tr>
                            <td className="text-slate-500">Trust Score</td>
                            <td className="font-bold text-emerald-600 best-col border-l border-emerald-100 flex items-center gap-1">98/100 <ShieldCheck className="w-4 h-4"/></td>
                            <td className="font-bold text-amber-600">85/100</td>
                            <td className="font-bold text-emerald-600">92/100</td>
                        </tr>
                        <tr>
                            <td className="text-slate-500">Payment Terms</td>
                            <td className="font-bold text-slate-700 best-col border-l border-emerald-100">Immediate (Escrow)</td>
                            <td className="font-bold text-slate-700">Same Day</td>
                            <td className="font-bold text-slate-700">7 Days Delay</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}

        {activeTab === 'calculator' && (
            <div className="p-6 md:p-10 max-w-4xl mx-auto">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 mb-8 border border-blue-100">
                    <Info className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">This calculator shows exactly how much money you will take home after all expenses for your current lot of <strong>{lotSize} Quintals</strong>.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="font-bold text-slate-800 text-lg">Select Buyer</h3>
                        <div className="space-y-3">
                            {sortedBuyers.map(b => (
                                <button 
                                    key={b.id} 
                                    onClick={() => setSelectedBuyer(b)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedBuyer?.id === b.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300 bg-white'}`}
                                >
                                    <div className="font-bold text-slate-800">{b.name}</div>
                                    <div className="text-sm text-slate-500">Net: ₹{b.price - b.transportCostPerQtl}/Qtl</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedBuyer ? (
                        <div className="ab-realization p-6 md:p-8">
                            <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs mb-6">Realization Breakdown</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                    <div>
                                        <div className="font-bold text-slate-800">Gross Sale</div>
                                        <div className="text-xs font-medium text-slate-500">{lotSize} Qtl × ₹{selectedBuyer.price}</div>
                                    </div>
                                    <div className="font-black text-slate-800">₹{(lotSize * selectedBuyer.price).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                    <div>
                                        <div className="font-bold text-amber-700">Estimated Transport</div>
                                        <div className="text-xs font-medium text-amber-600">{lotSize} Qtl × ₹{selectedBuyer.transportCostPerQtl}</div>
                                    </div>
                                    <div className="font-black text-amber-700">-₹{(lotSize * selectedBuyer.transportCostPerQtl).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                    <div>
                                        <div className="font-bold text-amber-700">Platform Escrow Fee (1%)</div>
                                    </div>
                                    <div className="font-black text-amber-700">-₹{((lotSize * selectedBuyer.price) * 0.01).toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t-2 border-slate-800 border-dashed">
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Net Realization (In Hand)</div>
                                <div className="flex items-center gap-2">
                                    <IndianRupee className="w-8 h-8 text-emerald-600" />
                                    <span className="ab-realization-value text-emerald-600">
                                        {((lotSize * selectedBuyer.price) - (lotSize * selectedBuyer.transportCostPerQtl) - ((lotSize * selectedBuyer.price) * 0.01)).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full ab-primary-btn !py-4 mt-8 text-lg shadow-lg shadow-emerald-200">
                                Proceed to Contract
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center">
                            <div>
                                <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <h3 className="text-lg font-bold text-slate-500">Select a buyer to calculate</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
      
      {/* Buyer Trust Profile Modal */}
      {selectedBuyer && activeTab === 'matched' && (
          <BuyerProfile buyer={selectedBuyer} onClose={() => setSelectedBuyer(null)} />
      )}
    </div>
  );
}
