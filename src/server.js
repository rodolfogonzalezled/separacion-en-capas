import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from './Config/config.js';
import viewsRoutes from './routes/views.routes.js';
import productsRoutes from './routes/product.routes.js';
import cartsRoutes from './routes/cart.routes.js';
import __dirname from './utils.js';
import productService from './services/products.service.js';
import cartService from './services/carts.service.js';
import ProductsDTO from './dtos/products.dto.js';

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use('/', viewsRoutes);
app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartsRoutes);

app.use(express.urlencoded({ extended: true }));

app.use(express.static( __dirname + '/views'));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// --- Conexión del Servidor ------------------------------------------------------------
const PORT = config.port;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
});
connectedServer.on("error", error => console.log(`Error en servidor ${error}`));

// ----- WEBSOCKETS ----------------------------------------------------------------------
io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    const getProducts = async () => { 
        let products = await productService.getProducts();
        let parsedProducts = products.map(product => new ProductsDTO(product));
        return parsedProducts;
    }

    socket.emit("productos", await getProducts());

    socket.on('buscarProducto', async () => {
        socket.emit("productos", await getProducts());
    });

    socket.on('buscarCarrito', async (id) => {
        socket.emit("carritos", await cartService.getCartById(id));
    });
});