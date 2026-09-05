import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cpu, Activity, TrendingUp, Search, Scale, Truck, ShieldCheck, HandCoins, ArrowRight, X, CheckCircle2, Sparkles, MapPin
} from 'lucide-react';
import ContractModal from './ContractModal';

export default function OpportunityEngine({ crop = "Onion", market = "Nashik" }) {
    const [step, setStep] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showContractModal, setShowContractModal] = useState(false);

    const pipelineSteps = [
        { icon: Activity, title: "Market Scan", detail: "Analyzing 14 APMCs & 200+ buyers..." },
        { icon: Cpu, title: "AI Price Engine", detail: "Calculating fair price based on historical trends..." },
        { icon: TrendingUp, title: "Demand Forecast", detail: "Predicting 7-day price movement..." },
        { icon: Search, title: "Quality Match", detail: "Matching Grade A requirement..." },
        { icon: Truck, title: "Logistics Optimization", detail: "Finding cheapest transport route..." },
        { icon: ShieldCheck, title: "Trust Verification", detail: "Checking buyer payment history..." }
    ];

    useEffect(() => {
        let interval;
        if (step < pipelineSteps.length) {
            interval = setInterval(() => {
                setStep(s => s + 1);
            }, 1000);
        } else if (step === pipelineSteps.length) {
            setTimeout(() => setShowResult(true), 800);
        }
        return () => clearInterval(interval);
    }, [step, pipelineSteps.length]);

    const resetEngine = () => {
        setShowResult(false);
        setStep(0);
    };

    return (
        <div className="ab-price-card p-6 sm:p-10 min-h-[450px] flex flex-col justify-center w-full relative">
            
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div 
                        key="pipeline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-2xl mx-auto w-full relative z-10"
                    >
                        <div className="text-center mb-10">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-emerald-400/20 to-emerald-500/5 rounded-2xl mb-4 border border-emerald-400/20 shadow-[0_0_30px_rgba(52,185,111,0.2)]"
                            >
                                <Cpu className="w-8 h-8 text-emerald-300" />
                            </motion.div>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">AgroBridge Engine™</h2>
                            <p className="text-emerald-100/80 mt-2 font-medium">Calculating your most profitable opportunity for {crop}</p>
                        </div>

                        <div className="space-y-3">
                            {pipelineSteps.map((p, idx) => {
                                const Icon = p.icon;
                                const isActive = idx === step;
                                const isPast = idx < step;
                                
                                return (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ 
                                            opacity: isActive || isPast ? 1 : 0.3,
                                            x: 0,
                                            scale: isActive ? 1.02 : 1
                                        }}
                                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                                            isActive 
                                                ? 'bg-white/10 border border-white/20 shadow-xl shadow-black/20 backdrop-blur-md' 
                                                : isPast 
                                                    ? 'bg-white/5 border border-white/5' 
                                                    : 'bg-transparent'
                                        }`}
                                    >
                                        <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                                            isActive ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(52,185,111,0.4)]' : 
                                            isPast ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/30'
                                        }`}>
                                            <Icon className="w-6 h-6" />
                                            {isActive && (
                                                <span className="absolute inset-0 rounded-xl border-2 border-emerald-400 animate-ping opacity-75"></span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-bold text-lg ${isActive ? 'text-white' : isPast ? 'text-emerald-50' : 'text-white/50'}`}>{p.title}</div>
                                            <div className={`text-sm ${isActive ? 'text-emerald-100' : isPast ? 'text-emerald-200/50' : 'text-white/30'}`}>{p.detail}</div>
                                        </div>
                                        {isPast && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="result"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="max-w-4xl mx-auto w-full relative z-10"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-amber-500 text-amber-950 font-black px-5 py-2 rounded-full uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-4">
                                <Sparkles className="w-5 h-5" /> Highest Profit Match
                            </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
                            {/* Glass reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 items-center">
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">FreshMart Inc.</h3>
                                        <div className="flex items-center gap-4 text-emerald-100/90 font-medium">
                                            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm"><MapPin className="w-4 h-4" /> 18 km away</span>
                                            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm"><ShieldCheck className="w-4 h-4 text-blue-400" /> 98 Trust Score</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 bg-black/20 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-emerald-100/70 font-bold uppercase tracking-wider text-xs">Offered Price</span>
                                            <span className="font-black text-white text-lg">₹3,120 <span className="text-emerald-400 text-xs">/ Qtl</span></span>
                                        </div>
                                        <div className="h-px w-full bg-white/10"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-amber-200/70 font-bold uppercase tracking-wider text-xs flex items-center gap-1"><Truck className="w-3 h-3"/> Pooled Transport</span>
                                            <span className="font-black text-amber-300 text-lg">-₹45 <span className="text-amber-500/70 text-xs">/ Qtl</span></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10 flex flex-col justify-center h-full">
                                    <span className="block text-emerald-200/80 font-bold uppercase tracking-widest text-xs mb-3">Your Net Realization</span>
                                    <span className="block text-5xl sm:text-7xl font-black text-white mb-8 tracking-tighter shadow-black/50 drop-shadow-xl">
                                        ₹3,075<span className="text-2xl text-emerald-400 ml-1">/qtl</span>
                                    </span>
                                    
                                    <button 
                                        onClick={() => setShowContractModal(true)}
                                        className="w-full bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-emerald-950 font-black py-4 px-6 rounded-xl transition-all shadow-[0_0_40px_rgba(52,185,111,0.4)] hover:shadow-[0_0_60px_rgba(52,185,111,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2 text-lg cursor-pointer"
                                    >
                                        Accept Offer <ArrowRight className="w-6 h-6" />
                                    </button>
                                </div>
                                
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button onClick={resetEngine} className="text-emerald-100/50 hover:text-white font-bold text-sm flex items-center justify-center gap-2 mx-auto transition-colors bg-black/20 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20">
                                <X className="w-4 h-4" /> Recalculate
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Escrow Contract Execution Modal */}
            {showContractModal && (
                <ContractModal 
                    offerData={{
                        name: "FreshMart Inc.",
                        price: 3120,
                        transportCostPerQtl: 45,
                        quantity: 24
                    }}
                    onClose={() => setShowContractModal(false)}
                />
            )}
        </div>
    );
}
