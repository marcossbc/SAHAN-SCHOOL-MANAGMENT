document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showLoginBtn = document.getElementById('show-login-btn');
    const showSignupBtn = document.getElementById('show-signup-btn');

    // ===== Form Toggle =====
    function showForm(formToShow, buttonToActivate) {
        loginForm.classList.remove('active');
        signupForm.classList.remove('active');
        showLoginBtn.classList.remove('active');
        showSignupBtn.classList.remove('active');

        formToShow.classList.add('active');
        buttonToActivate.classList.add('active');
    }

    showLoginBtn.addEventListener('click', () => showForm(loginForm, showLoginBtn));
    showSignupBtn.addEventListener('click', () => showForm(signupForm, showSignupBtn));

    // ===== Signup =====
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = signupForm.elements['signup-username'].value.trim();
        const email = signupForm.elements['signup-email'].value.trim();
        const password = signupForm.elements['signup-password'].value;
        const confirmPassword = signupForm.elements['confirm-password'].value;

        if (password !== confirmPassword) {
            alert("Password-ka iyo xaqiijinta password-ka isku mid ma ahan.");
            return;
        }

        // Check if user already exists
        if (localStorage.getItem(username)) {
            alert("Magacan hore ayaa loo isticmaalay. Fadlan dooro magac kale.");
            return;
        }

        // Save user to localStorage
        const userData = { username, email, password };
        localStorage.setItem(username, JSON.stringify(userData));

        alert("Isdiiwaangelin Guuleysatay!");
        window.location.href = "/index.html" + encodeURIComponent(username);
    });

    // ===== Login =====
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = loginForm.elements['login-username'].value.trim();
        const password = loginForm.elements['login-password'].value;

        const storedUser = localStorage.getItem(username);

        if (!storedUser) {
            alert("User-kan ma diiwaangashna!");
            return;
        }

        const userData = JSON.parse(storedUser);

        if (userData.password === password) {
            alert("Gelitaan guuleystay!");
            window.location.href = "/index.html" + encodeURIComponent(username);
        } else {
            alert("Password-ka waa khalad!");
        }
    });
});
