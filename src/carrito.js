import './style.css';
import { createHeader, createFooter, initializeHeader, initializeFloatingWhatsApp } from './components.js';
import { appState } from './state.js';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Insert header and footer
  document.getElementById('header').innerHTML = createHeader();
  document.getElementById('footer').innerHTML = createFooter();
  
  // Initialize header functionality
  initializeHeader();
  
  // Initialize floating WhatsApp button
  initializeFloatingWhatsApp();
  
  // Setup event listeners
  setupEventListeners();
  
  // Load cart
  loadCart();
  
  // Listen for cart changes
  appState.addListener(loadCart);
});

// Setup event listeners
function setupEventListeners() {
  // Clear cart button
  document.getElementById('clear-cart').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      appState.clearCarrito();
    }
  });
  
  // Send buttons
  document.getElementById('send-whatsapp').addEventListener('click', sendToWhatsApp);
  document.getElementById('send-email').addEventListener('click', sendByEmail);
}

// Load cart content
function loadCart() {
  const emptyCart = document.getElementById('empty-cart');
  const cartWithItems = document.getElementById('cart-with-items');
  
  if (appState.carrito.length === 0) {
    emptyCart.classList.remove('hidden');
    cartWithItems.classList.add('hidden');
    return;
  }
  
  emptyCart.classList.add('hidden');
  cartWithItems.classList.remove('hidden');
  
  // Load cart items
  loadCartItems();
  
  // Update summary
  updateSummary();
}

