export default class ProductsMemoryDao {
    constructor() {
        this.products = [];
    }

    getAll = () => {
        return this.products;
    }

    save = (product) => {
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push(product);
        return product;
    }

    update(id, product) {
        let indexElement = this.products.findIndex(e => e.id == id);
        this.products[indexElement] = {...this.products[indexElement], ...product};
        return this.products[indexElement];
    }

    delete(id) {
        this.products = this.products.filter(e => e.id != id);
    }

    getById(id) {
        return this.products.find(e => e.id == id);
    }
} 