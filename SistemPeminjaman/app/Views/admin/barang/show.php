<?= $this->extend('layouts/app') ?>

<?= $this->section('content') ?>
<div class="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    <h1 class="text-3xl font-bold text-gray-800">Detail Produk</h1>
    <div class="flex gap-2">
        <a href="javascript:history.back()" class="flex-1 sm:flex-none text-center bg-gray-500 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-600 transition-colors">Kembali</a>
        <a href="<?= base_url('admin/barang/edit/' . $barang->id) ?>" class="flex-1 sm:flex-none text-center bg-blue-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition-colors">Edit Produk</a>
    </div>
</div>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row mb-10">
    <!-- Image Section -->
    <div class="w-full md:w-1/3 bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100">
        <?php if ($barang->gambar && $barang->gambar !== 'default.png'): ?>
            <img src="<?= base_url('uploads/barangs/' . $barang->gambar) ?>" alt="<?= $barang->nama_barang ?>" class="max-w-full h-auto max-h-80 object-contain rounded-lg shadow-sm">
        <?php else: ?>
            <svg class="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <?php endif; ?>
    </div>

    <!-- Detail Section -->
    <div class="w-full md:w-2/3 p-8">
        <div class="mb-6 border-b pb-4">
            <h2 class="text-3xl font-bold text-gray-800 mb-3"><?= $barang->nama_barang ?></h2>
            <div class="flex items-center space-x-4 text-gray-500">
                <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-mono border border-blue-100">ID: <?= $barang->id_barang ?></span>
                <span class="bg-gray-100 px-3 py-1 rounded-full text-sm border">Merk: <?= $barang->merk_barang ?></span>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p class="text-sm text-gray-500 mb-1">Stok Tersedia</p>
                <p class="text-4xl font-bold text-gray-800"><?= $barang->stok ?></p>
            </div>
            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p class="text-sm text-gray-500 mb-1">Sedang Dipinjam</p>
                <p class="text-4xl font-bold text-gray-800"><?= $barang->dipinjam ?></p>
            </div>
        </div>

        <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-3">Status Produk</h3>
            <?php if($barang->stok > 0): ?>
                <span class="inline-block px-4 py-2 bg-green-100 text-green-700 font-bold rounded-lg shadow-sm text-sm">🟢 TERSEDIA</span>
            <?php else: ?>
                <span class="inline-block px-4 py-2 bg-red-100 text-red-700 font-bold rounded-lg shadow-sm text-sm">🔴 HABIS</span>
            <?php endif; ?>
        </div>

        <div>
            <h3 class="text-lg font-bold text-gray-800 mb-3">Barcode Validasi</h3>
            <a href="<?= base_url('admin/barang/' . $barang->id . '/barcode') ?>" target="_blank" class="inline-flex items-center px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors shadow-sm">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                Tampilkan QR Barcode
            </a>
        </div>
    </div>
</div>
<?= $this->endSection() ?>
