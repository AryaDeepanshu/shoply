document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const passwordToggle = document.getElementById('password-toggle');
    const successMessage = document.getElementById('success-msg')
    
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault()
        let isValid = true;

        // Reset error messages
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        successMessage.textContent = ''

        // Validate username
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Username is required.';
            isValid = false;
        }

        // Validate email (non-empty and valid format)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[^\s]{8,}$/
        if (passwordInput.value === '') {
            passwordError.textContent = 'Password is required.';
            isValid = false;
        } else if (!passwordPattern.test(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol.';
            isValid = false;
        }

        if (isValid) {
            data = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value.trim()
            }
            fetch('/signup', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }).then((response) => {
                return response.json()
            }).then((res) => {
                if (res.error === "Account already exists")
                    emailError.textContent = res.error
                else if (res.error)
                    passwordError.textContent = res.error
                else {
                    successMessage.textContent = 'Email sent. Check your inbox to verify your account.'
                }
            })
        }
    });

    passwordToggle.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });
});