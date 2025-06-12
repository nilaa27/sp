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
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the eye icon classes
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
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

        if (username === 'mayfa' && password === 'cantik') {
            window.location.href = 'spotify_surprise.html';
        } else {
            messageElement.textContent = 'Username atau password salah. Mohon coba lagi!';
            passwordInput.value = '';
            
            // Reset ikon mata ke fa-eye (jika sebelumnya fa-eye-slash)
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');

            messageElement.style.animation = 'none';
            void messageElement.offsetWidth;
            messageElement.style.animation = 'shake 0.5s ease-in-out';
        }
    }
});
