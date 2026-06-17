/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Asset } from '../types';
import { 
  Scan, 
  HelpCircle, 
  ExternalLink, 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Barcode, 
  Keyboard,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface EmployeeDashboardProps {
  currentUser: User;
  assets: Asset[];
  setActiveTab: (tab: string) => void;
  onBorrowAsset: (assetId: string) => void;
}

export default function EmployeeDashboard({
  currentUser,
  assets,
  setActiveTab,
  onBorrowAsset,
}: EmployeeDashboardProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [selectedScanItem, setSelectedScanItem] = useState<string>('');
  const [manualCode, setManualCode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; asset?: Asset } | null>(null);

  // Filter dynamic metrics associated with this user
  const userBorroweds = assets.filter(a => a.status === 'Dipinjam' && a.borrower?.toLowerCase() === currentUser.name.toLowerCase());
  const borrowedCount = userBorroweds.length;
  
  // Calculate overdue items (e.g. ThinkPad BRG-0004 or check manually)
  const overdueCount = userBorroweds.filter(a => a.dueDate && new Date(a.dueDate) < new Date('2026-05-30')).length;

  const handleSimulateScan = (assetId: string) => {
    setSelectedScanItem(assetId);
    
    const targetAsset = assets.find(a => a.id === assetId);
    
    if (!targetAsset) {
      setScanResult({
        success: false,
        message: 'Aset tidak ditemukan dalam sistem database.'
      });
      return;
    }

    if (targetAsset.status === 'Dipinjam') {
      const isMine = targetAsset.borrower?.toLowerCase() === currentUser.name.toLowerCase();
      setScanResult({
        success: false,
        message: isMine 
          ? `Barang ini (${targetAsset.name}) sudah Anda pinjam sebelumnya.` 
          : `Barang ini sedang dipinjam oleh ${targetAsset.borrower} (${targetAsset.department || 'Operasional'}).`
      });
      return;
    }

    // Call callback to mutate main state
    onBorrowAsset(assetId);
    
    setScanResult({
      success: true,
      message: `Berhasil Melakukan Peminjaman Baru!`,
      asset: targetAsset
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    // Convert code e.g. "0001" or "BRG-0001"
    let cleanCode = manualCode.trim().toUpperCase();
    if (!cleanCode.startsWith('BRG-')) {
      cleanCode = `BRG-${cleanCode.padStart(4, '0')}`;
    }

    handleSimulateScan(cleanCode);
    setManualCode('');
    setShowManualInput(false);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setSelectedScanItem('');
    setScanResult(null);
  };

  // Get other available assets for employee to select and scan
  const availableScanOptions = assets.filter(a => a.status === 'Tersedia');

  return (
    <div className="flex flex-col gap-8 pb-16 animate-fade-in relative z-10">
      
      {/* Welcome Greetings Section */}
      <section className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-[#191c1e] tracking-tight">
          Welcome back, {currentUser.name}.
        </h1>
        <p className="text-sm font-medium text-[#444651]">
          Kelola peralatan perusahaan Anda dan lakukan pengajuan peminjaman barang dengan mudah.
        </p>
      </section>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Primary Action Card (Large Scan CTA) */}
        <div
          onClick={() => setShowScanner(true)}
          className="lg:col-span-8 bg-[#006a61] text-white rounded-2xl p-8 relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
        >
          {/* Ambient background glow gradient */}
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#89f5e7]/15 rounded-full blur-2xl group-hover:bg-[#89f5e7]/25 transition-all duration-500 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full gap-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 transform transition group-hover:scale-105 duration-200">
              <Scan className="w-8 h-8 text-[#89f5e7] stroke-[1.5px]" />
            </div>
            
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Scan to Borrow Asset</h3>
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                Gunakan scanner barcode untuk meminjam laptop kerja, monitor, proyektor, atau perangkat penunjang lainnya secara instan.
              </p>
            </div>
            
            <div className="mt-8 pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:translate-x-3 transition-transform duration-200 text-[#89f5e7]">
              Initiate Scanner 
              <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
            </div>
          </div>
        </div>

        {/* Dynamic Personal Stats Summaries (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Card A: Active borrows */}
          <div className="bg-white border border-[#c5c5d3]/50 rounded-2xl p-6 shadow-xs flex-1 flex flex-col hover:shadow-sm transition-all duration-250">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#006f66] flex items-center justify-center border border-[#86f2e4]/30">
                <ExternalLink className="w-5 h-5" />
              </div>
              <span className="bg-[#edeef0] text-[#191c1e] px-2.5 py-1 rounded text-xs font-bold border border-[#c5c5d3]/50">
                {borrowedCount} Active
              </span>
            </div>
            <h4 className="text-sm font-semibold text-[#444651] mb-1">Currently Borrowed</h4>
            <div className="text-3xl font-extra-bold text-[#191c1e] tracking-tight">{borrowedCount} Barang</div>
            
            <button
              onClick={() => setActiveTab('borrowed')}
              className="mt-6 pt-4 text-[#00236f] font-bold text-xs flex items-center gap-1 hover:underline w-fit border-none bg-transparent cursor-pointer pl-0"
            >
              Lihat rincian barang <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card B: Danger overdues alerts */}
          <div className="bg-white border border-[#c5c5d3]/50 rounded-2xl p-6 shadow-xs flex-1 flex flex-col hover:shadow-sm transition-all duration-250">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                overdueCount > 0 
                  ? 'bg-red-50 text-red-600 border-red-100' 
                  : 'bg-green-50 text-green-600 border-green-100'
              }`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-[#444651] mb-1">Jatuh Tempo Pengembalian</h4>
            <div className={`text-3xl font-extra-bold tracking-tight ${overdueCount > 0 ? 'text-red-600' : 'text-[#191c1e]'}`}>
              {overdueCount > 0 ? `${overdueCount} Terlambat` : 'Aman (0 Terlambat)'}
            </div>
            
            <button
              onClick={() => setActiveTab('borrowed')}
              className="mt-6 pt-4 text-[#00236f] font-bold text-xs flex items-center gap-1 hover:underline w-fit border-none bg-transparent cursor-pointer pl-0"
            >
              Cek batas waktu <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Barcode Scanner Modal simulation */}
      {showScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Glass blur background backdrop */}
          <div 
            onClick={handleCloseScanner}
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md transition-opacity duration-300" 
          />
          
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header toolbar */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#edeef0]">
              <h3 className="text-base font-bold text-[#191c1e] flex items-center gap-2">
                <Scan className="w-5 h-5 text-[#006a61]" />
                Asset Scanner Simulation
              </h3>
              <button 
                onClick={handleCloseScanner}
                className="w-8 h-8 rounded-full bg-[#f3f4f6] text-[#444651] flex items-center justify-center hover:bg-[#edeef0] transition-colors border-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inner viewport container */}
            <div className="p-6 overflow-y-auto flex flex-col items-center">
              
              {!scanResult ? (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-lg font-bold text-[#191c1e] mb-1">Arahkan Scanner Ke Barcode</h2>
                    <p className="text-xs text-[#444651]">
                      Posisikan barcode stiker aset ke dalam kotak merah di bawah untuk melakukan pemindaian otomatis.
                    </p>
                  </div>

                  {/* Viewport viewport simulation */}
                  <div className="relative w-full max-w-[280px] aspect-square bg-[#2e3132] rounded-2xl overflow-hidden shadow-inner border border-white/10 flex items-center justify-center mb-6 group">
                    
                    {/* Simulated Camera Feed pattern */}
                    <div className="absolute inset-0 opacity-45 bg-[url('https://images.unsplash.com/photo-1588508065123-287b28e01397?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center filter grayscale" />
                    
                    {/* Retro styling overlay corners */}
                    <div className="absolute inset-6 border-2 border-transparent">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#89f5e7] rounded-tl-sm" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#89f5e7] rounded-tr-sm" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#89f5e7] rounded-bl-sm" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#89f5e7] rounded-br-sm" />
                    </div>

                    {/* Laser line slider animation */}
                    <div className="absolute left-6 right-6 h-[2px] bg-[#89f5e7] shadow-[0_0_8px_2px_rgba(137,245,231,0.6)] animate-pulse rounded-full z-10"
                         style={{
                           animation: 'scanLaser 2s linear infinite'
                         }}
                    />

                    {/* Simulated scanning label */}
                    <span className="absolute bottom-4 text-[10px] font-mono font-bold tracking-widest text-[#89f5e7] opacity-80 uppercase">
                      Pemindai Aktif...
                    </span>
                  </div>

                  <style>{`
                    @keyframes scanLaser {
                      0% { top: 12%; }
                      50% { top: 88%; }
                      100% { top: 12%; }
                    }
                  `}</style>

                  {/* Quick Select Buttons - Simulation Helper */}
                  <div className="w-full flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-[#191c1e] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 mb-1 text-[#006a61]">
                      <Sparkles className="w-3.5 h-3.5" />
                      Pilih Aset Tersedia Untuk Discan
                    </h4>
                    
                    {availableScanOptions.length === 0 ? (
                      <p className="text-xs text-center text-[#757682] py-2">
                        Waduh! Tidak ada barang tersedia untuk dipinjam saat ini.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {availableScanOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => handleSimulateScan(option.id)}
                            className="bg-[#f3f4f6] hover:bg-[#86f2e4]/30 border border-[#c5c5d3]/50 p-2.5 rounded-lg text-xs font-semibold text-[#191c1e] text-left transition-colors flex flex-col gap-0.5 cursor-pointer"
                          >
                            <span className="font-bold truncate text-[#00236f]">{option.name}</span>
                            <span className="text-[10px] text-[#757682] font-mono">{option.id} • {option.brand}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Manual input switcher trigger */}
                    <div className="border-t border-[#edeef0] pt-4 flex justify-center">
                      <button
                        onClick={() => setShowManualInput(!showManualInput)}
                        type="button"
                        className="text-xs font-bold text-[#00236f] hover:underline flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
                      >
                        <Keyboard className="w-4 h-4" />
                        Masukan Kode Aset Manual
                      </button>
                    </div>

                    {showManualInput && (
                      <form onSubmit={handleManualSubmit} className="flex gap-2 animate-slide-up mt-2">
                        <input
                          type="text"
                          value={manualCode}
                          onChange={(e) => setManualCode(e.target.value)}
                          placeholder="Kode aset (misal: 0001 atau BRG-0001)"
                          className="flex-1 bg-[#f8f9fb] border border-[#c5c5d3] px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                        />
                        <button
                          type="submit"
                          className="bg-[#00236f] text-white text-xs font-bold px-4 rounded-lg hover:bg-slate-800 border-none cursor-pointer"
                        >
                          Kirim
                        </button>
                      </form>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full text-center py-6 flex flex-col items-center gap-4 animate-scale-up">
                  
                  {scanResult.success ? (
                    <div className="w-16 h-16 bg-[#86f2e4]/30 text-[#006f66] rounded-full flex items-center justify-center border border-[#86f2e4]">
                      <CheckCircle2 className="w-10 h-10 stroke-[2px]" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center border border-red-200">
                      <AlertTriangle className="w-10 h-10 stroke-[2.5px]" />
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-bold text-[#191c1e] mb-1">
                      {scanResult.success ? 'Proses Peminjaman Sukses' : 'Gagal Memproses Pemindaian'}
                    </h2>
                    <p className="text-sm font-medium text-[#444651] px-4 leading-relaxed">
                      {scanResult.message}
                    </p>
                  </div>

                  {scanResult.asset && (
                    <div className="w-full bg-[#f3f4f6]/50 border border-[#c5c5d3]/50 p-4 rounded-xl flex gap-3 text-left max-w-sm mt-3 shadow-2xs">
                      <img
                        src={scanResult.asset.imageUrl}
                        alt={scanResult.asset.name}
                        className="w-14 h-14 rounded-lg object-cover border border-[#c5c5d3]/50 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#00236f] uppercase tracking-wider">Identifikasi Aset</p>
                        <h4 className="text-sm font-bold text-[#191c1e] truncate mt-0.5">{scanResult.asset.name}</h4>
                        <p className="text-[10px] text-[#757682] font-mono mt-0.5">ID: {scanResult.asset.id} • Brand: {scanResult.asset.brand}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 w-full max-w-xs mt-6">
                    <button
                      onClick={() => setScanResult(null)}
                      className="flex-1 bg-[#edeef0] text-[#191c1e] font-bold py-3 px-4 rounded-lg text-xs hover:bg-[#c5c5d3] border-none cursor-pointer"
                    >
                      Scan Lagi
                    </button>
                    <button
                      onClick={handleCloseScanner}
                      className="flex-1 bg-[#00236f] text-white font-bold py-3 px-4 rounded-lg text-xs hover:bg-slate-800 border-none cursor-pointer"
                    >
                      Selesai
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
