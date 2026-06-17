<?= $this->extend('layouts/app') ?>

<?= $this->section('content') ?>
<div class="max-w-md mx-auto bg-white rounded p-6 shadow-md">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    
    <?php if(session()->getFlashdata('errors')): ?>
        <div class="bg-red-100 text-red-700 p-3 rounded mb-4">
            <ul>
                <?php foreach(session()->getFlashdata('errors') as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form action="<?= base_url('register') ?>" method="post">
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">Nama</label>
            <input type="text" name="name" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" value="<?= old('name') ?>">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">Username</label>
            <input type="text" name="username" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" value="<?= old('username') ?>">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2">Password</label>
            <input type="password" name="password" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Register</button>
    </form>
</div>
<?= $this->endSection() ?>
