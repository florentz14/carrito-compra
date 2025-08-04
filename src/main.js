import './style.css';
import { sampleProducts } from './data/prodcuts';
import { sampleCategories } from './data/categories';

// Gestión del estado global
class Store {
  constructor() {
    this.state = {
      cart: [],
      currentCategory: null,
      isLoading: false,
      searchQuery: '',
    };
    this.listeners = [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState() {
    return this.state;
  }
}

// Crear instancia de Store
const store = new Store();

// Funciones de utilidad
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

// Función de retardo
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Mapeo de iconos para categorías
const categoryIcons = {
  'Electrónicos': 'M13 10V3L4 14h7v7l9-11h-7z',
  'Accesorios': 'M7 20l4.2-12.3 1.4 5.4c.1.4.4.7.8.7h6.5c.4 0 .8-.3.9-.7l1.5-6c.1-.5-.3-1-.9-1H17l-7.1-5.3c-.4-.3-.9-.3-1.3 0L2 10h4.5c.4 0 .7.3.8.7l.7 2.6z',
  'Computación': 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
  'Smartphones': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  'Audio': 'M9 19V6l12 3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  'Gaming': 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
  'Tablets': 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  'Smartwatch': '9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-2m-6 0h6',
  'Cámaras': '3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
  'Televisores': '15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
};

// Utilidades de animación
const animateIn = (element, delay = 0) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Animación de entrada
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, delay);
};

// Animación de retraso
const staggerAnimation = (elements, baseDelay = 0) => {
  elements.forEach((element, index) => {
    animateIn(element, baseDelay + (index * 100));
  });
};

// Sistema de notificaciones
class NotificationManager {
  constructor() {
    this.container = this.createContainer();
  }

  // Crear contenedor de notificaciones
  createContainer() {
    const container = document.createElement('div');
    container.className = 'fixed top-4 right-4 z-50 space-y-2 pointer-events-none';
    container.id = 'notification-container';
    document.body.appendChild(container);
    return container;
  }

  // Mostrar notificación
  show(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `
      bg-white shadow-xl rounded-xl p-4 flex items-center space-x-3 
      transform translate-x-full transition-all duration-500 ease-out
      border-l-4 pointer-events-auto max-w-sm
      ${type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-blue-500'}
    `;

    // Icono de notificación
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    
    // Contenido de la notificación
    notification.innerHTML = `
      <div class="flex-shrink-0 text-2xl">${icon}</div>
      <div class="flex-1">
        <p class="text-gray-800 font-medium text-sm">${message}</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600 transition-colors" onclick="this.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    `;

    // Agregar notificación al contenedor
    this.container.appendChild(notification);

    // Animación de entrada
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full');
      notification.classList.add('translate-x-0');
    });

    // Eliminación automática
    setTimeout(() => {
      notification.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => notification.remove(), 500);
    }, duration);
  }
}

// Crear instancia de NotificationManager
const notifications = new NotificationManager();

// Estado de carga 
const showLoadingState = () => {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = Array.from({ length: 6 }, () => `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div class="w-full h-48 bg-gray-200 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
      </div>
      <div class="p-6 space-y-4">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        <div class="flex justify-between items-center">
          <div class="h-6 bg-gray-200 rounded w-20"></div>
          <div class="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  `).join('');
};

