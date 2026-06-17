/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Asset, Activity } from '../types';
import { 
  Boxes, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRightLeft, 
  Plus, 
  QrCode, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Inbox,
  CornerDownLeft,
  ArrowUpRight
} from 'lucide-react';

interface AdminDashboardProps {
  assets: Asset[];
  activities: Activity[];
  setActiveTab: (tab: string) => void;
  onInitiateReturnScan: () => void;
}

export default function AdminDashboard({
  assets,
  activities,
  setActiveTab,
  onInitiateReturnScan,
}: AdminDashboardProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  // Dynamic statistics calculations
  const totalAssetsRegistered = assets.length;
  const availableAssetsCount = assets.filter(a => a.status === 'Tersedia').length;
  const borrowedAssetsCount = assets.filter(a => a.status === 'Dipinjam').length;

  // Base corporate stats + real-time local additions
  const displayTotalBarang = 12450 + (totalAssetsRegistered - 4);
  const displayBarangTersedia = 9820 + (availableAssetsCount - 2);
  const displayBarangDipinjam = 2630 + (borrowedAssetsCount - 2);
  const displayTotalTransaksi = 145892 + activities.length;

  // Calculate percentages
  const availablePercent = Math.round((displayBarangTersedia / displayTotalBarang) * 100);
  const borrowedPercent = Math.round((displayBarangDipinjam / displayTotalBarang) * 100);

  // Stats data for the interactive chart tooltip
  const chartData = [
    { week: 'Week 1', borrowed: 420, returned: 310, date: '1-7 Mei' },
    { week: 'Week 2', borrowed: 580, returned: 480, date: '8-14 Mei' },
    { week: 'Week 3', borrowed: 490, returned: 510, date: '15-21 Mei' },
    { week: 'Week 4', borrowed: 740, returned: 690, date: '22-28 Mei' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Section 1: Stats Grid (Bento Style Layout) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        
        {/* Card 1: Total Assets */}
        <div className="bg-white rounded-2xl p-6 border border-[#c5c5d3]/50 shadow-xs flex flex-col gap-2 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between text-[#444651]">
            <h3 className="text-sm font-semibold tracking-wide">Total Barang</h3>
            <span className="p-2 bg-slate-50 rounded-lg text-[#757682]">
              <Boxes className="w-5 h-5 text-[#00236f]" />
            </span>
          </div>
          <div className="text-3xl font-bold font-sans text-[#191c1e] mt-1">{displayTotalBarang.toLocaleString('id-ID')}</div>
          <p className="text-xs text-[#757682] mt-auto pt-3 border-t border-[#edeef0] flex items-center gap-1">
            <span className="font-semibold text-[#006a61]">+124</span> bulan ini
          </p>
        </div>

        {/* Card 2: Available list */}
        <div className="bg-white rounded-2xl p-6 border border-[#c5c5d3]/50 shadow-xs flex flex-col gap-2 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-20 h-20 bg-[#86f2e4]/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between text-[#444651]">
            <h3 className="text-sm font-semibold tracking-wide">Barang Tersedia</h3>
            <div className="bg-[#86f2e4] text-[#006f66] px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006f66] animate-pulse" />
              Available
            </div>
          </div>
          <div className="text-3xl font-bold font-sans text-[#191c1e] mt-1">{displayBarangTersedia.toLocaleString('id-ID')}</div>
          <div className="w-full bg-[#e1e2e4] rounded-full h-1.5 mt-auto pt-0">
            <div className="bg-[#006a61] h-1.5 rounded-full transition-all duration-500" style={{ width: `${availablePercent}%` }} />
          </div>
        </div>

        {/* Card 3: Out / Borrowed assets */}
        <div className="bg-white rounded-2xl p-6 border border-[#c5c5d3]/50 shadow-xs flex flex-col gap-2 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-20 h-20 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between text-[#444651]">
            <h3 className="text-sm font-semibold tracking-wide">Sedang Dipinjam</h3>
            <div className="bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-2xs border border-red-100">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Out
            </div>
          </div>
          <div className="text-3xl font-bold font-sans text-[#191c1e] mt-1">{displayBarangDipinjam.toLocaleString('id-ID')}</div>
          <div className="w-full bg-[#e1e2e4] rounded-full h-1.5 mt-auto pt-0">
            <div className="bg-red-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${borrowedPercent}%` }} />
          </div>
        </div>

        {/* Card 4: Total Transactions info */}
        <div className="bg-white rounded-2xl p-6 border border-[#c5c5d3]/50 shadow-xs flex flex-col gap-2 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between text-[#444651]">
            <h3 className="text-sm font-semibold tracking-wide">Total Transaksi</h3>
            <span className="p-2 bg-slate-50 rounded-lg text-[#757682]">
              <ArrowRightLeft className="w-5 h-5 text-[#00236f]" />
            </span>
          </div>
          <div className="text-3xl font-bold font-sans text-[#191c1e] mt-1">{displayTotalTransaksi.toLocaleString('id-ID')}</div>
          <p className="text-xs text-[#757682] mt-auto pt-3 border-t border-[#edeef0]">
            Volume akumulasi sepanjang waktu
          </p>
        </div>

      </section>

      {/* Section 2: Chart & Actions Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Chart Area Description (Span 8) */}
        <div className="bg-white rounded-2xl border border-[#c5c5d3]/50 shadow-xs lg:col-span-8 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-[#c5c5d3]/40 flex justify-between items-center bg-[#f8f9fb]">
            <div>
              <h2 className="text-base font-bold text-[#191c1e] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00236f]" />
                Borrowing Statistics
              </h2>
              <p className="text-xs text-[#444651] mt-0.5">Volume of items borrowed vs returned over 30 days</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-[#00236f] font-bold hover:underline border-none bg-transparent cursor-pointer">
              This Month
            </button>
          </div>

          <div className="p-6 flex-1 relative min-h-[280px] flex items-end">
            
            {/* Grid line overlay */}
            <div className="absolute inset-x-6 inset-y-12 flex flex-col justify-between pointer-events-none z-0">
              <div className="w-full border-t border-dashed border-[#c5c5d3]/40" />
              <div className="w-full border-t border-dashed border-[#c5c5d3]/40" />
              <div className="w-full border-t border-dashed border-[#c5c5d3]/40" />
            </div>

            {/* Custom Interactive SVG Chart Layout */}
            <div className="w-full h-48 relative z-10 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="borrowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#006a61" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#006a61" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Filled Area Slope */}
                <path
                  d="M0 80 Q15 65 33 60 T66 40 T100 20 L100 100 L0 100 Z"
                  fill="url(#borrowGrad)"
                />

                {/* Stroke Line */}
                <path
                  d="M0 80 Q15 65 33 60 T66 40 T100 20"
                  fill="none"
                  stroke="#006a61"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Target pointers */}
                <circle cx="0" cy="80" r="1.5" className="fill-[#006a61] stroke-white stroke-1" />
                <circle cx="33" cy="60" r="1.5" className="fill-[#006a61] stroke-white stroke-1" />
                <circle cx="66" cy="40" r="1.5" className="fill-[#006a61] stroke-white stroke-1" />
                <circle cx="100" cy="20" r="1.5" className="fill-[#006a61] stroke-white stroke-1" />
              </svg>

              {/* Hover Trigger Spots overlaying the 4 weeks */}
              <div className="absolute inset-0 flex justify-between z-20">
                {chartData.map((data, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredWeek(index)}
                    onMouseLeave={() => setHoveredWeek(null)}
                    className="flex-1 h-full cursor-pointer group relative"
                  >
                    {/* Vertical highlight line */}
                    <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px border-l border-dashed border-[#006a61]/30 transition-opacity ${
                      hoveredWeek === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`} />
                  </div>
                ))}
              </div>

              {/* Weekly Stats Tooltip Display */}
              {hoveredWeek !== null && (
                <div 
                  className="absolute p-3 bg-zinc-900 text-white text-xs rounded-lg shadow-lg z-30 flex flex-col gap-1 transition-all duration-150 pointer-events-none"
                  style={{
                    left: `${(hoveredWeek / 3) * 65 + 10}%`,
                    bottom: '50px'
                  }}
                >
                  <p className="font-bold border-b border-white/20 pb-1 mb-1 text-center">
                    {chartData[hoveredWeek].week} ({chartData[hoveredWeek].date})
                  </p>
                  <div className="flex gap-4 justify-between">
                    <span>Dipinjam: <strong className="text-[#86f2e4]">{chartData[hoveredWeek].borrowed} unit</strong></span>
                    <span>Kembali: <strong className="text-slate-300">{chartData[hoveredWeek].returned} unit</strong></span>
                  </div>
                </div>
              )}
            </div>

            {/* X-Axis Labels */}
            <div className="absolute bottom-3 left-6 right-6 flex justify-between text-[#757682] text-xs font-semibold">
              <span>Minggu 1</span>
              <span>Minggu 2</span>
              <span>Minggu 3</span>
              <span>Minggu 4</span>
            </div>
          </div>
        </div>

        {/* Quick Actions (Span 4) */}
        <div className="bg-white rounded-2xl border border-[#c5c5d3]/50 shadow-xs lg:col-span-4 flex flex-col">
          <div className="p-6 border-b border-[#c5c5d3]/40 bg-[#f8f9fb]">
            <h2 className="text-base font-bold text-[#191c1e]">Quick Actions</h2>
            <p className="text-xs text-[#444651] mt-0.5">Frequently used tools and helpers</p>
          </div>
          
          <div className="p-6 flex flex-col gap-4 flex-grow justify-center bg-[#f3f4f6]/30">
            
            {/* Add Asset trigger page view */}
            <button
              onClick={() => setActiveTab('add-item')}
              className="w-full bg-[#00236f] text-white rounded-xl py-4 px-6 font-semibold text-sm flex items-center justify-center gap-3 hover:bg-[#1e3a8a] hover:shadow-md transition-all duration-200 group border-none cursor-pointer"
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Tambah Barang Baru
            </button>

            {/* Scan Return action */}
            <button
              onClick={onInitiateReturnScan}
              className="w-full bg-[#006a61] text-white rounded-xl py-4 px-6 font-semibold text-sm flex items-center justify-center gap-3 hover:bg-[#006f66] hover:shadow-md transition-all duration-200 group border-none cursor-pointer"
            >
              <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Scan Pengembalian
            </button>

            <div className="mt-4 border-t border-[#c5c5d3]/30 pt-4 text-center">
              <button
                onClick={() => setActiveTab('inventory')}
                className="text-xs font-bold text-[#00236f] hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1 mx-auto"
              >
                Lihat daftar inventaris lengkap <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Section 3: Recent Activities */}
      <section className="bg-white rounded-2xl border border-[#c5c5d3]/50 shadow-xs overflow-hidden">
        
        <div className="p-6 border-b border-[#c5c5d3]/40 bg-[#f8f9fb] flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-[#191c1e]">Recent Activities</h2>
            <p className="text-xs text-[#444651] mt-0.5">Live feed of global asset movements</p>
          </div>
          <button
            onClick={() => setActiveTab('history')}
            className="text-[#00236f] font-bold text-xs hover:bg-[#edeef0] px-4 py-2 rounded-lg transition-colors border-none cursor-pointer bg-transparent"
          >
            View All
          </button>
        </div>

        <div className="flex flex-col">
          {activities.length === 0 ? (
            <div className="p-8 text-center text-[#757682] flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-[#c5c5d3]" />
              <p className="text-sm font-medium">Belum ada riwayat transaksi barang terbaru.</p>
            </div>
          ) : (
            activities.slice(0, 5).map((act, index) => {
              const isBorrow = act.action === 'borrow';
              return (
                <div
                  key={act.id || index}
                  className="flex items-start md:items-center gap-4 p-5 border-b border-[#edeef0] hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Action Icon Indicator */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                    isBorrow 
                      ? 'bg-red-50 text-red-700 border border-red-100' 
                      : 'bg-[#86f2e4]/30 text-[#006f66] border border-[#86f2e4]/50'
                  }`}>
                    {isBorrow ? (
                      <Inbox className="w-5 h-5 stroke-[2px]" />
                    ) : (
                      <CornerDownLeft className="w-5 h-5 stroke-[2px]" />
                    )}
                  </div>

                  {/* Informational prose */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#191c1e] leading-snug">
                      <span className="font-semibold text-slate-900">{act.userName}</span>{' '}
                      {act.department ? `(${act.department})` : ''}{' '}
                      {isBorrow ? 'meminjam' : 'mengembalikan'}{' '}
                      <span className="font-semibold text-[#00236f]">{act.assetName}</span>{' '}
                      <span className="text-[10px] bg-[#f3f4f6] px-2 py-0.5 rounded font-mono font-medium">{act.assetId}</span>
                    </p>
                    
                    <p className="text-[11px] text-[#757682] mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {act.timestamp}
                    </p>
                  </div>

                  {/* Operational Status badge */}
                  <div className="hidden md:block text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      isBorrow
                        ? 'bg-[#edeef0] text-[#444651]'
                        : 'bg-[#86f2e4] text-[#006f66]'
                    }`}>
                      {act.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </section>

    </div>
  );
}
