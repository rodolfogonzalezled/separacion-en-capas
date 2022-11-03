import productService from "../services/products.service.js";

const home = async (req, res) => {
    // let products = await productService.getProducts();
    res.render("pages/index" );
}

const cart = async (req, res) => {
    res.render('pages/carrito')
}

export default {
    home,
    cart
};