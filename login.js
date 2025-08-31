        document.addEventListener('DOMContentLoaded', () => {
            const showLoginBtn = document.getElementById('show-login-btn');
            const showSignupBtn = document.getElementById('show-signup-btn');
            const loginForm = document.getElementById('login-form');
            const signupForm = document.getElementById('signup-form');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const signupPasswordInput = document.getElementById('signup-password');

            showLoginBtn.addEventListener('click', () => {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
                showLoginBtn.classList.add('active');
                showSignupBtn.classList.remove('active');
            });

            showSignupBtn.addEventListener('click', () => {
                signupForm.classList.add('active');
                loginForm.classList.remove('active');
                showSignupBtn.classList.add('active');
                showLoginBtn.classList.remove('active');
            });

            signupForm.addEventListener('submit', (e) => {
                if (signupPasswordInput.value !== confirmPasswordInput.value) {
                    e.preventDefault();
                    alert('Passwords do not match!');
                    confirmPasswordInput.focus();
                } else {
                    alert('Sign Up Successful!');
                    // Normally you would submit the form data to a server
                    // e.g., using fetch() or a form submission
                }
            });
        });
