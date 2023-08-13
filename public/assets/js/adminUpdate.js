document.addEventListener('DOMContentLoaded', function() {
    let products = []
    getProducts()
    function getProducts(){
        fetch("/products")
        .then(res => res.json())
        .then(Products => {
            products = Products
            renderProductItems()
        })
        .catch(error => console.log(error))
    }

    const productListDiv = document.getElementById('product-list');
    
    function renderProductItems() {
        productListDiv.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div')
            productItem.classList.add('col-md-4', 'mb-4')
            productItem.innerHTML = `
            <div class="card">
        <img src="../uploads/${product.image}" contenteditable="true" class="card-img-top" alt="${product.Name}">
        <form id="updateForm-${product._id}">
        <div class="card-body">
            <label for="product-description-${product._id}" class="form-label">Name</label>
            <input type="text" class="form-control mb-2" value="${product.Name}" id="product-name-${product._id}">
            <label for="product-price-${product._id}" class="form-label">Price</label>
            <input type="number" class="form-control mb-2" value="${product.price}" id="product-price-${product._id}">
            <label for="product-quantity-${product._id}" class="form-label">Quantity</label>
            <input type="number" class="form-control mb-2" value="${product.Quantity}" id="product-quantity-${product._id}">
            <label for="product-description-${product._id}" class="form-label">Description</label>
            <textarea class="form-control mb-2" id="product-description-${product._id}">${product.Description}</textarea>
            <input type="file" class="form-control mb-2" accept="image/*" id="product-image-${product._id}">
            <button class="btn btn-primary" id="update-btn-${product._id}">Update</button>
            <button class="btn btn-danger" id="delete-btn-${product._id}">Delete</button>
        </div>
        </form>
    </div>
            `;
            productListDiv.appendChild(productItem);

            const updateBtn = productItem.querySelector(`#update-btn-${product._id}`);
            updateBtn.addEventListener('click', (event) => {
                const button = event.target
                button.textContent = 'Product updated ✓'
                button.disabled = true
                setTimeout(() => {
                    button.textContent = 'Update Product'
                    button.disabled = false
                }, 2000)
                event.preventDefault();
                updateProduct(product._id);
            });

            const deleteBtn = productItem.querySelector(`#delete-btn-${product._id}`);
            deleteBtn.addEventListener('click', () => {
                deleteProduct(product._id);
            });
        });
    }

    function updateProduct(productId) {
        const form = document.getElementById(`updateForm-${productId}`)
        const formData = new FormData(form);
        formData.append('Name', document.getElementById(`product-name-${productId}`).value);
        formData.append('price', document.getElementById(`product-price-${productId}`).value);
        formData.append('Quantity', document.getElementById(`product-quantity-${productId}`).value);
        formData.append('Description', document.getElementById(`product-description-${productId}`).value);
        formData.append('id', productId);

        const productImageInput = document.getElementById(`product-image-${productId}`);
        if (productImageInput.files.length > 0) {
            const file = productImageInput.files[0]
            if (file.size > 250 * 1024) {
                alert('Image size exceeds 250 KB.');
                return;
            }
        formData.append('productImage', productImageInput.files[0]);
        }
        fetch('/admin/update', {
            method: "POST",
            body: formData
        })
        .then((response)=>{
            return response.json()
        }).then((res)=>{
            products = []
            res.products.forEach(product => {
                products.push(product)
            })
            renderProductItems();
        })
    }

    function deleteProduct(productId) {
        fetch('/admin/delete', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: productId})
        }).then((response)=>{
            return response.json()
        }).then((res)=>{
            products = []
            res.products.forEach(product => {
                products.push(product)
            })
            renderProductItems();
        })
    }
});