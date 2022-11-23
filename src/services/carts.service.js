import PersistenceFactory from "../dao/factory.js";
class CartService {
    constructor() {
        this.cartsDao;
        this.init();
    }

    init = async () => {
        const { carts } = await PersistenceFactory.getPercistence();
        this.cartsDao = carts;
    }

    getCarts = async() => {
        return await this.cartsDao.getAll();
    }

    saveCart = async(cart) => {
        cart.timestamp = new Date(Date.now());
        return await this.cartsDao.save(cart);
    }

    updateCart = async(id, cart) => {
        return await this.cartsDao.update(id, cart);
    }
    
    getCartById = async(id) => {
        return await this.cartsDao.getById(id);
    }

    deleteCart = async(id) => {
        return await this.cartsDao.delete(id);
    }
}

const cartService = new CartService();

export default cartService;