// Load cart items list
function loadCartItems() {
  const cartItemsList = document.getElementById('cart-items-list');
  
  cartItemsList.innerHTML = appState.carrito.map(item => `
    <div class="p-6">
      <div class="flex items-start space-x-4">
        <!-- Product Image -->
        <div class="flex-shrink-0">
          <div class="aspect-square w-20 bg-gray-200 overflow-hidden rounded-lg">
            <img src="${item.img || '/placeholder.png'}" 
                 alt="${item.nombre}" 
                 class="w-full h-full object-cover"
                 onerror="this.src='/placeholder.png'">
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">${item.nombre}</h3>
          <p class="text-sm text-gray-600 mb-2">${item.categoria} • ${item.marca}</p>
          <p class="text-sm text-gray-500">Código: ${item.id}</p>
          
          <!-- Quantity Controls -->
          <div class="flex items-center space-x-3 mt-4">
            <span class="text-sm font-medium text-gray-700">Cantidad:</span>
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button onclick="updateQuantity('${item.id}', ${item.cantidad - 1})" 
                      class="px-3 py-1 text-gray-600 hover:text-gray-800 ${item.cantidad <= 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                      ${item.cantidad <= 1 ? 'disabled' : ''}>
                -
              </button>
              <span class="px-3 py-1 text-center min-w-[3rem]">${item.cantidad}</span>
              <button onclick="updateQuantity('${item.id}', ${item.cantidad + 1})" 
                      class="px-3 py-1 text-gray-600 hover:text-gray-800">
                +
              </button>
            </div>
          </div>
        </div>
        
        <!-- Price and Remove -->
        <div class="flex flex-col items-end space-y-2">
          <div class="text-right">
            <p class="text-sm text-gray-500">Precio unitario</p>
            <p class="text-lg font-semibold text-gray-900">$${item.precio}</p>
          </div>
          
          <div class="text-right">
            <p class="text-sm text-gray-500">Subtotal</p>
            <p class="text-xl font-bold text-primary-800">$${item.precio * item.cantidad}</p>
          </div>
          
          <button onclick="removeFromCart('${item.id}')" 
                  class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Update cart summary
function updateSummary() {
  const totalItems = appState.getTotalItems();
  const totalPrice = appState.getTotal();
  
  // Generate category summary
  const categorySummary = {};
  appState.carrito.forEach(item => {
    if (categorySummary[item.categoria]) {
      categorySummary[item.categoria] += item.cantidad;
    } else {
      categorySummary[item.categoria] = item.cantidad;
    }
  });

  // Update category summary display
  const categorySummaryElement = document.getElementById('category-summary');
  if (Object.keys(categorySummary).length > 0) {
    categorySummaryElement.innerHTML = Object.entries(categorySummary)
      .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically
      .map(([category, count]) => `
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">${category}</span>
          <span class="text-gray-900 font-medium">(${count})</span>
        </div>
      `).join('');
  } else {
    categorySummaryElement.innerHTML = '<div class="text-sm text-gray-500">No hay productos en el carrito</div>';
  }
  
  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Global functions for cart operations
window.updateQuantity = function(productId, newQuantity) {
  appState.updateCantidad(productId, newQuantity);
};

window.removeFromCart = function(productId) {
  if (confirm('¿Quieres remover este producto del carrito?')) {
    appState.removeFromCarrito(productId);
  }
};

// Validate contact form for email
function validateContactFormForEmail() {
  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  
  if (!name) {
    alert('Por favor ingresa tu nombre completo');
    return false;
  }
  
  if (!phone) {
    alert('Por favor ingresa tu teléfono');
    return false;
  }
  
  if (!email) {
    alert('Por favor ingresa tu email');
    return false;
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor ingresa un email válido');
    return false;
  }
  
  return true;
}

// Generate order message for WhatsApp or Email
function generateOrderMessage() {
  const contact = getContactInfo();
  const currentDate = new Date().toLocaleDateString('es-AR');
  
  let message = `🛒 NUEVO PEDIDO - ORTHODONTIKA\n`;
  message += `📅 Fecha: ${currentDate}\n\n`;
  
  // Add contact info only if provided
  const hasContactInfo = contact.name || contact.phone || contact.email;
  if (hasContactInfo) {
    message += `👤 INFORMACIÓN DEL CLIENTE:\n`;
    if (contact.name) message += `• Nombre: ${contact.name}\n`;
    if (contact.phone) message += `• Teléfono: ${contact.phone}\n`;
    if (contact.email) message += `• Email: ${contact.email}\n`;
    message += `\n`;
  }
  
  message += `📦 PRODUCTOS SOLICITADOS:\n`;
  message += `─────────────────────────\n`;
  
  // Group by category for better organization
  const categorySummary = {};
  appState.carrito.forEach(item => {
    if (!categorySummary[item.categoria]) {
      categorySummary[item.categoria] = [];
    }
    categorySummary[item.categoria].push(item);
  });

  Object.entries(categorySummary).forEach(([categoria, items]) => {
    message += `\n📂 ${categoria.toUpperCase()}:\n`;
    items.forEach((item, index) => {
      message += `   ${index + 1}. ${item.nombre}\n`;
      message += `      • Código: ${item.id}\n`;
      message += `      • Marca: ${item.marca}\n`;
      message += `      • Cantidad: ${item.cantidad}\n`;
      message += `      • Precio unitario: $${item.precio}\n`;
      message += `      • Subtotal: $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
  });
  
  message += `\n─────────────────────────\n`;
  message += `📊 RESUMEN:\n`;
  
  // Add category summary
  Object.entries(categorySummary).forEach(([categoria, items]) => {
    const count = items.reduce((sum, item) => sum + item.cantidad, 0);
    message += `• ${categoria}: ${count} productos\n`;
  });
  
  message += `• Total de productos: ${appState.getTotalItems()}\n`;
  message += `• TOTAL ESTIMADO: $${appState.getTotal().toFixed(2)}\n\n`;
  
  if (contact.comments) {
    message += `💬 COMENTARIOS:\n${contact.comments}\n\n`;
  }
  
  message += `¡Gracias por contactarnos! 🙏\n`;
  message += `Nos pondremos en contacto contigo a la brevedad para confirmar precios y disponibilidad.`;

  return message;
}

// Get contact information
function getContactInfo() {
  return {
    name: document.getElementById('contact-name').value.trim(),
    phone: document.getElementById('contact-phone').value.trim(),
    email: document.getElementById('contact-email').value.trim(),
    comments: document.getElementById('contact-comments').value.trim()
  };
}

// Send to WhatsApp
function sendToWhatsApp() {
  if (appState.carrito.length === 0) {
    showNotification('El carrito está vacío', 'error');
    return;
  }
  
  // WhatsApp doesn't require contact form validation
  const message = generateOrderMessage();
  const whatsappNumber = '5493517604756'; // Replace with actual number
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank');
  
  showNotification('Redirigiendo a WhatsApp...', 'success');
}

// Send by email
function sendByEmail() {
  if (appState.carrito.length === 0) {
    showNotification('El carrito está vacío', 'error');
    return;
  }
  
  // Email requires contact form validation
  if (!validateContactFormForEmail()) return;
  
  const contact = getContactInfo();
  const message = generateOrderMessage();
  
  const subject = `Pedido Orthodontika - ${contact.name}`;
  const body = message;
  
  const mailtoURL = `mailto:info@orthodontika.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.location.href = mailtoURL;
  
  showNotification('Abriendo cliente de email...', 'success');
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  notification.className = `fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-full transition-transform duration-300`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove('translate-y-full');
  }, 100);
  
  setTimeout(() => {
    notification.classList.add('translate-y-full');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
