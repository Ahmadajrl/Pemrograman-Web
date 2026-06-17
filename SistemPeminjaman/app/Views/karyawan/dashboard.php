<?= $this->extend('layouts/app') ?>

<?= $this->section('content') ?>
<div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-800">Karyawan Dashboard</h1>
    <p class="text-gray-600 mt-2">Selamat datang! Silakan pilih barang yang ingin Anda pinjam dari katalog di bawah ini.</p>
</div>

<!-- Scanner Action Area -->
<div class="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
    <button type="button" onclick="openCameraScanner('pinjam')" class="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center group border-2 border-blue-500">
        <div class="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-inner">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Scan & Pinjam</h2>
        <p class="text-blue-100 text-sm text-center">Pinjam barang dari katalog menggunakan scanner / kamera</p>
    </button>

    <button type="button" onclick="openCameraScanner('kembali')" class="bg-green-600 hover:bg-green-700 text-white p-8 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center group border-2 border-green-500">
        <div class="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-inner">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Scan & Kembali</h2>
        <p class="text-green-100 text-sm text-center">Kembalikan barang yang sedang Anda pinjam</p>
    </button>
</div>

<!-- Hidden Form for submission -->
<form id="scannerForm" method="post" action="<?= base_url('karyawan/scan-pinjam') ?>" class="hidden">
    <?= csrf_field() ?>
    <input type="text" name="barcode_id" id="barcodeInput" autofocus autocomplete="off" required>
</form>

<!-- Katalog Barang Grid -->
<div class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Katalog Barang</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <?php foreach($barangs as $barang): ?>
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col">
            <div class="bg-gray-100 h-40 flex items-center justify-center overflow-hidden">
                <?php if (isset($barang->gambar) && $barang->gambar !== 'default.png'): ?>
                    <img src="<?= base_url('uploads/barangs/' . $barang->gambar) ?>" alt="<?= $barang->nama_barang ?>" class="w-full h-full object-cover">
                <?php else: ?>
                    <!-- Placeholder Image -->
                    <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <?php endif; ?>
            </div>
            <div class="p-5 flex-grow flex flex-col">
                <h3 class="font-bold text-lg text-gray-800 mb-1 line-clamp-1" title="<?= $barang->nama_barang ?>"><?= $barang->nama_barang ?></h3>
                <p class="text-xs text-gray-500 mb-3">ID: <span class="font-mono text-gray-700"><?= $barang->id_barang ?></span> <span class="mx-1">•</span> Merk: <?= $barang->merk_barang ?></p>
                
                <div class="mt-auto pt-3 border-t border-gray-100 flex flex-col space-y-2 mb-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Tersedia:</span>
                        <span class="font-bold text-gray-800"><?= $barang->stok ?></span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Dipinjam:</span>
                        <span class="font-bold text-gray-800"><?= $barang->dipinjam ?></span>
                    </div>
                </div>
                
                <div class="mb-4">
                    <?php if($barang->stok > 0): ?>
                        <span class="block w-full text-center px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-lg shadow-sm">TERSEDIA</span>
                    <?php else: ?>
                        <span class="block w-full text-center px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg shadow-sm">HABIS</span>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
        <?php if(empty($barangs)): ?>
            <div class="col-span-full bg-white p-6 rounded-xl shadow-sm text-center text-gray-500 border border-gray-100">
                Belum ada data barang di katalog.
            </div>
        <?php endif; ?>
    </div>
</div>

<!-- Riwayat Peminjaman -->
<div class="mb-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Riwayat Peminjaman Anda</h2>
    <?php if(empty($riwayat_peminjaman)): ?>
        <div class="bg-white p-6 rounded-xl shadow-sm text-center text-gray-500 border border-gray-100">
            Anda belum pernah melakukan peminjaman.
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach($riwayat_peminjaman as $riwayat): ?>
            <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border <?= $riwayat->status === 'dipinjam' ? 'border-yellow-300 bg-yellow-50/30' : 'border-gray-100' ?> flex p-4 items-center">
                
                <div class="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mr-4">
                    <?php if (isset($riwayat->gambar) && $riwayat->gambar !== 'default.png'): ?>
                        <img src="<?= base_url('uploads/barangs/' . $riwayat->gambar) ?>" alt="<?= $riwayat->barang_name ?>" class="w-full h-full object-cover">
                    <?php else: ?>
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <?php endif; ?>
                </div>

                <div class="flex-grow">
                    <h3 class="font-bold text-gray-800 text-sm mb-1 line-clamp-1" title="<?= $riwayat->barang_name ?>"><?= $riwayat->barang_name ?></h3>
                    <p class="text-xs text-gray-500 mb-2">Pinjam: <?= date('d M Y H:i', strtotime($riwayat->tanggal_pinjam)) ?></p>
                    
                    <div class="flex items-center justify-between">
                        <?php if($riwayat->status === 'dipinjam'): ?>
                            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded shadow-sm">Sedang Dipinjam</span>
                        <?php else: ?>
                            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded shadow-sm">Dikembalikan</span>
                            <span class="text-xs text-gray-400 ml-2" title="Tanggal Kembali"><?= date('d M Y', strtotime($riwayat->tanggal_kembali)) ?></span>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<!-- Modal Scanner Kamera -->
