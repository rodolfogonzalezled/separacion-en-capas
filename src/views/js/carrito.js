let contenedorProductosCarrito = document.getElementById('productosCarrito');

let btnBorrarCarrito = document.getElementById(`btnBorrarCarrito`);
btnBorrarCarrito.addEventListener('click', () => {
    borrarCarrito();
});

function agregarAlCarrito(id) {
    let idCarrito = window.localStorage.getItem('idCarrito');
    if (idCarrito) {
        fetch(`/api/carrito/${idCarrito}/productos`, {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        fetch(`/api/carrito`, {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(result => window.localStorage.setItem('idCarrito', result.id))
        .catch(error => console.error('Error:', error));
    }
}

function obtenerProductos() {
    let idCarrito = window.localStorage.getItem('idCarrito');
    if (idCarrito) {
        fetch(`/api/carrito/${idCarrito}/productos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(productos => {
            pintarCarrito(productos.productos);
        })
        .catch(error => console.error('Error:', error));
    }
}

obtenerProductos();

function borrarProductoCarrito(idProducto) {
    let idCarrito = window.localStorage.getItem('idCarrito');
    fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => socket.emit("buscarCarrito", idCarrito))
        .catch(error => console.error('Error:', error));
}

function borrarCarrito() {
    let idCarrito = window.localStorage.getItem('idCarrito');
    fetch(`/api/carrito/${idCarrito}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        socket.emit("buscarCarrito", idCarrito);
        localStorage.removeItem('idCarrito');
        // window.localStorage.clear();
        document.getElementById('btnBorrarCarrito').classList.add('disabled');
    })
    .catch(error => console.error('Error:', error));
}

socket.on("carritos", (carritos) => {
    pintarCarrito(carritos.productos);
});

function pintarCarrito(productos) {
    if (productos.length) {
        document.getElementById('btnBorrarCarrito').classList.remove('disabled');
        document.getElementById('carritoVacio').style.display = 'none';
    } else {
        document.getElementById('btnBorrarCarrito').classList.add('disabled');
        document.getElementById('carritoVacio').style.display = 'block';
    }
    contenedorProductosCarrito.innerHTML = '';
    productos.map((producto) => {
        let divContenedor = document.createElement("li");
        let id = producto.id;
        divContenedor.classList.add("list-group-item");
        divContenedor.innerHTML = `
            <div class="row" style="text-align: center">
                <div class="col">
                    <img style="border-radius: 8%; width: 33%; height: 5em; border: solid 1px" src="${producto.foto}">
                </div>
                <div class="col text-left">
                    <div class="col"><b>Nombre:</b> ${producto.nombre}</div>
                    <div class="col"><b>Precio:</b> ${producto.precio}</div>
                    <div class="col"><b>Fecha:</b> ${producto.timestamp}</div>
                </div>
                <div class="col text-center">
                    <a><i id="btnBorrarPorId${id}" class="bi bi-trash btn btn-danger"></i></a>
                </div>
            </div>
            `;
        contenedorProductosCarrito.appendChild(divContenedor);

        let btnBorrarPorId = document.getElementById(`btnBorrarPorId${id}`);
        btnBorrarPorId.addEventListener('click', () => {
            borrarProductoCarrito(id)
        });
    })
}