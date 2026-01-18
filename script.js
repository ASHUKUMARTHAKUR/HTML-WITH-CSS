const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, img: "image copy 11.png" },
    { id: 2, name: "Smart Watch", price: 149.50, img: "image copy 12.png" },
    { id: 3, name: "Gaming Mouse", price: 45.00, img: "image copy 13.png" },
    { id: 4, name: "4K Webcam", price: 129.99, img: "image copy 14.png" },
    { id: 5, name: "Mechanical Keyboard", price: 159.99, img: "image copy 15.png" },
    { id: 6, name: "USB-C Hub", price: 39.99, img: "image copy 16.png" }
];

let cart = [];

// 1. Render Products
const productContainer = document.getElementById('product-list');
products.forEach(p => {
    productContainer.innerHTML += `
        <div class="product">
            <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(p.name)}'">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-price">$${p.price.toFixed(2)}</p>
                <button onclick="addToCart(${p.id})"><i class="fas fa-plus"></i> Add to Cart</button>
            </div>
        </div>`;
});

// 2. Add to Cart Logic
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
    showNotification('Added to cart!');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items');
    list.innerHTML = cart.length === 0 
        ? '<li style="text-align: center; padding: 2rem; color: #999;">Your cart is empty</li>'
        : cart.map((item, idx) => `<li><span>${item.name}</span><span>$${item.price.toFixed(2)}</span></li>`).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// 3. Toggle Cart Visibility
function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('hidden');
}

document.getElementById('cart-btn').addEventListener('click', toggleCart);

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Thank you for your purchase! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// Notification
function showNotification(message) {
    console.log(message);
}