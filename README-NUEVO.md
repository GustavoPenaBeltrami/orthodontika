# Orthodontika - Catálogo de Productos

Un catálogo moderno y responsivo de productos ortodónticos construido con **Vite**, **JavaScript vanilla**, **Tailwind CSS** y un router simple para máxima velocidad y simplicidad.

## 🚀 Características

- **4 páginas principales:**
  - **Home (/)**: Hero, categorías en carrusel, productos destacados
  - **Productos (/productos.html)**: Grid completo con filtros avanzados
  - **Producto individual (/producto.html?id={id})**: Detalles del producto
  - **Carrito (/carrito.html)**: Gestión completa del carrito

- **Funcionalidades clave:**
  - ✅ Carrito persistente con localStorage
  - ✅ Filtros avanzados (categoría, subcategoría, marca, precio, disponibilidad)
  - ✅ Búsqueda en tiempo real
  - ✅ Paginación
  - ✅ Modal de carrito en header
  - ✅ Envío por WhatsApp y Email
  - ✅ Diseño responsive moderno
  - ✅ Optimizado para velocidad

## 🛠️ Tecnologías

- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápido
- **JavaScript Vanilla** - Sin frameworks, máximo rendimiento
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utilitarios
- **CSS Grid & Flexbox** - Layout responsivo
- **LocalStorage** - Persistencia del carrito

## 📁 Estructura del Proyecto

```
orthodontika/
├── public/                     # Archivos estáticos
│   ├── LogoOrthodontika1.png  # Logo principal
│   ├── LogoOrthodontika2.png  # Logo alternativo
│   ├── Accesorios-Todos/      # Imágenes de accesorios
│   ├── Alicates/              # Imágenes de alicates
│   ├── Brackets/              # Imágenes de brackets
│   └── ...
├── src/
│   ├── main.js                # Script para home
│   ├── productos.js           # Script para página de productos
│   ├── producto.js            # Script para producto individual
│   ├── carrito.js             # Script para carrito
│   ├── components.js          # Componentes reutilizables (header, footer)
│   ├── state.js               # Gestión de estado global
│   ├── data.js                # Base de datos de productos
│   └── style.css              # Estilos con Tailwind
├── index.html                 # Página principal
├── productos.html             # Página de productos
├── producto.html              # Página de producto individual
├── carrito.html               # Página de carrito
├── package.json               # Dependencias
├── vite.config.js             # Configuración de Vite
├── tailwind.config.js         # Configuración de Tailwind
└── postcss.config.js          # Configuración de PostCSS
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos:

1. **Clonar o usar el proyecto:**
   ```bash
   cd orthodontika
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```
   El sitio estará disponible en `http://localhost:5173/`

4. **Construir para producción:**
   ```bash
   npm run build
   ```

5. **Vista previa del build:**
   ```bash
   npm run preview
   ```

## 📊 Gestión de Datos

### Productos
Los productos se encuentran en `src/data.js` con la siguiente estructura:

```javascript
{
  id: "IA04-901",
  nombre: "Hook Lingual Ceramico pack 10 unidades",
  categoria: "Accesorios",
  subcategoria1: "Intraorales",
  subcategoria2: "Ceramicos",
  marca: "3B Ortho",
  precio: 50,
  disponibilidad: true,
  enOferta: false,
  img: "/Accesorios-Todos/LingualHook.png",
  imgExtra: ["", "", ""],
  descripcion: "Descripción opcional del producto..."
}
```

### Carrito
El carrito utiliza localStorage para persistir entre sesiones y incluye:
- Gestión de cantidades
- Cálculo automático de totales
- Funciones para agregar/remover productos
- Envío por WhatsApp/Email

## 🎨 Diseño y Estilo

### Paleta de Colores
- **Primario**: Azul (#3B82F6)
- **Secundario**: Gris (#6B7280)
- **Éxito**: Verde (#10B981)
- **Error**: Rojo (#EF4444)
- **Advertencia**: Amarillo (#F59E0B)

### Componentes Personalizados
- `.btn-primary` - Botón principal azul
- `.btn-secondary` - Botón secundario gris
- `.card` - Tarjeta con sombra y hover
- `.input-field` - Campo de entrada estilizado

## 📱 Características Responsivas

- **Desktop**: Grid de 4 columnas para productos
- **Tablet**: Grid de 2-3 columnas
- **Mobile**: Grid de 1 columna, menú hamburguesa
- **Imágenes optimizadas** con aspect-ratio y object-fit

## 🛒 Funcionalidades del Carrito

### Modal de Carrito
- Acceso rápido desde el header
- Visualización de productos agregados
- Botones para WhatsApp y carrito completo

### Página Completa de Carrito
- Gestión avanzada de cantidades
- Formulario de contacto
- Cálculo de totales
- Envío por WhatsApp/Email con formato profesional

### Ejemplo de Mensaje WhatsApp:
```
🛒 NUEVO PEDIDO - ORTHODONTIKA
📅 Fecha: 14/07/2025

👤 INFORMACIÓN DEL CLIENTE:
• Nombre: Juan Pérez
• Teléfono: +54 11 1234-5678
• Email: juan@email.com

📦 PRODUCTOS SOLICITADOS:
─────────────────────────
1. Hook Lingual Ceramico pack 10 unidades
   • Código: IA04-901
   • Marca: 3B Ortho
   • Cantidad: 2
   • Precio unitario: $50
   • Subtotal: $100

📊 RESUMEN:
• Total de productos: 2
• TOTAL A PAGAR: $100

¡Gracias por contactarnos! 🙏
```

## 🔍 Funcionalidades de Búsqueda y Filtros

### Filtros Disponibles:
- **Búsqueda por texto** (nombre del producto)
- **Categoría** con subcategorías jerárquicas
- **Marca** (dropdown)
- **Rango de precios** (min/max)
- **Disponibilidad** (solo en stock)
- **Ofertas** (productos en oferta)
- **Ordenamiento** (nombre, precio ascendente/descendente)

### Paginación:
- 12 productos por página
- Navegación numérica
- Botones anterior/siguiente
- Scroll automático al cambiar página

## 🚀 Optimizaciones de Rendimiento

- **Vite** para builds ultrarrápidos
- **JavaScript Vanilla** sin overhead de frameworks
- **Lazy loading** de imágenes
- **Debounce** en búsquedas
- **CSS optimizado** con Tailwind
- **Minificación automática** en producción

## 📧 Configuración de Contacto

### WhatsApp
Editar en `src/components.js` y `src/carrito.js`:
```javascript
const whatsappNumber = '5493517604756'; // Cambiar por número real
```

### Email
Editar en `src/carrito.js`:
```javascript
const mailtoURL = `mailto:info@orthodontika.com?subject=...`;
```

## 🔮 Funcionalidades Futuras

El proyecto está preparado para:
- **Integración con Google Sheets** (como mencionaste en el README original)
- **Imágenes desde Google Drive**
- **Nodemailer** para envío de emails
- **Base de datos real**
- **Sistema de pagos**
- **Panel de administración**

## 📝 Notas de Desarrollo

- El proyecto usa **ES Modules** (`"type": "module"` en package.json)
- **PostCSS** configurado para Tailwind
- **Múltiples puntos de entrada** en Vite para cada página
- **Estado global** compartido entre páginas
- **Routing simple** basado en archivos HTML

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Orthodontika** - Productos ortodónticos de calidad para profesionales 🦷✨
