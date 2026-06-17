<?= $this->extend('layouts/app') ?>

<?= $this->section('content') ?>
<div class="mb-6">
    <h1 class="text-3xl font-bold">Tambah Barang</h1>
</div>

<div class="bg-white rounded shadow-md overflow-hidden p-6 max-w-2xl">
    <?php if(session()->getFlashdata('errors')): ?>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <ul>
                <?php foreach(session()->getFlashdata('errors') as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form action="<?= base_url('admin/barang/store') ?>" method="post" enctype="multipart/form-data">
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">ID Barang / Kode Barcode</label>
            <input type="text" name="id_barang" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" value="<?= old('id_barang') ?>" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">Nama Barang</label>
            <input type="text" name="nama_barang" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" value="<?= old('nama_barang') ?>" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">Merk Barang</label>
            <input type="text" name="merk_barang" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" value="<?= old('merk_barang') ?>" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">Gambar Produk (Opsional)</label>
            <input type="file" name="gambar" accept="image/*" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">Stok</label>
            <input type="number" name="stok" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" value="<?= old('stok') ?>" required>
        </div>
        <div class="flex items-center space-x-4">
            <button type="submit" class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Simpan</button>
            <a href="<?= base_url('admin/barang') ?>" class="text-gray-600 hover:underline">Batal</a>
        </div>
    </form>
</div>
<?= $this->endSection() ?>
