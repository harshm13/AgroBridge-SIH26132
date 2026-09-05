import React, { useState } from 'react';
import { PlusCircle, Leaf, Calendar, CheckCircle2, Package, Search } from 'lucide-react';

export default function MyCrops() {
  const [lots, setLots] = useState([
    { id: 'AB-10482', crop: 'Tomato', qty: 24, grade: 'Grade A', harvestDate: '28 Aug 2026', status: 'Looking for buyers' }
  ]);
  const [showForm, setShowForm] = useState(false);
  
  const [newLot, setNewLot] = useState({ crop: 'Tomato', qty: '', harvestDate: '', quality: 'Grade A', expSaleDate: '3-7 days', storage: true });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newLot.qty || !newLot.harvestDate) return;
    setLots([{
      id: `AB-${Math.floor(10000 + Math.random() * 90000)}`,
      crop: newLot.crop, qty: Number(newLot.qty), grade: newLot.quality,
      harvestDate: newLot.harvestDate, status: 'Looking for buyers'
    }, ...lots]);
    setShowForm(false);
    setNewLot({ ...newLot, qty: '', harvestDate: '' });
  };

  return (
    <div className="ab-container py-6 sm:py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ab-card p-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Leaf className="w-6 h-6 text-emerald-600" /> My Crops</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your harvest lots and track market readiness.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="ab-primary-btn flex items-center gap-2 whitespace-nowrap">
          <PlusCircle className="w-5 h-5" /> {showForm ? 'Cancel' : 'Create New Lot'}
        </button>
      </div>

      {showForm && (
        <div className="ab-card p-6 bg-slate-50 border-emerald-200 shadow-lg">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Create New Lot</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Crop</label><select value={newLot.crop} onChange={e => setNewLot({...newLot, crop: e.target.value})} className="ab-input font-bold"><option>Tomato</option><option>Onion</option><option>Wheat</option></select></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Quantity (Quintal)</label><input type="number" value={newLot.qty} onChange={e => setNewLot({...newLot, qty: e.target.value})} className="ab-input" placeholder="e.g. 24" required /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harvest Date</label><input type="date" value={newLot.harvestDate} onChange={e => setNewLot({...newLot, harvestDate: e.target.value})} className="ab-input" required /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Quality / Grade</label><select value={newLot.quality} onChange={e => setNewLot({...newLot, quality: e.target.value})} className="ab-input"><option>Grade A</option><option>Grade B</option><option>Ungraded</option></select></div>
            </div>
            <div className="flex items-center gap-2 mt-4 p-4 bg-white rounded-xl border border-slate-200">
              <input type="checkbox" checked={newLot.storage} onChange={e => setNewLot({...newLot, storage: e.target.checked})} className="w-5 h-5 accent-emerald-600 rounded" id="storage" />
              <label htmlFor="storage" className="font-bold text-slate-700">Safe storage available (allows for wait-and-sell strategy)</label>
            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" className="ab-primary-btn !py-3 px-8 text-lg">Create Lot</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lots.map(lot => (
          <div key={lot.id} className="ab-card overflow-hidden p-0 flex flex-col transition hover:shadow-md hover:border-emerald-300">
            <div className="p-5 border-b border-slate-100 flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">LOT #{lot.id}</div>
                <div className="text-xl font-black text-slate-800 flex items-center gap-2"><span className="text-2xl">{lot.crop === 'Tomato' ? '🍅' : '🧅'}</span> {lot.crop}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-700">{lot.qty} <span className="text-sm font-bold text-emerald-600/70">Qtl</span></div>
              </div>
            </div>
            <div className="p-5 space-y-3 bg-slate-50 flex-1">
              <div className="flex justify-between items-center text-sm font-medium"><span className="text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quality</span><span className="font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">{lot.grade}</span></div>
              <div className="flex justify-between items-center text-sm font-medium"><span className="text-slate-500 flex items-center gap-1"><Calendar className="w-4 h-4 text-slate-400" /> Harvested</span><span className="font-bold text-slate-800">{lot.harvestDate}</span></div>
            </div>
            <div className="p-4 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1"><Search className="w-4 h-4" /> Status</span>
              <span className="ab-status-success shadow-sm border border-emerald-200">{lot.status}</span>
            </div>
          </div>
        ))}
        {lots.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-500">No active lots</h3>
            <p className="text-sm text-slate-400 mt-1">Create a lot to start finding buyers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
