import mongoose from "mongoose";
import { config } from '../Config/config.js';

export default class MongoClient {
    constructor() {
        this.conecction = mongoose.connect(config.urlMongoDB, () => {
            console.log("conectado a mongo");
        })
    }

    static getInstance = () => {
        if (!this.instance) {
            this.instance = new MongoClient();
        } else {
            return this.instance;
        }
    }
}