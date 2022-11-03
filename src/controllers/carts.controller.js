import CartsDTO from "../dtos/carts.dto.js";
import cartService from "../services/carts.service.js";
import productService from "../services/products.service.js";

const getAllCarts = async (req, res) => {
    try {
        let result = await cartService.getCarts();
        let parsedCart = new CartsDTO(result);
        res.json(parsedCart);
    } catch (error) {
        console.log(error);
    }
}

const getCartById = async (req, res) => {
    try {
        let result = await cartService.getCartById(req.params.id);
        res.send({ status: "success", result })
    } catch (error) {
        console.log(error);
    }
}

const saveCart = async (req, res) => {
    try {
        let product;
        if (req.body.id) {
            product = await productService.getProductById(req.body.id);
        }

        let cart = {
            productos: [product]
        };

        let result = await cartService.saveCart(cart);
        let parsedCart = new CartsDTO(result);
        res.json(parsedCart);
    } catch (error) {
        console.log(error);
    }
}

const updateCart = async (req, res) => {
    try {
        let idCart = req.params.id;
        let cartOb = await cartService.getCartById(idCart);
        let product = await productService.getProductById(req.body.id);
        let products = cartOb.productos ?? [];
        products.push(product);

        let cart = {
            productos: products
        };

        let result = await cartService.updateCart(idCart, cart);
        res.send({ status: "success", result })
    } catch (error) {
        console.log(error);
    }
}

const deleteCart = async (req, res) => {
    try {
        let result = await cartService.deleteCart(req.params.id);
        res.send({ status: "success", result })
    } catch (error) {
        console.log(error);
    }
}

const getProductsCart = async (req, res) => {
    try {
        let result = await cartService.getCartById(req.params.id);
        let parsedCart = new CartsDTO(result);
        res.json(parsedCart);
    } catch (error) {
        console.log(error);
    }
}

const deleteProductsCart = async (req, res) => {
    try {
        let idCart = req.params.id;
        let cartOb = new CartsDTO(await cartService.getCartById(idCart));
        let products = cartOb.productos ?? [];
        products = products.filter(producto => producto.id != req.params.id_prod);
        let cart = {
            productos: products
        };

        await cartService.updateCart(idCart, cart);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
}

export default {
    getAllCarts,
    saveCart,
    getCartById,
    updateCart,
    deleteCart,
    getProductsCart,
    deleteProductsCart
};