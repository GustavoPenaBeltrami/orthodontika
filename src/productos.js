import './style.css';
import { createHeader, createFooter, initializeHeader, initializeFloatingWhatsApp } from './components.js';
import { appState } from './state.js';
import productos from './data.js';

// State for products page
let filteredProducts = [...productos];
let currentPage = 1;
const productsPerPage = 12;

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
  initializeFilters();
  loadProducts();
  
  // Check for URL parameters
  checkURLParameters();
  
  // Setup event listeners
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', debounce(applyFilters, 300));
  
  // Filter selects
  ['category-filter', 'subcategory-filter', 'brand-filter', 'sort-filter'].forEach(id => {
    document.getElementById(id).addEventListener('change', applyFilters);
  });
  
  // Price inputs
  ['price-min', 'price-max'].forEach(id => {
    document.getElementById(id).addEventListener('input', debounce(applyFilters, 500));
  });
  
  // Checkboxes
  ['available-filter', 'offer-filter'].forEach(id => {
    document.getElementById(id).addEventListener('change', applyFilters);
  });
  
  // Clear filters
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
  
  // Mobile filters toggle
  document.getElementById('filters-toggle').addEventListener('click', toggleMobileFilters);
  
  // Category filter change updates subcategories
  document.getElementById('category-filter').addEventListener('change', updateSubcategories);
}

// Initialize filters
function initializeFilters() {
  // Populate categories
  const categories = [...new Set(productos.map(p => p.categoria))];
  const categorySelect = document.getElementById('category-filter');
  categorySelect.innerHTML = '<option value="">Todas las categorías</option>' +
    categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
  
  // Populate brands
  const brands = [...new Set(productos.map(p => p.marca))];
  const brandSelect = document.getElementById('brand-filter');
  brandSelect.innerHTML = '<option value="">Todas las marcas</option>' +
    brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
  
  updateSubcategories();
}

// Update subcategories based on selected category
function updateSubcategories() {
  const selectedCategory = document.getElementById('category-filter').value;
  const subcategorySelect = document.getElementById('subcategory-filter');
  
  let subcategories = [];
  if (selectedCategory) {
    const categoryProducts = productos.filter(p => p.categoria === selectedCategory);
    subcategories = [...new Set(categoryProducts.map(p => p.subcategoria1).filter(Boolean))];
  } else {
    subcategories = [...new Set(productos.map(p => p.subcategoria1).filter(Boolean))];
  }
  
  subcategorySelect.innerHTML = '<option value="">Todas las subcategorías</option>' +
    subcategories.map(sub => `<option value="${sub}">${sub}</option>`).join('');
}

// Check URL parameters for initial filters
function checkURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('categoria')) {
    document.getElementById('category-filter').value = urlParams.get('categoria');
    updateSubcategories();
    
    // Check for subcategory parameter
    if (urlParams.has('subcategoria')) {
      // Wait a bit for subcategories to load
      setTimeout(() => {
        const subcategorySelect = document.getElementById('subcategory-filter');
        const subcategoryValue = urlParams.get('subcategoria');
        
        // Check if the subcategory option exists in the select
        const option = Array.from(subcategorySelect.options).find(opt => 
          opt.value.toLowerCase() === subcategoryValue.toLowerCase() ||
          opt.textContent.toLowerCase() === subcategoryValue.toLowerCase()
        );
        
        if (option) {
          subcategorySelect.value = option.value;
        }
        
        applyFilters();
      }, 100);
    } else {
      applyFilters();
    }
  }
}

// Apply all filters
function applyFilters() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const selectedCategory = document.getElementById('category-filter').value;
  const selectedSubcategory = document.getElementById('subcategory-filter').value;
  const selectedBrand = document.getElementById('brand-filter').value;
  const minPrice = parseFloat(document.getElementById('price-min').value) || 0;
  const maxPrice = parseFloat(document.getElementById('price-max').value) || Infinity;
  const onlyAvailable = document.getElementById('available-filter').checked;
  const onlyOffers = document.getElementById('offer-filter').checked;
  const sortBy = document.getElementById('sort-filter').value;
  
  // Filter products
  filteredProducts = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm);
    const matchesCategory = !selectedCategory || producto.categoria === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || producto.subcategoria1 === selectedSubcategory;
    const matchesBrand = !selectedBrand || producto.marca === selectedBrand;
    const matchesPrice = producto.precio >= minPrice && producto.precio <= maxPrice;
    const matchesAvailability = !onlyAvailable || producto.disponibilidad;
    const matchesOffer = !onlyOffers || producto.enOferta;
    
    return matchesSearch && matchesCategory && matchesSubcategory && 
           matchesBrand && matchesPrice && matchesAvailability && matchesOffer;
  });
  
  // Sort products
  sortProducts(sortBy);
  
  // Reset to first page
  currentPage = 1;
  
  // Load filtered products
  loadProducts();
}

