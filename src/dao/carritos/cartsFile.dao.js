import fs from 'fs';
import __dirname from '../../utils.js';

export default class CartsFileDao {
    constructor() {
        this.path = __dirname + '/files/carts.json';
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

    save = async (cart) => {
        try {
            let carts = await this.readFile();
            if (carts.length === 0) {
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1;
            }
            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;

        } catch (error) {
            throw new Error('Error writing file');
        }
    }

    update = async(id, cart) => {
        try {
            let carts = await this.readFile();
            const indexElement = carts.findIndex((e) => e.id == id);
            carts[indexElement] = { ...carts[indexElement], ...cart };
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return carts[indexElement];
        } catch (error) {
            throw new Error('Error update file');
        }
    }

    delete = async (id) => {
        try {
            let carts = await this.readFile();
            carts = carts.filter(e => e.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        } catch (error) {
            throw new Error('Error delete file');
        }
    }

    getById = async (id) => {
        try {
            let carts = await this.readFile();
            return carts.find(e => e.id == id);
        } catch (error) {
            throw new Error('Error reading file');
        }
    }
}