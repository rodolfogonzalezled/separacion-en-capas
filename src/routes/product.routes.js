import { Router } from "express";
import { isAdmin } from '../middlewares/isAdmin.js';
import productController from '../controllers/products.controller.js'

const router = Router();

router.get('/', isAdmin, productController.getAllProducts);

router.get('/:id?', isAdmin, productController.getProductById);

router.post('/', isAdmin, productController.saveProduct);

router.put('/:id', isAdmin, productController.updateProduct);

router.delete('/:id', isAdmin, productController.deleteProduct);

export default router;