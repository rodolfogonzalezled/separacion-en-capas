import { gql } from "apollo-server-express";

const typeDefs  = gql`
    type Product {
        id:ID
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Int
        stock: Int
    }

    input ProductInput {
        nombre: String 
        descripcion: String 
        codigo: String 
        foto: String
        precio: Int 
        stock: Int
    }

    type Cart {
        id:ID
        productos: [Product]
    }

    input CartInput {
        idProducto: ID
    }

    type Query {
        getAllProducts: [Product]
        getAllCarts: [Cart]
    }

    type Mutation {
        getProductById(id: String) : Product
        createProduct(nombre: String, descripcion: String, codigo: String, foto: String, precio: Int, stock: Int) : Product
        updateProduct(id:String, updateFields: ProductInput) : Product
        deteleProduct(id: String) : Product

        getCartById(id: String) : Cart
        createCart(idProduct: String) : Cart
        deteleCart(id: String) : Cart
        addProductCart(idCart:String, idProduct: String) : Cart
    }
`;

export default typeDefs;