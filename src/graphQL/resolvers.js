import cartService from "../services/carts.service.js";
import productService from "../services/products.service.js";

const resolvers = {
    Query: {
        getAllProducts: async () => {
            let products = await productService.getProducts();
            return products;
        },

        getAllCarts: async () => {
            let users = await cartService.getCarts();
            return users;
        },
    },

    Mutation: {
        getProductById: async (_, params) => {
            const { id } = params;
            const result = await productService.getProductById(id);
            return result
        },
        createProduct: async (_, params) => {
            const product = params;
            const result = await productService.saveProduct(product);
            return result
        },
        updateProduct: async (_, params) => {
            const { id, updateFields } = params;
            let result = await productService.updateProduct(id, updateFields);
            return result
        },
        deteleProduct: async (_, params) => {
            const { id } = params;
            const result = await productService.deleteProduct(id);
            return result
        },

        getCartById: async (_, params) => {
            const { id } = params;
            const result = await cartService.getCartById(id);
            return result
        },
        createCart: async (_, params) => {
            const { idProduct } = params;
            const product = await productService.getProductById(idProduct);
            let cart = {
                productos: [product]
            };
            const result = await cartService.saveCart(cart);
            return result
        },
        deteleCart: async (_, params) => {
            const { id } = params;
            const result = await cartService.deleteCart(id);
            return result
        },
        addProductCart: async (_, params) => {
            const { idCart, idProduct } = params;
            let cartOb = await cartService.getCartById(idCart);
            let product = await productService.getProductById(idProduct);
            let products = cartOb.productos ?? [];
            products.push(product);

            let cart = {
                productos: products
            };

            let result = await cartService.updateCart(idCart, cart);
            return result
        },
    }
}

export default resolvers;