<?php

namespace App\Models;

use CodeIgniter\Model;

class PeminjamanModel extends Model
{
    protected $table            = 'peminjamans';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'user_id',
        'barang_id',
        'tanggal_pinjam',
        'tanggal_kembali',
        'status',
    ];

    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    public function getWithRelations()
    {
        return $this->select('peminjamans.*, users.name as user_name, barangs.nama_barang as barang_name')
                    ->join('users', 'users.id = peminjamans.user_id')
                    ->join('barangs', 'barangs.id = peminjamans.barang_id')
                    ->findAll();
    }

    public function getBarangDipinjam()
    {
        return $this->select('peminjamans.*, users.name as user_name, barangs.nama_barang as barang_name, barangs.id_barang')
                    ->join('users', 'users.id = peminjamans.user_id')
                    ->join('barangs', 'barangs.id = peminjamans.barang_id')
                    ->where('peminjamans.status', 'dipinjam')
                    ->findAll();
    }
}
