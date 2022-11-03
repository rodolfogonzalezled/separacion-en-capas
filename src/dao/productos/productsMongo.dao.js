import mongoose from 'mongoose';
import productsModel from '../../models/products.model.js';

export default class ProductsMongoDao {

    constructor() {
        this.model = mongoose.model(productsModel.collection, productsModel.schema)
    }
    
    getAll = async () => {
        let result = await this.model.find();
        return result;
    }

    save = async (product) => {
        let result = await this.model.create(product);
        return result;
    }

    update = async(id, product) => {
        return await this.model.updateOne({ _id: id }, { $set: product });
    }

    delete = async (id) => {
        return await this.model.deleteOne({ _id: id });
    }

    getById = async (id) => {
        let product = await this.model.findOne({ _id: id }, { __v: 0 });
        return product;
    }
}