// Inicialización de la aplicación
const initializeApp = () => {
  document.querySelector('#app').innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <!-- cabecera -->
      <header class="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="text-center sm:text-left">
              <h1 class="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent">
                Tienda Premium
              </h1>
              <p class="text-gray-600 mt-1">Descubre productos extraordinarios</p>
            </div>
            
            <!-- barra de búsqueda -->
            <div class="relative max-w-md w-full sm:w-auto">
              <input 
                type="text" 
                id="search-input"
                placeholder="Buscar productos..." 
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-300 text-sm"
              >
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Categorías -->
        <div class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4 px-1">Categorías</h2>
          <div class="flex overflow-x-auto scrollbar-hide pb-2 -mx-1">
            <div class="flex space-x-2 px-1">
              <button 
                onclick="filterByCategory(null)" 
                class="category-btn flex items-center space-x-2 px-4 py-3 rounded-2xl whitespace-nowrap 
                       transition-all duration-300 font-medium text-sm min-w-fit
                       ${!store.getState().currentCategory ? 
                         'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' : 
                         'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'}"
              >
                <span class="w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </span>
                <span>Todos</span>
              </button>
              ${sampleCategories.map(category => `
                <button 
                  onclick="filterByCategory('${category.id}')" 
                  class="category-btn flex items-center space-x-2 px-4 py-3 rounded-2xl whitespace-nowrap 
                         transition-all duration-300 font-medium text-sm min-w-fit
                         ${store.getState().currentCategory === category.id ? 
                           'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' : 
                           'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'}"
                >
                  <span class="w-5 h-5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${categoryIcons[category.name] || 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z'}" />
                    </svg>
                  </span>
                  <span>${category.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- sección de productos -->
          <div class="lg:w-3/4">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Productos</h2>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span id="products-count">0 productos</span>
              </div>
            </div>
            <div id="products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Products will be dynamically inserted here -->
            </div>
          </div>

          <!-- carrito de compras -->
          <div class="lg:w-1/4">
            <div class="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-100 
                        sticky top-24 transition-all duration-300">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold text-gray-900">Carrito</h2>
                <div class="relative">
                  <span id="cart-count" class="bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                                              text-xs font-bold px-2.5 py-1 rounded-full min-w-[20px] 
                                              text-center transition-all duration-300">0</span>
                  <div id="cart-pulse" class="absolute inset-0 bg-blue-500 rounded-full animate-ping 
                                             opacity-0 transition-opacity duration-300"></div>
                </div>
              </div>
              
              <div id="cart-items" class="mb-6 space-y-3 max-h-96 overflow-y-auto scrollbar-thin 
                                         scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <!-- Los elementos del carrito se insertarán dinámicamente aquí. -->
                <div class="text-center py-8">
                  <div class="text-6xl mb-4">🛒</div>
                  <p class="text-gray-500">Tu carrito está vacío</p>
                  <p class="text-gray-400 text-sm mt-1">Añade productos para empezar</p>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-4 space-y-4">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-gray-900">Total:</span>
                  <span id="total" class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                                        bg-clip-text text-transparent">$0.00</span>
                </div>
                
                <div class="space-y-2">
                  <button id="checkout-btn" 
                          class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 
                                 hover:to-green-700 text-white py-3 px-4 rounded-2xl transition-all 
                                 duration-300 font-medium shadow-lg shadow-green-500/25 
                                 hover:shadow-green-500/40 hover:scale-[1.02] disabled:opacity-50 
                                 disabled:cursor-not-allowed disabled:hover:scale-100"
                          disabled>
                    Proceder al Pago
                  </button>
                  
                  <button id="clear-cart" 
                          class="w-full bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 
                                 py-2 px-4 rounded-2xl transition-all duration-300 font-medium 
                                 border border-gray-200 hover:border-red-200">
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Configuración de event listeners
  setupEventListeners();
  showProducts();
};

// Visualización de productos con animaciones
const showProducts = async () => {
  const { currentCategory, searchQuery } = store.getState();
  
  // Mostrar estado de carga
  showLoadingState();
  store.setState({ isLoading: true });
  
  // Simular retraso de API para mejor experiencia de usuario
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const productsDiv = document.getElementById("products");
  const productsCount = document.getElementById("products-count");
  
  // Filtrar productos
  let filteredProducts = sampleProducts;
  
  if (currentCategory) {
    filteredProducts = filteredProducts.filter(product => product.categoryId === currentCategory);
  }
  
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Actualizar contador de productos
  productsCount.textContent = `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''}`;
  
  if (filteredProducts.length === 0) {
    productsDiv.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
        <p class="text-gray-500">Intenta con una búsqueda diferente o explora otras categorías</p>
        <button onclick="clearFilters()" 
                class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-2xl 
                       transition-all duration-300 font-medium hover:scale-105">
          Ver todos los productos
        </button>
      </div>
    `;
    store.setState({ isLoading: false });
    return;
  }

  // Renderizar productos
  productsDiv.innerHTML = filteredProducts.map(product => {
    const category = sampleCategories.find(cat => cat.id === product.categoryId);
    const isLowStock = product.stock < 5;
    
    return `
      <div class="product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl 
                  transition-all duration-500 hover:-translate-y-2 border border-gray-100 
                  hover:border-blue-200" style="opacity: 0; transform: translateY(20px);">
        <div class="relative overflow-hidden">
          <img src="${product.imageUrl}" 
               alt="${product.name}" 
               class="w-full h-48 object-cover transition-transform duration-700 
                      group-hover:scale-110"
               loading="lazy">
          
          <!-- Badges -->
          <div class="absolute top-3 left-3 space-y-2">
            ${product.isNew ? `
              <span class="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs 
                           font-bold px-3 py-1 rounded-full shadow-lg">
                ✨ Nuevo
              </span>
            ` : ''}
            ${isLowStock ? `
              <span class="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs 
                           font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                ⚡ Solo ${product.stock} left
              </span>
            ` : ''}
          </div>
          
          <!-- acciones rápidas -->
          <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                      transition-all duration-300 space-y-2">
            <button class="bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full 
                           shadow-lg transition-all duration-300 hover:scale-110"
                    title="Vista rápida">
              <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          
          <!-- overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-lg text-gray-900 group-hover:text-blue-600 
                       transition-colors duration-300 line-clamp-1">
              ${product.name}
            </h3>
            <div class="flex items-center space-x-1 flex-shrink-0 ml-2">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-sm font-medium text-gray-600">${product.rating || 'N/A'}</span>
            </div>
          </div>
          
          ${category ? `
            <span class="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 text-xs 
                         px-2.5 py-1 rounded-full mb-3 border border-blue-200">
              <span>${category.icon || '📦'}</span>
              <span>${category.name}</span>
            </span>
          ` : ''}
          
          <p class="text-gray-600 text-sm mb-4 line-clamp-2" title="${product.description}">
            ${product.description}
          </p>
          
          <div class="flex justify-between items-center">
            <div class="flex flex-col">
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                           bg-clip-text text-transparent">
                ${formatPrice(product.price)}
              </span>
              <span class="text-xs text-gray-500">Stock: ${product.stock}</span>
            </div>
            
            <button onclick="addToCart('${product.id}')" 
                    class="add-to-cart-btn bg-gradient-to-r from-blue-500 to-blue-600 
                           hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-5 
                           rounded-2xl transition-all duration-300 font-medium text-sm 
                           hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           active:scale-95">
              Añadir
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Animar entrada de productos
  const productCards = document.querySelectorAll('.product-card');
  staggerAnimation(productCards, 100);
  
  store.setState({ isLoading: false });
};

// Funciones del carrito
window.addToCart = (productId) => {
  const product = sampleProducts.find(p => p.id === productId);
  if (!product) return;

  const { cart } = store.getState();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      notifications.show(`No hay suficiente stock de ${product.name}`, 'error');
      return;
    }
  } else {
    cart.push({
      ...product,
      quantity: 1,
      totalPrice: product.price
    });
  }
  
  store.setState({ cart: [...cart] });
  notifications.show(`${product.name} añadido al carrito`, 'success');
  
  // Animar contador del carrito
  const cartPulse = document.getElementById('cart-pulse');
  cartPulse.style.opacity = '0.75';
  setTimeout(() => cartPulse.style.opacity = '0', 600);
};

// Actualizaciones del carrito con animaciones
const updateCart = () => {
  const { cart } = store.getState();
  const cartItemsDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `
      <div class="text-center py-8 animate-fade-in">
        <div class="text-6xl mb-4">🛒</div>
        <p class="text-gray-500 font-medium">Tu carrito está vacío</p>
        <p class="text-gray-400 text-sm mt-1">Añade productos para empezar</p>
      </div>
    `;
    totalDiv.textContent = formatPrice(0);
    cartCount.textContent = '0';
    checkoutBtn.disabled = true;
    return;
  }
  
  // Calcular totales
  let totalItems = 0;
  let totalPrice = 0;
  
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
  
  // Renderizar elementos del carrito con estilos y animaciones
  cartItemsDiv.innerHTML = cartItems.map((item, index) => {
    const product = sampleProducts.find(p => p.id === item.id);
    const isLowStock = product?.stock < 5;
    const isOutOfStock = product?.stock === 0;
    
    return `
    <div class="cart-item flex items-start p-3 bg-white rounded-xl border border-gray-100 
                hover:shadow-md transition-all duration-300 group animate-fade-in"
         style="animation-delay: ${index * 50}ms">
      <div class="relative">
        <img src="${item.imageUrl}" 
             alt="${item.name}" 
             class="w-16 h-16 object-cover rounded-lg shadow-sm ${isOutOfStock ? 'opacity-50' : ''}"
             loading="lazy">
        ${isLowStock ? `
          <span class="absolute -top-2 -right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
            Poco stock
          </span>
        ` : ''}
      </div>
      
      <div class="flex-1 min-w-0 ml-3">
        <div class="flex justify-between items-start mb-1">
          <h4 class="font-semibold text-gray-900 text-sm truncate pr-2">${item.name}</h4>
          <button onclick="removeFromCart('${item.id}')" 
                  class="text-gray-400 hover:text-red-500 p-1 rounded-full 
                         hover:bg-red-50 transition-all duration-300 flex-shrink-0"
                  aria-label="Eliminar del carrito">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <p class="text-xs text-gray-500 mb-2">${product?.categoryId || 'Sin categoría'}</p>
        
        <div class="flex justify-between items-center">
          <div class="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" 
                    class="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors 
                           ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'}"
                    ${item.quantity <= 1 || isOutOfStock ? 'disabled' : ''}
                    aria-label="Reducir cantidad">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
              </svg>
            </button>
            <span class="px-3 py-1 text-sm font-medium bg-white min-w-[2rem] text-center">
              ${item.quantity}
            </span>
            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" 
                    class="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors 
                           hover:text-blue-600 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${item.quantity >= (product?.stock || 99) || isOutOfStock ? 'disabled' : ''}
                    aria-label="Aumentar cantidad">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
          </div>
          
          <div class="text-right">
            <p class="font-bold text-blue-600 text-sm">${formatPrice(item.totalPrice)}</p>
            ${item.quantity > 1 ? `
              <p class="text-xs text-gray-500">${formatPrice(product?.price || 0)} c/u</p>
            ` : ''}
          </div>
        </div>
        
        ${isOutOfStock ? `
          <p class="text-xs text-red-500 mt-2">
            <svg class="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Agotado
          </p>
        ` : ''}
      </div>
    </div>
  `;
  }).join('');
  
  // Animar elementos del carrito
  const cartItemElements = document.querySelectorAll('.cart-item');
  staggerAnimation(cartItemElements, 0);
  
  // Actualizar totales con animaciones suaves
  const animateValue = (element, start, end, duration = 500) => {
    if (start === end) return;
    const range = end - start;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = start + (range * progress);
      
      if (element === totalDiv) {
        element.textContent = formatPrice(Math.round(currentValue * 100) / 100);
      } else {
        element.textContent = Math.round(currentValue);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  // Obtener valores actuales
  const currentCount = parseInt(cartCount.textContent) || 0;
  const currentTotal = parseFloat(totalDiv.textContent.replace(/[^0-9.,]+/g, '').replace(',', '.')) || 0;
  
  // Animar los valores
  animateValue(cartCount, currentCount, totalItems);
  animateValue(totalDiv, currentTotal, totalPrice);
  
  // Actualizar estados de los botones
  checkoutBtn.disabled = totalItems === 0;
  
  // Agregar retroalimentación visual al añadir/eliminar productos
  if (totalItems > currentCount) {
    // Producto añadido
    cartCount.classList.add('scale-125', 'text-green-500');
    totalDiv.classList.add('scale-110');
  } else if (totalItems < currentCount) {
    // Producto eliminado
    cartCount.classList.add('scale-90', 'text-red-500');
    totalDiv.classList.add('scale-95');
  }
  
  // Eliminar clases de animación al completar
  setTimeout(() => {
    cartCount.classList.remove('scale-125', 'scale-90', 'text-green-500', 'text-red-500');
    totalDiv.classList.remove('scale-110', 'scale-95');
    cartCount.classList.add('text-white'); // Restaurar color por defecto
  }, 300);
  
  // Actualizar insignia del contador del carrito
  const cartBadge = document.getElementById('cart-count-badge');
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    if (totalItems > 0) {
      cartBadge.classList.remove('hidden');
      cartBadge.classList.add('animate-ping-once');
      setTimeout(() => cartBadge.classList.remove('animate-ping-once'), 1000);
    } else {
      cartBadge.classList.add('hidden');
    }
  }
};

// Gestión mejorada de cantidades y carrito con retroalimentación
window.updateQuantity = (productId, newQuantity) => {
  const product = sampleProducts.find(p => p.id === productId);
  if (!product) return;
  
  const { cart } = store.getState();
  const maxQuantity = Math.min(product.stock, 99); // Límite de 99 unidades por producto
  newQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
  
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (newQuantity === 0) {
      cart.splice(itemIndex, 1);
      notifications.show('Producto eliminado del carrito', 'success');
    } else {
      const oldQuantity = cart[itemIndex].quantity;
      cart[itemIndex].quantity = newQuantity;
      cart[itemIndex].totalPrice = product.price * newQuantity;
      
      // Mostrar retroalimentación al alcanzar el límite de stock
      if (newQuantity === maxQuantity && oldQuantity < maxQuantity) {
        notifications.show(`Máximo disponible: ${maxQuantity} unidades`, 'info');
      }
    }
    store.setState({ cart: [...cart] });
  }
};

// Eliminar producto del carrito con retroalimentación
window.removeFromCart = (productId, showNotification = true) => {
  const { cart } = store.getState();
  const product = sampleProducts.find(p => p.id === productId);
  const updatedCart = cart.filter(item => item.id !== productId);
  
  // Actualizar estado del carrito
  store.setState({ cart: updatedCart });
  
  if (product && showNotification) {
    // Mostrar notificación de deshacer
    const notificationId = `remove-${Date.now()}`;
    const notification = document.createElement('div');
    notification.id = notificationId;
    notification.className = 'notification animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>${product.name} eliminado</span>
        <button onclick="undoRemove('${productId}', '${notificationId}')" 
                class="ml-4 text-sm text-blue-500 hover:text-blue-700 font-medium">
          Deshacer
        </button>
      </div>
    `;
    
    // Añadir al contenedor de notificaciones
    const container = document.getElementById('notification-container') || createNotificationContainer();
    container.appendChild(notification);
    
    // Eliminar notificación automáticamente
    setTimeout(() => {
      const notif = document.getElementById(notificationId);
      if (notif) {
        notif.classList.remove('animate-fade-in');
        notif.classList.add('animate-fade-out');
        setTimeout(() => notif.remove(), 300);
      }
    }, 5000);
  }
};

// Filtrar productos por categoría
window.filterByCategory = (categoryId) => {
  store.setState({ currentCategory: categoryId });
  
  // Actualizar botones de categoría con transición suave
  updateCategoryButtons();
  showProducts();
};

// Limpiar filtros
window.clearFilters = () => {
  store.setState({ currentCategory: null, searchQuery: '' });
  document.getElementById('search-input').value = '';
  updateCategoryButtons();
  showProducts();
};

// Actualizaciones de botones de categoría
const updateCategoryButtons = () => {
  const { currentCategory } = store.getState();
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  // Actualizar estado de los botones de categoría
  categoryButtons.forEach(button => {
    const isActive = (button.onclick.toString().includes('null') && !currentCategory) ||
                    button.onclick.toString().includes(`'${currentCategory}'`);
    
    if (isActive) {
      button.className = button.className.replace(/bg-white.*?hover:shadow-md/, 
        'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25');
    } else {
      button.className = button.className.replace(/bg-gradient-to-r.*?shadow-blue-500\/25/, 
        'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md');
    }
  });
};

// Búsqueda con debouncing
const setupSearchFunctionality = () => {
  const searchInput = document.getElementById('search-input');
  
  const handleSearch = debounce((query) => {
    store.setState({ searchQuery: query.trim() });
    showProducts();
  }, 300);
  
  searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });
  
  // Animaciones para el campo de búsqueda
  searchInput.addEventListener('focus', () => {
    searchInput.parentElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
    searchInput.classList.add('bg-white');
  });
  
  searchInput.addEventListener('blur', () => {
    searchInput.parentElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
    if (!searchInput.value) {
      searchInput.classList.remove('bg-white');
    }
  });
};

