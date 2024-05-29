import express from "express";
import ProductManager from "./src/productManager.js";
import CartManager from "./src/cartManager.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1> Bienvenido a la tienda online de Ground Footware </h1>");
});

// CRUD para productos

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
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
