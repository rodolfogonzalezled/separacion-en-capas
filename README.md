# Desafio GraphQL - eCommerce Backend #

## _Autor: Rodolfo Gonzalez - Curso: Backend_

# Para su prueba en front:
1.	Clonar el repositorio ( git clone https://github.com/rodolfogonzalezled/separacion-en-capas.git)
2.	Obtener node_modules ( npm install )
3.	Iniciar la app desde la terminal en la carpeta del proyecto a revisar. ( npm run dev )
4.	El proyecto se ejecutará en el navegador en ( http://localhost:9090 )

# Para las pruebas, crear archivo .env con los siguientes valores:

- PERSISTENCE= los 3 posibles valores son filesystem, mongodb y memory. Por defecto si no se carga ninguno en el .env se carga filesystem 

- URL_MONGO = colocar la url de mongo atlas o local

- Se creo una carpeta de graphQL, donde se encuentra lo relacionado al mismo. para probarlo se puede acceder levantando la aplicacion con npm run dev y accediendo a http://localhost:9090/graphql

- Al acceder a la ruta antes mencionada, se despliega la pagina donde se pueden ejecutar las siguientes queries de graphql:

    Query
        getAllProducts
        getAllCarts

    Mutation 
        getProductById(id: String)
        createProduct(nombre: String, descripcion: String, codigo: String, foto: String, precio: Int, stock: Int)
        updateProduct(id:String, updateFields: ProductInput)
        deteleProduct(id: String)

        getCartById(id: String)
        createCart(idProduct: String)
        deteleCart(id: String)
        addProductCart(idCart:String, idProduct: String)