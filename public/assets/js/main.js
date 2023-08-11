let products = []

getProducts()
function getProducts(){
    fetch("/products")
    .then(res => res.json())
    .then(Products => {
        products = Products
        loadProducts();
    })
    .catch(error => alert(error))
}

const productModal = new bootstrap.Modal(document.getElementById('productModal'));
const productDetails = document.getElementById('product-details');

let displayedProducts = 0;

document.getElementById('load-more-btn').addEventListener('click', () => {
    displayedProducts += 5;
    loadProducts();
});

function loadProducts() {
    const productList = document.getElementById('product-list');

    for (let i = displayedProducts; i < Math.min(products.length, displayedProducts + 5); i++) {
        const product = products[i];

        const productItem = document.createElement('div');
        productItem.classList.add('col-md-4', 'mb-4');
        productItem.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.Name}">
                <div class="card-body">
                    <h5 class="card-title">${product.Name}</h5>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" data-product-id="${product._id}">View Details</button>
                </div>
            </div>
        `;

        productList.appendChild(productItem);
    }
}


document.addEventListener('click', (event) => {
    if (event.target.matches('[data-product-id]')) {
        const productId = event.target.getAttribute('data-product-id');
        const product = products.find(p => p._id === productId);
        if (!product.Description) {
            fetchProductDescription(productId);
        } else {
            displayProductDetails(product);
        }
    }
});

function fetchProductDescription(productId) {
    setTimeout(() => {
        const product = products.find(p => p.id === productId);
        product.Description = `Description fetched for Product ${productId}`;
        displayProductDetails(product);
    }, 1000);
}

function displayProductDetails(product) {
    productDetails.innerHTML = `
        <h5>${product.Name}</h5>
        <img src="${product.image}" alt="${product.Name}" class="img-fluid">
        <p>${product.Description}</p>
        <p>₹ ${product.price}</p>
    `;
    productModal.show();
}