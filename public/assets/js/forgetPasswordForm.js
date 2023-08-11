document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const messageContainer = document.getElementById('message');

    forgotPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        fetch('/sendPasswordMail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: forgotPasswordForm.email.value
            })
        })
        setTimeout(() => {
            messageContainer.style.display = 'block';
        }, 1000);
    });
});