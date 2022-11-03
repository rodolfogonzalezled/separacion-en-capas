import ProductsDTO from "./products.dto.js";

export default class CartsDTO {
    constructor(cart) {
        this.id = cart._id ?? cart.id;
        this.timestamp = cart.timestamp;
        this.productos = cart.productos.map(product => new ProductsDTO(product));
    }
}