// Configuración de event listeners
const setupEventListeners = () => {
  // Vaciar carrito con confirmación
  const clearCartBtn = document.getElementById("clear-cart");
  clearCartBtn.addEventListener("click", () => {
    const { cart } = store.getState();
    if (cart.length === 0) return;
    
    // Crear modal de confirmación personalizado
    showConfirmationModal(
      '¿Vaciar carrito?',
      '¿Estás seguro de que quieres eliminar todos los productos del carrito?',
      () => {
        store.setState({ cart: [] });
        notifications.show('Carrito vaciado', 'success');
        
        // Animar vaciado del carrito
        const cartItems = document.getElementById('cart-items');
        cartItems.style.opacity = '0';
        cartItems.style.transform = 'scale(0.95)';
        setTimeout(() => {
          updateCart();
          cartItems.style.opacity = '1';
          cartItems.style.transform = 'scale(1)';
        }, 200);
      }
    );
  });
  
  // Funcionalidad de pago
  const checkoutBtn = document.getElementById("checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    const { cart } = store.getState();
    if (cart.length === 0) return;
    
    // Simular proceso de pago
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = `
      <div class="flex items-center justify-center space-x-2">
        <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Procesando...</span>
      </div>
    `;
    
    // Simular proceso de pago
    setTimeout(() => {
      notifications.show('¡Compra realizada con éxito!', 'success', 4000);
      store.setState({ cart: [] });
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = 'Proceder al Pago';
    }, 2000);
  });
  
  // Configuración de búsqueda
  setupSearchFunctionality();
  
  // Atajos de teclado
  document.addEventListener('keydown', (e) => {
    // Escape para limpiar búsqueda
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('search-input');
      if (searchInput.value) {
        searchInput.value = '';
        store.setState({ searchQuery: '' });
        showProducts();
        searchInput.blur();
      }
    }
    
    // Ctrl/Cmd + K para enfocar búsqueda
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('search-input').focus();
    }
  });
};

