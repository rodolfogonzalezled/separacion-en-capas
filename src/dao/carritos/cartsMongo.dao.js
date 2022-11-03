import mongoose from 'mongoose';
import cartsModel from '../../models/carts.model.js';

export default class CartsMongoDao {

    constructor() {
        this.model = mongoose.model(cartsModel.collection, cartsModel.schema)
    }
    
    getAll = async () => {
        let result = await this.model.find();
        return result;
    }

    save = async (cart) => {
        let result = await this.model.create(cart);
        return result;
    }

    update = async(id, cart) => {
        return await this.model.updateOne({ _id: id }, { $set: cart });
    }

    delete = async (id) => {
        return await this.model.deleteOne({ _id: id });
    }

    getById = async (id) => {
        let cart = await this.model.findOne({ _id: id }, { __v: 0 });
        return cart;
    }
}