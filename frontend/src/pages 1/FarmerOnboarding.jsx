import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { MapPin, Leaf, CheckCircle2, Languages, Sprout, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FarmerOnboarding() {
  const { setFarmerProfile, setOnboardingComplete, setLang, lang } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: '', village: '', district: 'Nashik', state: 'Maharashtra', farmSize: '', crops: [], preferredLanguage: lang });

  const cropsList = ['Tomato', 'Onion', 'Wheat', 'Cotton', 'Soybean', 'Grapes', 'Pomegranate', 'Sugarcane'];

  const toggleCrop = (c) => {
    setData(prev => ({
      ...prev,
      crops: prev.crops.includes(c) ? prev.crops.filter(x => x !== c) : [...prev.crops, c]
    }));
  };

  const complete = () => {
    setLang(data.preferredLanguage);
    setFarmerProfile(data);
    setOnboardingComplete(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        
        {/* Progress Bar */}
        <div className="mb-8 relative pt-4">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0" />
          <div className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />
          <div className="relative z-10 flex justify-between">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${s < step ? 'bg-emerald-500 border-emerald-500 text-white' : s === step ? 'bg-white border-emerald-500 text-emerald-600 shadow-md' : 'bg-white border-slate-300 text-slate-400'}`}>
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-full opacity-50 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4"><Sprout className="w-8 h-8 text-emerald-600" /></div>
                  <h2 className="text-3xl font-black text-slate-800">Welcome to AgroBridge 🌾</h2>
                  <p className="text-slate-500 font-medium mt-2">Let's set up your farm profile to get you the best market prices.</p>
                </div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label><input type="text" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="ab-input" placeholder="e.g. Ramesh Patil" /></div>
                  <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Preferred Language <span className="text-slate-400 font-normal ml-2">We localize recommendations based on this.</span></label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {[{id:'mr', label:'मराठी'}, {id:'hi', label:'हिंदी'}, {id:'en', label:'English'}].map(l => (
                        <button key={l.id} onClick={() => setData({...data, preferredLanguage: l.id})} className={`p-3 rounded-xl border-2 font-bold transition-all ${data.preferredLanguage === l.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>{l.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(2)} disabled={!data.name.trim()} className="ab-primary-btn w-full !py-3.5 mt-8 flex items-center justify-center gap-2">Continue <ArrowRight className="w-5 h-5" /></button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"><MapPin className="w-8 h-8 text-blue-600" /></div>
                  <h2 className="text-3xl font-black text-slate-800">Farm Location</h2>
                  <p className="text-slate-500 font-medium mt-2">This helps us match you with nearby buyers and calculate transport costs.</p>
                </div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Village / Taluka</label><input type="text" value={data.village} onChange={e => setData({...data, village: e.target.value})} className="ab-input" placeholder="e.g. Sinnar" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold text-slate-700 mb-1.5">District</label><select value={data.district} onChange={e => setData({...data, district: e.target.value})} className="ab-input font-medium"><option>Nashik</option><option>Pune</option><option>Ahmednagar</option><option>Jalgaon</option></select></div>
                    <div><label className="block text-sm font-bold text-slate-700 mb-1.5">State</label><select value={data.state} onChange={e => setData({...data, state: e.target.value})} className="ab-input font-medium"><option>Maharashtra</option><option>Gujarat</option><option>Madhya Pradesh</option></select></div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="ab-secondary-btn flex-1 !py-3.5">Back</button>
                  <button onClick={() => setStep(3)} disabled={!data.village.trim()} className="ab-primary-btn flex-[2] !py-3.5 flex items-center justify-center gap-2">Continue <ArrowRight className="w-5 h-5" /></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4"><Leaf className="w-8 h-8 text-amber-600" /></div>
                  <h2 className="text-3xl font-black text-slate-800">Farm Size & Crops</h2>
                  <p className="text-slate-500 font-medium mt-2">What are you growing this season?</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Total Farm Size</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['< 1', '1-5', '5-10', '10+'].map(size => (
                        <button key={size} onClick={() => setData({...data, farmSize: size})} className={`p-3 rounded-xl border-2 font-bold transition-all ${data.farmSize === size ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                          {size} {size === '10+' ? 'acres' : size === '< 1' ? 'acre' : 'acres'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Primary Crops <span className="text-slate-400 font-normal ml-2">Select all that apply</span></label>
                    <div className="flex flex-wrap gap-2">
                      {cropsList.map(c => (
                        <button key={c} onClick={() => toggleCrop(c)} className={`px-4 py-2 rounded-full border-2 font-bold text-sm transition-all ${data.crops.includes(c) ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="ab-secondary-btn flex-1 !py-3.5">Back</button>
                  <button onClick={() => setStep(4)} disabled={!data.farmSize || data.crops.length === 0} className="ab-primary-btn flex-[2] !py-3.5 flex items-center justify-center gap-2">Review <ArrowRight className="w-5 h-5" /></button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 relative z-10">
                <div className="mb-6 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"><CheckCircle2 className="w-10 h-10 text-emerald-600" /></div>
                  <h2 className="text-3xl font-black text-slate-800">Ready to go!</h2>
                  <p className="text-slate-500 font-medium mt-2">Your farm profile is complete.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <div className="flex justify-between border-b border-slate-200 pb-3"><span className="text-slate-500 font-medium">Farmer</span><span className="font-bold text-slate-800">{data.name}</span></div>
                  <div className="flex justify-between border-b border-slate-200 pb-3"><span className="text-slate-500 font-medium">Location</span><span className="font-bold text-slate-800">{data.village}, {data.district}</span></div>
                  <div className="flex justify-between border-b border-slate-200 pb-3"><span className="text-slate-500 font-medium">Farm Size</span><span className="font-bold text-slate-800">{data.farmSize} acres</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">Crops</span><span className="font-bold text-slate-800">{data.crops.join(', ')}</span></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(3)} className="ab-secondary-btn flex-1 !py-3.5">Edit</button>
                  <button onClick={complete} className="ab-primary-btn flex-[2] !py-3.5 flex items-center justify-center gap-2">Enter Dashboard</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
