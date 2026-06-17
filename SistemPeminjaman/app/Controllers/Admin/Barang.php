<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\BarangModel;

class Barang extends BaseController
{
    public function index()
    {
        $barangModel = new BarangModel();
        $data['barangs'] = $barangModel->findAll();
        
        return view('admin/barang/index', $data);
    }

    public function create()
    {
        return view('admin/barang/create');
    }

    public function store()
    {
        $rules = [
            'id_barang'   => 'required|is_unique[barangs.id_barang]',
            'nama_barang' => 'required',
            'merk_barang' => 'required',
            'stok'        => 'required|numeric',
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        $barangModel = new BarangModel();
        
        $fileGambar = $this->request->getFile('gambar');
        $namaGambar = 'default.png';
        if ($fileGambar && $fileGambar->isValid() && !$fileGambar->hasMoved()) {
            $namaGambar = $fileGambar->getRandomName();
            $fileGambar->move(FCPATH . 'uploads/barangs', $namaGambar);
        }

        $data = [
            'id_barang'   => $this->request->getPost('id_barang'),
            'nama_barang' => $this->request->getPost('nama_barang'),
            'merk_barang' => $this->request->getPost('merk_barang'),
            'stok'        => $this->request->getPost('stok'),
            'gambar'      => $namaGambar,
            'barcode'     => $this->request->getPost('id_barang')
        ];

        $barangModel->insert($data);

        return redirect()->to('/admin/barang')->with('success', 'Barang berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $barangModel = new BarangModel();
        $data['barang'] = $barangModel->find($id);
        
        if (!$data['barang']) {
            return redirect()->to('/admin/barang')->with('error', 'Barang tidak ditemukan.');
        }

        return view('admin/barang/edit', $data);
    }

    public function show($id)
    {
        $barangModel = new BarangModel();
        $data['barang'] = $barangModel->select('barangs.*, COUNT(peminjamans.id) as dipinjam')
                                      ->join('peminjamans', 'peminjamans.barang_id = barangs.id AND peminjamans.status = "dipinjam"', 'left')
                                      ->where('barangs.id', $id)
                                      ->groupBy('barangs.id')
                                      ->first();
        
        if (!$data['barang']) {
            return redirect()->to('/admin/barang')->with('error', 'Barang tidak ditemukan.');
        }

        return view('admin/barang/show', $data);
    }

    public function update($id)
    {
        $rules = [
            'nama_barang' => 'required',
            'merk_barang' => 'required',
            'stok'        => 'required|numeric',
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        $barangModel = new BarangModel();
        
        $data = [
            'nama_barang' => $this->request->getPost('nama_barang'),
            'merk_barang' => $this->request->getPost('merk_barang'),
            'stok'        => $this->request->getPost('stok'),
        ];

        $fileGambar = $this->request->getFile('gambar');
        if ($fileGambar && $fileGambar->isValid() && !$fileGambar->hasMoved()) {
            $namaGambar = $fileGambar->getRandomName();
            $fileGambar->move(FCPATH . 'uploads/barangs', $namaGambar);
            $data['gambar'] = $namaGambar;
        }

        $barangModel->update($id, $data);

        return redirect()->to('/admin/barang')->with('success', 'Barang berhasil diupdate.');
    }

    public function delete($id)
    {
        $barangModel = new BarangModel();
        $barangModel->delete($id);

        return redirect()->to('/admin/barang')->with('success', 'Barang berhasil dihapus.');
    }
    
    public function export()
    {
        $barangModel = new BarangModel();
        $barangs = $barangModel->findAll();

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        
        $sheet->setCellValue('A1', 'ID Barang');
        $sheet->setCellValue('B1', 'Nama Barang');
        $sheet->setCellValue('C1', 'Merk Barang');
        $sheet->setCellValue('D1', 'Stok');

        $row = 2;
        foreach ($barangs as $b) {
            $sheet->setCellValue('A' . $row, $b->id_barang);
            $sheet->setCellValue('B' . $row, $b->nama_barang);
            $sheet->setCellValue('C' . $row, $b->merk_barang);
            $sheet->setCellValue('D' . $row, $b->stok);
            $row++;
        }

        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
        $fileName = 'Data_Barang_' . date('Ymd_His') . '.xlsx';
        
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . $fileName . '"');
        header('Cache-Control: max-age=0');
        
        $writer->save('php://output');
        exit();
    }

    public function downloadBarcode($id)
    {
        $barangModel = new BarangModel();
        $barang = $barangModel->find($id);
        
        if (!$barang) {
            return redirect()->back()->with('error', 'Barang tidak ditemukan.');
        }

        $qrCode = (new \chillerlan\QRCode\QRCode)->render($barang->id_barang);
        
        echo '<!DOCTYPE html>';
        echo '<html>';
        echo '<head>';
        echo '<title>Print Barcode - ' . htmlspecialchars($barang->nama_barang) . '</title>';
        echo '<style>';
        echo '    @page { margin: 0.5cm; }';
        echo '    body { text-align: center; margin-top: 50px; font-family: Arial, sans-serif; }';
        echo '    .barcode-wrapper { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; margin: 20px auto; border: 1px dashed #ccc; padding: 5px; }';
        echo '    .barcode-container { display: flex; justify-content: center; align-items: center; }';
        echo '    .barcode-container img { width: 3cm; height: 3cm; object-fit: contain; }';
        echo '    .barcode-name { font-size: 10px; font-weight: bold; margin-top: 4px; max-width: 3cm; word-wrap: break-word; line-height: 1.2; }';
        echo '    .btn-print { margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; }';
        echo '    @media print {';
        echo '        body { margin-top: 0; }';
        echo '        .barcode-wrapper { border: none; margin: 0; padding: 0; }';
        echo '        .barcode-container img {';
        echo '            width: 3cm !important;';
        echo '            height: 3cm !important;';
        echo '        }';
        echo '        .barcode-name { font-size: 9px !important; }';
        echo '        .btn-print, button, h2 {';
        echo '            display: none !important;';
        echo '        }';
        echo '    }';
        echo '</style>';
        echo '</head>';
        echo '<body>';
        echo '<h2>Barcode: ' . htmlspecialchars($barang->nama_barang) . '</h2>';
        echo '<div class="barcode-wrapper">';
        echo '    <div class="barcode-container"><img src="' . $qrCode . '" alt="QR Code" /></div>';
        echo '    <div class="barcode-name">' . htmlspecialchars($barang->nama_barang) . '</div>';
        echo '</div><br>';
        echo '<button class="btn-print" onclick="window.print()">Print Barcode</button>';
        echo '</body>';
        echo '</html>';
        exit();
    }

    public function printAllBarcodes()
    {
        $barangModel = new BarangModel();
        $barangs = $barangModel->findAll();
        
        echo '<!DOCTYPE html>';
        echo '<html>';
        echo '<head>';
        echo '<title>Print Semua Barcode</title>';
        echo '<style>';
        echo '    @page { margin: 1cm; }'; // larger margin for A4 printing
        echo '    body { font-family: Arial, sans-serif; margin: 20px; text-align: center; }';
        echo '    .grid-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; }';
        echo '    .barcode-wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px dashed #ccc; padding: 5px; width: 3.5cm; break-inside: avoid; page-break-inside: avoid; }';
        echo '    .barcode-container { display: flex; justify-content: center; align-items: center; }';
        echo '    .barcode-container img { width: 3cm; height: 3cm; object-fit: contain; }';
        echo '    .barcode-name { font-size: 10px; font-weight: bold; margin-top: 4px; max-width: 3cm; text-align: center; word-wrap: break-word; line-height: 1.2; }';
        echo '    .btn-print { margin-bottom: 30px; padding: 10px 20px; font-size: 16px; cursor: pointer; background: #00236f; color: white; border: none; border-radius: 5px; }';
        echo '    @media print {';
        echo '        body { margin: 0; }';
        echo '        .btn-print, h2 { display: none !important; }';
        echo '        .barcode-wrapper { border: none; padding: 2px; }';
        echo '        .barcode-container img { width: 3cm !important; height: 3cm !important; }';
        echo '        .grid-container { gap: 10px; justify-content: flex-start; }';
        echo '    }';
        echo '</style>';
        echo '</head>';
        echo '<body>';
        echo '<h2>Print Semua Barcode</h2>';
        echo '<button class="btn-print" onclick="window.print()">Print Sekarang</button>';
        echo '<div class="grid-container">';
        
        $qrCodeMaker = new \chillerlan\QRCode\QRCode();
        foreach ($barangs as $barang) {
            $qrCode = $qrCodeMaker->render($barang->id_barang);
            echo '    <div class="barcode-wrapper">';
            echo '        <div class="barcode-container"><img src="' . $qrCode . '" alt="QR Code" /></div>';
            echo '        <div class="barcode-name">' . htmlspecialchars($barang->nama_barang) . '</div>';
            echo '    </div>';
        }
        
        echo '</div>';
        echo '</body>';
        echo '</html>';
        exit();
    }

    public function import()
    {
        $file = $this->request->getFile('file_excel');
        
        if (!$file || !$file->isValid()) {
            return redirect()->back()->with('error', 'File tidak valid.');
        }

        $extension = $file->getClientExtension();
        if ($extension !== 'xlsx' && $extension !== 'xls') {
            return redirect()->back()->with('error', 'Format file harus xlsx atau xls.');
        }

        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReaderForFile($file->getTempName());
        $spreadsheet = $reader->load($file->getTempName());
        $sheetData = $spreadsheet->getActiveSheet()->toArray();

        $barangModel = new BarangModel();
        
        $count = 0;
        foreach ($sheetData as $key => $row) {
            if ($key == 0) continue; // Skip header

            if (!empty($row[0]) && !empty($row[1])) {
                // Periksa apakah id_barang sudah ada
                $existing = $barangModel->where('id_barang', $row[0])->first();
                if (!$existing) {
                    $barangModel->insert([
                        'id_barang'   => $row[0],
                        'nama_barang' => $row[1],
                        'merk_barang' => $row[2] ?? '-',
                        'stok'        => $row[3] ?? 0,
                        'gambar'      => 'default.png',
                        'barcode'     => $row[0]
                    ]);
                    $count++;
                }
            }
        }

        return redirect()->to('/admin/barang')->with('success', $count . ' data barang berhasil diimport.');
    }
}
