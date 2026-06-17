/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User } from '../types';
import { Search, Bell, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  activeTab: string;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  toggleSidebar: () => void;
}

export default function Header({
  currentUser,
  activeTab,
  onSearchChange,
  searchQuery,
  toggleSidebar,
}: HeaderProps) {
  const [showNotificationAlert, setShowNotificationAlert] = useState(true);

  // Derive page heading based on selected state
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return currentUser.role === 'admin' ? 'Dashboard Overview' : 'Employee Dashboard';
      case 'add-item':
        return 'New Asset Entry';
      case 'inventory':
        return 'Inventory List';
      case 'borrowed':
        return 'Borrowed Assets';
      case 'returned':
        return 'Returned Items';
      case 'history':
        return 'Activity History';
      case 'help':
        return 'Help Center';
      default:
        return 'AssetPro Corporate';
    }
  };

  const getSearchPlaceholder = () => {
    if (activeTab === 'inventory') return 'Search inventory globally...';
    return 'Search assets, SKUs, or users...';
  };

  return (
    <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-[#00236f] top-0 z-40 border-b border-[#c5c5d3] shadow-xs flex justify-between items-center w-full px-6 md:px-8 h-16 sticky">
      
      {/* Left: Mobile menu toggle button & View Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Navigation Side Draw"
          className="lg:hidden p-2 -ml-2 text-[#444651] hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center cursor-pointer border-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Dynamic Page Header Link */}
        <div className="font-sans font-bold text-[#00236f] tracking-tight text-lg md:text-xl">
          {getPageTitle()}
        </div>
      </div>

      {/* Middle: Integrated search input (hidden if current tab doesn't make sense or on mobile) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#757682] group-focus-within:text-[#00236f] transition-all">
            <Search className="w-4 h-4 pointer-events-none" />
          </span>
          <input
            className="w-full bg-[#f3f4f6] border border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm text-[#191c1e] placeholder-[#757682]/70 focus:border-[#00236f] focus:bg-white focus:ring-2 focus:ring-[#00236f]/10 focus:outline-none transition-all shadow-inner"
            placeholder={getSearchPlaceholder()}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
          />
        </div>
      </div>

      {/* Right: Notification Alerts, Action settings & Active Profile Avatar */}
      <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-0">
        
        {/* Dynamic Alerts Indicator bell */}
        <button
          aria-label="View Notification Feeds"
          onClick={() => {
            setShowNotificationAlert(false);
            alert("Notifikasi: Sistem berjalan normal. 1 barang (ThinkPad T14 Gen 3) telah melewati batas waktu pengembalian.");
          }}
          className="p-2.5 rounded-full text-[#444651] hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors relative flex items-center justify-center cursor-pointer border-none"
        >
          <Bell className="w-5 h-5" />
          {showNotificationAlert && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>

        {/* Settings control panel */}
        <button
          aria-label="Applet Configuration Settings"
          onClick={() => alert("Pengaturan: Anda dapat mengubah konfigurasi inventarisasi dan integrasi scanner di sini.")}
          className="p-2.5 rounded-full text-[#444651] hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer border-none"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-[#c5c5d3] mx-1 hidden sm:block" />

        {/* User context action panel */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-[#191c1e] leading-tight">{currentUser.name}</span>
            <span className="text-[10px] text-[#757682] uppercase tracking-wider">{currentUser.role}</span>
          </div>
          <button className="flex items-center gap-1.5 focus:outline-none cursor-pointer border-none bg-transparent">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#c5c5d3] ring-2 ring-transparent hover:ring-[#86f2e4] transition-all duration-200">
              <img
                alt="User Profile Avatar"
                className="w-full h-full object-cover"
                src={currentUser.avatarUrl}
              />
            </div>
          </button>
        </div>

      </div>
    </header>
  );
}
