import './style.css';
import { createHeader, createFooter, initializeHeader, initializeFloatingWhatsApp } from './components.js';
import { appState } from './state.js';
import productos from './data.js';

let currentProduct = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Insert header and footer
  document.getElementById('header').innerHTML = createHeader();
  document.getElementById('footer').innerHTML = createFooter();
  
  // Initialize header functionality
  initializeHeader();
  
  // Initialize floating WhatsApp button
  initializeFloatingWhatsApp();
  
  // Load product
  loadProduct();
  
  // Setup event listeners
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Quantity controls
  document.getElementById('quantity-minus').addEventListener('click', () => {
    const input = document.getElementById('quantity-input');
    const value = parseInt(input.value);
    if (value > 1) {
      input.value = value - 1;
    }
  });
  
  document.getElementById('quantity-plus').addEventListener('click', () => {
    const input = document.getElementById('quantity-input');
    const value = parseInt(input.value);
    if (value < 99) {
      input.value = value + 1;
    }
  });
  
  // Add to cart button
  document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);
  
  // WhatsApp button
  document.getElementById('whatsapp-btn').addEventListener('click', shareToWhatsApp);
  
  // Share button
  document.getElementById('share-btn').addEventListener('click', shareProduct);
}

// Load product from URL parameter
function loadProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    showNotFound();
    return;
  }
  
  // Show loading
  document.getElementById('loading').classList.remove('hidden');
  
  // Simulate loading delay
  setTimeout(() => {
    currentProduct = productos.find(p => p.id === productId);
    
    document.getElementById('loading').classList.add('hidden');
    
    if (!currentProduct) {
      showNotFound();
      return;
    }
    
    displayProduct();
    loadRelatedProducts();
  }, 500);
}

// Show not found state
function showNotFound() {
  document.getElementById('not-found').classList.remove('hidden');
  document.title = 'Producto no encontrado - Orthodontika';
}