// Modal de confirmación
const showConfirmationModal = (title, message, onConfirm) => {
  const modal = document.createElement('div');
  modal.className = `
    fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4
    animate-[fadeIn_0.3s_ease-out]
  `;

  // Modal de confirmación
  modal.innerHTML = `
    <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform animate-[scaleIn_0.3s_ease-out]">
      <div class="text-center">
        <div class="text-4xl mb-4">⚠️</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">${title}</h3>
        <p class="text-gray-600 mb-6">${message}</p>
        
        <div class="flex space-x-3">
          <button class="cancel-btn flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 
                         py-2 px-4 rounded-xl transition-all duration-300 font-medium">
            Cancelar
          </button>
          <button class="confirm-btn flex-1 bg-red-500 hover:bg-red-600 text-white 
                         py-2 px-4 rounded-xl transition-all duration-300 font-medium">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  `;

  // Botones de cancelar y confirmar
  const cancelBtn = modal.querySelector('.cancel-btn');
  const confirmBtn = modal.querySelector('.confirm-btn');
  
  // Cerrar modal
  const closeModal = () => {
    modal.classList.add('animate-[fadeOut_0.3s_ease-in]');
    setTimeout(() => modal.remove(), 300);
  };
  
  // manejadores de eventos
  cancelBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', () => {
    onConfirm();
    closeModal();
  });
  
  // Cerrar al hacer clic en el fondo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Agregar modal al documento
  document.body.appendChild(modal);
};

