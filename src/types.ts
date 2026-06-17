/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'karyawan' | 'admin';

export interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  department?: string;
}

export interface Asset {
  id: string; // e.g., "BRG-0001"
  name: string;
  brand: string;
  stock: number;
  description: string;
  imageUrl: string;
  status: 'Tersedia' | 'Dipinjam' | 'Maintenance';
  borrower?: string;
  department?: string;
  dueDate?: string;
  addedDate: string;
  category: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  department?: string;
  action: 'borrow' | 'return';
  assetName: string;
  assetId: string;
  timestamp: string; // short readable string e.g., "10 minutes ago"
  status: 'Checked Out' | 'Verified';
}
