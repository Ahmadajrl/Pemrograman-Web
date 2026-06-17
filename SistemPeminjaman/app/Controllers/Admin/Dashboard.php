<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\BarangModel;
use App\Models\PeminjamanModel;
use App\Models\UserModel;

class Dashboard extends BaseController
{
    public function index()
    {
        $barangModel = new BarangModel();
        $peminjamanModel = new PeminjamanModel();
        $userModel = new UserModel();

        $data = [
            'total_barang' => $barangModel->countAll(),
            'total_karyawan' => $userModel->where('role', 'karyawan')->countAllResults(),
            'total_peminjaman' => $peminjamanModel->countAll(),
            'total_dipinjam' => $peminjamanModel->where('status', 'dipinjam')->countAllResults(),
            'barangs' => $barangModel->getBarangWithBorrowCount(),
            'barang_dipinjam_list' => $peminjamanModel->getBarangDipinjam(),
        ];

        return view('admin/dashboard', $data);
    }
}
