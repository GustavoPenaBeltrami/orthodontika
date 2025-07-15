// Estado global de la aplicación
class AppState {
  constructor() {
    this.carrito = this.loadCarrito();
    this.listeners = [];
  }

  // Cargar carrito del localStorage
  loadCarrito() {
    try {
      const saved = localStorage.getItem('orthodontika-carrito');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  // Guardar carrito en localStorage
  saveCarrito() {
    localStorage.setItem('orthodontika-carrito', JSON.stringify(this.carrito));
    this.notifyListeners();
  }

  // Agregar listener para cambios en el carrito
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Notificar a todos los listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.carrito));
  }

  // Agregar producto al carrito
  addToCarrito(producto, cantidad = 1) {
    const existingItem = this.carrito.find(item => item.id === producto.id);
    
    if (existingItem) {
      existingItem.cantidad += cantidad;
    } else {
      this.carrito.push({
        ...producto,
        cantidad
      });
    }
    
    this.saveCarrito();
  }

  // Remover producto del carrito
  removeFromCarrito(productId) {
    this.carrito = this.carrito.filter(item => item.id !== productId);
    this.saveCarrito();
  }

  // Actualizar cantidad de un producto
  updateCantidad(productId, cantidad) {
    const item = this.carrito.find(item => item.id === productId);
    if (item) {
      if (cantidad <= 0) {
        this.removeFromCarrito(productId);
      } else {
        item.cantidad = cantidad;
        this.saveCarrito();
      }
    }
  }

  // Limpiar carrito
  clearCarrito() {
    this.carrito = [];
    this.saveCarrito();
  }

  // Obtener total del carrito
  getTotal() {
    return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  // Obtener cantidad total de items
  getTotalItems() {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }
}

// Instancia global del estado
export const appState = new AppState();
