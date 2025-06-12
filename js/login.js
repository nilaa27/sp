// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const messageElement = document.getElementById('loginMessage');
    const loginContainer = document.querySelector('.login-container');

    // Tambahkan class 'loaded' setelah animasi slideInPixel selesai
    loginContainer.addEventListener('animationend', (event) => {
        if (event.animationName === 'slideInPixel') {
            loginContainer.classList.add('loaded');
        }
    }, { once: true });


    // --- Toggle Password Visibility ---
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // HANYA toggle kelas ikon Font Awesome, tanpa mengubah teks
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // --- Login Logic ---
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            performLogin();
        });

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
            messageElement.textContent = 'ERROR: DATA TIDAK VALID.';
            passwordInput.value = '';
            
            // Reset ikon mata ke fa-eye (jika sebelumnya fa-eye-slash)
            // Tanpa mengubah teks, hanya mengatur kembali ikon
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');

            messageElement.style.animation = 'none';
            void messageElement.offsetWidth;
            messageElement.style.animation = 'shakePixel 0.3s steps(3)';
        }
    }
});
