import fs from 'fs';
import __dirname from '../../utils.js';

export default class ProductsFileDao {
    constructor() {
        this.path = __dirname + '/files/products.json';
        this.init();
    }

    init = async () => {
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]));
        }
    }

    readFile = async () => {
        let data = await fs.promises.readFile(this.path, 'utf8');
        return JSON.parse(data);
    }

    getAll = async () => {
        return await this.readFile();
    }

    save = async (product) => {
        try {
            let products = await this.readFile();
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }
            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return product;

        } catch (error) {
            throw new Error('Error writing file');
        }
    }

    update = async(id, product) => {
        try {
            let products = await this.readFile();
            const indexElement = products.findIndex((e) => e.id == id);
            products[indexElement] = { ...products[indexElement], ...product };
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[indexElement];
        } catch (error) {
            throw new Error('Error update file');
        }
    }

    delete = async (id) => {
        try {
            let products = await this.readFile();
            products = products.filter(e => e.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error('Error delete file');
        }
    }

    getById = async (id) => {
        try {
            let products = await this.readFile();
            return products.find(e => e.id == id);
        } catch (error) {
            throw new Error('Error reading file');
        }
    }
}