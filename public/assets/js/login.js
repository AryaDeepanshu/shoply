document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const Message = document.getElementById('show-message')

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        //Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';

        // Validate email (non-empty and valid format)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        }

        if (isValid) {
            data = {
                email: emailInput.value,
                password: passwordInput.value.trim()
            }
            fetch('/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }).then((response) => {
                return response.json()
            }).then((res) => {
                if (res.error) {
                    Message.className = 'error-message'
                    Message.textContent = res.error
                }
                else {
                    window.location.href = '/'
                }
            })
        }
    });
});