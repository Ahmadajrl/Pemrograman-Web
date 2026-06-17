# MANUAL BOOK

# SISTEM INFORMASI PEMINJAMAN BARANG BERBASIS WEBSITE

## 1. Pendahuluan

### 1.1 Deskripsi Aplikasi

Sistem Informasi Peminjaman Barang merupakan aplikasi berbasis website yang digunakan untuk membantu proses pengelolaan data barang dan transaksi peminjaman secara digital. Aplikasi ini dibuat untuk mempermudah pengguna dalam melakukan proses peminjaman barang serta membantu admin dalam melakukan pengelolaan data barang, pengguna, dan riwayat transaksi.

Dengan adanya sistem ini, proses pencatatan peminjaman yang sebelumnya dilakukan secara manual dapat dilakukan secara lebih cepat, terstruktur, dan mudah dipantau.

### 1.2 Tujuan Aplikasi

Tujuan dibuatnya aplikasi ini adalah:

1. Mempermudah proses pendataan barang.
2. Membantu pengguna melakukan peminjaman barang secara online.
3. Membantu admin mengelola data barang dan transaksi.
4. Mengurangi kesalahan pencatatan peminjaman.
5. Menyediakan informasi mengenai status barang secara real-time.

---

# 2. Kebutuhan Sistem

## 2.1 Perangkat Keras

Perangkat keras yang diperlukan:

* Komputer atau laptop.
* Processor minimal Intel Core i3 atau setara.
* RAM minimal 4 GB.
* Penyimpanan yang cukup untuk menjalankan aplikasi.

## 2.2 Perangkat Lunak

Perangkat lunak yang digunakan:

* Sistem Operasi Windows/Linux/MacOS.
* Web Browser seperti Google Chrome atau Microsoft Edge.
* Web Server (XAMPP/Laragon jika menggunakan PHP).
* Database Management System.
* Node.js dan npm apabila diperlukan untuk menjalankan bagian frontend.

---

# 3. Cara Menjalankan Aplikasi

## 3.1 Persiapan Database

1. Jalankan aplikasi server seperti XAMPP.
2. Aktifkan Apache dan MySQL.
3. Buat database baru sesuai konfigurasi aplikasi.
4. Import file database yang tersedia.
5. Pastikan konfigurasi database sudah sesuai.

---

## 3.2 Menjalankan Aplikasi

Langkah menjalankan aplikasi:

1. Buka folder proyek aplikasi.
2. Pastikan seluruh dependency telah tersedia.
3. Jalankan instalasi dependency menggunakan perintah:

```
npm install
```

4. Jalankan aplikasi menggunakan perintah:

```
npm run dev
```

5. Buka browser.
6. Masukkan alamat aplikasi sesuai server yang digunakan.

---

# 4. Halaman Login

## 4.1 Fungsi Login

Halaman login digunakan sebagai proses autentikasi pengguna sebelum masuk ke dalam sistem.

Pengguna harus memasukkan:

* Username/email.
* Password.

Setelah data benar, pengguna akan diarahkan menuju halaman utama sesuai hak akses.

---

# 5. Panduan Penggunaan User

## 5.1 Dashboard User

Dashboard merupakan halaman utama pengguna setelah berhasil login.

Pada halaman ini pengguna dapat melihat:

* Informasi aplikasi.
* Daftar barang.
* Status peminjaman.
* Informasi akun pengguna.

---

## 5.2 Melihat Data Barang

Langkah penggunaan:

1. Pilih menu daftar barang.
2. Sistem akan menampilkan daftar barang yang tersedia.
3. Pengguna dapat melihat informasi:

* Nama barang.
* Deskripsi barang.
* Jumlah barang.
* Status ketersediaan.

---

## 5.3 Melakukan Peminjaman Barang

Langkah peminjaman:

1. Pilih barang yang ingin dipinjam.
2. Klik tombol peminjaman.
3. Isi data peminjaman.
4. Periksa kembali data yang dimasukkan.
5. Klik tombol simpan/ajukan peminjaman.
6. Sistem akan menyimpan permintaan peminjaman.

---

## 5.4 Melihat Riwayat Peminjaman

Langkah:

1. Masuk ke menu riwayat peminjaman.
2. Sistem menampilkan daftar transaksi yang pernah dilakukan.
3. Pengguna dapat melihat status:

* Menunggu persetujuan.
* Disetujui.
* Ditolak.
* Selesai.

---

# 6. Panduan Penggunaan Admin

## 6.1 Dashboard Admin

Dashboard admin digunakan untuk melakukan monitoring dan pengelolaan sistem.

Admin dapat melihat:

* Jumlah barang.
* Jumlah transaksi.
* Data pengguna.
* Status peminjaman.

---

## 6.2 Mengelola Data Barang

Admin dapat melakukan:

### Menambah Barang

Langkah:

1. Masuk menu data barang.
2. Klik tombol tambah barang.
3. Masukkan informasi barang.
4. Klik simpan.

### Mengubah Data Barang

Langkah:

1. Pilih barang.
2. Klik tombol edit.
3. Ubah informasi yang diperlukan.
4. Simpan perubahan.

### Menghapus Data Barang

Langkah:

1. Pilih barang.
2. Klik tombol hapus.
3. Konfirmasi penghapusan.

---

## 6.3 Mengelola Data Peminjaman

Admin dapat melakukan pemeriksaan transaksi peminjaman.

Langkah:

1. Masuk menu peminjaman.
2. Pilih transaksi yang masuk.
3. Periksa detail peminjaman.
4. Admin dapat memberikan keputusan:

* Menyetujui peminjaman.
* Menolak peminjaman.
* Mengubah status barang.

---

## 6.4 Mengelola Data Pengguna

Admin dapat melihat dan mengelola data pengguna yang terdaftar dalam sistem.

Data yang dapat dikelola:

* Nama pengguna.
* Username.
* Hak akses.
* Informasi akun.

---

# 7. Status Peminjaman Barang

Sistem memiliki beberapa status transaksi:

## Menunggu

Menunjukkan bahwa permintaan peminjaman belum diperiksa oleh admin.

## Disetujui

Menunjukkan bahwa peminjaman telah diterima dan barang dapat digunakan.

## Ditolak

Menunjukkan bahwa permintaan peminjaman tidak dapat diproses.

## Selesai

Menunjukkan bahwa barang telah dikembalikan dan transaksi telah selesai.

---

# 8. Keamanan Sistem

Beberapa hal yang perlu diperhatikan:

1. Jangan membagikan username dan password kepada orang lain.
2. Pastikan melakukan logout setelah selesai menggunakan aplikasi.
3. Admin harus melakukan pengecekan sebelum menyetujui peminjaman.
4. Data barang harus diperbarui secara berkala.

---

# 9. Penutup

Manual book ini dibuat sebagai panduan penggunaan Sistem Informasi Peminjaman Barang berbasis website. Dengan adanya aplikasi ini diharapkan proses pengelolaan barang dan transaksi peminjaman dapat dilakukan secara lebih efektif, cepat, dan terorganisir.

Pengembangan sistem dapat dilakukan secara berkelanjutan dengan menambahkan fitur baru sesuai kebutuhan pengguna.
