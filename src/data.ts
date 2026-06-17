/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Asset, Activity, User } from './types';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'BRG-0001',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    stock: 1,
    description: 'Laptop divisi IT spesifikasi tinggi untuk pengembangan aplikasi.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxYapxPnNNaxls6Fk1sxJWoFPZCfjqRbu8Z8LoAVsJmKebKmgwXwOVyhPB6W8SRPD-FmFBddZCN1CPM4e7HpnS5Zdr3cpi-JfYuJHWdTPp50tJW-0Mnw4htzXQ_uBEU6fHHBW29nwFKEdnfdJ0GNyJrsH1kzKZW_Qi3G17I0jdBF4i7aPSZmjYyPU-xDTbAtHhFPWNReWcj10j7iUvvpbNZp85d5B0dxScpEUd36jzew_xQXKwB3N-daZ5Vo6YsmrmPe8z5uaYDZbS',
    status: 'Tersedia',
    category: 'Electronics',
    addedDate: 'Oct 12, 2023'
  },
  {
    id: 'BRG-0002',
    name: 'Dell UltraSharp 27"',
    brand: 'Dell',
    stock: 1,
    description: 'Monitor profesional resolusi 4K dengan akurasi warna tinggi.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGoJlxIfHqq0IJQYZmY4szG4-DtjiKOZptk-JkTFzwfFM2QqUorB4UHQdmYL_pXlVcPxrPTxvqo7ktZYASnJu3BPPD98MN2GH8BSH9xcMFxvEni3B4ZrExRxgrFFwUhWRKOAKqX4-8hA4TvlNvPVX9w5RNUSFV_CmvWqH1MfrKWIIXvqb3MJNUovJ8nRbEpaon7Lhv006l1AcCUWyIdveIoUEvM0prgbiQXFSjD5I4ko_-M65H67UtkYScojNqXc3KebHKV-xA8_K0',
    status: 'Dipinjam',
    borrower: 'Sarah Jenkins',
    department: 'Marketing',
    dueDate: '2026-06-15',
    category: 'Electronics',
    addedDate: 'Aug 10, 2023'
  },
  {
    id: 'BRG-0003',
    name: 'Aeron Ergonomic Chair',
    brand: 'Herman Miller',
    stock: 1,
    description: 'Kursi kerja ergonomis premium membantu kenyamanan postur tubuh.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWWtyG6cRxs9NcaE_Jj9wx8Z5nuZBWExmWp0VhhvMC1tgFkLyGYIwpcaV4dGm8KZ_QEi3DwhSX6FkFZwYwNM3-INBwUnlVjYC49sF8kM6oF85HG4oeVVk87uJE5ww86dBzfRjxJxD6Mtb-Lq9qQ_0fhgXkCFIGqnCKO8DSjfG0GHyXN2y7X85fbc0iUlY8s82rd9uFcTi3tzi_C6Q4waW081W5wxLRCQEWWL6ZjaWHH1HlJ_wrhZpem7iQBz3eYV63ZAkNec4XrY_f',
    status: 'Tersedia',
    category: 'Furniture',
    addedDate: 'Sep 05, 2023'
  },
  {
    id: 'BRG-0004',
    name: 'ThinkPad T14 Gen 3',
    brand: 'Lenovo',
    stock: 1,
    description: 'Laptop bisnis tangguh, stabil, handal untuk produktivitas operasional.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP24xpwMFTAYKibM7ROdx1zlF7GGj9mrF2ieqHWhpuKFIh6rlAuCnAWpcRuiDKpteUWnOznd4zs3vs9G5nddHGOtelCDu3QKUYzR6qQ4hdanv9XJuGTlSxa0_w4shyGlqMwMBjfXaJi0qrqgR5LJCM7BFyOJT8yuFlLoTXvy1HEnQo4o8qPOo02FasmxEtLX32uPmvMIobFpDqSRTAUamPfxgJrmS7GkvYcwa8SttUUIqgLU7FD3LNry09XE_kheeMMQX6IWM61-df',
    status: 'Dipinjam',
    borrower: 'Michael Chen',
    department: 'Finance',
    dueDate: '2026-05-20', // Overdue since local is May 30
    category: 'Electronics',
    addedDate: 'Feb 15, 2023'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-001',
    userId: 'user-003',
    userName: 'Budi Santoso',
    department: 'IT Dept',
    action: 'borrow',
    assetName: 'MacBook Pro 16"',
    assetId: 'BRG-0001',
    timestamp: '10 minutes ago',
    status: 'Checked Out'
  },
  {
    id: 'act-002',
    userId: 'user-004',
    userName: 'Sarah Johnson',
    department: 'Marketing',
    action: 'return',
    assetName: 'Sony A7IV Camera Kit',
    assetId: 'BRG-0005',
    timestamp: '45 minutes ago',
    status: 'Verified'
  },
  {
    id: 'act-003',
    userId: 'user-005',
    userName: 'Andi Wijaya',
    department: 'Operations',
    action: 'borrow',
    assetName: 'Heavy Duty Pallet Jack',
    assetId: 'BRG-0006',
    timestamp: '2 hours ago',
    status: 'Checked Out'
  }
];

export const USERS: User[] = [
  {
    id: 'user-admin',
    username: 'admin',
    name: 'John Doe',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW-JoQ8hw1xdpEQj7IWjm-dPnfxVAld4Gg-S3o8DyO4VnGz7gjaZqTo6sICFp67vvIkT_x3Yh7XPr89NU1Xiio5OvXEKb4NaE_DTMIdXa_o5G_CJVHbFwi9t-UeIBofYlpR72Mq6r7_UhnGf54knq7tBhfFOd_kRngnkfR3w0OSFNstPrFgOZeGVT_aUeSRF8oCSPpgVUA_WstrWMuXgZ6DWwXqm2etqL3RhzrULsPRELRdFuXUJYR6zJq-aIjl2FiZ2aGKNnJWl-5',
    role: 'admin',
    department: 'Logistics Admin'
  },
  {
    id: 'user-alex',
    username: 'alex',
    name: 'Alex',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi7MMYe97uDn6dDvjU63sTv97yGZ5DGd3JCQBgevskVfggf80VBSKacgap-4y5vMfkh9roP7y1uwDMJ662NtmPX-FrsA5RKP92bjxX89YCrqqRnf0yPcpVKAMmZMGuW5eU-OiQmiUdPqhsk_mYEkuLMi1kMw25sgeFGRJn-HfXoMlimTMXSNtFHm2FTzLTA76ndajxR8M2GISh5nndANQ12bRPUZBbpUZXkCzxOqjZFsJlQ2hW8oDw6qb5HszNisaQcAfD-g-S-j0U',
    role: 'karyawan',
    department: 'Engineering'
  }
];
