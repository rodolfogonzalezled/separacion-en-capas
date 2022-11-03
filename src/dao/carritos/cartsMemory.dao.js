export default class CartsMemoryDao {
    constructor() {
        this.carts = [];
    }

    getAll = () => {
        return this.carts;
    }

    save = (cart) => {
        if (this.carts.length === 0) {
            cart.id = 1;
        } else {
            cart.id = this.carts[this.carts.length - 1].id + 1;
        }
        this.carts.push(cart);
        return cart;
    }

    update(id, cart) {
        let indexElement = this.carts.findIndex(e => e.id == id);
        this.carts[indexElement] = {...this.carts[indexElement], ...cart};
        return this.carts[indexElement];
    }

    delete(id) {
        this.carts = this.carts.filter(e => e.id != id);
    }

    getById(id) {
        return this.carts.find(e => e.id == id);
    }
} 