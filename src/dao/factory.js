import { config } from '../Config/config.js';
import MongoClient from './mongoClient.js';

export default class PersistenceFactory {
    static getPercistence = async () => {
        switch (config.persistence) {
            case 'mongodb':
                const connection = MongoClient.getInstance();

                let { default: ProductsMongoDao } = await import('./productos/productsMongo.dao.js');
                let { default: CartsMongoDao } = await import('./carritos/cartsMongo.dao.js');
                return { 
                    products: new ProductsMongoDao(),
                    carts: new CartsMongoDao()
                };
            case 'memory':
                let { default: ProductsMemoryDao } = await import('./productos/productsMemory.dao.js');
                let { default: CartsMemoryDao } = await import('./carritos/cartsMemory.dao.js');
                return { 
                    products: new ProductsMemoryDao(),
                    carts: new CartsMemoryDao() 
                };
            case 'filesystem':
                let { default: ProductsFileDao } = await import('./productos/productsFile.dao.js');
                let { default: CartsFileDao } = await import('./carritos/cartsFile.dao.js');
                return { 
                    products: new ProductsFileDao(),
                    carts: new CartsFileDao()
                };
        }
    }
}