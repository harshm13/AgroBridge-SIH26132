import React from 'react';
import { Sprout, Store, ArrowRight, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.2) 0%, transparent 60%)' }}></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center justify-center p-4 bg-emerald-800 rounded-3xl mb-6 shadow-2xl border border-emerald-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/20 to-transparent"></div>
                    <Sprout className="w-12 h-12 text-emerald-300 relative z-10" />
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">AgroBridge</h1>
                    <span className="bg-amber-500 text-amber-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-amber-500/20">
                        <Sparkles className="w-3 h-3" /> Engine™
                    </span>
                </div>
                <p className="text-emerald-200 text-lg sm:text-xl font-medium max-w-lg mx-auto">
                    The intelligent marketplace connecting farmers and buyers with AI-driven pricing and shared logistics.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
            >
                {/* Farmer Login Card */}
                <div 
                    onClick={() => onLogin('farmer')}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl cursor-pointer hover:bg-white/15 transition-all group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/50"
                >
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">I am a Farmer</h2>
                    <p className="text-emerald-100/70 font-medium mb-8">Access AI price discovery, list your harvest, and find the most profitable buyers instantly.</p>
                    
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-emerald-50 font-bold text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Discover AI Fair Price</li>
                        <li className="flex items-center gap-2 text-emerald-50 font-bold text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Pool transport and save 60%</li>
                        <li className="flex items-center gap-2 text-emerald-50 font-bold text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Direct Escrow payments</li>
                    </ul>

                    <div className="flex items-center gap-2 text-emerald-300 font-bold group-hover:text-white transition-colors">
                        Enter Workspace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
              
                {/* Buyer Login Card */}
                <div 
                    onClick={() => onLogin('buyer')}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl cursor-pointer hover:bg-white/15 transition-all group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/50"
                >
                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                        <Store className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">I am a Buyer</h2>
                    <p className="text-emerald-100/70 font-medium mb-8">Source verified, quality-checked produce directly from farmers with transparent pricing.</p>
                    
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-emerald-50 font-bold text-sm"><CheckCircle className="w-4 h-4 text-blue-400" /> Source Grade-A verified crops</li>
                        <li className="flex items-center gap-2 text-emerald-50 font-bold text-sm"><CheckCircle className="w-4 h-4 text-blue-400" /> Live market intelligence</li>
                        <li className="flex items-center gap-2 text-emerald-50 font-bold text-sm"><CheckCircle className="w-4 h-4 text-blue-400" /> Manage bulk logistics</li>
                    </ul>

                    <div className="flex items-center gap-2 text-blue-300 font-bold group-hover:text-white transition-colors">
                        Enter Workspace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </motion.div>

            <div className="mt-12 text-center text-emerald-500/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2 justify-center">
                <Cpu className="w-4 h-4" /> Powered by AgroBridge Engine
            </div>
        </div>
    </div>
  );
}

// Simple check icon for the lists
function CheckCircle({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    )
}
