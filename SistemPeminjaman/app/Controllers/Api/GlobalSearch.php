<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\BarangModel;

class GlobalSearch extends BaseController
{
    public function search()
    {
        $query = $this->request->getGet('query');
        
        if (!$query) {
            return $this->response->setJSON([]);
        }

        $barangModel = new BarangModel();
        $results = $barangModel->like('nama_barang', $query)
                               ->orLike('id_barang', $query)
                               ->findAll(10); // limit 10

        return $this->response->setJSON($results);
    }
}
