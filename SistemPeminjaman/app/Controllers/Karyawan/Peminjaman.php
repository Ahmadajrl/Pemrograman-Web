<?php

namespace App\Controllers\Karyawan;

use App\Controllers\BaseController;
use App\Models\BarangModel;
use App\Models\PeminjamanModel;
use App\Models\NotificationModel;

class Peminjaman extends BaseController
{
    public function dashboard()
    {
        $barangModel = new BarangModel();
        $peminjamanModel = new PeminjamanModel();
        
        $data['barangs'] = $barangModel->getBarangWithBorrowCount();
        $data['riwayat_peminjaman'] = $peminjamanModel->select('peminjamans.*, barangs.nama_barang as barang_name, barangs.id_barang, barangs.gambar')
            ->join('barangs', 'barangs.id = peminjamans.barang_id')
            ->where('peminjamans.user_id', session()->get('id'))
            ->orderBy('peminjamans.tanggal_pinjam', 'DESC')
            ->findAll();

        return view('karyawan/dashboard', $data);
    }

    public function pinjam()
    {
        $rules = [
            'barang_id' => 'required|numeric'
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->with('error', 'Pilih barang yang valid.');
        }

        $barang_id = $this->request->getPost('barang_id');
        $barangModel = new BarangModel();
        $peminjamanModel = new PeminjamanModel();
        $notificationModel = new NotificationModel();

        $existingPinjam = $peminjamanModel->where('user_id', session()->get('id'))
                                          ->where('barang_id', $barang_id)
                                          ->where('status', 'dipinjam')
                                          ->first();
        
        if ($existingPinjam) {
            return redirect()->back()->with('error', 'Anda masih meminjam barang ini dan belum mengembalikannya.');
        }

        $barang = $barangModel->find($barang_id);

        if (!$barang || $barang->stok <= 0) {
            return redirect()->back()->with('error', 'Barang tidak tersedia.');
        }

        $db = \Config\Database::connect();
        $db->transException(true)->transStart();

        try {
            // Kurangi stok
            $barangModel->update($barang_id, ['stok' => $barang->stok - 1]);

            // Catat peminjaman
            $peminjamanModel->insert([
                'user_id' => session()->get('id'),
                'barang_id' => $barang_id,
                'tanggal_pinjam' => date('Y-m-d H:i:s'),
                'status' => 'dipinjam'
            ]);

            // Buat notifikasi
            $notificationModel->insert([
                'user_id' => session()->get('id'),
                'title' => 'Peminjaman Berhasil',
                'message' => 'Anda telah meminjam ' . $barang->nama_barang,
            ]);

            $db->transComplete();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal meminjam barang: ' . $e->getMessage());
        }

        return redirect()->to('/karyawan/dashboard')->with('success', 'Barang berhasil dipinjam.');
    }

    public function kembali()
    {
        $rules = [
            'peminjaman_id' => 'required|numeric'
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->with('error', 'Data tidak valid.');
        }

        $peminjaman_id = $this->request->getPost('peminjaman_id');
        
        $peminjamanModel = new PeminjamanModel();
        $barangModel = new BarangModel();
        $notificationModel = new NotificationModel();

        $peminjaman = $peminjamanModel->find($peminjaman_id);

        if (!$peminjaman || $peminjaman->user_id !== session()->get('id') || $peminjaman->status !== 'dipinjam') {
            return redirect()->back()->with('error', 'Aksi tidak valid.');
        }

        $barang = $barangModel->find($peminjaman->barang_id);

        $db = \Config\Database::connect();
        $db->transException(true)->transStart();

        try {
            // Tambah stok
            if ($barang) {
                $barangModel->update($barang->id, ['stok' => $barang->stok + 1]);
            }

            // Update status peminjaman
            $peminjamanModel->update($peminjaman_id, [
                'status' => 'dikembalikan',
                'tanggal_kembali' => date('Y-m-d H:i:s')
            ]);

            // Buat notifikasi
            $notificationModel->insert([
                'user_id' => session()->get('id'),
                'title' => 'Pengembalian Berhasil',
                'message' => 'Anda telah mengembalikan ' . ($barang ? $barang->nama_barang : 'Barang'),
            ]);

            $db->transComplete();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal mengembalikan barang: ' . $e->getMessage());
        }

        return redirect()->to('/karyawan/dashboard')->with('success', 'Barang berhasil dikembalikan.');
    }

