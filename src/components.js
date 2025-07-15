import { appState } from './state.js';

// Componente Header
export function createHeader() {
  return `
    <header class="bg-white shadow-lg sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <a href="/" class="flex items-center space-x-2">
            <img src="/LogoOrthodontika2.png" alt="Orthodontika" class="h-12 w-auto">
          </a>

          <!-- Navigation Desktop -->
          <nav class="hidden md:flex items-center space-x-8">
            <!-- Products Dropdown -->
            <div class="relative group">
              <button class="text-gray-700 hover:text-primary-800 transition-colors flex items-center space-x-1">
                <span>Productos</span>
                <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-50">
                <div class="grid grid-cols-2 gap-4 p-6">
                  <!-- Accesorios -->
                  <div>
                    <h3 class="text-sm font-semibold text-primary-800 mb-3">Accesorios</h3>
                    <ul class="space-y-2">
                      <li><a href="/productos.html?categoria=Accesorios&subcategoria=Intraorales" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Intraorales</a></li>
                      <li><a href="/productos.html?categoria=Accesorios&subcategoria=Metalicos" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Metálicos</a></li>
                      <li><a href="/productos.html?categoria=Accesorios&subcategoria=Ceramicos" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Cerámicos</a></li>
                    </ul>
                  </div>
                  
                  <!-- Brackets -->
                  <div>
                    <h3 class="text-sm font-semibold text-primary-800 mb-3">Brackets</h3>
                    <ul class="space-y-2">
                      <li><a href="/productos.html?categoria=Brackets&subcategoria=Metalicos" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Metálicos</a></li>
                      <li><a href="/productos.html?categoria=Brackets&subcategoria=Ceramicos" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Cerámicos</a></li>
                      <li><a href="/productos.html?categoria=Brackets&subcategoria=Autoligado" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Autoligado</a></li>
                    </ul>
                  </div>
                  
                  <!-- Elastomeros -->
                  <div>
                    <h3 class="text-sm font-semibold text-primary-800 mb-3">Elastómeros</h3>
                    <ul class="space-y-2">
                      <li><a href="/productos.html?categoria=Elastomeros&subcategoria=Colores" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Colores</a></li>
                      <li><a href="/productos.html?categoria=Elastomeros&subcategoria=Transparentes" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Transparentes</a></li>
                      <li><a href="/productos.html?categoria=Elastomeros&subcategoria=Cadenas" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Cadenas</a></li>
                    </ul>
                  </div>
                  
                  <!-- Instrumentos -->
                  <div>
                    <h3 class="text-sm font-semibold text-primary-800 mb-3">Instrumentos</h3>
                    <ul class="space-y-2">
                      <li><a href="/productos.html?categoria=Instrumentos&subcategoria=Alicates" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Alicates</a></li>
                      <li><a href="/productos.html?categoria=Instrumentos&subcategoria=Cortadores" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Cortadores</a></li>
                      <li><a href="/productos.html?categoria=Instrumentos&subcategoria=Separadores" class="text-sm text-gray-600 hover:text-primary-700 transition-colors">Separadores</a></li>
                    </ul>
                  </div>
                </div>
                
                <div class="border-t border-gray-100 p-4">
                  <a href="/productos.html" class="text-sm text-accent-600 hover:text-accent-700 font-medium flex items-center">
                    Ver todos los productos
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Cart Icon Desktop -->
            <button id="cart-toggle" class="relative p-2 text-gray-700 hover:text-primary-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512">
                <circle cx="176" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                <circle cx="400" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 80h64l48 272h256"/>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128"/>
              </svg>
              <span id="cart-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>
          </nav>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-toggle" class="md:hidden p-2 text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden py-4 border-t">
          <nav class="flex flex-col space-y-4">
            <a href="/" class="text-gray-700 hover:text-primary-800 transition-colors">Inicio</a>
            
            <!-- Mobile Products Accordion -->
            <div class="mobile-dropdown">
              <button class="mobile-dropdown-trigger w-full flex items-center justify-between text-gray-700 hover:text-primary-800 transition-colors" data-target="products-mobile">
                <span>Productos</span>
                <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div id="products-mobile" class="mobile-dropdown-content hidden mt-2 ml-4 space-y-3">
                <!-- Accesorios -->
                <div>
                  <h4 class="text-sm font-medium text-primary-800 mb-2">Accesorios</h4>
                  <div class="ml-3 space-y-1">
                    <a href="/productos.html?categoria=Accesorios&subcategoria=Intraorales" class="block text-sm text-gray-600">Intraorales</a>
                    <a href="/productos.html?categoria=Accesorios&subcategoria=Metalicos" class="block text-sm text-gray-600">Metálicos</a>
                    <a href="/productos.html?categoria=Accesorios&subcategoria=Ceramicos" class="block text-sm text-gray-600">Cerámicos</a>
                  </div>
                </div>
                
                <!-- Brackets -->
                <div>
                  <h4 class="text-sm font-medium text-primary-800 mb-2">Brackets</h4>
                  <div class="ml-3 space-y-1">
                    <a href="/productos.html?categoria=Brackets&subcategoria=Metalicos" class="block text-sm text-gray-600">Metálicos</a>
                    <a href="/productos.html?categoria=Brackets&subcategoria=Ceramicos" class="block text-sm text-gray-600">Cerámicos</a>
                    <a href="/productos.html?categoria=Brackets&subcategoria=Autoligado" class="block text-sm text-gray-600">Autoligado</a>
                  </div>
                </div>
                
                <!-- Elastomeros -->
                <div>
                  <h4 class="text-sm font-medium text-primary-800 mb-2">Elastómeros</h4>
                  <div class="ml-3 space-y-1">
                    <a href="/productos.html?categoria=Elastomeros&subcategoria=Colores" class="block text-sm text-gray-600">Colores</a>
                    <a href="/productos.html?categoria=Elastomeros&subcategoria=Transparentes" class="block text-sm text-gray-600">Transparentes</a>
                    <a href="/productos.html?categoria=Elastomeros&subcategoria=Cadenas" class="block text-sm text-gray-600">Cadenas</a>
                  </div>
                </div>
                
                <!-- Instrumentos -->
                <div>
                  <h4 class="text-sm font-medium text-primary-800 mb-2">Instrumentos</h4>
                  <div class="ml-3 space-y-1">
                    <a href="/productos.html?categoria=Instrumentos&subcategoria=Alicates" class="block text-sm text-gray-600">Alicates</a>
                    <a href="/productos.html?categoria=Instrumentos&subcategoria=Cortadores" class="block text-sm text-gray-600">Cortadores</a>
                    <a href="/productos.html?categoria=Instrumentos&subcategoria=Separadores" class="block text-sm text-gray-600">Separadores</a>
                  </div>
                </div>
                
                <!-- Ver todos -->
                <div class="pt-2 border-t border-gray-200">
                  <a href="/productos.html" class="text-sm text-accent-600 hover:text-accent-700 font-medium">Ver todos los productos</a>
                </div>
              </div>
            </div>
            
            <!-- Mobile Cart Link -->
            <button id="cart-toggle-mobile" class="flex items-center space-x-2 text-gray-700 hover:text-primary-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                <circle cx="176" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                <circle cx="400" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 80h64l48 272h256"/>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128"/>
              </svg>
              <span>Carrito</span>
              <span id="cart-count-mobile" class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Cart Modal -->
    <div id="cart-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
      <div class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div class="flex flex-col h-full">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-4 border-b">
            <h2 class="text-lg font-semibold">Carrito de Compras</h2>
            <button id="close-cart" class="p-2 hover:bg-gray-100 rounded">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Cart Items -->
          <div id="cart-items" class="flex-1 overflow-y-auto p-4">
            <!-- Cart items will be populated here -->
          </div>

          <!-- Cart Footer -->
          <div id="cart-footer" class="border-t p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="text-lg font-semibold">Total: </span>
              <span id="cart-total" class="text-lg font-bold text-primary-800">$0</span>
            </div>
            <div class="space-y-2">
              <a href="/carrito.html" class="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full text-center block">Ver Carrito Completo</a>
              <button id="send-whatsapp" class="btn-secondary w-full">Enviar por WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Componente Footer
export function createFooter() {
    return `
    <footer class="bg-gray-200 text-black">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <img src="/LogoOrthodontika2.png" alt="Orthodontika" class="h-10 w-auto">
            </div>
            <p class="text-gray-300 mb-4">
              Especialistas en productos ortodónticos de alta calidad. 
              Ofrecemos brackets, alicates, accesorios y todo lo necesario para tu práctica profesional.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.219 0 .359.162.359.359 0 .219-.139.219-.139.578-.219.937.219 2.403 1.406 2.403 1.406 0 2.482-1.487 2.482-3.66 0-1.915-1.377-3.252-3.344-3.252-2.344 0-3.711 1.756-3.711 3.57 0 .717.275 1.487.619 1.904.069.08.078.149.058.229-.063.265-.203.822-.232.937-.037.149-.123.18-.283.108-1.001-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.287-4.84 2.781 0 4.943 1.983 4.943 4.628 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.931l-.498 1.902c-.181.695-.675 1.566-1.003 2.098.756.234 1.554.359 2.395.359 6.621 0 11.99-5.367 11.99-11.987C24.007 5.367 18.638.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul class="space-y-2">
              <li><a href="/" class="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/productos.html" class="text-gray-300 hover:text-white transition-colors">Productos</a></li>
              <li><a href="/carrito.html" class="text-gray-300 hover:text-white transition-colors">Carrito</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contacto</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>info@orthodontika.com</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <span>Buenos Aires, Argentina</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>+54 11 1234-5678</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Orthodontika. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;
}

