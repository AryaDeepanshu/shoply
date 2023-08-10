let products = []
        
        
//         const products = [
//     { id: 1, name: "Product 1", image: "product1.jpg", description: "Description of Product 1" },
//     { id: 2, name: "Product 2", image: "product2.jpg", description: "Description of Product 2" },
//     { id: 3, name: "Product 3", image: "product3.jpg", description: "Description of Product 3" },
//     { id: 4, name: "Product 4", image: "product4.jpg", description: "Description of Product 4" },
//     { id: 5, name: "Product 5", image: "product5.jpg", description: "Description of Product 5" },
//     { id: 6, name: "Product 6", image: "product6.jpg", description: "Description of Product 6" },
//     { id: 7, name: "Product 7", image: "product7.jpg", description: "Description of Product 7" },
//     { id: 8, name: "Product 8", image: "product8.jpg", description: "Description of Product 8" },
//     { id: 9, name: "Product 9", image: "product9.jpg", description: "Description of Product 9" },
//     { id: 10, name: "Product 10", image: "product10.jpg", description: "Description of Product 10" },
//     { id: 11, name: "Product 11", image: "product11.jpg", description: "Description of Product 11" },
//     { id: 12, name: "Product 12", image: "product12.jpg", description: "Description of Product 12" },
//     { id: 13, name: "Product 13", image: "product13.jpg", description: "Description of Product 13" },
//     { id: 14, name: "Product 14", image: "product14.jpg", description: "Description of Product 14" },
//     { id: 15, name: "Product 15", image: "product15.jpg", description: "Description of Product 15" },
//     { id: 16, name: "Product 16", image: "product16.jpg", description: "Description of Product 16" },
//     { id: 17, name: "Product 17", image: "product17.jpg", description: "Description of Product 17" },
//     { id: 18, name: "Product 18", image: "product18.jpg", description: "Description of Product 18" },
//     { id: 19, name: "Product 19", image: "product19.jpg", description: "Description of Product 19" },
//     { id: 20, name: "Product 20", image: "product20.jpg", description: "Description of Product 20" },
//     { id: 21, name: "Product 21", image: "product21.jpg", description: "Description of Product 21" },
//     { id: 22, name: "Product 22", image: "product22.jpg", description: "Description of Product 22" },
//     { id: 23, name: "Product 23", image: "product23.jpg", description: "Description of Product 23" },
//     { id: 24, name: "Product 24", image: "product24.jpg", description: "Description of Product 24" },
//     { id: 25, name: "Product 25", image: "product25.jpg", description: "Description of Product 25" },
//     { id: 26, name: "Product 26", image: "product26.jpg", description: "Description of Product 26" },
//     { id: 27, name: "Product 27", image: "product27.jpg", description: "Description of Product 27" },
//     { id: 28, name: "Product 28", image: "product28.jpg", description: "Description of Product 28" },
// ];

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