import React, { useState, createContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ChatBox from './components/ChatBox';
import Logistics from './pages/Logistics';
import QualityCheck from './pages/QualityCheck';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MarketIntelligence from './pages/MarketIntelligence';
import Marketplace from './pages/Marketplace';
import FarmerOnboarding from './pages/FarmerOnboarding';
import MyCrops from './pages/MyCrops';
import Transactions from './pages/Transactions';
import Support from './pages/Support';
import { WifiOff, AlertTriangle } from 'lucide-react';

export const AppContext = createContext();

const dict = {
  en: { 
    dashboard: 'Dashboard', find_buyers: 'Opportunities', logistics: 'Logistics', 
    agrobot: 'Copilot', profile: 'Profile', quality_check: 'Quality Check',
    market_data: 'Market Intel', find_crops: 'Find Crops', logout: 'Logout',
    my_crops: 'My Crops', transactions: 'Transactions', support: 'Support'
  },
  hi: { 
    dashboard: 'डैशबोर्ड', find_buyers: 'अवसर', logistics: 'लॉजिस्टिक्स', 
    agrobot: 'को-पायलट', profile: 'प्रोफ़ाइल', quality_check: 'गुणवत्ता जांच',
    market_data: 'बाज़ार डेटा', find_crops: 'फसल खोजें', logout: 'लॉग आउट',
    my_crops: 'मेरी फसलें', transactions: 'लेन-देन', support: 'सहायता'
  },
  mr: { 
    dashboard: 'डॅशबोर्ड', find_buyers: 'संधी', logistics: 'लॉजिस्टिक्स', 
    agrobot: 'को-पायलट', profile: 'प्रोफाइल', quality_check: 'गुणवत्ता तपासणी',
    market_data: 'बाजार डेटा', find_crops: 'पीक शोधा', logout: 'लॉग आउट',
    my_crops: 'माझी पिके', transactions: 'व्यवहार', support: 'मदत'
  }
};

export default function App() {
  const [userRole, setUserRole] = useState(null); // 'farmer' or 'buyer'
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOffline, setIsOffline] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [farmerProfile, setFarmerProfile] = useState(null);

  const t = dict[lang];

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!userRole) {
    return <Login onLogin={(role) => setUserRole(role)} />;
  }

  // Mandatory Onboarding for Farmers
  if (userRole === 'farmer' && !onboardingComplete) {
    return (
      <AppContext.Provider value={{ userRole, lang, setLang, t, setFarmerProfile, setOnboardingComplete }}>
        <FarmerOnboarding />
      </AppContext.Provider>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'my_crops': return <MyCrops />;
      case 'market_data': return <MarketIntelligence />;
      case 'marketplace': return <Marketplace />;
      case 'logistics': return <Logistics />;
      case 'quality_check': return <QualityCheck />;
      case 'agrobot': return <ChatBox />;
      case 'transactions': return <Transactions />;
      case 'support': return <Support />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{ userRole, setUserRole, lang, setLang, t, activeTab, setActiveTab, farmerProfile, setFarmerProfile }}>
      <div className="ab-page-background min-h-screen flex flex-col">
        {isOffline && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2">
                <WifiOff className="w-4 h-4" /> Limited Connectivity — Showing saved offline data.
            </div>
        )}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 pb-16 lg:pb-0">
          {renderContent()}
        </main>
      </div>
    </AppContext.Provider>
  );
}
