import './style.css';
import { createHeader, createFooter, initializeHeader, initializeFloatingWhatsApp } from './components.js';
import { appState } from './state.js';
import productos from './data.js';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Insert header and footer
  document.getElementById('header').innerHTML = createHeader();
  document.getElementById('footer').innerHTML = createFooter();
  
  // Initialize header functionality
  initializeHeader();
  
  // Initialize floating WhatsApp button
  initializeFloatingWhatsApp();
  
  // Load page content
  loadCategories();
  loadFeaturedProducts();
  
  // Re-load featured products on window resize to adjust count
  window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(loadFeaturedProducts, 250);
  });
});

// Load categories carousel
function loadCategories() {
  const categoriesContainer = document.getElementById('categories-carousel');
  
  // Get unique categories
  const categories = [...new Set(productos.map(p => p.categoria))];
  
  categoriesContainer.innerHTML = `
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
      ${categories.map(categoria => {
        const categoryProducts = productos.filter(p => p.categoria === categoria);
        const firstProduct = categoryProducts[0];
        
        return `
          <div class="card group cursor-pointer" onclick="window.location.href='/productos.html?categoria=${encodeURIComponent(categoria)}'">
      <div class="aspect-square bg-gray-200 overflow-hidden">
        <img src="${firstProduct?.img || '/placeholder.png'}" 
             alt="${categoria}" 
             class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
             onerror="this.src='/placeholder.png'">
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">${categoria}</h3>
              <p class="text-gray-600 mb-4">${categoryProducts.length} productos disponibles</p>
              <div class="flex items-center text-accent-600 font-medium">
                Explorar ${categoria}
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Load featured products
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  
  // Responsive product count based on grid columns:
  // Mobile (2 cols): 6 products (3 rows)
  // sm (3 cols): 9 products (3 rows)  
  // md (4 cols): 8 products (2 rows)
  // lg (4 cols): 8 products (2 rows)
  // xl (5 cols): 10 products (2 rows)
  
  let productCount = 10; // Default for xl
  
  // Adjust count based on current screen size
  if (window.innerWidth < 640) { // mobile
    productCount = 6;
  } else if (window.innerWidth < 768) { // sm
    productCount = 9;
  } else if (window.innerWidth < 1280) { // md and lg
    productCount = 8;
  } else { // xl
    productCount = 10;
  }
  
  const featuredProducts = productos.slice(0, productCount);
  
  featuredContainer.innerHTML = featuredProducts.map(producto => `
    <div class="card group">
      <div class="aspect-square bg-gray-200 overflow-hidden">
        <img src="${producto.img || '/placeholder.png'}" 
             alt="${producto.nombre}" 
             class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
             onerror="this.src='/placeholder.png'">
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2 line-clamp-2">${producto.nombre}</h3>
        <p class="text-sm text-gray-600 mb-2">${producto.categoria}</p>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xl font-bold text-primary-800">$${producto.precio}</span>
          ${producto.enOferta ? '<span class="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded font-medium">OFERTA</span>' : ''}
        </div>
        <div class="space-y-2">
          <button onclick="viewProduct('${producto.id}')" class="btn-secondary w-full text-sm">
            Ver Detalles
          </button>
          <button onclick="addToCart('${producto.id}')" class="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full text-sm">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Global functions
window.viewProduct = function(productId) {
  window.location.href = `/producto.html?id=${productId}`;
};

window.addToCart = function(productId) {
  const producto = productos.find(p => p.id === productId);
  if (producto) {
    appState.addToCarrito(producto);
    
    // Show success message
    showNotification(`${producto.nombre} agregado al carrito`);
  }
};

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-full transition-transform duration-300';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.remove('translate-y-full');
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.add('translate-y-full');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
