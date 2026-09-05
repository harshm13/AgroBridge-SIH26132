import React, { useContext } from 'react';
import { AppContext } from '../App';
import { UserCircle, MapPin, Phone, ShieldCheck, HandCoins, Truck, Store, LogOut, ArrowRight, Edit3 } from 'lucide-react';

export default function Profile() {
  const { userRole, setUserRole, farmerProfile, setOnboardingComplete } = useContext(AppContext);

  const handleLogout = () => {
    setUserRole(null);
    setOnboardingComplete(false); // Reset for demo purposes
  };

  const name = farmerProfile ? farmerProfile.name : (userRole === 'farmer' ? 'Ramesh Patil' : 'Rajesh (Buyer)');
  const location = farmerProfile ? `${farmerProfile.village}, ${farmerProfile.district}` : 'Nashik, Maharashtra';
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
                      <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm font-bold text-slate-500 flex items-center gap-1"><MapPin className="w-4 h-4"/> {location}</span>
                          <span className="text-sm font-bold text-slate-500 flex items-center gap-1"><Phone className="w-4 h-4"/> +91 98765 43210</span>
                      </div>
                  </div>
                  <button className="ab-secondary-btn flex items-center gap-2 !py-2"><Edit3 className="w-4 h-4"/> Edit Profile</button>
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
                    <p className="text-sm font-medium text-slate-500">View your land records, soil health card, and active crops.</p>
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

    </div>
  );
}
