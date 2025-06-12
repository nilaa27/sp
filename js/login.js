// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const messageElement = document.getElementById('loginMessage');
    const loginContainer = document.querySelector('.login-container'); // Ambil container

    // Tambahkan class 'loaded' setelah animasi slideInPixel selesai
    loginContainer.addEventListener('animationend', (event) => {
        if (event.animationName === 'slideInPixel') {
            loginContainer.classList.add('loaded');
        }
    }, { once: true });


    // --- Toggle Password Visibility ---
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const currentType = passwordInput.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';

            togglePassword.classList.add('text-exit');
            togglePassword.classList.remove('text-enter');

            // Gunakan setTimeout sebagai pengganti animationend untuk transisi yang lebih cepat
            // Karena steps() animationend mungkin tidak selalu stabil untuk transisi sangat cepat.
            setTimeout(() => {
                passwordInput.setAttribute('type', newType);
                togglePassword.textContent = newType === 'text' ? 'HIDE' : 'SHOW';
                togglePassword.classList.remove('text-exit');
                togglePassword.classList.add('text-enter');
            }, 100); // Durasi setTimeout harus kurang dari atau sama dengan durasi animasi CSS (0.2s)
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
            
            // Reset toggle text ke "SHOW"
            togglePassword.classList.add('text-exit');
            togglePassword.classList.remove('text-enter');
            setTimeout(() => {
                togglePassword.textContent = 'SHOW';
                togglePassword.classList.remove('text-exit');
                togglePassword.classList.add('text-enter');
            }, 100);

            messageElement.style.animation = 'none';
            void messageElement.offsetWidth;
            messageElement.style.animation = 'shakePixel 0.3s steps(3)';
        }
    }
});
