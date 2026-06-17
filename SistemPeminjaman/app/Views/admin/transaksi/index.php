<?= $this->extend('layouts/app') ?>

<?= $this->section('content') ?>
<div class="mb-6 flex justify-between items-center">
    <h1 class="text-3xl font-bold">Data Transaksi</h1>
</div>

<div class="bg-white rounded shadow-md overflow-hidden">
    <table class="min-w-full">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peminjam</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barang</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <?php foreach($transaksi as $t): ?>
            <tr>
                <td class="px-6 py-4 whitespace-nowrap"><?= $t->user_name ?></td>
                <td class="px-6 py-4 whitespace-nowrap"><?= $t->barang_name ?></td>
                <td class="px-6 py-4 whitespace-nowrap"><?= $t->tanggal_pinjam ?></td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <?php if($t->status === 'dipinjam'): ?>
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Dipinjam</span>
                    <?php else: ?>
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Dikembalikan</span>
                    <?php endif; ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
<?= $this->endSection() ?>
