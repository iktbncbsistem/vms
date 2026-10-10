"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [jumlahKenderaan, setJumlahKenderaan] = useState(0);
  const [jumlahPerjalanan, setJumlahPerjalanan] = useState(0);

  useEffect(() => {
    async function dapatkanData() {
      // Dapatkan jumlah kenderaan
      const { count: kiraKenderaan } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true });
      
      // Dapatkan jumlah perjalanan bulan ini
      const { count: kiraPerjalanan } = await supabase
        .from('trip_logs')
        .select('*', { count: 'exact', head: true });

      if (kiraKenderaan) setJumlahKenderaan(kiraKenderaan);
      if (kiraPerjalanan) setJumlahPerjalanan(kiraPerjalanan);
    }
    dapatkanData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">IKTBN Chembong VMS</h1>
          <p className="text-sm text-slate-500">Sistem Pengurusan Kenderaan Berpusat</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            MZ
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Top Cards / KPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-slate-500 font-medium mb-1">Jumlah Kenderaan</h3>
            <p className="text-4xl font-bold text-slate-800">{jumlahKenderaan}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-slate-500 font-medium mb-1">Jumlah Perjalanan (Keseluruhan)</h3>
            <p className="text-4xl font-bold text-blue-600">{jumlahPerjalanan}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-md text-white">
            <h3 className="font-medium mb-1 opacity-90">Status Sistem</h3>
            <p className="text-2xl font-bold">Aktif & Bersambung</p>
            <p className="text-sm mt-2 opacity-80">Pangkalan data Supabase OK</p>
          </div>
        </div>

        {/* Action Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">Tindakan Pantas</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all text-blue-700 font-medium">
              + Daftar Perjalanan Baharu
            </button>
            <button className="flex items-center justify-center p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-xl transition-all text-emerald-700 font-medium">
              ✓ Kemas Kini Log Balik (Odometer/Bateri)
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
