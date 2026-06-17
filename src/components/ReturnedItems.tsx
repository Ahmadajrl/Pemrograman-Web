/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Asset } from '../types';
import { CornerDownLeft, CheckCircle2, History, Info } from 'lucide-react';

interface ReturnedItemsProps {
  assets: Asset[];
}

export default function ReturnedItems({ assets }: ReturnedItemsProps) {
  // Filters out assets that are physically in-stock (available / on-shelf) and have a clean history
  const onShelfAssets = assets.filter(a => a.status === 'Tersedia');

  return (
    <div className="bg-white rounded-2xl border border-[#c5c5d3]/40 p-6 shadow-2xs animate-fade-in relative z-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#edeef0] pb-5 mb-5 gap-3">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CornerDownLeft className="w-5 h-5 text-[#006a61]" />
            Aset Terverifikasi (On-Shelf)
          </h2>
          <p className="text-xs text-[#757682] mt-0.5">
            Daftar asset perusahaan yang telah dikembalikan, divalidasi, dan siap untuk dipinjam kembali.
          </p>
        </div>
        <span className="text-xs bg-emerald-50 text-[#006f66] font-bold px-3 py-1 rounded-full border border-emerald-200">
          Tersedia: {onShelfAssets.length} unit
        </span>
      </div>

      {onShelfAssets.length === 0 ? (
        <div className="text-center py-12 text-[#757682] flex flex-col items-center gap-2">
          <Info className="w-10 h-10 text-[#0d9488]/70" />
          <h3 className="font-bold text-[#191c1e] text-base">Tidak Ada Aset On-Shelf</h3>
          <p className="text-sm">Semua aset perusahaan sedang dipinjam atau dalam proses pemeliharaan saat ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {onShelfAssets.map((asset) => (
            <div
              key={asset.id}
              className="border border-[#c5c5d3]/40 rounded-xl p-4 hover:shadow-2xs transition-shadow flex gap-4 bg-[#f8f9fb]/50"
            >
              <img
                src={asset.imageUrl}
                alt={asset.name}
                className="w-16 h-16 rounded-lg object-cover border border-[#c5c5d3]/40 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-bold text-[#191c1e] text-sm truncate uppercase tracking-tight" title={asset.name}>
                    {asset.name}
                  </h4>
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Ready
                  </span>
                </div>
                
                <p className="text-xs text-[#757682] mt-0.5 font-mono">ID: {asset.id} • Brand: {asset.brand}</p>
                <p className="text-[11px] text-[#444651] mt-2 line-clamp-1">{asset.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