// Suscripción al estado para actualizaciones automáticas
store.subscribe((state) => {
  updateCart();
  
  // Actualizar contador de productos
  requestAnimationFrame(() => {
    const productsCount = document.getElementById("products-count");
    if (productsCount) {
      let count = sampleProducts.length;
      
      if (state.currentCategory) {
        count = sampleProducts.filter(p => p.categoryId === state.currentCategory).length;
      }
      
      if (state.searchQuery) {
        const filtered = sampleProducts.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        count = state.currentCategory ? 
          filtered.filter(p => p.categoryId === state.currentCategory).length : 
          filtered.length;
      }
      
      // Actualizar contador de productos
      productsCount.textContent = `${count} producto${count !== 1 ? 's' : ''}`;
    }
  });
});

// Comportamiento adaptable (o "Responsive")
const handleResize = debounce(() => {
  // Ajustar diseño para móvil
  const isMobile = window.innerWidth < 1024;
  const cartElement = document.querySelector('.lg\\:w-1\\/4 > div');
  
  if (cartElement) {
    if (isMobile) {
      cartElement.classList.remove('sticky', 'top-24');
      cartElement.classList.add('relative');
    } else {
      cartElement.classList.add('sticky', 'top-24');
      cartElement.classList.remove('relative');
    }
  }
}, 250);

