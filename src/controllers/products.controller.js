import ProductsDTO from "../dtos/products.dto.js";
import productService from "../services/products.service.js";

const getAllProducts = async (req, res) => {
    try {
        let products = await productService.getProducts();
        let parsedProducts = products.map(product=> new ProductsDTO(product));
        res.json(parsedProducts);
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (req, res) => {
    try {
        let result = await productService.getProductById(req.params.id);
        let parsedProduct = new ProductsDTO(result);
        res.json(parsedProduct);
    } catch (error) {
        console.log(error);
    }
}

const saveProduct = async (req, res) => {
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) 
            return res.status(400).send({status: 'error', error: 'Incomplete values'});

        let product = {
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        };

        let result = await productService.saveProduct(product);
        let parsedProduct = new ProductsDTO(result);
        res.send({status:"success", parsedProduct})
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        let idProd = req.params.id;
        let product = {
            ...req.body
        };

        let result = await productService.updateProduct(idProd, product);
        res.send({status:"success", result})
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        let result = await productService.deleteProduct(req.params.id);
        res.send({status:"success", result})
    } catch (error) {
        console.log(error);
    }
}

export default { getAllProducts, saveProduct, getProductById, updateProduct, deleteProduct};