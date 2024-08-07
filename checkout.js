document.getElementById('order-form').addEventListener('submit', handleOrderFormSubmission);

function handleOrderFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const cardName = document.getElementById('Card_name').value;
    const cardNum = document.getElementById('Card_num').value;

    if (name && address && cardName && cardNum) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3); // Example: 3 days later
        const thankYouMessage = `Thank you for your purchase, ${name}! Your order will be delivered on ${deliveryDate.toDateString()}.`;
        
        document.getElementById('thank-you-message').innerText = thankYouMessage;
        document.getElementById('thank-you-message').style.display = 'block';
        
        // Show alert message
        alert(thankYouMessage);

        // Clear the cart
        localStorage.removeItem('cart');
    } else {
        alert('Please fill in all fields.');
    }
}

function loadOrderData() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('order-items');
    const orderTotalPrice = document.getElementById('order-total-price');

    let totalPrice = 0;

    storedCart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;
        orderItems.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>Rs ${item.price.toFixed(2)}</td>
            <td>${item.quantity.toFixed(1)}</td>
            <td>Rs ${itemTotalPrice.toFixed(2)}</td>
        </tr>`;
    });

    orderTotalPrice.innerHTML = `Total Price: Rs ${totalPrice.toFixed(2)}`;
}

// Load order data if on the checkout page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('checkout.html')) {
        loadOrderData();
    }
});
