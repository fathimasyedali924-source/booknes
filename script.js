let cart = [];
let orders = [];

function addToCart(bookName, price) {
    cart.push({
        name: bookName,
        price: price
    });

    displayCart();

    alert(bookName + " added to cart!");
}

function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let total = document.getElementById("total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        total.innerText = "0";
        return;
    }

    let totalPrice = 0;

    cart.forEach(function(book, index) {

        totalPrice = totalPrice + book.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <strong>${book.name}</strong>
                - ₹${book.price}
                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    total.innerText = totalPrice;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function placeOrder() {

    if (cart.length === 0) {
        alert("Please add a book to the cart first.");
        return;
    }

    let totalPrice = 0;

    cart.forEach(function(book) {
        totalPrice = totalPrice + book.price;
    });

    let order = {
        orderId: "BN" + Math.floor(Math.random() * 100000),
        books: cart,
        total: totalPrice,
        date: new Date().toLocaleString()
    };

    orders.push(order);

    cart = [];

    displayCart();
    displayOrders();

    document.getElementById("message").innerText =
        "✅ Order placed successfully!";

    alert("Your order has been placed successfully!");
}

function displayOrders() {

    let ordersList = document.getElementById("ordersList");

    ordersList.innerHTML = "";

    if (orders.length === 0) {
        ordersList.innerHTML =
            "<p>No orders placed yet.</p>";
        return;
    }

    orders.forEach(function(order) {

        let bookNames = "";

        order.books.forEach(function(book) {
            bookNames += book.name + ", ";
        });

        ordersList.innerHTML += `
            <div class="order-item">
                <h3>Order ID: ${order.orderId}</h3>
                <p><strong>Books:</strong> ${bookNames}</p>
                <p><strong>Total:</strong> ₹${order.total}</p>
                <p><strong>Date:</strong> ${order.date}</p>
                <p>✅ Order Placed</p>
            </div>
        `;
    });
}