import React, { useState } from 'react';
import { TrendingUp, AlertCircle, MapPin, IndianRupee, Map, Activity, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

export default function MarketIntelligence() {
  const [crop, setCrop] = useState('Onion');
  const [market, setMarket] = useState('Nashik');
  
  const priceData = [
    { day: 'Day 1', price: 2300, predicted: null },
    { day: 'Day 3', price: 2450, predicted: null },
    { day: 'Day 7', price: 2400, predicted: null },
    { day: 'Today', price: 2600, predicted: 2600 },
    { day: 'In 3 Days', price: null, predicted: 2850 },
    { day: 'In 7 Days', price: null, predicted: 3100 },
  ];

  return (
    <div className="ab-container py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="ab-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-600" /> Market Intelligence
          </h1>
          <p className="text-slate-500 font-medium mt-1">Live AI forecasts and price discovery for your region.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select value={crop} onChange={e => setCrop(e.target.value)} className="ab-input font-bold bg-white w-full sm:w-32"><option>Onion</option><option>Tomato</option><option>Cotton</option></select>
          <select value={market} onChange={e => setMarket(e.target.value)} className="ab-input font-bold bg-white w-full sm:w-40"><option>Nashik</option><option>Pune</option><option>Mumbai</option></select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column: AI Forecast & Map */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          
          {/* Price Graph */}
          <div className="ab-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-600" /> 7-Day AI Price Forecast</h2>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-300"></div> Historical</span>
                <span className="flex items-center gap-1.5 text-emerald-700"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> AI Prediction</span>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} tickFormatter={value => `₹${value}`} />
                  <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="price" stroke="#94a3b8" strokeWidth={3} fillOpacity={0} />
                  <Area type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={4} fill="url(#colorPrice)" strokeDasharray="5 5" activeDot={{r: 6, fill: '#10b981', stroke: 'white', strokeWidth: 2}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Opportunity Map */}
          <div className="ab-card p-6 overflow-hidden relative">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6"><Map className="w-5 h-5 text-blue-600" /> Live Opportunity Map</h2>
            <div className="bg-slate-100 rounded-2xl h-[300px] border border-slate-200 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Farmer Location */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute z-20 flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg border-4 border-slate-800 flex items-center justify-center z-10"><MapPin className="w-6 h-6 text-slate-800" /></div>
                    <span className="mt-1 bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">YOUR FARM</span>
                </motion.div>

                {/* Connecting Lines & Opportunities */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                    <line x1="50%" y1="50%" x2="80%" y2="40%" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                </svg>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="absolute top-[20%] left-[20%] z-20">
                    <div className="bg-white rounded-xl shadow-xl p-3 border border-emerald-100 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nashik APMC</span>
                        <span className="text-lg font-black text-emerald-600">₹2,600<span className="text-[10px] text-emerald-600/70 ml-1">/Qtl</span></span>
                        <span className="text-xs font-bold text-slate-500 mt-1">12 km</span>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute top-[35%] right-[15%] z-20">
                    <div className="bg-emerald-600 rounded-xl shadow-xl p-3 border border-emerald-500 flex flex-col items-center transform scale-110">
                        <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-widest flex items-center gap-0.5">Best Match</div>
                        <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider mb-1">FreshMart Inc</span>
                        <span className="text-lg font-black text-white">₹3,120<span className="text-[10px] text-emerald-200 ml-1">/Qtl</span></span>
                        <span className="text-xs font-bold text-emerald-100 mt-1">18 km</span>
                    </div>
                </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommendation */}
        <div className="space-y-6 sm:space-y-8">
          <div className="ab-ai-card p-6 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><AlertCircle className="w-6 h-6 text-amber-600" /></div>
              <h2 className="text-lg font-bold text-slate-800">AI Recommendation</h2>
            </div>
            
            <div className="ab-recommendation ab-recommendation-wait p-5 text-center mb-6">
              <span className="block text-xs font-black text-amber-600 uppercase tracking-widest mb-1">Status</span>
              <span className="block text-3xl font-black text-amber-900">WAIT</span>
              <span className="block text-sm font-bold text-amber-700 mt-2">Hold for 3-5 days</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Why?</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700">Festival demand (Diwali) is causing a <span className="font-bold text-emerald-600">spike in procurement</span> by processors.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700">Recent unseasonal rains in Karnataka disrupted supply chain to Mumbai.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-500">AI Confidence:</span>
                    <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded">87% High</span>
                </div>
            </div>
          </div>
          
          <div className="ab-card p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Market Arbitrage (Nashik vs Others)</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <div className="flex flex-col"><span className="font-bold text-slate-800">Mumbai APMC</span><span className="text-xs font-medium text-slate-500">165 km away</span></div>
                    <div className="text-right"><span className="block font-black text-emerald-600">+₹450/Qtl</span><span className="text-xs font-bold text-slate-400">Net: +₹120</span></div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <div className="flex flex-col"><span className="font-bold text-slate-800">Pune APMC</span><span className="text-xs font-medium text-slate-500">210 km away</span></div>
                    <div className="text-right"><span className="block font-black text-emerald-600">+₹200/Qtl</span><span className="text-xs font-bold text-red-400">Net: -₹50</span></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
