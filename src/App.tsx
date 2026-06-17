/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Asset, Activity } from './types';
import { INITIAL_ASSETS, INITIAL_ACTIVITIES } from './data';

import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import AddItemForm from './components/AddItemForm';
import InventoryList from './components/InventoryList';
import BorrowedAssets from './components/BorrowedAssets';
import ReturnedItems from './components/ReturnedItems';
import ActivityHistory from './components/ActivityHistory';
import HelpCenter from './components/HelpCenter';

export default function App() {
  // Session variables
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = sessionStorage.getItem('assetpro_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Core Asset database persistent state
  const [assets, setAssets] = useState<Asset[]>(() => {
    const local = localStorage.getItem('assetpro_assets');
    return local ? JSON.parse(local) : INITIAL_ASSETS;
  });

  // Action trail audit trail logs state
  const [activities, setActivities] = useState<Activity[]>(() => {
    const local = localStorage.getItem('assetpro_activities');
    return local ? JSON.parse(local) : INITIAL_ACTIVITIES;
  });

  // Sync state modifications to localStorage
  useEffect(() => {
    localStorage.setItem('assetpro_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('assetpro_activities', JSON.stringify(activities));
  }, [activities]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('assetpro_session', JSON.stringify(user));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('assetpro_session');
    setActiveTab('dashboard');
    setSearchQuery('');
  };

  // Operation 1: Registrasi Barang Baru (Admin Only)
  const handleAddAsset = (newAsset: Omit<Asset, 'id' | 'addedDate'>) => {
    setAssets((prev) => {
      // Find maximum numeric code
      const ids = prev.map(a => {
        const parts = a.id.split('-');
        return parts.length === 2 ? parseInt(parts[1], 10) : 0;
      });
      const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      const nextNum = maxId + 1;
      const formattedId = `BRG-${nextNum.toString().padStart(4, '0')}`;

      const createdItem: Asset = {
        ...newAsset,
        id: formattedId,
        addedDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        })
      };

      return [createdItem, ...prev];
    });
  };

  // Operation 2: Peminjaman Barang (Borrowing)
  const handleBorrowAsset = (assetId: string) => {
    if (!currentUser) return;

    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id === assetId) {
          return {
            ...asset,
            status: 'Dipinjam',
            borrower: currentUser.name,
            department: currentUser.department || 'Operations',
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days
          };
        }
        return asset;
      })
    );

    // Create activity record
    const targetAsset = assets.find((a) => a.id === assetId);
    if (targetAsset) {
      const newAct: Activity = {
        id: `act-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        department: currentUser.department || 'Operations',
        action: 'borrow',
        assetName: targetAsset.name,
        assetId: targetAsset.id,
        timestamp: 'Just now',
        status: 'Checked Out'
      };
      setActivities((prev) => [newAct, ...prev]);
    }
  };

  // Operation 3: Pengembalian Barang (Returning)
  const handleReturnAsset = (assetId: string) => {
    if (!currentUser) return;

    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id === assetId) {
          const { borrower, department, dueDate, ...rest } = asset;
          return {
            ...rest,
            status: 'Tersedia'
          };
        }
        return asset;
      })
    );

    // Create activity record
    const targetAsset = assets.find((a) => a.id === assetId);
    if (targetAsset) {
      const newAct: Activity = {
        id: `act-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        department: currentUser.department || 'Operations',
        action: 'return',
        assetName: targetAsset.name,
        assetId: targetAsset.id,
        timestamp: 'Just now',
        status: 'Verified'
      };
      setActivities((prev) => [newAct, ...prev]);
    }
  };

  // Optional Admin Operation: Hapus Aset dari database
  const handleDeleteAsset = (assetId: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== assetId));
  };

  // If user session is empty, redirect to LoginScreen immediately
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Active view router mapping
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return currentUser.role === 'admin' ? (
          <AdminDashboard
            assets={assets}
            activities={activities}
            setActiveTab={setActiveTab}
            onInitiateReturnScan={() => {
              alert("Scan Peminjaman / Pengembalian: Masuk sebagai Karyawan untuk menguji barcode scanner simulasi, atau silakan lakukan di tabel Inventory List secara instan!");
              setActiveTab('inventory');
            }}
          />
        ) : (
          <EmployeeDashboard
            currentUser={currentUser}
            assets={assets}
            setActiveTab={setActiveTab}
            onBorrowAsset={handleBorrowAsset}
          />
        );
      
      case 'add-item':
        return currentUser.role === 'admin' ? (
          <AddItemForm
            assets={assets}
            onAddAsset={handleAddAsset}
            setActiveTab={setActiveTab}
          />
        ) : (
          <div className="bg-white rounded-xl p-8 border text-center shadow-sm">
            Halaman ini hanya dapat diakses oleh Admin.
          </div>
        );

      case 'inventory':
        return (
          <InventoryList
            currentUser={currentUser}
            assets={assets}
            setActiveTab={setActiveTab}
            onBorrowAsset={handleBorrowAsset}
            onReturnAsset={handleReturnAsset}
            onDeleteAsset={handleDeleteAsset}
            searchQuery={searchQuery}
          />
        );

      case 'borrowed':
        return (
          <BorrowedAssets
            currentUser={currentUser}
            assets={assets}
            onReturnAsset={handleReturnAsset}
          />
        );

      case 'returned':
        return <ReturnedItems assets={assets} />;

      case 'history':
        return <ActivityHistory activities={activities} />;

      case 'help':
        return <HelpCenter />;

      default:
        return (
          <div className="text-center py-10">
            Halaman sedang dalam pengembangan.
          </div>
        );
    }
  };

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex relative overflow-x-hidden font-sans">
      
      {/* Navigation sidebar */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Container workspace */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300">
        
        {/* Global Toolbar Header bar */}
        <Header
          currentUser={currentUser}
          activeTab={activeTab}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Dynamic content canvas */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>

      </div>

    </div>
  );
}
