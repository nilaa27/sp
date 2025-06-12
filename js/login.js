// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const messageElement = document.getElementById('loginMessage');

    // --- Toggle Password Visibility ---
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            // Dapatkan tipe saat ini
            const currentType = passwordInput.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';

            // Pemicu animasi keluar
            togglePassword.classList.add('text-exit');
            togglePassword.classList.remove('text-enter');

            // Setelah animasi keluar selesai, ubah teks dan picu animasi masuk
            togglePassword.addEventListener('animationend', () => {
                passwordInput.setAttribute('type', newType);
                if (newType === 'text') {
                    togglePassword.textContent = 'Hide';
                } else {
                    togglePassword.textContent = 'Show';
                }
                togglePassword.classList.remove('text-exit');
                togglePassword.classList.add('text-enter');
            }, { once: true }); // Pastikan event listener hanya berjalan sekali
        });
    }

    // --- Login Logic ---
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            performLogin();
        });

        // Allow login on 'Enter' key press
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performLogin();
            }
        });
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performLogin();
            }
        });
    }

    function performLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === 'admin' && password === '123') {
            window.location.href = 'spotify_surprise.html';
        } else {
            messageElement.textContent = 'Username atau password salah. Mohon coba lagi!';
            passwordInput.value = '';
            
            // Reset teks toggle ke "Show" dan picu animasi
            togglePassword.classList.add('text-exit');
            togglePassword.classList.remove('text-enter');
            togglePassword.addEventListener('animationend', () => {
                togglePassword.textContent = 'Show';
                togglePassword.classList.remove('text-exit');
                togglePassword.classList.add('text-enter');
            }, { once: true });

            messageElement.style.animation = 'none';
            void messageElement.offsetWidth;
            messageElement.style.animation = 'shake 0.5s ease-in-out';
        }
    }
});
