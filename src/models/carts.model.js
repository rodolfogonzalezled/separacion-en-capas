import mongoose from 'mongoose';

const collection = 'carritos';

const schema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    productos: { type: Array, default: [] }
});

export default { collection, schema }