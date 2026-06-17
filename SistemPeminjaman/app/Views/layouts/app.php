<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Peminjaman</title>
    <!-- TailwindCSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal pt-24">

    <nav class="bg-blue-600 p-4 shadow fixed w-full z-50 top-0 left-0">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <a class="text-white text-xl font-bold" href="<?= base_url() ?>">Sistem Peminjaman</a>
            <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
                <?php if(session()->get('isLoggedIn')): ?>
                    <span class="text-white text-sm md:text-base">Halo, <?= session()->get('name') ?></span>
                <?php else: ?>
                    <div class="flex gap-4 w-full md:w-auto justify-center">
                        <a href="<?= base_url('login') ?>" class="bg-blue-700 md:bg-transparent px-4 py-2 md:p-0 rounded text-white hover:text-gray-200 transition-colors w-full md:w-auto text-center">Login</a>
                        <a href="<?= base_url('register') ?>" class="bg-blue-700 md:bg-transparent px-4 py-2 md:p-0 rounded text-white hover:text-gray-200 transition-colors w-full md:w-auto text-center">Register</a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4">
        <?php if(session()->getFlashdata('success')): ?>
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <?= session()->getFlashdata('success') ?>
            </div>
        <?php endif; ?>
        <?php if(session()->getFlashdata('error')): ?>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <?= session()->getFlashdata('error') ?>
            </div>
        <?php endif; ?>

        <?= $this->renderSection('content') ?>
    </div>

    <?php if(session()->get('isLoggedIn')): ?>
        <div class="container mx-auto px-4 mt-8 mb-4">
            <form action="<?= base_url('logout') ?>" method="post" class="block w-full">
                <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors text-center">
                    Logout
                </button>
            </form>
        </div>
    <?php endif; ?>

</body>
</html>
