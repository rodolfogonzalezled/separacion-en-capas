import { Router } from "express";
import cartController from '../controllers/carts.controller.js'

const router = Router();

router.post('/', cartController.saveCart);

router.delete('/:id', cartController.deleteCart);

router.get('/:id/productos', cartController.getProductsCart);

router.post('/:id/productos', cartController.updateCart)

router.delete('/:id/productos/:id_prod', cartController.deleteProductsCart);

export default router;

