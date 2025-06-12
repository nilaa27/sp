document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari submit default

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Mengirim data ke server menggunakan Fetch API
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json()) // Menguraikan respons JSON
    .then(data => {
        if (data.success) {
            messageElement.textContent = data.message;
            messageElement.className = 'message success';
            // Anda bisa mengarahkan user ke halaman lain di sini
            // window.location.href = 'dashboard.html';
        } else {
            messageElement.textContent = data.message;
            messageElement.className = 'message'; // Default (error)
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageElement.textContent = 'Terjadi kesalahan saat menghubungi server.';
        messageElement.className = 'message';
    });
});
