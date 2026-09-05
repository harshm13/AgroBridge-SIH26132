import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { UserCircle, MapPin, Phone, ShieldCheck, HandCoins, Truck, Store, LogOut, ArrowRight, Edit3, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStates, getDistrictsForState } from '../data/indianStatesDistricts';

export default function Profile() {
  const { userRole, setUserRole, farmerProfile, setFarmerProfile, setOnboardingComplete, setLang, lang } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: farmerProfile?.name || (userRole === 'farmer' ? 'Ramesh Patil' : 'Rajesh (Buyer)'),
    village: farmerProfile?.village || 'Sinnar',
    state: farmerProfile?.state || 'Maharashtra',
    district: farmerProfile?.district || 'Nashik',
    farmSize: farmerProfile?.farmSize || '1-5',
    crops: farmerProfile?.crops || ['Tomato', 'Onion'],
    preferredLanguage: farmerProfile?.preferredLanguage || lang
  });

  const cropsList = ['Tomato', 'Onion', 'Wheat', 'Cotton', 'Soybean', 'Grapes', 'Pomegranate', 'Sugarcane'];

  const handleLogout = () => {
    setUserRole(null);
    setOnboardingComplete(false); // Reset for demo purposes
  };

  const handleStateChange = (newState) => {
    const districts = getDistrictsForState(newState);
    const updatedDistrict = districts.includes(editForm.district) ? editForm.district : (districts[0] || '');
    setEditForm(prev => ({ ...prev, state: newState, district: updatedDistrict }));
  };

  const toggleCrop = (crop) => {
    setEditForm(prev => ({
      ...prev,
      crops: prev.crops.includes(crop) 
        ? prev.crops.filter(c => c !== crop) 
        : [...prev.crops, crop]
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setFarmerProfile(editForm);
    if (editForm.preferredLanguage && setLang) {
      setLang(editForm.preferredLanguage);
    }
    setIsEditing(false);
  };

  const name = farmerProfile?.name || editForm.name;
  const village = farmerProfile?.village || editForm.village;
  const district = farmerProfile?.district || editForm.district;
  const state = farmerProfile?.state || editForm.state;
  const location = `${village}, ${district}${state ? `, ${state}` : ''}`;
  const roleTitle = userRole === 'farmer' ? 'Verified Farmer' : 'Verified Buyer';

  return (
    <div className="ab-container py-6 sm:py-8 max-w-4xl space-y-6">
      
      {/* Profile Header */}
      <div className="ab-card overflow-hidden">
          <div className="h-32 bg-emerald-800 relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
          </div>
          <div className="px-6 sm:px-10 pb-8 relative">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-white absolute -top-12 flex items-center justify-center text-slate-300 text-4xl font-black">
                  {name.charAt(0)}
              </div>
              <div className="pt-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-2">
                          {name} <ShieldCheck className="w-6 h-6 text-blue-500" />
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="text-sm font-bold text-slate-500 flex items-center gap-1"><MapPin className="w-4 h-4"/> {location}</span>
                          <span className="text-sm font-bold text-slate-500 flex items-center gap-1"><Phone className="w-4 h-4"/> +91 98765 43210</span>
                      </div>
                  </div>
                  <button 
                    onClick={() => {
                      setEditForm({
                        name: farmerProfile?.name || name,
                        village: farmerProfile?.village || village,
                        state: farmerProfile?.state || state,
                        district: farmerProfile?.district || district,
                        farmSize: farmerProfile?.farmSize || '1-5',
                        crops: farmerProfile?.crops || ['Tomato', 'Onion'],
                        preferredLanguage: farmerProfile?.preferredLanguage || lang
                      });
                      setIsEditing(true);
                    }} 
                    className="ab-secondary-btn flex items-center gap-2 !py-2"
                  >
                    <Edit3 className="w-4 h-4"/> Edit Profile
                  </button>
              </div>
          </div>
      </div>

      {userRole === 'farmer' && (
        <>
            <h2 className="text-xl font-bold text-slate-800 px-2 mt-8 mb-4">Your Lifetime Impact on AgroBridge</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="ab-impact-card relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-100 rounded-full opacity-50 blur-xl"></div>
                    <HandCoins className="w-6 h-6 text-emerald-600 mb-2" />
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Earned</div>
                    <div className="ab-impact-value">₹4.2 Lakhs</div>
                </div>
                <div className="ab-impact-card relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
                    <Truck className="w-6 h-6 text-blue-600 mb-2" />
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Transport Saved</div>
                    <div className="ab-impact-value">₹12,400</div>
                    <div className="text-xs font-bold text-blue-600 mt-1">Across 8 pools</div>
                </div>
                <div className="ab-impact-card relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-100 rounded-full opacity-50 blur-xl"></div>
                    <Store className="w-6 h-6 text-purple-600 mb-2" />
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Successful Sales</div>
                    <div className="ab-impact-value">14 Lots</div>
                    <div className="text-xs font-bold text-emerald-600 mt-1">0 Rejections</div>
                </div>
            </div>
            
            <div className="ab-card p-6 mt-6 flex justify-between items-center bg-slate-50 border-slate-200">
                <div>
                    <h3 className="font-bold text-slate-800">Farm Details</h3>
                    <p className="text-sm font-medium text-slate-500">
                      {farmerProfile?.farmSize ? `${farmerProfile.farmSize} Acres • Crops: ${farmerProfile.crops?.join(', ')}` : 'View your land records, soil health card, and active crops.'}
                    </p>
                </div>
                <button className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm"><ArrowRight className="w-5 h-5 text-slate-500"/></button>
            </div>
            <div className="ab-card p-6 flex justify-between items-center bg-slate-50 border-slate-200">
                <div>
                    <h3 className="font-bold text-slate-800">Bank & Escrow Settings</h3>
                    <p className="text-sm font-medium text-slate-500">Manage your linked accounts for direct payments.</p>
                </div>
                <button className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm"><ArrowRight className="w-5 h-5 text-slate-500"/></button>
            </div>
        </>
      )}

      <div className="pt-8 text-center">
        <button onClick={handleLogout} className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl transition">
          <LogOut className="w-5 h-5" /> Logout from AgroBridge
        </button>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0" onClick={() => setIsEditing(false)}></div>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 sm:p-8 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <Edit3 className="w-6 h-6 text-emerald-600" /> Edit Farm Profile
                </h2>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
                    className="ab-input" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Village / Taluka</label>
                  <input 
                    type="text" 
                    value={editForm.village} 
                    onChange={e => setEditForm({ ...editForm, village: e.target.value })} 
                    className="ab-input" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">State</label>
                    <select 
                      value={editForm.state} 
                      onChange={e => handleStateChange(e.target.value)} 
                      className="ab-input font-medium"
                    >
                      {getStates().map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">District</label>
                    <select 
                      value={editForm.district} 
                      onChange={e => setEditForm({ ...editForm, district: e.target.value })} 
                      className="ab-input font-medium"
                    >
                      {getDistrictsForState(editForm.state).map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {userRole === 'farmer' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Total Farm Size (Acres)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['< 1', '1-5', '5-10', '10+'].map(size => (
                          <button 
                            type="button"
                            key={size} 
                            onClick={() => setEditForm({ ...editForm, farmSize: size })} 
                            className={`py-2 px-3 rounded-xl border-2 font-bold text-xs transition-all ${editForm.farmSize === size ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                          >
                            {size} {size === '10+' ? 'ac' : size === '< 1' ? 'ac' : 'ac'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Primary Crops</label>
                      <div className="flex flex-wrap gap-2">
                        {cropsList.map(c => (
                          <button 
                            type="button"
                            key={c} 
                            onClick={() => toggleCrop(c)} 
                            className={`px-3 py-1.5 rounded-full border-2 font-bold text-xs transition-all ${editForm.crops.includes(c) ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Language</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[{id:'mr', label:'मराठी'}, {id:'hi', label:'हिंदी'}, {id:'en', label:'English'}].map(l => (
                      <button 
                        type="button"
                        key={l.id} 
                        onClick={() => setEditForm({ ...editForm, preferredLanguage: l.id })} 
                        className={`p-2.5 rounded-xl border-2 font-bold text-sm transition-all ${editForm.preferredLanguage === l.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)} 
                    className="ab-secondary-btn flex-1 !py-3"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="ab-primary-btn flex-1 !py-3 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
