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
<div class="mb-4 md:mb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Kelola Barang</h1>
    <div class="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
        <a href="<?= base_url('admin/dashboard') ?>" class="bg-gray-500 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base rounded-md md:rounded-xl shadow-sm hover:bg-gray-600 transition-colors flex-grow md:flex-grow-0 text-center">Kembali</a>
        <a href="<?= base_url('admin/barang/print-all-barcodes') ?>" target="_blank" class="bg-indigo-600 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base rounded-md md:rounded-xl shadow-sm hover:bg-indigo-700 transition-colors flex-grow md:flex-grow-0 text-center">Print Semua Barcode</a>
        <a href="<?= base_url('admin/barang/export') ?>" class="bg-green-600 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base rounded-md md:rounded-xl shadow-sm hover:bg-green-700 transition-colors flex-grow md:flex-grow-0 text-center">Export Excel</a>
        <button onclick="document.getElementById('importModal').classList.remove('hidden')" class="bg-yellow-500 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base rounded-md md:rounded-xl shadow-sm hover:bg-yellow-600 transition-colors flex-grow md:flex-grow-0 text-center">Import Excel</button>
        <a href="<?= base_url('admin/barang/create') ?>" class="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base rounded-md md:rounded-xl shadow-sm hover:bg-blue-700 transition-colors w-full md:w-auto text-center mt-1 md:mt-0 font-bold">Tambah Barang</a>
    </div>
</div>

<div class="mb-10">
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
                        <span class="text-gray-500 info-text">Stok:</span>
                        <span class="font-bold text-gray-800 info-text"><?= $barang->stok ?></span>
                    </div>
                </div>
                
                <div class="mt-2 md:mt-4 mb-2 md:mb-4">
                    <?php if($barang->stok > 0): ?>
                        <span class="block w-full text-center bg-green-100 text-green-700 font-bold rounded-md md:rounded-lg shadow-sm badge-status">TERSEDIA</span>
                    <?php else: ?>
                        <span class="block w-full text-center bg-red-100 text-red-700 font-bold rounded-md md:rounded-lg shadow-sm badge-status">HABIS</span>
                    <?php endif; ?>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-between border-t border-gray-100 pt-2 md:pt-4 mt-auto">
                    <a href="<?= base_url('admin/barang/' . $barang->id . '/barcode') ?>" target="_blank" class="text-gray-500 hover:text-green-600 transition-colors" title="Barcode">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                    </a>
                    <div class="flex space-x-2 md:space-x-3">
                        <a href="<?= base_url('admin/barang/edit/' . $barang->id) ?>" class="text-blue-500 hover:text-blue-700 transition-colors" title="Edit">
                            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </a>
                        <form action="<?= base_url('admin/barang/delete/' . $barang->id) ?>" method="post" class="inline" onsubmit="return confirm('Yakin ingin menghapus barang ini?');">
                            <button type="submit" class="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                                <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </form>
                    </div>
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

<!-- Import Modal -->
<div id="importModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-xl bg-white">
        <div class="mt-3 text-center">
            <h3 class="text-lg leading-6 font-bold text-gray-900 mb-4">Import Data Barang</h3>
            <div class="px-2 py-3 text-left">
                <form action="<?= base_url('admin/barang/import') ?>" method="post" enctype="multipart/form-data">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Pilih File Excel (.xlsx, .xls)</label>
                        <input type="file" name="file_excel" accept=".xlsx, .xls" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required>
                    </div>
                    <div class="flex justify-end space-x-2 mt-6">
                        <button type="button" onclick="document.getElementById('importModal').classList.add('hidden')" class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">Batal</button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Import</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?= $this->endSection() ?>
