<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\PeminjamanModel;

class Transaksi extends BaseController
{
    public function index()
    {
        $peminjamanModel = new PeminjamanModel();
        $data['transaksi'] = $peminjamanModel->getWithRelations();
        
        return view('admin/transaksi/index', $data);
    }
}
