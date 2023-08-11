document.addEventListener('DOMContentLoaded', function () {
    const changePasswordForm = document.getElementById('change-password-form');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmNewPasswordInput = document.getElementById('confirm-new-password');
    const currentPasswordError = document.getElementById('current-password-error');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmNewPasswordError = document.getElementById('confirm-new-password-error');
    const passwordRequirementError = document.getElementById('password-requirement-error');
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[^\s]{8,}$/;
    
    changePasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const currentPasswordValue = currentPasswordInput.value.trim();
        const newPasswordValue = newPasswordInput.value.trim();
        const confirmNewPasswordValue = confirmNewPasswordInput.value.trim();
        let isValid = true;

        // Client-side form validation
        if (currentPasswordValue === '') {
            currentPasswordError.textContent = 'Please enter your current password.';
            isValid = false;
        } else {
            currentPasswordError.textContent = '';
        }

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
            const data = {
                currentPassword: currentPasswordValue,
                newPassword: newPasswordValue,
                confirmPassword: confirmNewPasswordValue
            }
            console.log(data)
            fetch("/changePassword", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then((response) => {
                return response.json()
            }).then((res) => {
                console.log(res)
                if (res.error === "Wrong Current Password") {
                    currentPasswordError.textContent = res.error;
                }
                else if (res.error === "Confirm new password does not match") {
                    confirmNewPasswordError.textContent = res.error;
                }
                else {
                    window.location.href = "/main";
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    });
});