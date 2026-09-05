import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, ShieldCheck, Truck, CheckCircle2, Lock, ArrowRight, 
    FileText, Sparkles, AlertCircle, Building2, MapPin, IndianRupee, Loader2
} from 'lucide-react';
import { AppContext } from '../App';

export default function ContractModal({ offerData, onClose }) {
    const { setActiveTab } = useContext(AppContext);
    const [step, setStep] = useState('review'); // 'review' | 'locking' | 'confirmed'
    const [quantity, setQuantity] = useState(offerData?.quantity || 24);

    const buyerName = offerData?.name || "FreshMart Inc.";
    const pricePerQtl = offerData?.price || 3120;
    const transportSaving = offerData?.transportCostPerQtl || 45;
    const netPerQtl = pricePerQtl - transportSaving;
    const totalGross = pricePerQtl * quantity;
    const totalTransport = transportSaving * quantity;
    const totalNet = netPerQtl * quantity;

    const handleConfirm = () => {
        setStep('locking');
        setTimeout(() => {
            setStep('confirmed');
        }, 1800);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden text-slate-800 relative"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-900 text-white p-6 relative">
                        <button 
                            onClick={onClose} 
                            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-widest mb-1">
                            <ShieldCheck className="w-4 h-4" /> AgroBridge Escrow Protection
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">Smart Contract Execution</h2>
                        <p className="text-emerald-100/80 text-xs mt-1 font-medium">Direct Trade Agreement with {buyerName}</p>
                    </div>

                    {/* Step 1: Contract Review */}
                    {step === 'review' && (
                        <div className="p-6 space-y-6">
                            
                            {/* Buyer Info */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-slate-800">{buyerName}</div>
                                        <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                                            <span className="flex items-center gap-1 text-emerald-600"><ShieldCheck className="w-3.5 h-3.5" /> 98 Trust Score</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Nashik Hub</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-200">
                                    Verified Escrow
                                </span>
                            </div>

                            {/* Quantity Adjuster */}
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                                    Harvest Quantity to Lock (Quintals)
                                </label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="500"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                        className="w-28 p-3 bg-slate-50 border border-slate-300 rounded-xl font-black text-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <div className="flex-1 bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                                        Lot Grade: <span className="text-blue-700 font-extrabold">Grade A (Onion)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Breakdown Table */}
                            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-3">
                                <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                                    <span>Offered Price ({quantity} Qtl @ ₹{pricePerQtl}/Qtl)</span>
                                    <span className="font-extrabold text-slate-900">₹{totalGross.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-semibold text-amber-700">
                                    <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Pooled Transport Savings</span>
                                    <span className="font-extrabold">-₹{totalTransport.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                                    <span>AgroBridge Escrow Fee (1%)</span>
                                    <span className="font-bold">-₹{Math.round(totalGross * 0.01).toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-emerald-200/80 my-2"></div>
                                <div className="flex justify-between items-center pt-1">
                                    <div>
                                        <div className="text-xs font-black uppercase text-emerald-800 tracking-wider">Total Guaranteed Net Realization</div>
                                        <div className="text-[11px] font-bold text-emerald-600">100% Protected in Escrow</div>
                                    </div>
                                    <div className="text-2xl font-black text-emerald-700">
                                        ₹{(totalNet - Math.round(totalGross * 0.01)).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="space-y-3 pt-2">
                                <button 
                                    onClick={handleConfirm}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base"
                                >
                                    <Lock className="w-5 h-5 text-amber-300" /> Lock Escrow & Accept Offer
                                </button>
                                <p className="text-[11px] text-center text-slate-400 font-bold flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Payment is deposited into bank immediately upon delivery receipt.
                                </p>
                            </div>

                        </div>
                    )}

                    {/* Step 2: Locking Animation */}
                    {step === 'locking' && (
                        <div className="p-12 text-center space-y-6">
                            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                                <Loader2 className="w-20 h-20 text-emerald-600 animate-spin" />
                                <Lock className="w-8 h-8 text-emerald-800 absolute" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Generating Smart Contract...</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Locking ₹{(totalNet - Math.round(totalGross * 0.01)).toLocaleString()} in AgroBridge Escrow Vault.</p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmed Success */}
                    {step === 'confirmed' && (
                        <div className="p-8 text-center space-y-6">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-300"
                            >
                                <CheckCircle2 className="w-10 h-10" />
                            </motion.div>

                            <div>
                                <span className="bg-amber-100 text-amber-800 font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-widest inline-block mb-2">
                                    Contract #AGB-2026-8894
                                </span>
                                <h3 className="text-2xl font-black text-slate-900">Offer Accepted & Escrow Locked!</h3>
                                <p className="text-slate-600 text-sm font-medium mt-2 max-w-md mx-auto">
                                    Your harvest lot of <strong className="text-slate-800">{quantity} Qtl Onion</strong> is now reserved for <strong className="text-slate-800">{buyerName}</strong>.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs font-bold text-slate-700">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Escrow Deposit:</span>
                                    <span className="text-emerald-700 font-extrabold">₹{(totalNet - Math.round(totalGross * 0.01)).toLocaleString()} Locked</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Transport Pickup:</span>
                                    <span className="text-blue-700 font-extrabold">Nashik Route TR-402 (Leaves 4:00 PM)</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <button
                                    onClick={() => { onClose(); setActiveTab('logistics'); }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                                >
                                    <Truck className="w-4 h-4" /> Track Logistics
                                </button>
                                <button
                                    onClick={() => { onClose(); setActiveTab('transactions'); }}
                                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                                >
                                    <FileText className="w-4 h-4 text-amber-300" /> Escrow Receipts
                                </button>
                            </div>
                        </div>
                    )}

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