// Sort products
function sortProducts(sortBy) {
  switch (sortBy) {
    case 'name-asc':
      filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case 'name-desc':
      filteredProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
    case 'price-asc':
      filteredProducts.sort((a, b) => a.precio - b.precio);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.precio - a.precio);
      break;
  }
}

// Load products with pagination
function loadProducts() {
  const loading = document.getElementById('loading');
  const noResults = document.getElementById('no-results');
  const productsGrid = document.getElementById('products-grid');
  const productsCount = document.getElementById('products-count');
  
  // Show loading
  loading.classList.remove('hidden');
  noResults.classList.add('hidden');
  productsGrid.innerHTML = '';
  
  // Simulate loading delay
  setTimeout(() => {
    loading.classList.add('hidden');
    
    if (filteredProducts.length === 0) {
      noResults.classList.remove('hidden');
      productsCount.textContent = '';
      return;
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update products count
    productsCount.textContent = `Mostrando ${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} de ${filteredProducts.length} productos`;
    
    // Render products
    productsGrid.innerHTML = paginatedProducts.map(producto => `
      <div class="card group">
        <div class="aspect-square bg-gray-200 overflow-hidden">
          <img src="${producto.img || '/placeholder.png'}" 
               alt="${producto.nombre}" 
               class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
               onerror="this.src='/placeholder.png'">
        </div>
        
        <div class="p-4">
          <!-- Product badges -->
          <div class="flex flex-wrap gap-1 mb-2">
            ${!producto.disponibilidad ? '<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Agotado</span>' : ''}
            ${producto.enOferta ? '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">OFERTA</span>' : ''}
          </div>
          
          <h3 class="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">${producto.nombre}</h3>
          
          <div class="text-sm text-gray-600 mb-2">
            <p>${producto.categoria}</p>
            ${producto.subcategoria1 ? `<p>${producto.subcategoria1}</p>` : ''}
            <p class="font-medium">${producto.marca}</p>
          </div>
          
          <div class="flex items-center justify-between mb-4">
            <span class="text-xl font-bold text-primary-800">$${producto.precio}</span>
          </div>
          
          <div class="space-y-2">
            <button onclick="viewProduct('${producto.id}')" class="btn-secondary w-full text-sm">
              Ver Detalles
            </button>
            <button onclick="addToCart('${producto.id}')" 
                    class="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full text-sm ${!producto.disponibilidad ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${!producto.disponibilidad ? 'disabled' : ''}>
              ${producto.disponibilidad ? 'Agregar al Carrito' : 'No Disponible'}
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Load pagination
    loadPagination();
  }, 300);
}

// Load pagination
function loadPagination() {
  const paginationContainer = document.getElementById('pagination');
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }
  
  let paginationHTML = '';
  
  // Previous button
  if (currentPage > 1) {
    paginationHTML += `
      <button onclick="changePage(${currentPage - 1})" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
        Anterior
      </button>
    `;
  }
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `
        <button class="px-3 py-2 text-sm font-medium text-white bg-primary-900 border border-primary-900">
          ${i}
        </button>
      `;
    } else if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
      paginationHTML += `
        <button onclick="changePage(${i})" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">
          ${i}
        </button>
      `;
    } else if (Math.abs(i - currentPage) === 3) {
      paginationHTML += `<span class="px-3 py-2 text-sm font-medium text-gray-500">...</span>`;
    }
  }
  
  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `
      <button onclick="changePage(${currentPage + 1})" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
        Siguiente
      </button>
    `;
  }
  
  paginationContainer.innerHTML = `<div class="flex">${paginationHTML}</div>`;
}

// Clear all filters
function clearFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('category-filter').value = '';
  document.getElementById('subcategory-filter').value = '';
  document.getElementById('brand-filter').value = '';
  document.getElementById('price-min').value = '';
  document.getElementById('price-max').value = '';
  document.getElementById('available-filter').checked = false;
  document.getElementById('offer-filter').checked = false;
  document.getElementById('sort-filter').value = 'name-asc';
  
  updateSubcategories();
  applyFilters();
}

// Toggle mobile filters
function toggleMobileFilters() {
  const sidebar = document.getElementById('filters-sidebar');
  sidebar.classList.toggle('hidden');
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Global functions
window.viewProduct = function(productId) {
  window.location.href = `/producto.html?id=${productId}`;
};

window.addToCart = function(productId) {
  const producto = productos.find(p => p.id === productId);
  if (producto && producto.disponibilidad) {
    appState.addToCarrito(producto);
    showNotification(`${producto.nombre} agregado al carrito`);
  }
};

window.changePage = function(page) {
  currentPage = page;
  loadProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
