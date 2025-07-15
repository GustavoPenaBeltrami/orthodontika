import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        productos: './productos.html',
        producto: './producto.html',
        carrito: './carrito.html'
      }
    }
  },
  server: {
    open: true
  }
})
