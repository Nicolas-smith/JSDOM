class ProductoController {
    constructor(productos) {
        this.listaProductos = productos
    }
    mostrarEnDOM(contenedor_productos) {
        contenedor_productos.innerHTML = ""
        this.listaProductos.forEach(Producto => {
            contenedor_productos.innerHTML += `<div>
                <img src="${Producto.img}" alt="${Producto.nombre}">
                <h5>${Producto.editorial}</h5>
                <h3>${Producto.nombre}</h3>
                <h4>$${Producto.precio}</h4>
                <button id=Manga$${Producto.id}>Añadir al carrito</button>
            </div>`
        })
    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []
    }
    eliminar(Producto) {
        let indice = this.listaCarrito.indexOf(Producto)
        this.listaCarrito.splice(indice, 1)
        localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
        this.mostrarEnDOM(contenedor_carrito)
    }
    Leer() {
        let obtenerlistaJSON = localStorage.getItem("listaCarrito")
        if (obtenerlistaJSON) {
            this.listaCarrito = JSON.parse(obtenerlistaJSON)
            return true
        }
        return false
    }
    Añadir(Producto) {
        let repiteProducto = this.listaCarrito.some(elemento => elemento.id == Producto.id)
        if (repiteProducto) {
            const productoRepetido = this.buscar(Producto.id)
            productoRepetido.cantidad += 1
        } else {
            this.listaCarrito.push(Producto)
        }
        let arrayJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrayJSON)
    }
    mostrarEnDOM(contenedor_carrito) {
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(Producto => {
            contenedor_carrito.innerHTML += `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${Producto.img}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${Producto.nombre}</h5>
                            <p class="card-text">${Producto.editorial}</p>
                            <p class="card-text">$${Producto.precio}</p>
                            <p class="card-text">Cantidad: ${Producto.cantidad}</p>
                            <div class= "eliminar-producto">
                                <button id="eliminar${Producto.id}">❌</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            `
        })
        this.listaCarrito.forEach(Producto => {
            document.getElementById(`eliminar${Producto.id}`).addEventListener("click", () => {
                this.eliminar(Producto)
            })
        })
        this.mostrarTotalenDOM(total)
    }
    limpiar() {
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }
    mostrarTotalenDOM(precio) {
        precio.innerHTML = "$" + this.calcularTotal()
    }
    calcularTotal() {
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
    }
    buscar(id) {
        return this.listaCarrito.find(producto => producto.id == id)
    }
}

const contenedor_productos = document.getElementById("contenedor_productos")

const controladorProducto = new ProductoController(listaProductos)

controladorProducto.mostrarEnDOM(contenedor_productos)

const controladorCarrito = new CarritoController()
const contenedor_carrito = document.getElementById("contenedor_carrito")
const finalizar_compra = document.getElementById("finalizar_compra")
const vaciar_carrito = document.getElementById("vaciar_carrito")
const total = document.getElementById("total")

controladorCarrito.mostrarEnDOM(contenedor_carrito)

controladorProducto.listaProductos.forEach(Producto => {
    const carritoLoading = document.getElementById(`Manga$${Producto.id}`)
    carritoLoading.addEventListener("click", () => {
        controladorCarrito.Añadir(Producto)
        controladorCarrito.Leer()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)

        Toastify({
            text: "Añadido al carrito",
            duration: 3000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #8f1a26, #e1aa47)",
            },
        }).showToast();
    })
})

vaciar_carrito.addEventListener("click", () => {
    contenedor_carrito.innerHTML = '<p>El carrito está vacio</p>';
    total.innerHTML ="$0";

})

finalizar_compra.addEventListener("click", () => {
    if (controladorCarrito.listaCarrito.length > 0) {
        controladorCarrito.limpiar()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Compra realizada con éxito!',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'El carrito se encuentra vacio',
            showConfirmButton: false,
            timer: 2000
        })
    }
})

async function peticionAPI(){
    let response = await fetch("./json/api.json")
    let listaLogos = await response.json()
    listaLogos.forEach(Logo =>{
        contenedor_redes.innerHTML += `<div>
            <a title=${Logo.nombre} href=${Logo.link} target="_blank" rel="noopener noreferrer"><img src=${Logo.img}></a>
        </div>`
    })
}
peticionAPI()