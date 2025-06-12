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
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
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

        // Basic validation (for this local project)
        if (username === 'admin' && password === '123') {
            window.location.href = 'spotify_surprise.html';
        } else {
            messageElement.textContent = 'Username atau password salah. Mohon coba lagi!';
            // Clear password field for security
            passwordInput.value = '';
            // Trigger shake animation for error message
            messageElement.style.animation = 'none'; // Reset animation
            void messageElement.offsetWidth; // Trigger reflow
            messageElement.style.animation = 'shake 0.5s ease-in-out';
        }
    }
});