<div id="cameraModal" class="fixed inset-0 bg-black bg-opacity-80 z-50 hidden flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
    <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transform transition-all">
        <div class="bg-gray-800 p-5 flex justify-between items-center text-white">
            <h3 class="font-bold text-xl flex items-center">
                <svg class="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Webcam Scanner
            </h3>
            <button onclick="closeCameraScanner()" class="text-gray-400 hover:text-white bg-gray-700 hover:bg-red-500 rounded-full p-1 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div class="p-6">
            <div id="reader" class="w-full bg-white rounded-xl overflow-hidden shadow-inner border border-gray-200 min-h-[300px] relative flex items-center justify-center">
                <span class="text-gray-400 text-sm absolute z-0" id="cameraLoadingText">Memuat Kamera... (Pastikan Izin Diberikan)</span>
            </div>
            
            <div class="mt-6 hidden" id="camModeSelector">
                <label class="block text-gray-700 text-sm font-bold mb-3 text-center uppercase tracking-wider">Aksi Kamera Saat Ini</label>
                <div class="flex border rounded-xl overflow-hidden shadow-sm">
                    <button id="camModePinjam" type="button" class="flex-1 py-3 bg-blue-600 text-white font-bold text-sm transition-all shadow-inner">🟢 MODE PINJAM</button>
                    <button id="camModeKembali" type="button" class="flex-1 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold text-sm transition-all">🔴 MODE KEMBALI</button>
                </div>
            </div>
            <div class="mt-4 text-center text-xs text-gray-400">
                Posisikan QR/Barcode produk di dalam kotak pemindai kamera. Pastikan pencahayaan cukup.
            </div>
        </div>
    </div>
</div>

<script src="https://unpkg.com/html5-qrcode"></script>
<script>
    // Auto-focus input for physical scanner when clicking outside
    document.addEventListener('click', function(e) {
        const isModalOpen = !document.getElementById('cameraModal').classList.contains('hidden');
        if(!isModalOpen && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
            document.getElementById('barcodeInput').focus();
        }
    });

    let html5QrCode = null;

    function openCameraScanner(mode) {
        const form = document.getElementById('scannerForm');
        
        if(mode === 'pinjam') {
            form.action = '<?= base_url('karyawan/scan-pinjam') ?>';
            document.getElementById('camModePinjam').className = 'flex-1 py-3 bg-blue-600 text-white font-bold text-sm transition-all shadow-inner';
            document.getElementById('camModePinjam').innerText = '🟢 MODE PINJAM';
            document.getElementById('camModeKembali').className = 'flex-1 py-3 bg-gray-100 text-gray-600 font-bold text-sm transition-all';
            document.getElementById('camModeKembali').innerText = 'MODE KEMBALI';
        } else {
            form.action = '<?= base_url('karyawan/scan-kembali') ?>';
            document.getElementById('camModeKembali').className = 'flex-1 py-3 bg-green-600 text-white font-bold text-sm transition-all shadow-inner';
            document.getElementById('camModeKembali').innerText = '🟢 MODE KEMBALI';
            document.getElementById('camModePinjam').className = 'flex-1 py-3 bg-gray-100 text-gray-600 font-bold text-sm transition-all';
            document.getElementById('camModePinjam').innerText = 'MODE PINJAM';
        }

        document.getElementById('camModeSelector').classList.remove('hidden');
        document.getElementById('cameraModal').classList.remove('hidden');
        document.getElementById('cameraLoadingText').classList.remove('hidden');
        
        // Initialize direct camera
        if (!html5QrCode) {
            html5QrCode = new Html5Qrcode("reader");
        }
        
        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            onScanSuccess,
            (errorMessage) => {
                // ignore errors frame by frame
            }
        ).then(() => {
            document.getElementById('cameraLoadingText').classList.add('hidden');
        }).catch((err) => {
            document.getElementById('cameraLoadingText').innerText = "Gagal mengakses kamera. Mohon izinkan akses kamera di browser Anda.";
        });
    }

    function onScanSuccess(decodedText, decodedResult) {
        if(html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
            }).catch(e => console.log(e));
        }
        
        // Put value to form and submit with a small delay for UX
        const input = document.getElementById('barcodeInput');
        input.value = decodedText;
        
        setTimeout(() => {
            document.getElementById('scannerForm').submit();
        }, 100);
    }

    function closeCameraScanner() {
        if(html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
            }).catch(e => console.log(e));
        }
        document.getElementById('cameraModal').classList.add('hidden');
        document.getElementById('barcodeInput').value = '';
        document.getElementById('barcodeInput').focus();
    }
</script>

<?= $this->endSection() ?>
