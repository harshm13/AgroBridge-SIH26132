import React, { useState } from 'react';
import { Truck, MapPin, Package, Users, PlusCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Logistics() {
    const [activePools, setActivePools] = useState([
        { id: 1, crop: 'Onion', from: 'Nashik (Village A)', to: 'Mumbai APMC', capacity: 100, filled: 60, cost: 25000, participants: 3 },
        { id: 2, crop: 'Tomato', from: 'Pune (Village B)', to: 'Navi Mumbai', capacity: 50, filled: 45, cost: 12000, participants: 2 }
    ]);
    const [activeTab, setActiveTab] = useState('pools');
    
    // Interactive state for the Join Pool flow
    const [selectedPool, setSelectedPool] = useState(null);
    const [joinQty, setJoinQty] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleJoinPool = (e) => {
        e.preventDefault();
        const qty = parseInt(joinQty);
        if (!qty || qty <= 0) return;
        
        setActivePools(pools => pools.map(p => {
            if (p.id === selectedPool.id) {
                return { ...p, filled: p.filled + qty, participants: p.participants + 1 };
            }
            return p;
        }));
        
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setSelectedPool(null);
            setJoinQty('');
            setActiveTab('shipments'); // Move to shipments tab automatically
        }, 2000);
    };

    // Calculate individual cost dynamically based on percentage of truck filled
    const calculateMyCost = () => {
        if (!joinQty || !selectedPool) return 0;
        const qty = parseInt(joinQty);
        if (isNaN(qty)) return 0;
        const percentage = qty / selectedPool.capacity;
        return (selectedPool.cost * percentage).toFixed(0);
    };

    // Calculate savings vs booking entire truck
    const calculateSavings = () => {
        if (!selectedPool) return 0;
        const soloCost = selectedPool.cost;
        const myCost = calculateMyCost();
        return (soloCost - myCost).toFixed(0);
    };

    return (
        <div className="ab-container py-6 sm:py-8 space-y-6">
            <div className="ab-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-3"><Truck className="w-8 h-8 text-emerald-600" /> Smart Logistics</h1>
                    <p className="text-slate-500 font-medium mt-1">Pool transport with nearby farmers to cut costs up to 60%.</p>
                </div>
            </div>

            <div className="flex gap-2">
                <button onClick={() => setActiveTab('pools')} className={`px-5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'pools' ? 'bg-emerald-800 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}>Active Pools</button>
                <button onClick={() => setActiveTab('shipments')} className={`px-5 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'shipments' ? 'bg-emerald-800 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}>My Shipments</button>
            </div>

            <AnimatePresence mode="wait">
            {activeTab === 'pools' && (
                <motion.div key="pools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Pool List */}
                    <div className="space-y-4">
                        {activePools.map(pool => (
                            <div 
                                key={pool.id} 
                                className={`ab-card p-6 cursor-pointer transition-all ${selectedPool?.id === pool.id ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg' : 'hover:border-emerald-300'}`}
                                onClick={() => setSelectedPool(pool)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">{pool.crop} Transport</h3>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{pool.participants} Farmers Joined</p>
                                    </div>
                                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-sm font-black shadow-sm">
                                        ₹{(pool.cost / pool.capacity).toFixed(0)}/Qtl
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-emerald-600" /> {pool.from}</div>
                                    <div className="h-px bg-slate-300 flex-1"></div>
                                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-600" /> {pool.to}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500 flex items-center gap-1"><Package className="w-4 h-4"/> Truck Capacity</span>
                                        <span className="text-slate-800">{pool.filled} / {pool.capacity} Qtl Filled</span>
                                    </div>
                                    <div className="ab-progress border border-slate-200">
                                        <div className={`ab-progress-fill ${(pool.filled / pool.capacity) > 0.9 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${(pool.filled / pool.capacity) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Join Calculator */}
                    <div>
                        {selectedPool ? (
                            <div className="ab-card p-8 sticky top-24 border-emerald-200 shadow-xl">
                                {showSuccess ? (
                                    <div className="text-center py-10 space-y-4">
                                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"><CheckCircle2 className="w-10 h-10 text-emerald-600" /></div>
                                        <h3 className="text-2xl font-black text-slate-800">Pool Joined!</h3>
                                        <p className="text-slate-500 font-medium">Your transport has been successfully booked.</p>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-emerald-600" /> Join this Pool</h2>
                                        
                                        <form onSubmit={handleJoinPool} className="space-y-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">How much are you shipping? (Quintals)</label>
                                                <input 
                                                    type="number" 
                                                    value={joinQty} 
                                                    onChange={e => setJoinQty(e.target.value)}
                                                    max={selectedPool.capacity - selectedPool.filled}
                                                    className="ab-input text-lg font-black" 
                                                    placeholder={`Max available: ${selectedPool.capacity - selectedPool.filled} Qtl`}
                                                    required 
                                                />
                                            </div>

                                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500 font-bold">Your Share of Cost</span>
                                                    <span className="text-xl font-black text-slate-800">₹{calculateMyCost()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-emerald-700">
                                                    <span className="font-bold">Total Savings</span>
                                                    <span className="font-black text-lg">₹{calculateSavings()}</span>
                                                </div>
                                            </div>

                                            <button type="submit" disabled={!joinQty || joinQty <= 0 || joinQty > (selectedPool.capacity - selectedPool.filled)} className="w-full ab-primary-btn !py-4 text-lg">Confirm & Book Transport</button>
                                        </form>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="ab-card p-10 flex flex-col items-center justify-center text-center h-full border-dashed bg-slate-50">
                                <Users className="w-16 h-16 text-slate-300 mb-4" />
                                <h3 className="text-lg font-bold text-slate-500">Select a pool to join</h3>
                                <p className="text-slate-400 font-medium mt-2">Calculate your exact savings instantly.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {activeTab === 'shipments' && (
                <motion.div key="shipments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ab-card p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Active Shipments</h2>
                    
                    {/* Simulated Timeline */}
                    <div className="ab-timeline pl-2 sm:pl-4">
                        <div className="ab-timeline-item done">
                            <h3 className="font-bold text-slate-800 text-lg">Transport Booked</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">Pool #1 (Onion to Mumbai) confirmed.</p>
                        </div>
                        <div className="ab-timeline-item active">
                            <h3 className="font-bold text-amber-700 text-lg">Truck Dispatched</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">Truck MH-15-AB-1234 is en route to your village for pickup.</p>
                            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 inline-block">
                                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">ETA</span>
                                <span className="font-black text-amber-700">Today, 2:30 PM</span>
                            </div>
                        </div>
                        <div className="ab-timeline-item">
                            <h3 className="font-bold text-slate-400 text-lg">In Transit</h3>
                        </div>
                        <div className="ab-timeline-item">
                            <h3 className="font-bold text-slate-400 text-lg">Delivered</h3>
                        </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}