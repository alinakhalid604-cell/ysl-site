// ================= GLOBAL CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price = 10.99) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

// Update cart count
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}

// ================= CART PAGE =================
function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  if (!cartItems || !totalPrice) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalPrice.textContent = "$" + total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// ================= SEARCH =================
function searchProducts() {
  let input = document.getElementById("search").value.toLowerCase();
  let products = document.querySelectorAll(".product-container");

  products.forEach(product => {
    let name = product.querySelector("h4").innerText.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });
}

// ================= DARK MODE =================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode",
    document.body.classList.contains("dark")
  );
}

// Load dark mode
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadCart();

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
});
