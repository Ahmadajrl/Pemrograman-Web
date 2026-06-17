# MANUAL BOOK

# SISTEM INFORMASI PEMINJAMAN BARANG BERBASIS WEBSITE

## A. Deskripsi Aplikasi

Sistem Informasi Peminjaman Barang merupakan aplikasi berbasis website yang digunakan untuk membantu proses pengelolaan data barang dan transaksi peminjaman secara digital. Aplikasi ini dibuat untuk mempermudah pengguna dalam melakukan proses peminjaman dan pengembalian barang menggunakan sistem barcode, serta membantu admin dalam melakukan pengelolaan data barang, data pengguna, dan riwayat transaksi.

Dengan adanya sistem ini, proses pencatatan peminjaman yang sebelumnya dilakukan secara manual dapat dilakukan secara lebih cepat, terstruktur, dan mudah dipantau. Selain itu, sistem ini dapat membantu admin dalam mengetahui kondisi barang secara real-time berdasarkan status ketersediaannya.

## B. Tujuan Aplikasi

Tujuan dibuatnya aplikasi ini adalah:

1. Mempermudah proses pendataan dan pengelolaan barang.
2. Membantu pengguna melakukan proses peminjaman dan pengembalian barang secara digital.
3. Membantu admin melakukan monitoring transaksi peminjaman.
4. Mengurangi kesalahan pencatatan data barang dan transaksi.
5. Menyediakan informasi status barang secara cepat dan akurat.
6. Meningkatkan efisiensi pengelolaan inventaris barang.

## C. Perangkat Keras

Perangkat keras yang diperlukan:

• Komputer atau laptop.
• Processor minimal Intel Core i3 atau setara.
• RAM minimal 4 GB.
• Penyimpanan yang cukup untuk menjalankan aplikasi.
• Kamera perangkat untuk melakukan scan barcode.

## D. Perangkat Lunak

Perangkat lunak yang digunakan:

• Sistem Operasi Windows/Linux/MacOS.
• Web Browser seperti Google Chrome atau Microsoft Edge.
• Node.js dan npm untuk menjalankan aplikasi frontend.
• Database Management System sesuai konfigurasi aplikasi.
• Web Server apabila aplikasi membutuhkan server lokal.

## E. Persiapan Database

Langkah persiapan database:

1. Jalankan aplikasi server seperti XAMPP/Laragon apabila diperlukan.
2. Aktifkan layanan database.
3. Buat database baru sesuai konfigurasi aplikasi.
4. Import file database yang tersedia.
5. Pastikan konfigurasi database pada file environment sudah sesuai.
6. Pastikan aplikasi dapat terhubung dengan database.

## F. Menjalankan Aplikasi

Langkah menjalankan aplikasi:

1. Buka folder proyek aplikasi.
2. Buka terminal pada folder proyek.
3. Pastikan seluruh dependency aplikasi telah tersedia.
4. Jalankan instalasi dependency menggunakan perintah:

```
npm install
```

5. Jalankan aplikasi menggunakan perintah:

```
npm run dev
```

6. Buka browser.
7. Masukkan alamat aplikasi sesuai server yang digunakan.

## G. Fungsi Login

Halaman login digunakan sebagai proses autentikasi pengguna sebelum masuk ke dalam sistem.

Pengguna harus memasukkan:

• Username/email.
• Password.

Setelah data login berhasil diverifikasi, pengguna akan diarahkan menuju halaman utama sesuai dengan hak akses masing-masing.

### CATATAN

Akun demo Admin:

Username : admin
Password : password

# Panduan Penggunaan User & Admin

# A. Dashboard User

Dashboard user merupakan halaman utama yang digunakan pengguna setelah berhasil melakukan login.

Pada halaman ini pengguna dapat melihat:

• Informasi aplikasi.
• Daftar barang yang tersedia.
• Status barang.
• Riwayat transaksi peminjaman.
• Informasi akun pengguna.

# B. Melakukan Peminjaman dan Pengembalian Barang

## 1. Melakukan Peminjaman Barang

Langkah peminjaman barang:

