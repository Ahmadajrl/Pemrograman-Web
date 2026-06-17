<?= $this->extend('layouts/app') ?>

<?= $this->section('content') ?>
<div class="mb-6 flex justify-between items-center">
    <h1 class="text-3xl font-bold">Detail Karyawan</h1>
    <a href="<?= base_url('admin/dashboard') ?>" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Kembali</a>
</div>

<div class="bg-white rounded shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Profil</h2>
    <div class="grid grid-cols-2 gap-4 max-w-lg">
        <div class="text-gray-600">Nama</div>
        <div class="font-semibold"><?= $karyawan->name ?></div>
        
        <div class="text-gray-600">Username</div>
        <div class="font-semibold"><?= $karyawan->username ?></div>
        
        <div class="text-gray-600">Terdaftar Sejak</div>
        <div class="font-semibold"><?= $karyawan->created_at ?></div>
    </div>
</div>

<div class="bg-white rounded shadow-md overflow-hidden">
    <div class="p-6 border-b">
        <h2 class="text-xl font-bold">Riwayat Peminjaman</h2>
    </div>
    <table class="min-w-full">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barang</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Pinjam</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Kembali</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <?php foreach($riwayat_peminjaman as $riwayat): ?>
            <tr>
                <td class="px-6 py-4 whitespace-nowrap"><?= $riwayat->barang_name ?></td>
                <td class="px-6 py-4 whitespace-nowrap"><?= $riwayat->tanggal_pinjam ?></td>
                <td class="px-6 py-4 whitespace-nowrap"><?= $riwayat->tanggal_kembali ?? '-' ?></td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <?php if($riwayat->status === 'dipinjam'): ?>
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Dipinjam</span>
                    <?php else: ?>
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Dikembalikan</span>
                    <?php endif; ?>
                </td>
            </tr>
            <?php endforeach; ?>
            <?php if(empty($riwayat_peminjaman)): ?>
            <tr>
                <td colspan="4" class="px-6 py-4 text-center text-gray-500">Belum ada riwayat peminjaman.</td>
            </tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>
<?= $this->endSection() ?>