// Inicializar componentes del header
export function initializeHeader() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Mobile dropdown accordions
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const icon = trigger.querySelector('svg');
      
      if (content && icon) {
        const isHidden = content.classList.contains('hidden');
        
        // Close all other mobile dropdowns
        document.querySelectorAll('.mobile-dropdown-content').forEach(el => {
          if (el !== content) {
            el.classList.add('hidden');
          }
        });
        
        // Reset all other icons
        document.querySelectorAll('.mobile-dropdown-trigger svg').forEach(el => {
          if (el !== icon) {
            el.classList.remove('rotate-180');
          }
        });
        
        // Toggle current dropdown
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });

  // Close mobile menu when window is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
      mobileMenu.classList.add('hidden');
    }
  });

  // Cart modal toggle
  const cartToggle = document.getElementById('cart-toggle');
  const cartToggleMobile = document.getElementById('cart-toggle-mobile');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  
  if (cartModal && closeCart) {
    // Desktop cart button
    if (cartToggle) {
      cartToggle.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        updateCartModal();
      });
    }

    // Mobile cart button
    if (cartToggleMobile) {
      cartToggleMobile.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        updateCartModal();
        // Close mobile menu when opening cart
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
        }
      });
    }

    closeCart.addEventListener('click', () => {
      cartModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.add('hidden');
      }
    });
  }

  // Update cart count on page load and when cart changes
  updateCartCount();
  appState.addListener(updateCartCount);
  appState.addListener(updateCartModal);

  // WhatsApp button
  const sendWhatsAppBtn = document.getElementById('send-whatsapp');
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', sendWhatsAppMessage);
  }
}

