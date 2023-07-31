class ProductoController{
    constructor(){
        this.listaProductos = []
    }
    Leer(){
        let obtenerlistaJSON = localStorage.getItem("listaProductos")
        if(obtenerlistaJSON){
            this.listaProductos = JSON.parse(obtenerlistaJSON)
        }
    }
    mostrarEnDOM(contenedor_productos){
        contenedor_productos.innerHTML = ""
        this.listaProductos.forEach( Producto =>{
            contenedor_productos.innerHTML +=`<div>
                <img src="${Producto.img}" alt="${Producto.nombre}">
                <h5>${Producto.editorial}</h5>
                <h3>${Producto.nombre}</h3>
                <h4>$${Producto.precio}</h4>
                <a href="#" id=Manga$${Producto.id}>Añadir al carrito</a>
            </div>`
        })
    }
}

const contenedorproductos = document.getElementById("contenedor_productos")

class CarritoController{
    constructor(){
            this.listaCarrito = []
    }
    eliminar(Producto){
        let indice = this.listaCarrito.indexOf(Producto)
        this.listaCarrito.splice(indice,1)
    }
    Leer(){
        let obtenerlistaJSON = localStorage.getItem("listaCarrito")
        if(obtenerlistaJSON){
            this.listaCarrito = JSON.parse(obtenerlistaJSON)
            return true
        }return false
    }
    Añadir(Producto){
        let repiteProducto = this.listaCarrito.some(elemento => elemento.id == Producto.id)
        if(repiteProducto){
            const productoRepetido = this.buscar(Producto.id)
            productoRepetido.cantidad +=1
        }else{
            this.listaCarrito.push(Producto)
        }
        let arrayJSON= JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito",arrayJSON)
    }
    mostrarEnDOM(contenedor_carrito){
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach( Producto =>{
            contenedor_carrito.innerHTML +=`
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
        this.listaCarrito.forEach( Producto =>{
            document.getElementById(`eliminar${Producto.id}`).addEventListener("click", () =>{
                this.eliminar(Producto)
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                this.mostrarEnDOM(contenedor_carrito)
                this.mostrarTotalenDOM(total)
            })
        })
    }
    limpiar (){
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }
    mostrarTotalenDOM(precio){
        precio.innerHTML = "$"+this.calcularTotal()
    }
    calcularTotal(){
        return this.listaCarrito.reduce((acumulador, producto)=> acumulador + producto.precio * producto.cantidad, 0)
    }
    buscar(id){
        return this.listaCarrito.find(producto => producto.id == id)
    }
}

const controladorProducto = new ProductoController()
controladorProducto.Leer()

const controladorCarrito = new CarritoController()
const leyoAlgo = controladorCarrito.Leer()

const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")
const finalizar_compra = document.getElementById("finalizar_compra")
const total = document.getElementById("total")

if(leyoAlgo){
    controladorCarrito.mostrarTotalenDOM(total)
}

controladorProducto.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)

controladorProducto.listaProductos.forEach(Producto =>{
    const carritoLoading = document.getElementById(`Manga$${Producto.id}`)
    carritoLoading.addEventListener("click",()=>{
        controladorCarrito.Añadir(Producto)
        controladorCarrito.Leer()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
        controladorCarrito.mostrarTotalenDOM(total)
        
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

finalizar_compra.addEventListener("click",() =>{
    if(controladorCarrito.listaCarrito.length > 0){
            controladorCarrito.limpiar()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
        controladorCarrito.mostrarTotalenDOM(total)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Compra realizada con éxito!',
            showConfirmButton: false,
            timer: 2000
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'El carrito se encuentra vacio',
            showConfirmButton: false,
            timer: 2000
        })
    }
})

const contenedor_redes = document.getElementById("contenedor_redes")
let listaLogos

async function peticionAPI(){
    let response = await fetch("../json/api.json")
    let listaLogos = await response.json()
    listaLogos.forEach(Logo =>{
        contenedor_redes.innerHTML += `<div>
            <a title=${Logo.nombre} href=${Logo.link} target="_blank" rel="noopener noreferrer"><img src=${Logo.img}></a>
        </div>`
    })
}
peticionAPI(listaLogos)