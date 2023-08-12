document.addEventListener('DOMContentLoaded', function () {
    const cartItemsDiv = document.getElementById('cart-items')
    const totalCartPrice = document.getElementById('totalPrice')
    const cartLink = document.querySelector('a.nav-link[href="/cart"]');
    cartLink.textContent = 'Home'
    cartLink.setAttribute('href', '/');
    
    let Products = []
    fetch('/getCart').then((response) => {
        return response.json()
    }).then((res) => {
        res.products.forEach(product => {
            Products.push(product)
        })
        renderCartItems()
    })


    function renderCartItems() {
        let totalCartCost = 0
        cartItemsDiv.innerHTML = ''
        Products.forEach(product => {
            totalCartCost += product.totalPrice
            const cartItem = document.createElement('div')
            cartItem.className = 'cart-item'
            cartItem.innerHTML = `
    <img src="uploads/${product.image}.jpeg" alt="${product.title}">
    <div class="item-details">
      <div class="item-title">${product.title}</div>
      <div class="item-price">₹${product.totalPrice}</div>
      <div class="item-quantity">
        Quantity:
        <button class="quantity-btn minus-btn" data-product-id="${product.id}">-</button>
        <span class="quantity-value" data-product-id="${product.id}">${product.quantity}</span>
        <button class="quantity-btn plus-btn" data-product-id="${product.id}">+</button>
        <div class="remove-btn" data-product-id="${product.id}">Remove</div>
      </div>
    </div>
  `
            cartItemsDiv.appendChild(cartItem)
        })
        totalCartPrice.textContent = "Grand Total: ₹" + totalCartCost
    }

    cartItemsDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains('minus-btn')) {
            const productId = event.target.getAttribute('data-product-id')
            updateQuantity(productId, -1)
        }
    })

    cartItemsDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains('plus-btn')) {
            const productId = event.target.getAttribute('data-product-id')
            updateQuantity(productId, 1)
        }
    })

    cartItemsDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.getAttribute('data-product-id')
            removeProduct(productId)
        }
    })

    function updateQuantity(productId, change) {
        let minusBtns = document.querySelectorAll('.minus-btn')
        let plusBtns = document.querySelectorAll('.plus-btn')
        let quantityValues = document.querySelectorAll(`.quantity-value[data-product-id="${productId}"]`)
        let removeBtns = document.querySelectorAll('.remove-btn')
        fetch('/updateQuantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, change })
        }).then((response) => {
            return response.json()
        })
            .then((res) => {
                if (res.error === "limit") {
                    quantityValues[0].style.color = "red"
                    return
                }
                Products = []
                res.products.forEach(product => {
                    Products.push(product)
                })
                renderCartItems() 
            })
            .catch((error) => {
                console.log(error)
            })
    }


    function removeProduct(productId) {
        fetch('/removeFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        }).then((response) => {
            return response.json()
        })
            .then((res) => {
                Products = []
                res.products.forEach(product => {
                    Products.push(product)
                })
                renderCartItems() 
            })
            .catch((error) => {
                console.log(error)
            })
    }
})