// Hacer la función global para que pueda ser llamada desde el HTML
window.sendWhatsAppMessage = sendWhatsAppMessage;

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const cartCountMobile = document.getElementById('cart-count-mobile');
    
    const totalItems = appState.getTotalItems();
    
    // Update desktop cart count
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update mobile cart count
    if (cartCountMobile) {
        cartCountMobile.textContent = totalItems;
        cartCountMobile.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Actualizar modal del carrito
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartTotal) return;

    if (appState.carrito.length === 0) {
        cartItems.innerHTML = `
      <div class="text-center py-8">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13h10m-10 0l-1.5 6m1.5-6h10m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z"></path>
        </svg>
        <p class="text-gray-500">Tu carrito está vacío</p>
      </div>
    `;
    } else {
        cartItems.innerHTML = appState.carrito.map(item => `
      <div class="flex items-start space-x-3 py-4 border-b">
        <div class="aspect-square w-16 bg-gray-200 overflow-hidden rounded">
          <img src="${item.img || '/placeholder.png'}" alt="${item.nombre}" class="w-full h-full object-cover"
               onerror="this.src='/placeholder.png'">
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-medium line-clamp-2 mb-1">${item.nombre}</h4>
          <p class="text-sm text-gray-500 mb-2">$${item.precio} c/u</p>
          
          <!-- Quantity Controls -->
          <div class="flex items-center space-x-2 mb-2">
            <button onclick="updateCartQuantity('${item.id}', ${item.cantidad - 1})" 
                    class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 ${item.cantidad <= 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${item.cantidad <= 1 ? 'disabled' : ''}>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
            <span class="text-sm font-medium min-w-[2rem] text-center">${item.cantidad}</span>
            <button onclick="updateCartQuantity('${item.id}', ${item.cantidad + 1})" 
                    class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
          
          <p class="text-sm font-semibold text-primary-800">Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</p>
        </div>
        
        <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 p-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    `).join('');
    }

    cartTotal.textContent = `$${appState.getTotal().toFixed(2)}`;
}

