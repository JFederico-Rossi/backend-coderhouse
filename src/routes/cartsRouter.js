import { Router } from 'express';
import CartManager from '../cartManager.js'; 

const cartsRouter = Router();

cartsRouter.post('/', (req, res) => {
  CartManager.addCart();
  res.status(201).json({ message: "Carrito creado correctamente" });
});

cartsRouter.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = CartManager.getCartById(cid);

  if (!cart) {
    return res.status(404).json({ error: "No se encontró el carrito" });
  }
  res.json(cart);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  CartManager.addProductToCart(cid, pid);
  res.json({ message: "Producto agregado al carrito correctamente" });
});

export default cartsRouter;
