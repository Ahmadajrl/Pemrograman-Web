MANUAL BOOK
SISTEM INFORMASI PEMINJAMAN BARANG BERBASIS WEBSITE

A.	Deskripsi Aplikasi
Sistem Informasi Peminjaman Barang merupakan aplikasi berbasis website yang digunakan untuk membantu proses pengelolaan data barang dan transaksi peminjaman secara digital. Aplikasi ini dibuat untuk mempermudah pengguna dalam melakukan proses peminjaman barang serta membantu admin dalam melakukan pengelolaan data barang, pengguna, dan riwayat transaksi.
Dengan adanya sistem ini, proses pencatatan peminjaman yang sebelumnya dilakukan secara manual dapat dilakukan secara lebih cepat, terstruktur, dan mudah dipantau.
B.	Tujuan Aplikasi
Tujuan dibuatnya aplikasi ini adalah:
1.	Mempermudah proses pendataan barang.
2.	Membantu pengguna melakukan peminjaman barang secara online.
3.	Membantu admin mengelola data barang dan transaksi.
4.	Mengurangi kesalahan pencatatan peminjaman.
5.	Menyediakan informasi mengenai status barang secara real-time.
C.	Perangkat Keras
Perangkat keras yang diperlukan:
•	Komputer atau laptop.
•	Processor minimal Intel Core i3 atau setara.
•	RAM minimal 4 GB.
•	Penyimpanan yang cukup untuk menjalankan aplikasi.
D.	Perangkat Lunak
Perangkat lunak yang digunakan:
•	Sistem Operasi Windows/Linux/MacOS.
•	Web Browser seperti Google Chrome atau Microsoft Edge.
•	Web Server (XAMPP/Laragon jika menggunakan PHP).
•	Database Management System.
•	Node.js dan npm apabila diperlukan untuk menjalankan bagian frontend.
E.	Persiapan Database
1.	Jalankan aplikasi server seperti XAMPP.
2.	Aktifkan Apache dan MySQL.
3.	Buat database baru sesuai konfigurasi aplikasi.
4.	Import file database yang tersedia.
5.	Pastikan konfigurasi database sudah sesuai.
F.	Menjalankan Aplikasi
Langkah menjalankan aplikasi:
1.	Buka folder proyek aplikasi.
2.	Pastikan seluruh dependency telah tersedia.
3.	Jalankan instalasi dependency menggunakan perintah:
npm install
4.	Jalankan aplikasi menggunakan perintah:
npm run dev
5.	Buka browser.
6.	Masukkan alamat aplikasi sesuai server yang digunakan.
G.	Fungsi Login
Halaman login digunakan sebagai proses autentikasi pengguna sebelum masuk ke dalam sistem.
Pengguna harus memasukkan:
•	Username/email.
•	Password.
Setelah data benar, pengguna akan diarahkan menuju halaman utama sesuai hak akses.
CATATAN
Akun demo Admin adalah:
Username: admin
Password: password





Panduan Penggunaan User & Admin
A.	Dashboard User
Dashboard merupakan halaman utama pengguna setelah berhasil login.
Pada halaman ini pengguna dapat melihat:
•	Informasi aplikasi.
•	Daftar barang.
•	Status peminjaman.
•	Informasi akun pengguna.
 
 
B.	Melakukan Peminjaman dan Pengembalian Barang
Langkah peminjaman:
1.	Klik tombol “Scan & Pinjam”
2.	Scan barcode yang menempel pada barang yang ingin dipinjam
Langkah pengembalian:
1.	Klik tombol “Scan & Kembalikan”
2.	Scan barcode yang menempel pada barang yang sedang dipinjam / ingin dikembalikan

C.	Dashboard Admin
Dashboard admin digunakan untuk melakukan monitoring dan pengelolaan sistem.
Admin dapat melihat:
•	Jumlah barang.
•	Jumlah transaksi.
•	Data pengguna.
•	Status peminjaman.
 
D.	Mengelola Data Barang
 
Admin dapat melakukan:
E.	Menambah Barang
Langkah:
1.	Masuk menu kelola barang.
2.	Klik tombol tambah barang.
3.	Masukkan informasi barang.
4.	Klik simpan.
 
F.	Mengubah Data Barang
Langkah:
1.	Pilih barang.
2.	Klik tombol edit.
3.	Ubah informasi yang diperlukan.
4.	Simpan perubahan.
G.	Menghapus Data Barang
Langkah:
1.	Pilih barang.
2.	Klik tombol hapus.
3.	Konfirmasi penghapusan.
H.	Mengelola Data Peminjaman
Admin dapat melakukan pemeriksaan transaksi peminjaman.



I.	Status Peminjaman Barang
Sistem memiliki beberapa status transaksi:
Tersedia
Menunjukkan bahwa barang masih tersedia dan siap untuk dipinjam.
Habis
Menunjukkan bahwa stok barang sedang habis karena masih belum dikembalikan user.
Dipinjam
Menunjukkan bahwa barang sedang dalam peminjaman user.
Dikembalikan
Menunjukkan bahwa barang telah dikembalikan dan transaksi telah selesai.
J.	Keamanan Sistem
Beberapa hal yang perlu diperhatikan:
1.	Jangan membagikan username dan password kepada orang lain.
2.	Pastikan melakukan logout setelah selesai menggunakan aplikasi.
3.	Admin harus melakukan pengecekan sebelum menyetujui peminjaman.
4.	Data barang harus diperbarui secara berkala.
K.	Penutup
Manual book ini dibuat sebagai panduan penggunaan Sistem Informasi Peminjaman Barang berbasis website. Dengan adanya aplikasi ini diharapkan proses pengelolaan barang dan transaksi peminjaman dapat dilakukan secara lebih efektif, cepat, dan terorganisir.
Pengembangan sistem dapat dilakukan secara berkelanjutan dengan menambahkan fitur baru sesuai kebutuhan pengguna.

