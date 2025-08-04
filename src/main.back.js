import './style.css';
import { sampleProducts } from './data/prodcuts';
import { sampleCategories } from './data/categories';

// Initialize shopping cart with products from data folder
let cart = [];
let currentCategory = null;

// Format price to include currency and decimal places
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

// Set up the main app container with Tailwind classes
document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Tienda en Línea</h1>
        <p class="text-lg text-gray-600">Los mejores productos al mejor precio</p>
      </div>

      <!-- Categories -->
      <div class="mb-8 overflow-x-auto">
        <div class="flex space-x-4 pb-2">
          <button onclick="filterByCategory(null)" 
                  class="px-4 py-2 rounded-full whitespace-nowrap ${!currentCategory ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">
            Todos los productos
          </button>
          ${sampleCategories.map(category => `
            <button onclick="filterByCategory('${category.id}')" 
                    class="px-4 py-2 rounded-full whitespace-nowrap ${currentCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">
              ${category.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Products Section -->
        <div class="lg:w-3/4">
          <div id="products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Products will be dynamically inserted here -->
          </div>
        </div>

        <!-- Shopping Cart -->
        <div class="lg:w-1/4">
          <div class="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800">Carrito</h2>
              <span id="cart-count" class="bg-blue-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-full">0</span>
            </div>
            
            <div id="cart-items" class="mb-6 space-y-3">
              <!-- Cart items will be dynamically inserted here -->
              <p class="text-gray-500 text-center py-4">Tu carrito está vacío</p>
            </div>
            
            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between items-center mb-4">
                <span class="font-semibold">Total:</span>
                <span id="total" class="text-lg font-bold">$0.00</span>
              </div>
              <button id="clear-cart" class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors">
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Function to filter products by category
window.filterByCategory = (categoryId) => {
  currentCategory = categoryId;
  showProducts();
};

// Function to display products
function showProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";

  // Filter products by category if a category is selected
  const filteredProducts = currentCategory 
    ? sampleProducts.filter(product => product.categoryId === currentCategory)
    : sampleProducts;

  if (filteredProducts.length === 0) {
    productsDiv.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <p class="text-gray-500 text-lg">No hay productos en esta categoría</p>
      </div>
    `;
    return;
  }

  filteredProducts.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1";
    
    // Find category name for this product
    const category = sampleCategories.find(cat => cat.id === product.categoryId);
    
    productDiv.innerHTML = `
      <div class="relative">
        <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 object-cover">
        ${product.stock < 5 ? `
          <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            ¡Últimas ${product.stock} unidades!
          </span>
        ` : ''}
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start mb-1">
          <h3 class="font-semibold text-lg text-gray-900">${product.name}</h3>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm text-gray-600 ml-1">${product.rating || 'N/A'}</span>
          </div>
        </div>
        ${category ? `
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
            ${category.name}
          </span>
        ` : ''}
        <p class="text-gray-600 text-sm mb-3 line-clamp-2" title="${product.description}">
          ${product.description}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-blue-600 font-bold text-lg">${formatPrice(product.price)}</span>
          <button onclick="addToCart('${product.id}')" 
                  class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors text-sm">
            Añadir al carrito
          </button>
        </div>
      </div>
    `;
    productsDiv.appendChild(productDiv);
  });
}

// Function to add an item to the cart
window.addToCart = (productId) => {
  const product = sampleProducts.find(p => p.id === productId);
  if (product) {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      // If already in cart, increase quantity if there's enough stock
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        showNotification(`No hay suficiente stock de ${product.name}`, 'error');
        return;
      }
    } else {
      // If not in cart, add with quantity 1
      cart.push({
        ...product,
        quantity: 1,
        totalPrice: product.price
      });
    }
    
    updateCart();
    showNotification(`${product.name} añadido al carrito`, 'success');
  }
};

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg transform transition-all duration-300 translate-y-2 opacity-0 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white`;
  
  notification.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      ${message}
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.remove('translate-y-2', 'opacity-0');
    notification.classList.add('translate-y-0', 'opacity-100');
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }, 10);
}

// Function to update the cart display
function updateCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");
  
  cartItemsDiv.innerHTML = "";
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `
      <div class="py-6 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="mt-2 text-gray-500">Tu carrito está vacío</p>
      </div>
    `;
    totalDiv.textContent = formatPrice(0);
    cartCount.textContent = '0';
    return;
  }
  
  // Calculate total items and price
  let totalItems = 0;
  let totalPrice = 0;
  
  // Group items by product ID
  const cartItems = cart.reduce((acc, item) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
    
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      acc.push({
        ...item,
        totalPrice: item.price * item.quantity
      });
    }
    return acc;
  }, []);
  
  // Display grouped items
  cartItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "flex items-start py-3 border-b border-gray-100";
    
    itemDiv.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md mr-3">
      <div class="flex-1">
        <div class="flex justify-between">
          <h4 class="font-medium text-gray-900">${item.name}</h4>
          <button onclick="removeFromCart('${item.id}')" class="text-gray-400 hover:text-red-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex justify-between items-center mt-1">
          <div class="flex items-center border rounded-md">
            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" 
                    class="px-2 py-1 text-gray-600 hover:bg-gray-100" ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}>
              -
            </button>
            <span class="px-3">${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" 
                    class="px-2 py-1 text-gray-600 hover:bg-gray-100" ${item.quantity >= (sampleProducts.find(p => p.id === item.id)?.stock || 99) ? 'opacity-50 cursor-not-allowed' : ''}>
              +
            </button>
          </div>
          <span class="font-semibold text-gray-900">${formatPrice(item.totalPrice)}</span>
        </div>
      </div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
  
  // Update cart count and total
  cartCount.textContent = totalItems.toString();
  totalDiv.textContent = formatPrice(totalPrice);
}

// Function to update item quantity
window.updateQuantity = (productId, newQuantity) => {
  const product = sampleProducts.find(p => p.id === productId);
  if (!product) return;
  
  // Ensure quantity is within valid range
  newQuantity = Math.max(1, Math.min(newQuantity, product.stock));
  
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (newQuantity === 0) {
      // Remove item if quantity is 0
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart[itemIndex].quantity = newQuantity;
      cart[itemIndex].totalPrice = product.price * newQuantity;
    }
    updateCart();
  }
};

// Function to remove item from cart
window.removeFromCart = (productId) => {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCart();
  }
};

// Event listener to clear the cart
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Initialize the app
showProducts();
