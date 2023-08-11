document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit_btn');
    const resetPasswordForm = document.getElementById('reset-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmNewPasswordInput = document.getElementById('confirm-new-password');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmNewPasswordError = document.getElementById('confirm-new-password-error');
    const passwordRequirementError = document.getElementById('password-requirement-error');
    const sucessMessage = document.getElementById('success-password-change')
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[^\s]{8,}$/;

    resetPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newPasswordValue = newPasswordInput.value.trim();
        const confirmNewPasswordValue = confirmNewPasswordInput.value.trim();
        let isValid = true;

        // Client-side form validation
        if (newPasswordValue === '') {
            newPasswordError.textContent = 'Please enter your new password.';
            isValid = false;
        } else if (!passwordPattern.test(newPasswordValue)) {
            passwordRequirementError.textContent = 'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol.';
            isValid = false;
        } else {
            newPasswordError.textContent = '';
        }

        if (confirmNewPasswordValue === '') {
            confirmNewPasswordError.textContent = 'Please confirm your new password.';
            isValid = false;
        } else if (newPasswordValue !== confirmNewPasswordValue) {
            confirmNewPasswordError.textContent = 'Passwords do not match.';
            isValid = false;
        } else {
            confirmNewPasswordError.textContent = '';
        }

        if (isValid) {
            //AJAX
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const data = {
                newPassword: newPasswordValue,
                confirmPassword: confirmNewPasswordValue,
                token: token
            }
            fetch("/resetPassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then((response) => {
                return response.json()
            }).then((res) => {
                if (res.error === "Confirm New password does not match") {
                    confirmNewPasswordError.textContent = res.error;
                } else if (res.error === "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol.") {
                    passwordRequirementError.textContent = res.error;
                }
                else {
                    resetPasswordForm.reset()
                    submitButton.disabled = true;
                    sucessMessage.textContent = res.success
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 5000);
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    });
});