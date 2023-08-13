document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-product-form');
    const previewImage = document.getElementById('preview-image');
    const previewName = document.getElementById('preview-name');
    const previewDescription = document.getElementById('preview-description');
    const previewPrice = document.getElementById('preview-price');
    const imageInput = document.getElementById('product-image')

    form.addEventListener('input', updatePreview);
    imageInput.addEventListener('change', () => {
        const file1 = imageInput.files[0];
        if (file1){
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
            }
            reader.readAsDataURL(file1);
        }
    });

    function updatePreview() {
        const productName = document.getElementById('product-name').value;
        const productDescription = document.getElementById('product-description').value;
        const productPrice = document.getElementById('product-price').value;
        previewName.textContent = productName || 'Product Name';
        previewDescription.textContent = productDescription || 'Product Description';
        previewPrice.textContent = productPrice ? `Price: $${productPrice}` : 'Price: ₹0.00'

    }
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', (event) => {
        const button = event.target
        event.preventDefault();
        const formData = new FormData(form);
        formData.append('productName', document.getElementById('product-name').value);
        formData.append('productPrice', document.getElementById('product-price').value);
        formData.append('productQuantity', document.getElementById('product-quantity').value);
        formData.append('productDescription', document.getElementById('product-description').value);

        const productImageInput = document.getElementById('product-image');
        if (productImageInput.files.length > 0) {
            const file = productImageInput.files[0]
            if (file.size > 250 * 1024) {
                alert('Image size exceeds 250 KB.');
                return;
            }
        formData.append('productImage', productImageInput.files[0]);
        }
        fetch('/addProduct', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            button.textContent = 'Product added ✓'
            button.disabled = true
            setTimeout(() => {
                button.textContent = 'Add Product'
                button.disabled = false
            }, 2000)
            previewName.textContent = data.productName || 'Product Name';
            previewDescription.textContent = data.productDescription || 'Product Description';
            previewPrice.textContent = data.productPrice ? `Price: $${data.productPrice}` : 'Price: $0.00';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});    