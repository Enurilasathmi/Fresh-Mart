let cart = [];

// Function to add items to the cart
function addToCart(name, price, quantity) {
    quantity = parseFloat(quantity);
    if (quantity <= 0) return; // Ignore if quantity is zero or negative

    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity; // Total price for this item
        totalPrice += itemTotalPrice;
        cartItems.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>Rs ${item.price.toFixed(2)}</td>
            <td>${item.quantity.toFixed(1)}</td>
            <td>Rs ${itemTotalPrice.toFixed(2)}</td>
        </tr>`;
    });

    document.getElementById('total-price').innerText = `Total Price: Rs ${totalPrice.toFixed(2)}`;
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Save cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Navigate to order page
    window.location.href = 'checkout.html';
}

// Function to add the current order to favorites
function addToFavorites() {
    localStorage.setItem('favorites', JSON.stringify(cart));
    alert('Order saved as favorite!');
}

// Function to apply favorites to the cart
function applyFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    cart = storedFavorites.slice(); // Create a copy of the stored favorites
    updateCartDisplay(); // Update the cart display
}

// Event listeners for buttons on the main page
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        const qtyId = this.getAttribute('data-qty-id');
        const quantity = document.getElementById(qtyId).value;

        addToCart(name, price, quantity);
    });
});

document.getElementById('buy-button').addEventListener('click', checkout);
document.getElementById('add-to-favorites').addEventListener('click', addToFavorites);
document.getElementById('apply-favorites').addEventListener('click', applyFavorites);



