Quiero un catalogo de productos html css javascript y tailwind para priorizar simpleza y velocidad [Puede ser Astro o algo ligero también, lo dejo a tu desicion]

van a haber 4 páginas:

*Todas las páginas con header y footer

1. / Home con un hero, luego una seccion con categorias principales estilo carroussell y otra seccion con productos por cada categoria, tipico homepage de ecommerce

2. /productos que va a ser un grid de TODOS los productos responsive con filtros para mejorar la busqueda de productos, tambien algo super generico de e-commerce

3. /producto?id={id} que va a tener la info de un producto, seguro una imagen principal, la tipica informacion al costado con nombre, categoria, descripcion corta, precio y un boton grande que diga "agregar al carrito"

4. /carrito Además de poder acceder al carrito desde un modal en el header, se deberia poder ver en "pantalla completa", el carrito te deberia mandar una lista de compra a un whatsapp o al correo con nodemailer.

tanto las imagenes como la informacion del producto quiero obtenerla de un google sheets y las imagens hosteadas en el drive, 

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
    img:"/Accesorios-Todos/LingualHook.png",
  },

Algo asi es la interfaz de un producto, sé que para lograr algo asi en google drive necesito;

PRODUCTOS:

Compartí la hoja como “Público con el enlace”.

Conseguí el ID del documento:
Por ejemplo, si el link es:
https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit#gid=0
El ID es: 1A2B3C4D5E6F7G8H9I0J

Accedé a los datos como JSON con:

https://opensheet.elk.sh/1A2B3C4D5E6F7G8H9I0J/Hoja1
(Usamos opensheet.elk.sh, un servicio gratuito que convierte Google Sheets a JSON sin API key.)

IMAGENES:
Subí tus imágenes a una carpeta.

Compartí cada imagen como “Público con el enlace”.

Copiá el ID de cada imagen del enlace. Ejemplo:
https://drive.google.com/file/d/ABC1234567/view

El ID es ABC1234567

Para mostrar la imagen en HTML:
<img src="https://drive.google.com/uc?export=view&id=ABC1234567" />

Seguramente ponga un campo en el google sheets con el ID de la imagen, asi tengo todo en una misma llamada tanto la informacion del sheed como el ID de la imagen


Volviendo a las páginas los filtros deberian ser: nombre, categoria (con su anidacion de subcategorias de forma jerarquica), precio, marca, si está en oferta, y si está en stock o no.

La pagina deberia tener una una variable global (estado) que es el carrito, deberia poder verse haciendo click en el carrito en el navbar header como si fuera un modal o yendo a /carrito