let products = []

getProducts()
function getProducts(){
    fetch("/products")
    .then(res => res.json())
    .then(Products => {
        products = Products
        loadProducts()
    })
    .catch(error => alert(error))
}

const productModal = new bootstrap.Modal(document.getElementById('productModal'))
const productDetails = document.getElementById('product-details')

let displayedProducts = 0

document.getElementById('load-more-btn').addEventListener('click', () => {
    displayedProducts += 5
    loadProducts()
})

function loadProducts() {
    const productList = document.getElementById('product-list')

    for (let i = displayedProducts ;i < Math.min(products.length, displayedProducts + 5); i++) {
        const product = products[i]
        const productItem = document.createElement('div')
        productItem.classList.add('col-md-4', 'mb-4')
        productItem.innerHTML = `
            <div class="card">
                <img src="uploads/${product.image}.jpeg" class="card-img-top" alt="${product.Name}">
                <div class="card-body">
                    <h5 class="card-title">${product.Name}</h5>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" data-product-id="${product._id}">View Details</button>
                    <button class="btn btn-primary add-to-cart-btn" product-id="${product._id}">Add to Cart</button>
                </div>
            </div>
        `

        productList.appendChild(productItem)
    }
}


document.addEventListener('click', (event) => {
    redirect = document.getElementById('redirect')
    if(redirect){
        window.location.href = '/login'
    }
    if (event.target.matches('[data-product-id]')) {
        const productId = event.target.getAttribute('data-product-id')
        const product = products.find(p => p._id === productId)
        if (!product.Description) {
            fetchProductDescription(productId)
        } else {
            displayProductDetails(product)
        }
    }
})

document.addEventListener('click', (event) => {
    redirect = document.getElementById('redirect')
    if(redirect){
        window.location.href = '/login'
    }
    if (event.target.matches('.add-to-cart-btn')) {
        const button = event.target
        const productId = event.target.getAttribute('product-id')
        fetch('/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productId: productId})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
                button.textContent = 'Added to cart ✓'
                button.disabled = true
                setTimeout(() => {
                    button.textContent = 'Add to cart'
                    button.disabled = false
                }, 2000)
            }
        )
    }
})

function fetchProductDescription(productId) {
    setTimeout(() => {
        const product = products.find(p => p.id === productId)
        product.Description = `Description fetched for Product ${productId}`
        displayProductDetails(product)
    }, 1000)
}

function displayProductDetails(product) {
    productDetails.innerHTML = `
        <h5>${product.Name}</h5>
        <img src="uploads/${product.image}.jpeg" alt="${product.Name}" class="img-fluid">
        <p>${product.Description}</p>
        <p>₹ ${product.price}</p>
    `
    productModal.show()
}