<?php
header('Content-Type: application/json'); // Memberi tahu browser bahwa responsnya adalah JSON

// Path ke file penyimpanan data user
$dataFile = 'data.txt';

// Fungsi untuk membaca data user dari file
function getUsers($file) {
    if (!file_exists($file)) {
        return [];
    }
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $users = [];
    foreach ($lines as $line) {
        list($username, $password) = explode(':', $line, 2); // Limit 2 untuk password yang mungkin ada ':'
        $users[trim($username)] = trim($password);
    }
    return $users;
}

// Fungsi untuk menambahkan user baru (opsional, untuk register sederhana)
function addUser($file, $username, $password) {
    $currentUsers = getUsers($file);
    if (isset($currentUsers[$username])) {
        return false; // User sudah ada
    }
    $handle = fopen($file, 'a');
    if ($handle) {
        fwrite($handle, "$username:$password\n");
        fclose($handle);
        return true;
    }
    return false;
}

// ------ Bagian Ini Hanya Untuk Demo: Menambahkan User Awal Jika File Kosong --------
// Anda bisa menghapus bagian ini setelah menjalankan pertama kali atau jika Anda menambahkan user secara manual
if (!file_exists($dataFile) || filesize($dataFile) === 0) {
    addUser($dataFile, 'userdemo', 'passdemo');
    addUser($dataFile, 'admin', 'admin123');
}
// -----------------------------------------------------------------------------------


// Ambil data dari request POST
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$response = ['success' => false, 'message' => ''];

if (empty($username) || empty($password)) {
    $response['message'] = 'Username dan password tidak boleh kosong.';
    echo json_encode($response);
    exit;
}

$users = getUsers($dataFile);

// Cek kredensial
if (isset($users[$username]) && $users[$username] === $password) {
    $response['success'] = true;
    $response['message'] = 'Login Berhasil! Selamat datang, ' . htmlspecialchars($username) . '!';
} else {
    $response['message'] = 'Username atau password salah.';
}

echo json_encode($response);
?>
