/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User } from '../types';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Boxes, 
  ExternalLink, 
  CornerDownLeft, 
  History, 
  HelpCircle, 
  LogOut,
  Building2
} from 'lucide-react';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({
  currentUser,
  activeTab,
  setActiveTab,
  onLogout,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const isKaryawan = currentUser.role === 'karyawan';

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    // Only admins can see Add Item, but keep it in navigation or let both see but handle permissions gracefully
    ...(!isKaryawan ? [{ id: 'add-item', label: 'Add Item', icon: PlusCircle }] : []),
    { id: 'inventory', label: 'Inventory List', icon: Boxes },
    { id: 'borrowed', label: 'Borrowed Assets', icon: ExternalLink },
    { id: 'returned', label: 'Returned Items', icon: CornerDownLeft },
    { id: 'history', label: 'Activity History', icon: History },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false); // Auto close sidebar on mobile
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 bg-[#f3f4f6] text-[#00236f] w-64 border-r border-[#c5c5d3] p-6 flex flex-col gap-6 z-50 transition-all duration-300 lg:sticky lg:h-screen lg:flex shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Branding Header */}
        <div className="px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00236f] text-white flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline-md font-black text-[#00236f] leading-none text-xl">AssetPro</h1>
            <span className="text-[10px] uppercase tracking-wider text-[#444651]">Enterprise Edition</span>
          </div>
        </div>

        {/* User Status Summary Chip (Small context display) */}
        <div className="mx-1 p-3 bg-white border border-[#c5c5d3]/50 rounded-lg flex items-center gap-3 shadow-xs">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border border-[#c5c5d3]"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#191c1e] truncate">{currentUser.name}</p>
            <p className="text-[10px] text-[#444651] capitalize">{currentUser.role} • {currentUser.department}</p>
          </div>
        </div>

        {/* Navigation Selector Tabs */}
        <nav className="flex-grow flex flex-col gap-1.5 overflow-y-auto pt-2">
          {mainNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 transform active:scale-98 cursor-pointer text-left border-none w-full ${
                  isActive
                    ? 'bg-[#86f2e4] text-[#006f66] shadow-xs'
                    : 'text-[#444651] hover:text-[#00236f] hover:bg-[#edeef0]'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="mt-auto flex flex-col gap-1.5 pt-4 border-t border-[#c5c5d3]/40">
          <button
            onClick={() => handleTabClick('help')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 text-left border-none w-full cursor-pointer ${
              activeTab === 'help'
                ? 'bg-[#86f2e4] text-[#006f66]'
                : 'text-[#444651] hover:text-[#00236f] hover:bg-[#edeef0]'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help Center</span>
          </button>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-150 border-none text-left w-full cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
