/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Asset, User } from '../types';
import { ExternalLink, Calendar, User as UserIcon, CornerDownLeft, Info } from 'lucide-react';

interface BorrowedAssetsProps {
  currentUser: User;
  assets: Asset[];
  onReturnAsset: (id: string) => void;
}

export default function BorrowedAssets({
  currentUser,
  assets,
  onReturnAsset,
}: BorrowedAssetsProps) {
  const isKaryawan = currentUser.role === 'karyawan';

  // Filters borrowed elements. If karyawan view is active, restrict strictly to their own borrows as per standard rules.
  const borrowedAssets = assets.filter((asset) => {
    if (asset.status !== 'Dipinjam') return false;
    if (isKaryawan) {
      return asset.borrower?.toLowerCase() === currentUser.name.toLowerCase();
    }
    return true;
  });

  const handleReturnAction = (asset: Asset) => {
    const confirmReturn = window.confirm(`Apakah Anda yakin ingin mengembalikan "${asset.name}"?`);
    if (confirmReturn) {
      onReturnAsset(asset.id);
      alert(`Sukses mengembalikan "${asset.name}". Status diubah menjadi Tersedia.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#c5c5d3]/40 p-6 shadow-2xs animate-fade-in relative z-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#edeef0] pb-5 mb-5 gap-3">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-[#006a61]" />
            Daftar Aset Sedang Dipinjam
          </h2>
          <p className="text-xs text-[#757682] mt-0.5">
            {isKaryawan 
              ? 'Daftar seluruh barang inventaris perusahaan yang sedang Anda bawa.'
              : 'Daftar semua barang inventaris perusahaan yang sedang digunakan oleh karyawan.'}
          </p>
        </div>
        <span className="text-xs bg-[#edeef0] text-[#00236f] font-bold px-3 py-1 rounded-full border">
          Total: {borrowedAssets.length} unit
        </span>
      </div>

      {borrowedAssets.length === 0 ? (
        <div className="text-center py-12 text-[#757682] flex flex-col items-center gap-2">
          <Info className="w-10 h-10 text-[#0d9488]/70" />
          <h3 className="font-bold text-[#191c1e] text-base">Tidak Ada Barang Dipinjam</h3>
          <p className="text-sm">Saat ini tidak ada barang inventaris dalam status peminjaman aktif Anda.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-[#c5c5d3]/50 text-[#757682] font-semibold text-xs uppercase bg-[#f8f9fb]">
                <th className="py-3 px-4">Barang</th>
                <th className="py-3 px-4">ID Aset</th>
                <th className="py-3 px-4">Peminjam</th>
                <th className="py-3 px-4">Batas Jatuh Tempo</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {borrowedAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-[#edeef0] hover:bg-slate-50/50 transition-colors">
                  
                  {/* Photo & Title columns */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img
                      src={asset.imageUrl}
                      alt={asset.name}
                      className="w-11 h-11 rounded-lg object-cover border border-[#c5c5d3]/40"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-[#191c1e] leading-snug">{asset.name}</p>
                      <p className="text-xs text-[#757682] capitalize">{asset.category} • {asset.brand}</p>
                    </div>
                  </td>

                  {/* ID Serial column */}
                  <td className="py-4 px-4 font-mono font-bold text-[#00236f] text-xs">
                    {asset.id}
                  </td>

                  {/* Borrower detail */}
                  <td className="py-4 px-4 text-[#191c1e]">
                    <div className="flex items-center gap-1.5">
                      <UserIcon className="w-4 h-4 text-[#757682]" />
                      <div className="text-xs">
                        <p className="font-bold leading-none">{asset.borrower || 'Karyawan'}</p>
                        <p className="text-[10px] text-[#757682] mt-0.5">{asset.department || 'Operasional'}</p>
                      </div>
                    </div>
                  </td>

                  {/* Due Date details */}
                  <td className="py-4 px-4 text-[#ba1a1a] font-semibold text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 stroke-[2px]" />
                      <span>{asset.dueDate ? 'Jatuh Tempo (Terlambat)' : 'Segera Kembali'}</span>
                    </div>
                  </td>

                  {/* Actions column */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleReturnAction(asset)}
                      className="inline-flex items-center gap-1.5 bg-[#86f2e4] hover:bg-[#006a61] text-[#006f66] hover:text-white font-bold py-2 px-3.5 rounded-lg text-xs border border-transparent shadow-2xs cursor-pointer transition-all active:scale-95"
                    >
                      <CornerDownLeft className="w-3.5 h-3.5 stroke-[2px]" />
                      Kembalikan
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
