import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, X, History, ThumbsUp, ThumbsDown, CheckCircle2, Clock } from 'lucide-react';

export default function BuyerProfile({ buyer, onClose }) {
    if (!buyer) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end"
            >
                <div className="absolute inset-0" onClick={onClose}></div>
                <motion.div 
                    initial={{ x: '100%' }} 
                    animate={{ x: 0 }} 
                    exit={{ x: '100%' }} 
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="w-full max-w-md bg-white h-full shadow-2xl relative z-10 flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full opacity-50"></div>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-2xl font-black text-slate-300">
                                {buyer.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                    {buyer.name} {buyer.verified && <ShieldCheck className="w-5 h-5 text-blue-500" />}
                                </h2>
                                <p className="text-sm font-bold text-slate-500 flex items-center gap-1 mt-1">
                                    <MapPin className="w-4 h-4" /> {buyer.distance} km • {buyer.type}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition relative z-10">
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        
                        {/* Trust Ring */}
                        <div className="ab-card p-6 flex flex-col items-center justify-center text-center">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Platform Trust Score</h3>
                            <div className="ab-trust-ring-lg mb-4">
                                <svg viewBox="0 0 36 36">
                                    <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <motion.path 
                                        className={buyer.trust >= 90 ? "text-emerald-500" : "text-amber-500"} 
                                        strokeWidth="3" strokeDasharray={`${buyer.trust}, 100`} strokeLinecap="round" stroke="currentColor" fill="none"
                                        initial={{ strokeDasharray: "0, 100" }}
                                        animate={{ strokeDasharray: `${buyer.trust}, 100` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-slate-800">{buyer.trust}</span>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-slate-600">Based on 142 transactions on AgroBridge</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider mb-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Completion Rate</div>
                                <div className="text-2xl font-black text-slate-800">99%</div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider mb-2"><Clock className="w-4 h-4 text-amber-500"/> Avg Payment</div>
                                <div className="text-2xl font-black text-slate-800">1.2 Days</div>
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><History className="w-4 h-4" /> Farmer Reviews</h3>
                            <div className="space-y-3">
                                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-400">Oct 12, 2026 • Onion (20 Qtl)</span>
                                        <ThumbsUp className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">"Excellent buyer. Payment was cleared via escrow within 2 hours of delivery."</p>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-400">Sep 28, 2026 • Tomato (15 Qtl)</span>
                                        <ThumbsUp className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">"Good price, no haggling at the gate. Transport pooled easily."</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
