import express from "express";
/* import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js"; */
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import handlebars from "express-handlebars";
import path from "path";
import fs from "fs";
import __dirname from "./dirname.js";
import viewsRoutes from "./routes/viewsRoutes.js"
import { Server } from "socket.io";


let products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));


//Handlebars
app.engine("hbs", handlebars.engine(
  {
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts")
  })
),

app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)
app.use("/", viewsRoutes);


const httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Instancia del websocket del servidor
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`)
  })
  
  socket.emit("getProducts", products)


socket.on("addProduct", (newProduct) => {
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  newProduct.id = id;
  products.push(newProduct);
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  io.emit("getProducts", products); // Emitir actualización de productos
});

socket.on("deleteProduct", (id) => {
  products = products.filter(product => product.id !== id);
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  io.emit("getProducts", products); // Emitir actualización de productos
});
})

// Rutas para productos y carrito

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);




// CRUD para productos
/* 
app.get("/api/products", (req, res) => {
  res.json(ProductManager.getProducts());
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = ProductManager.getProductById(id);

  if (!product) {
    return res.status(404).json({
      error: "(404) No se encontró el producto",
    });
  }
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  ProductManager.addProduct(newProduct);
  res.status(201).json({ message: "(201) Producto agregado correctamente" });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  ProductManager.updateProduct(id, updatedProduct);
  res.json({ message: "(201) Producto actualizado correctamente" });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  ProductManager.deleteProduct(id);
  res.json({ message: "(201) Producto eliminado correctamente" });
});

// CRUD para carritos

app.post("/api/carts", (req, res) => {
  CartManager.addCart();
  res.status(201).json({ message: "(201) Carrito creado correctamente" });
});

app.get("/api/carts/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = CartManager.getCartById(cid);

  if (!cart) {
    return res.status(404).json({ error: "(404) No se encontró el carrito" });
  }
  res.json(cart);
});

app.post("/api/carts/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  CartManager.addProductToCart(cid, pid);
  res.json({ message: "(201) Producto agregado al carrito correctamente" });
}); */