// Escuchar eventos de redimensionamiento
window.addEventListener('resize', handleResize);

// Optimizaciones de rendimiento
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    }
  });
}, { rootMargin: '50px' });

// Crear contenedor de notificaciones si no existe
const createNotificationContainer = () => {
  const container = document.createElement('div');
  container.id = 'notification-container';
  container.className = 'fixed top-4 right-4 z-50 space-y-2';
  document.body.appendChild(container);
  return container;
};

// Deshacer eliminación del carrito
window.undoRemove = (productId, notificationId) => {
  const product = sampleProducts.find(p => p.id === productId);
  if (!product) return;
  
  const { cart } = store.getState();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.totalPrice = product.price * existingItem.quantity;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      totalPrice: product.price
    });
  }
  
  store.setState({ cart: [...cart] });
  
  // Eliminar la notificación
  const notification = document.getElementById(notificationId);
  if (notification) {
    notification.remove();
  }
};

// Inicializar app con manejo de errores
const initApp = async () => {
  try {
    initializeApp();
    
    // Agregar desplazamiento suave
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Inicializar carrito desde localStorage si está disponible
  const savedCart = localStorage.getItem('shoppingCart');
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      store.setState({ cart: parsedCart });
    } catch (e) {
      console.error('Error al cargar el carrito desde localStorage:', e);
    }
  }
  
  // Guardar carrito en localStorage cuando cambia
  store.subscribe(({ cart }) => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar el carrito en localStorage:', e);
    }
  });
    
    console.log('🚀 Tienda Premium inicializada correctamente');
    
    // Monitoreo de rendimiento
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ App loaded in ${Math.round(loadTime)}ms`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error al inicializar la app:', error);
    notifications.show('Error al cargar la aplicación', 'error', 5000);
  }
};

// Inicializar app
initApp();