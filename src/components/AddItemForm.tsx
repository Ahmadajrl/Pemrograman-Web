/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Asset } from '../types';
import { Info, Image as ImageIcon, Save, X, Sparkles, Barcode } from 'lucide-react';

interface AddItemFormProps {
  assets: Asset[];
  onAddAsset: (newAsset: Omit<Asset, 'id' | 'addedDate'>) => void;
  setActiveTab: (tab: string) => void;
}

export default function AddItemForm({
  assets,
  onAddAsset,
  setActiveTab,
}: AddItemFormProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Electronics');

  // Interactive preset selector for professional inventory illustrations
  const [imagePreset, setImagePreset] = useState<string>('laptop');

  const imagePresets: Record<string, { label: string; url: string }> = {
    laptop: {
      label: 'Sleek Laptop',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP24xpwMFTAYKibM7ROdx1zlF7GGj9mrF2ieqHWhpuKFIh6rlAuCnAWpcRuiDKpteUWnOznd4zs3vs9G5nddHGOtelCDu3QKUYzR6qQ4hdanv9XJuGTlSxa0_w4shyGlqMwMBjfXaJi0qrqgR5LJCM7BFyOJT8yuFlLoTXvy1HEnQo4o8qPOo02FasmxEtLX32uPmvMIobFpDqSRTAUamPfxgJrmS7GkvYcwa8SttUUIqgLU7FD3LNry09XE_kheeMMQX6IWM61-df'
    },
    monitor: {
      label: '4K Workspace Display',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGoJlxIfHqq0IJQYZmY4szG4-DtjiKOZptk-JkTFzwfFM2QqUorB4UHQdmYL_pXlVcPxrPTxvqo7ktZYASnJu3BPPD98MN2GH8BSH9xcMFxvEni3B4ZrExRxgrFFwUhWRKOAKqX4-8hA4TvlNvPVX9w5RNUSFV_CmvWqH1MfrKWIIXvqb3MJNUovJ8nRbEpaon7Lhv006l1AcCUWyIdveIoUEvM0prgbiQXFSjD5I4ko_-M65H67UtkYScojNqXc3KebHKV-xA8_K0'
    },
    chair: {
      label: 'Ergonomic Support Office Chair',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWWtyG6cRxs9NcaE_Jj9wx8Z5nuZBWExmWp0VhhvMC1tgFkLyGYIwpcaV4dGm8KZ_QEi3DwhSX6FkFZwYwNM3-INBwUnlVjYC49sF8kM6oF85HG4oeVVk87uJE5ww86dBzfRjxJxD6Mtb-Lq9qQ_0fhgXkCFIGqnCKO8DSjfG0GHyXN2y7X85fbc0iUlY8s82rd9uFcTi3tzi_C6Q4waW081W5wxLRCQEWWL6ZjaWHH1HlJ_wrhZpem7iQBz3eYV63ZAkNec4XrY_f'
    },
    misc: {
      label: 'Other Accessories',
      url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400'
    }
  };

  // Auto-generate next asset code ID (e.g. BRG-0005)
  const getNextId = () => {
    // Collect serial IDs and derive the maximum numeric part
    const ids = assets.map(a => {
      const parts = a.id.split('-');
      return parts.length === 2 ? parseInt(parts[1], 10) : 0;
    });
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const nextNum = maxId + 1;
    return `BRG-${nextNum.toString().padStart(4, '0')}`;
  };

  const nextAssetId = getNextId();

  const handlePresetSelect = (presetKey: string) => {
    setImagePreset(presetKey);
    setImageUrl(imagePresets[presetKey].url);
  };

  React.useEffect(() => {
    // Pre-populate with laptop preset initial url
    setImageUrl(imagePresets.laptop.url);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddAsset({
      name: name.trim(),
      brand: brand.trim() || 'Generic',
      stock: Math.max(1, stock),
      description: description.trim() || 'No additional details provided.',
      imageUrl: imageUrl.trim() || imagePresets.laptop.url,
      status: 'Tersedia',
      category: category
    });

    // Notify user and switch tab
    alert(`Aset baru (${name}) telah sukses didaftarkan dengan ID ${nextAssetId}.`);
    setActiveTab('inventory');
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 animate-fade-in text-[#191c1e]">
      
      {/* Header Area */}
      <div className="mb-8 p-1">
        <h1 className="text-3xl font-extra-bold tracking-tight">Add New Item</h1>
        <p className="text-sm font-medium text-[#444651] mt-1.5">
          Register a new physical asset into the corporate inventory tracking system.
        </p>
      </div>

      {/* Form Bento Layout (Grid Style Panels) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Core Fields Form Inputs */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Main Details card */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#c5c5d3]/50 p-6 flex flex-col gap-5">
            <h2 className="text-base font-bold text-[#191c1e] flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-[#006a61]" />
              Core Details
            </h2>

            {/* Item Title Input */}
            <div>
              <label className="block text-xs font-semibold text-[#444651] mb-2">
                Nama Barang <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g., ThinkPad T14 Gen 3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#f8f9fb] border border-[#c5c5d3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition-all"
              />
            </div>

            {/* Category Select Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-[#444651] mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f8f9fb] border border-[#c5c5d3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition-all cursor-pointer"
              >
                <option value="Electronics">Electronics (Laptops, Monitors, Cameras)</option>
                <option value="Furniture">Furniture (Ergonomic Chairs, Desks)</option>
                <option value="Peripherals">Peripherals (Cables, Adapters, Keyboards)</option>
                <option value="Operations">Operations (Warehouse Tools, Gear)</option>
              </select>
            </div>

            {/* Brand and Stock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#444651] mb-2">Merk / Brand</label>
                <input
                  type="text"
                  placeholder="e.g., Lenovo"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-[#f8f9fb] border border-[#c5c5d3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444651] mb-2">
                  Jumlah Stok <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value, 10))}
                  className="w-full bg-[#f8f9fb] border border-[#c5c5d3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition-all"
                />
              </div>
            </div>

            {/* Item Description Textarea */}
            <div>
              <label className="block text-xs font-semibold text-[#444651] mb-2">Description</label>
              <textarea
                rows={3}
                placeholder="Additional details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#f8f9fb] border border-[#c5c5d3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition-all resize-none"
              />
            </div>

          </div>

          {/* Picture Selector Panel */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#c5c5d3]/50 p-6 flex flex-col gap-4">
            <h2 className="text-base font-bold text-[#191c1e] flex items-center gap-2 mb-1">
              <ImageIcon className="w-5 h-5 text-[#006a61]" />
              Foto Barang
            </h2>

            {/* Interactive preset illustrations selector */}
            <div className="flex flex-wrap gap-2 mb-1">
              {Object.keys(imagePresets).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => handlePresetSelect(key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    imagePreset === key
                      ? 'bg-[#86f2e4] text-[#006f66] border-[#006a61]'
                      : 'bg-[#f3f4f6] text-[#444651] border-[#c5c5d3] hover:bg-[#edeef0]'
                  }`}
                >
                  {imagePresets[key].label}
                </button>
              ))}
            </div>

            {/* Custom Direct Image URL Option */}
            <div className="mt-1">
              <label className="block text-[10px] font-bold text-[#757682] uppercase mb-1.5">Or direct image attachment URL</label>
              <input
                type="url"
                placeholder="https://example.com/asset-picture.jpg"
                value={imageUrl}
                onChange={(e) => {
                  setImagePreset('');
                  setImageUrl(e.target.value);
                }}
                className="w-full bg-[#f8f9fb] border border-[#c5c5d3] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#0D9488] transition-all font-mono"
              />
            </div>

            {/* Standard file drag support simulated view */}
            <div className="border-2 border-dashed border-[#c5c5d3] hover:border-[#0D9488] bg-[#f8f9fb] rounded-xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer group mt-1">
              <div className="w-12 h-12 rounded-full bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-6 h-6 stroke-[2px]" />
              </div>
              <p className="text-xs font-semibold text-[#191c1e] mb-1">
                Drag and drop image here, or <span className="text-[#0D9488] font-bold">browse</span>
              </p>
              <p className="text-[10px] text-[#757682]">Supports JPG, PNG, WEBP (Max 5MB)</p>
            </div>
          </div>

        </div>

        {/* Right Column: Serial preview and Submit trigger cards */}
        <div className="flex flex-col gap-6 h-full">
          
          {/* Dynamic Serial ID Previews */}
          <div className="bg-[#edeef0]/50 rounded-2xl border border-[#c5c5d3]/50 p-6 relative overflow-hidden flex-grow flex flex-col min-h-[220px]">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#86f2e4]/15 rounded-bl-fullpointer-events-none" />
            
            <h3 className="text-[10px] font-bold text-[#757682] uppercase tracking-wider mb-1.5">System Generated ID</h3>
            
            <div className="text-2xl font-bold text-[#00236f] mb-6 flex items-center gap-2">
              {nextAssetId}
              <span className="bg-[#86f2e4] text-[#006f66] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs border border-[#006a61]/20">
                <Sparkles className="w-3.5 h-3.5" /> Auto
              </span>
            </div>

            {/* Visual Barcode Rendering placeholder */}
            <div className="bg-white border border-[#c5c5d3] rounded-lg p-5 flex flex-col items-center justify-center mt-auto shadow-sm">
              <div className="font-mono text-[#191c1e] text-xs font-bold tracking-widest leading-none mb-3 text-center">
                <Barcode className="w-36 h-10 stroke-[1.5px] text-zinc-800" />
              </div>
              <div className="text-[10px] font-mono text-[#757682] tracking-widest">{nextAssetId}</div>
            </div>
          </div>

          {/* Form Action Controls panels */}
          <div className="bg-white rounded-2xl border border-[#c5c5d3]/50 p-6 shadow-xs mt-auto">
            <div className="flex flex-col gap-3">
              
              <button
                type="submit"
                className="w-full bg-[#1e3a8a] hover:bg-[#00236f] text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs hover:shadow border-none cursor-pointer text-sm"
              >
                <Save className="w-5 h-5" />
                Save Asset Entry
              </button>
              
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="w-full bg-white border-2 border-[#c5c5d3] text-[#444651] hover:border-[#ba1a1a] hover:text-[#ba1a1a] font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
