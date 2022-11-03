import PersistenceFactory from "../dao/factory.js";

class ProductService {
    constructor() {
        this.productsDao;
        this.init();
    }

    init = async () => {
        const { products } = await PersistenceFactory.getPercistence();
        this.productsDao = products;
    }

    getProducts = async() => {
        return await this.productsDao.getAll();
    }

    saveProduct = async(product) => {
        product.timestamp = new Date(Date.now()).toLocaleString();
        return await this.productsDao.save(product);
    }

    updateProduct = async(id, product) => {
        return await this.productsDao.update(id, product);
    }
    
    getProductById = async(id) => {
        return await this.productsDao.getById(id);
    }

    deleteProduct = async(id) => {
        return await this.productsDao.delete(id);
    }
}

const productService = new ProductService();

export default productService;