// Función global para remover del carrito
window.removeFromCart = function (productId) {
    appState.removeFromCarrito(productId);
};

// Función global para actualizar cantidad en el carrito
window.updateCartQuantity = function (productId, newQuantity) {
    if (newQuantity <= 0) {
        appState.removeFromCarrito(productId);
    } else if (newQuantity <= 99) { // Límite máximo
        appState.updateCantidad(productId, newQuantity);
    }
};

// Enviar carrito por WhatsApp
function sendWhatsAppMessage() {
    if (appState.carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let message = '¡Hola! Me interesa realizar el siguiente pedido:\n\n';

    appState.carrito.forEach(item => {
        message += `• ${item.nombre}\n`;
        message += `  Cantidad: ${item.cantidad}\n`;
        message += `  Precio unitario: $${item.precio}\n`;
        message += `  Subtotal: $${item.precio * item.cantidad}\n\n`;
    });

    message += `Total: $${appState.getTotal()}\n\n`;
    message += 'Muchas gracias!';

    const whatsappNumber = '5491123456789'; // Reemplazar con el número real
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}

// Botón flotante de WhatsApp
export function createFloatingWhatsAppButton() {
    return `
        <div id="floating-whatsapp" class="fixed bottom-6 right-6 z-50">
            <button 
                onclick="openWhatsApp()"
                class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
                title="Contactar por WhatsApp"
            >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.53 4.126 1.534 5.932L0 24l6.203-1.517c1.746.95 3.712 1.444 5.814 1.444 6.621 0 11.987-5.367 11.987-11.987C23.973 5.367 18.637.001 12.017.001zM12.017 21.947c-1.746 0-3.492-.462-5.006-1.299l-.359-.214-3.714.908.93-3.622-.235-.373c-.922-1.513-1.41-3.259-1.41-5.078 0-5.486 4.466-9.952 9.952-9.952s9.952 4.466 9.952 9.952-4.466 9.952-9.952 9.952z"/>
                    <path d="M17.233 14.268c-.301-.151-1.78-.879-2.056-.979-.277-.101-.478-.151-.679.151-.201.301-.78.979-.958 1.179-.177.201-.354.226-.655.075-.301-.151-1.271-.469-2.42-1.493-.895-.798-1.5-1.785-1.677-2.086-.177-.301-.019-.464.132-.614.135-.135.301-.354.452-.531.15-.177.201-.301.301-.502.101-.201.051-.377-.025-.528-.075-.151-.679-1.636-.93-2.241-.245-.587-.494-.508-.679-.517-.177-.008-.378-.01-.579-.01-.201 0-.528.075-.804.377-.277.301-1.057 1.033-1.057 2.518s1.082 2.92 1.233 3.121c.151.201 2.133 3.259 5.168 4.571.722.312 1.286.498 1.726.637.725.231 1.386.198 1.909.12.583-.087 1.78-.728 2.032-1.431.252-.703.252-1.305.177-1.431-.075-.125-.277-.201-.578-.352z"/>
                </svg>
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:animate-pulse">
                    !
                </span>
            </button>
        </div>
    `;
}

// Función global para abrir WhatsApp (consulta general)
window.openWhatsApp = function() {
    const message = '¡Hola! Me gustaría obtener más información sobre sus productos ortodónticos.';
    const whatsappNumber = '5491123456789'; // Reemplazar con el número real
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
};

// Inicializar botón flotante de WhatsApp
export function initializeFloatingWhatsApp() {
    // Verificar si ya existe para evitar duplicados
    const existingButton = document.getElementById('floating-whatsapp');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Agregar el botón al body
    document.body.insertAdjacentHTML('beforeend', createFloatingWhatsAppButton());
}
