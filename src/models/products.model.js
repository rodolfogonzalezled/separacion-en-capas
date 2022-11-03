import mongoose from 'mongoose';

const collection = 'productos';

const schema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default { collection, schema }