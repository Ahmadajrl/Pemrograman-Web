<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', function() {
    if (session()->get('isLoggedIn')) {
        if (session()->get('role') === 'admin') {
            return redirect()->to('/admin/dashboard');
        }
        return redirect()->to('/karyawan/dashboard');
    }
    return redirect()->to('/login');
});

$routes->group('', ['filter' => 'guest'], static function ($routes) {
    $routes->get('login', 'Auth::showLoginForm');
    $routes->post('login', 'Auth::login');
    $routes->get('register', 'Auth::showRegisterForm');
    $routes->post('register', 'Auth::register');
});

$routes->post('logout', 'Auth::logout', ['filter' => 'auth']);

$routes->group('api', ['filter' => 'auth'], static function ($routes) {
    $routes->get('search', 'Api\GlobalSearch::search');
    $routes->get('notifications', 'Api\Notification::index');
    $routes->post('notifications/read-all', 'Api\Notification::markAllAsRead');
    $routes->post('notifications/(:num)/read', 'Api\Notification::markAsRead/$1');
});

$routes->group('admin', ['filter' => 'role:admin'], static function ($routes) {
    $routes->get('dashboard', 'Admin\Dashboard::index');
    
    $routes->get('barang/print-all-barcodes', 'Admin\Barang::printAllBarcodes');
    $routes->get('barang/(:num)/barcode', 'Admin\Barang::downloadBarcode/$1');
    $routes->get('barang/show/(:num)', 'Admin\Barang::show/$1');
    $routes->get('barang', 'Admin\Barang::index');
    $routes->get('barang/create', 'Admin\Barang::create');
    $routes->post('barang/store', 'Admin\Barang::store');
    $routes->get('barang/edit/(:num)', 'Admin\Barang::edit/$1');
    $routes->post('barang/update/(:num)', 'Admin\Barang::update/$1');
    $routes->post('barang/delete/(:num)', 'Admin\Barang::delete/$1');
    $routes->get('barang/export', 'Admin\Barang::export');
    $routes->post('barang/import', 'Admin\Barang::import');
    
    $routes->get('transaksi', 'Admin\Transaksi::index');
    $routes->get('karyawan/(:num)', 'Admin\Karyawan::show/$1');
});

$routes->group('karyawan', ['filter' => 'role:karyawan'], static function ($routes) {
    $routes->get('dashboard', 'Karyawan\Peminjaman::dashboard');
    $routes->post('pinjam', 'Karyawan\Peminjaman::pinjam');
    $routes->post('kembali', 'Karyawan\Peminjaman::kembali');
    $routes->post('scan-pinjam', 'Karyawan\Peminjaman::scanPinjam');
    $routes->post('scan-kembali', 'Karyawan\Peminjaman::scanKembali');
});
