<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table            = 'barangs';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'id_barang',
        'nama_barang',
        'merk_barang',
        'stok',
        'gambar',
        'barcode'
    ];

    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    public function getBarangWithBorrowCount()
    {
        return $this->select('barangs.*, COUNT(peminjamans.id) as dipinjam')
                    ->join('peminjamans', 'peminjamans.barang_id = barangs.id AND peminjamans.status = "dipinjam"', 'left')
                    ->groupBy('barangs.id')
                    ->findAll();
    }
}
