/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Activity } from '../types';
import { History, Eye, CheckCircle2, Inbox, CornerDownLeft, Clock, Search, Info } from 'lucide-react';

interface ActivityHistoryProps {
  activities: Activity[];
}

export default function ActivityHistory({ activities }: ActivityHistoryProps) {
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredActs = activities.filter((act) => {
    const matchesSearch =
      act.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.assetId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction =
      filterAction === 'all' ||
      (filterAction === 'borrow' && act.action === 'borrow') ||
      (filterAction === 'return' && act.action === 'return');

    return matchesSearch && matchesAction;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#c5c5d3]/40 p-6 shadow-2xs animate-fade-in relative z-10 text-[#191c1e]">
      
      {/* Top filter headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#edeef0] pb-5 mb-5 gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-[#00236f]" />
            Log Riwayat Transaksi (Audit Trail)
          </h2>
          <p className="text-xs text-[#757682] mt-0.5">
            Daftar audit lengkap rincian peminjaman dan pengembalian barang perusahaan.
          </p>
        </div>

        {/* Action Type Filters */}
        <div className="flex bg-[#f3f4f6] rounded-lg p-1 border">
          {['all', 'borrow', 'return'].map((actType) => (
            <button
              key={actType}
              onClick={() => setFilterAction(actType)}
              className={`px-3 py-1.5 rounded text-xs font-bold capitalize cursor-pointer border-none transition-all ${
                filterAction === actType
                  ? 'bg-white text-[#00236f] shadow-2xs'
                  : 'text-[#444651] hover:text-[#191c1e]'
              }`}
            >
              {actType === 'all' ? 'Semua' : actType === 'borrow' ? 'Peminjaman' : 'Pengembalian'}
            </button>
          ))}
        </div>
      </div>

      {/* Query Filter row */}
      <div className="relative w-full mb-5">
        <Search className="w-4 h-4 text-[#757682] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama karyawan, nama barang, atau Kode ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#f8f9fb] border border-[#c5c5d3] rounded-lg pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#0D9488]"
        />
      </div>

      {filteredActs.length === 0 ? (
        <div className="text-center py-12 text-[#757682] flex flex-col items-center gap-2">
          <Info className="w-10 h-10 text-[#0d9488]/70" />
          <h3 className="font-bold text-[#191c1e] text-base">Log Kosong</h3>
          <p className="text-sm">Tidak ada riwayat aktivitas yang cocok dengan kata kunci filter pencarian Anda.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredActs.map((act, idx) => {
            const isBorrow = act.action === 'borrow';
            return (
              <div
                key={act.id || idx}
                className="flex items-center justify-between border border-[#edeef0] hover:bg-slate-50/30 p-4 rounded-xl transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    isBorrow ? 'bg-red-50 text-red-700' : 'bg-[#86f2e4]/30 text-[#006f66]'
                  }`}>
                    {isBorrow ? <Inbox className="w-4 h-4" /> : <CornerDownLeft className="w-4 h-4" />}
                  </div>
                  
                  <div className="min-w-0 text-xs text-[#191c1e]">
                    <span className="font-bold text-slate-800">{act.userName}</span>{' '}
                    {act.department ? `(${act.department})` : ''}{' '}
                    {isBorrow ? 'meminjam' : 'mengembalikan'}{' '}
                    <span className="font-semibold text-[#00236f]">{act.assetName}</span>{' '}
                    <span className="font-mono text-[10px] bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[#757682]">{act.assetId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-sans text-xs">
                  <span className="text-[10px] text-[#757682] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {act.timestamp}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    isBorrow ? 'bg-[#edeef0] text-[#444651]' : 'bg-[#86f2e4] text-[#006f66]'
                  }`}>
                    {act.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