// Display product information
function displayProduct() {
  const product = currentProduct;
  
  // Update page title
  document.title = `${product.nombre} - Orthodontika`;
  
  // Show product content
  document.getElementById('product-content').classList.remove('hidden');
  
  // Breadcrumb
  document.getElementById('breadcrumb').innerHTML = `
    <a href="/" class="hover:text-primary-800">Inicio</a>
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
    </svg>
    <a href="/productos.html" class="hover:text-primary-800">Productos</a>
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
    </svg>
    <a href="/productos.html?categoria=${encodeURIComponent(product.categoria)}" class="hover:text-primary-800">${product.categoria}</a>
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
    </svg>
    <span class="text-gray-500">${product.nombre}</span>
  `;
  
  // Product badges
  const badges = [];
  if (!product.disponibilidad) {
    badges.push('<span class="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">Agotado</span>');
  }
  if (product.enOferta) {
    badges.push('<span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">En Oferta</span>');
  }
  document.getElementById('product-badges').innerHTML = badges.join('');
  
  // Main product image
  const mainImage = document.getElementById('main-image');
  mainImage.src = product.img;
  mainImage.alt = product.nombre;
  mainImage.onerror = function() { this.src = '/placeholder.png'; };
  
  // Image gallery (if extra images exist)
  const imageGallery = document.getElementById('image-gallery');
  if (product.imgExtra && product.imgExtra.length > 0) {
    const validImages = product.imgExtra.filter(img => img && img.trim() !== '');
    if (validImages.length > 0) {
      imageGallery.innerHTML = [product.img, ...validImages].map((img, index) => `
        <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
          <img src="${img || '/placeholder.png'}" alt="${product.nombre} ${index + 1}" 
               class="w-full h-full object-cover"
               onclick="changeMainImage('${img || '/placeholder.png'}')"
               onerror="this.src='/placeholder.png'">
        </div>
      `).join('');
    }
  }
  
  // Product information
  document.getElementById('product-name').textContent = product.nombre;
  document.getElementById('product-category').textContent = product.categoria;
  document.getElementById('product-category-detail').textContent = `${product.categoria}${product.subcategoria1 ? ` > ${product.subcategoria1}` : ''}${product.subcategoria2 ? ` > ${product.subcategoria2}` : ''}`;
  document.getElementById('product-brand').textContent = product.marca;
  document.getElementById('product-id').textContent = product.id;
  
  // Availability
  const availabilityElement = document.getElementById('product-availability');
  if (product.disponibilidad) {
    availabilityElement.innerHTML = '<span class="text-green-600 font-medium">En stock</span>';
  } else {
    availabilityElement.innerHTML = '<span class="text-red-600 font-medium">Agotado</span>';
  }
  
  // Price
  document.getElementById('product-price').textContent = `$${product.precio}`;
  
  // Offer badge
  if (product.enOferta) {
    document.getElementById('offer-badge').classList.remove('hidden');
  }
  
  // Add to cart button state
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (!product.disponibilidad) {
    addToCartBtn.textContent = 'No Disponible';
    addToCartBtn.disabled = true;
    addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
  
  // Product description (generate a basic description)
  document.getElementById('product-description').innerHTML = `
    <p class="mb-4">
      ${product.nombre} es un producto de alta calidad de la marca ${product.marca}, 
      diseñado específicamente para profesionales de la ortodoncia.
    </p>
    <p class="mb-4">
      Este producto pertenece a la categoría ${product.categoria}${product.subcategoria1 ? ` en la subcategoría ${product.subcategoria1}` : ''}, 
      ofreciendo las características y especificaciones técnicas necesarias para 
      un uso profesional confiable.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-semibold mb-2">Características</h4>
        <ul class="text-sm space-y-1">
          <li>• Producto profesional</li>
          <li>• Material de alta calidad</li>
          <li>• Fácil de usar</li>
          <li>• Duradero y confiable</li>
        </ul>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-semibold mb-2">Especificaciones</h4>
        <ul class="text-sm space-y-1">
          <li>• Código: ${product.id}</li>
          <li>• Marca: ${product.marca}</li>
          <li>• Categoría: ${product.categoria}</li>
          ${product.subcategoria1 ? `<li>• Subcategoría: ${product.subcategoria1}</li>` : ''}
        </ul>
      </div>
    </div>
  `;
}

// Change main image
window.changeMainImage = function(imageSrc) {
  document.getElementById('main-image').src = imageSrc;
};

// Add to cart
function addToCart() {
  if (!currentProduct || !currentProduct.disponibilidad) return;
  
  const quantity = parseInt(document.getElementById('quantity-input').value);
  appState.addToCarrito(currentProduct, quantity);
  
  showNotification(`${currentProduct.nombre} (${quantity}) agregado al carrito`);
}

// Share to WhatsApp
function shareToWhatsApp() {
  if (!currentProduct) return;
  
  const message = `¡Mira este producto de Orthodontika!\n\n${currentProduct.nombre}\nPrecio: $${currentProduct.precio}\n\n${window.location.href}`;
  const whatsappNumber = '5493517604756'; // Replace with actual number
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  window.open(whatsappURL, '_blank');
}

// Share product
function shareProduct() {
  if (!currentProduct) return;
  
  if (navigator.share) {
    navigator.share({
      title: currentProduct.nombre,
      text: `${currentProduct.nombre} - $${currentProduct.precio}`,
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      showNotification('Enlace copiado al portapapeles');
    });
  }
}

// Load related products
function loadRelatedProducts() {
  if (!currentProduct) return;
  
  // Find products in the same category (excluding current product)
  const relatedProducts = productos
    .filter(p => p.categoria === currentProduct.categoria && p.id !== currentProduct.id)
    .slice(0, 4);
  
  if (relatedProducts.length === 0) return;
  
  document.getElementById('related-products-section').classList.remove('hidden');
  
  document.getElementById('related-products').innerHTML = relatedProducts.map(producto => `
    <div class="card group cursor-pointer" onclick="window.location.href='/producto.html?id=${producto.id}'">
      <div class="aspect-square bg-gray-200 overflow-hidden">
        <img src="${producto.img || '/placeholder.png'}" 
             alt="${producto.nombre}" 
             class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
             onerror="this.src='/placeholder.png'">
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2 line-clamp-2">${producto.nombre}</h3>
        <p class="text-sm text-gray-600 mb-2">${producto.marca}</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold text-primary-800">$${producto.precio}</span>
          ${producto.enOferta ? '<span class="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded font-medium">OFERTA</span>' : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-full transition-transform duration-300';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove('translate-y-full');
  }, 100);
  
  setTimeout(() => {
    notification.classList.add('translate-y-full');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
