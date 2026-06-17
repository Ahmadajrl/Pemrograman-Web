<?= $this->extend('layouts/app') ?>

<?= $this->section('content') ?>

<style>
@media (max-width: 768px) {
    .card-product img { height: 90px !important; object-fit: cover; }
    .card-product .title-product {
        font-size: 0.75rem !important; line-height: 1.3 !important;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .card-product .info-text { font-size: 0.65rem !important; }
    .badge-status { font-size: 0.55rem !important; padding: 0.2rem 0.4rem !important; }
    .grid-katalog-mobile { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.5rem !important; }
}
</style>
<div class="mb-6 flex justify-between items-center">
    <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
    <a href="<?= base_url('admin/barang') ?>" class="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-blue-700 hover:-translate-y-1 transition-transform">Kelola Barang</a>
</div>

<!-- Stats Dashboard Diperbaiki -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-10">
    <div class="bg-white p-3 md:p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow flex flex-col justify-center h-24 md:h-auto">
        <h3 class="text-gray-500 text-[10px] md:text-sm font-semibold truncate">Total Barang</h3>
        <p class="text-xl md:text-3xl font-bold text-gray-800"><?= $total_barang ?></p>
    </div>
    <div class="bg-white p-3 md:p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow flex flex-col justify-center h-24 md:h-auto">
        <h3 class="text-gray-500 text-[10px] md:text-sm font-semibold truncate">Karyawan</h3>
        <p class="text-xl md:text-3xl font-bold text-gray-800"><?= $total_karyawan ?></p>
    </div>
    <div class="bg-white p-3 md:p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow flex flex-col justify-center h-24 md:h-auto">
        <h3 class="text-gray-500 text-[10px] md:text-sm font-semibold truncate">Peminjaman</h3>
        <p class="text-xl md:text-3xl font-bold text-gray-800"><?= $total_peminjaman ?></p>
    </div>
    <div class="bg-white p-3 md:p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow flex flex-col justify-center h-24 md:h-auto">
        <h3 class="text-gray-500 text-[10px] md:text-sm font-semibold truncate">Dipinjam</h3>
        <p class="text-xl md:text-3xl font-bold text-gray-800"><?= $total_dipinjam ?></p>
    </div>
</div>

<!-- Katalog Barang Grid -->
<div class="mb-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Katalog Barang</h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6 grid-katalog-mobile">
        <?php foreach($barangs as $barang): ?>
        <div class="bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col card-product">
            <div class="bg-gray-100 h-24 md:h-40 flex items-center justify-center overflow-hidden">
                <a href="<?= base_url('admin/barang/show/' . $barang->id) ?>" class="w-full h-full flex items-center justify-center">
                    <?php if (isset($barang->gambar) && $barang->gambar !== 'default.png'): ?>
                        <img src="<?= base_url('uploads/barangs/' . $barang->gambar) ?>" alt="<?= $barang->nama_barang ?>" class="w-full h-full object-cover">
                    <?php else: ?>
                        <svg class="w-8 h-8 md:w-16 md:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <?php endif; ?>
                </a>
            </div>
            <div class="p-2 md:p-5 flex-grow flex flex-col justify-between">
                <div>
                    <a href="<?= base_url('admin/barang/show/' . $barang->id) ?>" class="hover:text-blue-600 transition-colors">
                        <h3 class="font-bold text-gray-800 mb-1 title-product"><?= $barang->nama_barang ?></h3>
                    </a>
                    <p class="text-gray-500 mb-2 md:mb-3 info-text">ID: <span class="font-mono text-gray-700"><?= $barang->id_barang ?></span> <br class="block md:hidden"> <span class="hidden md:inline mx-1">•</span> <span class="truncate">Merk: <?= $barang->merk_barang ?></span></p>
                </div>
                
                <div class="mt-auto pt-2 md:pt-3 border-t border-gray-100 flex flex-col space-y-1">
                    <div class="flex justify-between items-center text-xs md:text-sm">
                        <span class="text-gray-500 info-text">Tersedia:</span>
                        <span class="font-bold text-gray-800 info-text"><?= $barang->stok ?></span>
                    </div>
                    <div class="flex justify-between items-center text-xs md:text-sm">
                        <span class="text-gray-500 info-text">Dipinjam:</span>
                        <span class="font-bold text-gray-800 info-text"><?= $barang->dipinjam ?></span>
                    </div>
                </div>
                
                <div class="mt-2 md:mt-4 mb-2 md:mb-4">
                    <?php if($barang->stok > 0): ?>
                        <span class="block w-full text-center bg-green-100 text-green-700 font-bold rounded-md md:rounded-lg shadow-sm badge-status">TERSEDIA</span>
                    <?php else: ?>
                        <span class="block w-full text-center bg-red-100 text-red-700 font-bold rounded-md md:rounded-lg shadow-sm badge-status">HABIS</span>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
        <?php if(empty($barangs)): ?>
            <div class="col-span-full bg-white p-6 rounded-xl shadow-sm text-center text-gray-500">
                Belum ada data barang.
            </div>
        <?php endif; ?>
    </div>
</div>

<!-- Barang Dipinjam Section -->
<div class="mb-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Barang Dipinjam</h2>
    <?php if(empty($barang_dipinjam_list)): ?>
        <div class="bg-white p-6 rounded-xl shadow-sm text-center text-gray-500">
            Tidak ada barang yang sedang dipinjam saat ini.
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <?php foreach($barang_dipinjam_list as $pinjam): ?>
            <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-yellow-200">
                <div class="p-4 border-b border-yellow-100 bg-yellow-50">
                    <h3 class="font-bold text-gray-800 line-clamp-1"><?= $pinjam->barang_name ?></h3>
                    <p class="text-xs text-gray-500 mt-1">ID: <span class="font-mono"><?= $pinjam->id_barang ?></span></p>
                </div>
                <div class="p-5">
                    <div class="mb-4">
                        <p class="text-xs text-gray-500 mb-1">Dipinjam Oleh:</p>
                        <p class="font-semibold text-gray-800 text-sm bg-gray-50 p-2 rounded"><?= $pinjam->user_name ?></p>
                    </div>
                    <div class="mb-4">
                        <p class="text-xs text-gray-500 mb-1">Tanggal Pinjam:</p>
                        <p class="font-semibold text-gray-800 text-sm"><?= date('d M Y H:i', strtotime($pinjam->tanggal_pinjam)) ?></p>
                    </div>
                    <div class="mb-4 flex justify-between items-center border-t border-gray-100 pt-3">
                        <span class="text-xs text-gray-500">Jumlah:</span>
                        <span class="font-bold text-gray-800 text-sm">1 Unit</span>
                    </div>
                    <div class="mt-2 text-center">
                        <span class="inline-block w-full px-2 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg shadow-sm">SEDANG DIPINJAM</span>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<?= $this->endSection() ?>
