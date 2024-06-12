# Ground Footwear Online Store

Bienvenido al repositorio de la tienda online de Ground Footwear. Este proyecto es una aplicación web que permite gestionar productos y carritos de compra en tiempo real utilizando Express.js, Handlebars y Socket.IO.

### Características
- Visualización de productos: Puedes ver la lista de productos disponibles en la tienda.
- Gestión de productos en tiempo real: Añadir y eliminar productos utilizando WebSockets.
- API para productos y carritos: Endpoints para realizar operaciones CRUD en productos y carritos de compra.
- Vistas dinámicas: Utilización de Handlebars para renderizar las vistas del lado del servidor.

### Tecnologías utilizadas

- Node.js y Express.js: Servidor y manejo de rutas.
- Handlebars: Motor de plantillas para renderizado del lado del servidor.
- Socket.IO: Comunicación en tiempo real para gestión de productos.
- File System (fs): Lectura y escritura de datos en archivos JSON.

### Uso

Luego de iniciar el servidor `(npm run dev)`, abre tu navegador y navega a [http://localhost:8000](http://localhost:8000 "http://localhost:8000") para ver la página principal.

### Endpoints

- API de Productos
- GET /api/products - Obtiene todos los productos.
- GET /api/products/:id - Obtiene un producto por su ID.
- POST /api/products - Agrega un nuevo producto.
- PUT /api/products/:id - Actualiza un producto existente por su ID.
- DELETE /api/products/:id - Elimina un producto por su ID.

### API de Carritos
- POST /api/carts - Crea un nuevo carrito.
- GET /api/carts/:cid - Obtiene un carrito por su ID.
- POST /api/carts/:cid/product/:pid - Agrega un producto al carrito.

### Views
- GET / - Página principal de la tienda.
- GET /products - Página que muestra la lista de productos utilizando Handlebars.
- GET /realTimeProducts - Página que muestra la lista de productos en tiempo real utilizando WebSockets. Incluye un formulario para añadir productos nuevos, y botones para eliminar productos ya existenes.


💻 Creado por Federico Rossi
