/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Asset, User } from '../types';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  QrCode, 
  Info, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ArrowRightLeft,
  User as UserIcon,
  Trash2
} from 'lucide-react';

interface InventoryListProps {
  currentUser: User;
  assets: Asset[];
  setActiveTab: (tab: string) => void;
  onBorrowAsset: (assetId: string) => void;
  onReturnAsset: (assetId: string) => void;
  onDeleteAsset?: (assetId: string) => void; // Optional admin tool
  searchQuery: string;
}

export default function InventoryList({
  currentUser,
  assets,
  setActiveTab,
  onBorrowAsset,
  onReturnAsset,
  onDeleteAsset,
  searchQuery: externalSearchQuery, // fallback from global header
}: InventoryListProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeBarcodeCode, setActiveBarcodeCode] = useState<string | null>(null);

  const isAdmin = currentUser.role === 'admin';

  // Consolidate searchQuery from global header or local field
  const activeQuery = localSearchQuery || externalSearchQuery;

  // Filter state
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(activeQuery.toLowerCase()) ||
      asset.brand.toLowerCase().includes(activeQuery.toLowerCase());

    const matchesCategory = selectedCategory === '' || asset.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Status normalization
    const matchesStatus =
      selectedStatus === '' || asset.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDownloadBarcode = (id: string, name: string) => {
    setActiveBarcodeCode(id);
    
    const printWindow = window.open('', '', 'width=500,height=500');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print QR Code - ${id}</title>
            <style>
              @page {
                margin: 0.5cm;
              }
              body {
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: white;
              }
              .barcode-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 1cm;
              }
              /* Provide a print button for manual trigger if needed, though we auto-print */
              .btn-print {
                margin-top: 20px;
                padding: 10px 20px;
                background: #00236f;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              }
              @media print {
                .barcode-container {
                  width: 3cm !important;
                  height: 3cm !important;
                  margin: 0 !important;
                }
                .barcode-container img,
                .barcode-container canvas {
                  width: 3cm !important;
                  height: 3cm !important;
                  object-fit: contain;
                }
                .btn-print,
                button {
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="barcode-container" id="qrcode"></div>
            <button class="btn-print" onclick="window.print()">Print Barcode</button>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
            <script>
              window.onload = function() {
                // Render QR code
                new QRCode(document.getElementById("qrcode"), {
                  text: "${id}",
                  width: 512,
                  height: 512,
                  colorDark : "#000000",
                  colorLight : "#ffffff",
                  correctLevel : QRCode.CorrectLevel.H
                });
                
                // Wait slightly for render before print
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }

    setTimeout(() => {
      setActiveBarcodeCode(null);
    }, 1000);
  };

  const handleQuickAction = (asset: Asset) => {
    if (asset.status === 'Tersedia') {
      const confirmBorrow = window.confirm(`Apakah Anda yakin ingin meminjam "${asset.name}"?`);
      if (confirmBorrow) {
        onBorrowAsset(asset.id);
        alert(`Sukses meminjam "${asset.name}". Batas kembali Anda: 14 hari dari sekarang.`);
      }
    } else if (asset.status === 'Dipinjam') {
      const confirmReturn = window.confirm(`Apakah Anda yakin ingin mengembalikan "${asset.name}"?`);
      if (confirmReturn) {
        onReturnAsset(asset.id);
        alert(`Sukses mengembalikan "${asset.name}". Terima kasih.`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-16 text-[#191c1e] animate-fade-in relative z-10">
      
      {/* Header & Primary Action panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Inventory List</h2>
          <p className="text-sm text-[#444651] mt-0.5">Kelola dan pantau seluruh daftar aset inventaris perusahaan.</p>
        </div>
        
        {/* Only admins can see button to register new entries */}
        {isAdmin && (
          <button
            onClick={() => setActiveTab('add-item')}
            className="bg-[#00236f] hover:bg-[#1e3a8a] text-white px-6 py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 border-none cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            Tambah Barang Baru
          </button>
        )}
      </div>

      {/* Local Filter Controls panel */}
      <div className="bg-white border border-[#c5c5d3]/40 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row gap-4 items-center">
        
        {/* Local search input option */}
        <div className="flex-1 w-full relative">
          <Search className="w-5 h-5 text-[#757682] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter by Name, Brand, or ID..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full bg-[#f3f4f6] border border-[#c5c5d3]/30 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
          />
        </div>

        {/* Dropdowns box */}
        <div className="w-full md:w-auto flex gap-3">
          
          {/* Category Dropdown */}
          <div className="relative flex-1 md:w-44">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-[#f3f4f6]/80 border border-[#c5c5d3]/30 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] cursor-pointer text-[#191c1e] font-semibold"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="peripherals">Peripherals</option>
              <option value="operations">Operations</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#757682] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative flex-1 md:w-44">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none bg-[#f3f4f6]/80 border border-[#c5c5d3]/30 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] cursor-pointer text-[#191c1e] font-semibold"
            >
              <option value="">All Statuses</option>
              <option value="tersedia">Tersedia</option>
              <option value="dipinjam">Dipinjam</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#757682] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Grid rendering list */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#c5c5d3]/30 p-12 text-center text-[#757682] flex flex-col items-center gap-3">
          <Info className="w-10 h-10 text-[#0d9488]/70" />
          <h3 className="text-base font-bold text-[#191c1e]">Aset Tidak Ditemukan</h3>
          <p className="text-sm">Tidak ada aset dalam katalis yang cocok dengan kata kunci filter pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => {
            const isAvailable = asset.status === 'Tersedia';
            const isBorrowed = asset.status === 'Dipinjam';
            const isDownloading = activeBarcodeCode === asset.id;

            return (
              <div
                key={asset.id}
                className="bg-white rounded-2xl border border-[#c5c5d3]/30 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col h-full relative"
              >
                
                {/* Visual Cover Photo */}
                <div className="h-44 bg-slate-50 overflow-hidden relative">
                  <img
                    alt={asset.name}
                    src={asset.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Absolute Status Badge overlay */}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm backdrop-blur-md bg-opacity-90 ${
                    isAvailable
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-600' : 'bg-red-600 animate-pulse'}`} />
                    {asset.status}
                  </div>
                </div>

                {/* Content details inside card */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  
                  <div>
                    <h3 className="font-bold text-[#191c1e] text-base leading-tight group-hover:text-[#00236f] transition-colors line-clamp-1" title={asset.name}>
                      {asset.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="font-mono text-xs font-bold text-[#444651] bg-[#edeef0] px-2 py-0.5 rounded shadow-2xs">
                        {asset.id}
                      </span>
                      <span className="text-xs font-semibold text-[#757682]">• {asset.brand}</span>
                    </div>
                  </div>

                  {/* Active borrower slate if borrowed */}
                  {isBorrowed && asset.borrower && (
                    <div className="bg-[#edeef0]/60 p-2.5 rounded-lg flex items-center gap-2 border border-[#c5c5d3]/20 mt-1">
                      <UserIcon className="w-3.5 h-3.5 text-[#00236f] shrink-0" />
                      <div className="min-w-0 text-xs">
                        <span className="font-semibold text-[#444651]">User:</span>{' '}
                        <span className="font-bold text-[#191c1e] truncate" title={asset.borrower}>{asset.borrower}</span>
                      </div>
                    </div>
                  )}

                  {/* Footer control triggers */}
                  <div className="mt-auto pt-3 border-t border-[#edeef0] flex items-center justify-between">
                    
                    <span className="text-[10px] text-[#757682] font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {isBorrowed && asset.dueDate ? 'Due: Overdue' : `Reg: ${asset.addedDate}`}
                    </span>

                    <div className="flex gap-1.5 items-center">
                      
                      {/* Shortcut buttons to simulate scan directly on list */}
                      <button
                        onClick={() => handleQuickAction(asset)}
                        title={isAvailable ? 'Borrow Asset' : 'Return Asset'}
                        className={`p-2 rounded-full border border-solid transition-all flex items-center justify-center cursor-pointer ${
                          isAvailable 
                            ? 'bg-[#86f2e4]/10 border-[#86f2e4] text-[#006f66] hover:bg-[#86f2e4]' 
                            : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                        }`}
                      >
                        <ArrowRightLeft className="w-4 h-4 stroke-[2px]" />
                      </button>

                      {/* Barcode action generator */}
                      <button
                        onClick={() => handleDownloadBarcode(asset.id, asset.name)}
                        title="Download Barcode"
                        className={`p-2 rounded-full border border-solid hover:bg-slate-100 text-[#00236f] transition-all flex items-center justify-center cursor-pointer ${
                          isDownloading ? 'bg-[#86f2e4]/20 border-[#006a61]' : 'bg-white border-[#c5c5d3]'
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                      </button>

                      {/* Admin delete asset trigger */}
                      {isAdmin && onDeleteAsset && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus "${asset.name}" dari sistem secara permanen?`)) {
                              onDeleteAsset(asset.id);
                            }
                          }}
                          title="Hapus Aset"
                          className="p-2 rounded-full border border-[#c5c5d3] hover:border-red-600 hover:bg-red-50 hover:text-[#ba1a1a] text-[#757682] transition-all flex items-center justify-center cursor-pointer bg-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Bottom spacer on mobile */}
      <div className="h-10 lg:hidden" />

    </div>
  );
}
