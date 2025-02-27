// Highlight Navbar Links on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar ul li a');

    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150; // Adjust for header height
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollToTopButton = document.querySelector('#scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mock Product Data
const products = [
    { id: 1, name: 'Uniform Shirt', price: 25.99, image: 'shirt.jpg' },
    { id: 2, name: 'Uniform Pants', price: 35.99, image: 'pants.jpg' },
    { id: 3, name: 'Uniform Skirt', price: 30.99, image: 'skirt.jpg' }
];

// Display Products Dynamically
function displayProducts() {
    const productContainer = document.querySelector('#product-container');
    productContainer.innerHTML = ''; // Clear container before appending products
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Shopping Cart Array
const cart = [];

// Add Product to Cart
function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId, productName, productPrice, quantity: 1 });
    }

    updateCartUI();
    alert(`${productName} has been added to your cart!`);
}

// Update Cart UI
function updateCartUI() {
    const cartContainer = document.querySelector('#cart-container');
    cartContainer.innerHTML = ''; // Clear cart before appending items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let total = 0;
        cart.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.productName} x${item.quantity} - $${(item.quantity * item.productPrice).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.productId})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);

            total += item.quantity * item.productPrice;
        });

        // Display Total Price
        const totalPrice = document.createElement('div');
        totalPrice.classList.add('cart-total');
        totalPrice.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
        cartContainer.appendChild(totalPrice);
    }
}

// Remove Product from Cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex((item) => item.productId === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartUI();
    }
}

// Checkout Button Functionality
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add items before checking out.');
        return;
    }

    let orderSummary = 'Order Summary:\n';
    cart.forEach((item) => {
        orderSummary += `${item.productName} x${item.quantity} - $${(item.quantity * item.productPrice).toFixed(2)}\n`;
    });

    alert(orderSummary + '\nThank you for your purchase!');
    cart.length = 0; // Clear the cart after checkout
    updateCartUI();
}

// Initialize Page
window.onload = () => {
    displayProducts();
};

