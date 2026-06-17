<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Peminjamans extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'user_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
            ],
            'barang_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
            ],
            'tanggal_pinjam' => [
                'type' => 'DATETIME',
            ],
            'tanggal_kembali' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'status' => [
                'type'       => 'ENUM',
                'constraint' => ['dipinjam', 'dikembalikan'],
                'default'    => 'dipinjam',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        
        // Foreign keys can be added using query or natively in DB. CodeIgniter 4 Forge supports foreign keys.
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('barang_id', 'barangs', 'id', 'CASCADE', 'CASCADE');
        
        $this->forge->createTable('peminjamans');
    }

    public function down()
    {
        $this->forge->dropTable('peminjamans');
    }
}
