class Producto{
    constructor(id, nombre, precio, editorial, img, cantidad) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.editorial = editorial
        this.img = img
        this.cantidad = cantidad
    }
}

let listaProductos = [
    
    new Producto(1, "Berserk", 2500, "Panini", './assets/images/berserk.jpg', 1),
    new Producto(2,"Naruto", 2500, "Panini", './assets/images/naruto.jpg', 1),
    new Producto(3,"Bleach", 6000,"IVREA", './assets/images/bleach.jpg', 1),
    new Producto(4, "Gantz", 4400,"IVREA", './assets/images/gantz.jpg', 1),
    new Producto(5, "Kamen Rider Kuuga", 3200, "OVNIPress",'./assets/images/kamenRiderKuuga.jpeg', 1),
    new Producto(6, "Soul Eater", 4500, "OVNIPress", './assets/images/soulEater.jpg', 1)
]

const arrayJSON = JSON.stringify(listaProductos)
localStorage.setItem("listaProductos", arrayJSON)