1. Login menggunakan akun pengguna.
2. Masuk ke halaman dashboard user.
3. Klik tombol **"Scan & Pinjam"**.
4. Izinkan akses kamera apabila diminta.
5. Scan barcode yang terdapat pada barang yang ingin dipinjam.
6. Sistem akan membaca kode barcode barang.
7. Data barang akan masuk ke transaksi peminjaman.
8. Pastikan data barang sudah sesuai.
9. Peminjaman berhasil dilakukan.

## 2. Melakukan Pengembalian Barang

Langkah pengembalian barang:

1. Login menggunakan akun pengguna.
2. Klik tombol **"Scan & Kembalikan"**.
3. Scan barcode yang terdapat pada barang yang sedang dipinjam.
4. Sistem akan melakukan pengecekan data peminjaman.
5. Barang akan diproses sebagai barang yang dikembalikan.
6. Status barang akan berubah menjadi tersedia.

# C. Dashboard Admin

Dashboard admin digunakan untuk melakukan monitoring dan pengelolaan seluruh sistem.

Admin dapat melihat:

• Jumlah barang.
• Jumlah transaksi peminjaman.
• Data pengguna.
• Status barang.
• Riwayat peminjaman dan pengembalian.

# D. Mengelola Data Barang

Admin dapat melakukan pengelolaan data barang seperti:

• Menambahkan barang baru.
• Mengubah informasi barang.
• Menghapus data barang.
• Melihat jumlah stok barang.
• Melihat status barang.

# E. Menambah Barang

Langkah menambah barang:

1. Masuk ke menu **Kelola Barang**.
2. Klik tombol **Tambah Barang**.
3. Masukkan informasi barang seperti:

   * Nama barang.
   * Kategori barang.
   * Jumlah stok.
   * Deskripsi barang.
   * Data barcode.
4. Klik tombol simpan.
5. Data barang berhasil ditambahkan.

# F. Mengubah Data Barang

Langkah mengubah data barang:

1. Masuk ke menu **Kelola Barang**.
2. Pilih barang yang ingin diubah.
3. Klik tombol **Edit**.
4. Ubah informasi barang yang diperlukan.
5. Klik tombol simpan perubahan.

# G. Menghapus Data Barang

Langkah menghapus data barang:

1. Pilih barang yang ingin dihapus.
2. Klik tombol **Hapus**.
3. Sistem akan menampilkan konfirmasi penghapusan.
4. Klik konfirmasi untuk menghapus data.

# H. Mengelola Data Peminjaman

Admin dapat melakukan pemeriksaan dan monitoring transaksi peminjaman barang.

Fitur yang dapat dilakukan admin:

• Melihat daftar transaksi peminjaman.
• Melihat pengguna yang melakukan peminjaman.
• Melihat barang yang sedang dipinjam.
• Memantau status pengembalian barang.
• Melihat riwayat transaksi.

# I. Status Barang

Sistem memiliki beberapa status barang sebagai berikut:

## Tersedia

Menunjukkan bahwa barang masih tersedia dan dapat digunakan untuk proses peminjaman.

## Habis

Menunjukkan bahwa stok barang sedang tidak tersedia karena seluruh barang sedang digunakan atau belum dikembalikan.

## Dipinjam

Menunjukkan bahwa barang sedang digunakan oleh pengguna dan belum dikembalikan.

## Dikembalikan

Menunjukkan bahwa barang telah dikembalikan oleh pengguna dan transaksi peminjaman telah selesai.

# J. Keamanan Sistem

Beberapa hal yang perlu diperhatikan:

1. Jangan membagikan username dan password kepada orang lain.
2. Pastikan melakukan logout setelah selesai menggunakan aplikasi.
3. Admin harus melakukan pengecekan data sebelum melakukan perubahan.
4. Data barang harus diperbarui secara berkala.
5. Pastikan barcode barang tetap dalam kondisi baik agar proses scan dapat berjalan.

# K. Penutup

Manual book ini dibuat sebagai panduan penggunaan Sistem Informasi Peminjaman Barang berbasis website. Dengan adanya aplikasi ini diharapkan proses pengelolaan barang, peminjaman, dan pengembalian barang dapat dilakukan secara lebih efektif, cepat, dan terorganisir.

Aplikasi ini dapat terus dikembangkan dengan menambahkan fitur baru sesuai kebutuhan pengguna dan perkembangan sistem pengelolaan inventaris.