    public function scanPinjam()
    {
        $id_barang = $this->request->getPost('barcode_id');
        if (empty($id_barang)) {
            return redirect()->back()->with('error', 'Barcode tidak terbaca.');
        }

        $barangModel = new BarangModel();
        $peminjamanModel = new PeminjamanModel();
        $notificationModel = new NotificationModel();

        $barang = $barangModel->where('id_barang', $id_barang)->first();

        if (!$barang) {
            return redirect()->back()->with('error', 'Produk dengan Barcode ' . $id_barang . ' tidak ditemukan.');
        }

        if ($barang->stok <= 0) {
            return redirect()->back()->with('error', 'Stok ' . $barang->nama_barang . ' sedang habis.');
        }

        $existingPinjam = $peminjamanModel->where('user_id', session()->get('id'))
                                          ->where('barang_id', $barang->id)
                                          ->where('status', 'dipinjam')
                                          ->first();
        
        if ($existingPinjam) {
            return redirect()->back()->with('error', 'Anda masih meminjam ' . $barang->nama_barang . ' dan belum mengembalikannya.');
        }

        $db = \Config\Database::connect();
        $db->transException(true)->transStart();

        try {
            $barangModel->update($barang->id, ['stok' => $barang->stok - 1]);

            $peminjamanModel->insert([
                'user_id' => session()->get('id'),
                'barang_id' => $barang->id,
                'tanggal_pinjam' => date('Y-m-d H:i:s'),
                'status' => 'dipinjam'
            ]);

            $notificationModel->insert([
                'user_id' => session()->get('id'),
                'title' => 'Peminjaman via Barcode Berhasil',
                'message' => 'Anda telah meminjam ' . $barang->nama_barang,
            ]);

            $db->transComplete();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal meminjam barang: ' . $e->getMessage());
        }

        return redirect()->to('/karyawan/dashboard')->with('success', 'Berhasil meminjam ' . $barang->nama_barang . ' via Scan!');
    }

    public function scanKembali()
    {
        $id_barang = $this->request->getPost('barcode_id');
        if (empty($id_barang)) {
            return redirect()->back()->with('error', 'Barcode tidak terbaca.');
        }

        $barangModel = new BarangModel();
        $peminjamanModel = new PeminjamanModel();
        $notificationModel = new NotificationModel();

        $barang = $barangModel->where('id_barang', $id_barang)->first();

        if (!$barang) {
            return redirect()->back()->with('error', 'Produk dengan Barcode ' . $id_barang . ' tidak ditemukan.');
        }

        $peminjaman = $peminjamanModel->where('user_id', session()->get('id'))
                                      ->where('barang_id', $barang->id)
                                      ->where('status', 'dipinjam')
                                      ->first();

        if (!$peminjaman) {
            return redirect()->back()->with('error', 'Anda tidak sedang meminjam barang ini.');
        }

        $db = \Config\Database::connect();
        $db->transException(true)->transStart();

        try {
            $barangModel->update($barang->id, ['stok' => $barang->stok + 1]);

            $peminjamanModel->update($peminjaman->id, [
                'status' => 'dikembalikan',
                'tanggal_kembali' => date('Y-m-d H:i:s')
            ]);

            $notificationModel->insert([
                'user_id' => session()->get('id'),
                'title' => 'Pengembalian via Barcode Berhasil',
                'message' => 'Anda telah mengembalikan ' . $barang->nama_barang,
            ]);

            $db->transComplete();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal mengembalikan barang: ' . $e->getMessage());
        }

        return redirect()->to('/karyawan/dashboard')->with('success', 'Berhasil mengembalikan ' . $barang->nama_barang . ' via Scan!');
    }
}
