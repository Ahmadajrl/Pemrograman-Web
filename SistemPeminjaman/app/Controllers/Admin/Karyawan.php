<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\UserModel;
use App\Models\PeminjamanModel;

class Karyawan extends BaseController
{
    public function show($id)
    {
        $userModel = new UserModel();
        $peminjamanModel = new PeminjamanModel();

        $data['karyawan'] = $userModel->find($id);
        
        if (!$data['karyawan']) {
            return redirect()->to('/admin/dashboard')->with('error', 'Karyawan tidak ditemukan.');
        }

        $data['riwayat_peminjaman'] = $peminjamanModel->select('peminjamans.*, barangs.nama_barang as barang_name')
            ->join('barangs', 'barangs.id = peminjamans.barang_id')
            ->where('peminjamans.user_id', $id)
            ->findAll();
        
        return view('admin/karyawan/show', $data);
    }
}
