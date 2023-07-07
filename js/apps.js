class BaseDeDatos {
  constructor() {
    // Array de la base de datos
    this.productos = [];
    // Vamos a cargar todos los productos que tengamos
    // Con una simple línea de código, vamos a ir cargando todos los productos que tengamos
    this.agregarRegistro(1, "Chaleco", 100, "Alimentos", "chaleconike.jpg");
    this.agregarRegistro(2, "Remera", 50, "Alimentos", "remeranike.jpg");
    this.agregarRegistro(3, "Buzo", 25, "Alimentos", "buzonike.jpg");
    this.agregarRegistro(4, "Camera", 25, "Alimentos", "camperanike.jpg");
  }

  // Método que crea el objeto producto y lo almacena en el array con un push
  agregarRegistro(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
    this.productos.push(producto);
  }


traerRegistros() {
  return this.productos;
}

registroPorid(id) {
  return this.productos.find((producto) => producto.id == id);
}

}

class Carrito {
  constructor() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
this.carrito = carritoStorage || [];
this.total = 0;
this.totalProductos = 0;
this.listar();

}

estaEnCarrito({ id }){
  return this.carrito.find(producto => producto.id == id);
}

agregar(producto){
  let productoEnCarrito = this.estaEnCarrito(producto);
  if (productoEnCarrito){
    productoEnCarrito.cantidad++;
  } else {
      this.carrito.push({...producto, cantidad: 1 });
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }
  this.listar();
}

quitar(id){
  const indice = this.carrito.findIndex((producto) => producto.id == id);
  if (this.carrito[indice].cantidad > 1){
    this.carrito[indice].cantidad--;
  } else {
    this.carrito.splice(indice, 1)
  }
  localStorage.setItem("carrito", JSON.stringify(this.carrito));
  this.listar();
}



listar(){
  this.total = 0;
  this.totalProductos = 0;
  divCarrito.innerHTML= "";
  for (const producto of this.carrito) {
    divCarrito.innerHTML += `
    <div class="carrito">
    <h2>${producto.nombre}</h2>
    <p>${producto.precio}</p>
    <p>Cantidad: ${producto.cantidad}</p>
    
    <p><a href="#" data-id="${producto.id}" class="btnQuitar">Quitar del carrito</a></p>
    </div>
    `;
    this.total += (producto.precio * producto.cantidad);
    this.totalProductos += producto.cantidad;
  }
  const botonesQuitar = document.querySelectorAll(".btnQuitar");
  for (const boton of botonesQuitar) {
    boton.onclick = (event) => {
      event.preventDefault();
      this.quitar(Number(boton.dataset.id));
    }
  }
  spanCantidadProductos.innerText = this.totalProductos;
  spanTotalCarrito.innerText = this.total
}
}












class Producto {
  constructor(id ,nombre, precio, categoria, imagen = false) {
    this. id = id;
    this. nombre = nombre;
    this. precio = precio;
    this. categoria = categoria;
    this. imagen = imagen;
  }
}

const bd = new BaseDeDatos();

const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");


cargarProductos();



function cargarProductos(){
  const productos = bd.traerRegistros();
  divProductos,innerHTML = "";

  for (const producto of productos) {
    divProductos.innerHTML += `
   <div class="producto">
   <h2>${producto.nombre}</h2>
   <p>${producto.precio}</p>
   <img src="img/${producto.imagen}" width = "150" />
   <p><a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a></p>
   </div>
   `;
  }

const botonesAgregar = document.querySelectorAll(".btnAgregar");
for (const boton of botonesAgregar){
  boton.addEventListener("click" , (event) => {
    event.preventDefault();
    const id = Number(boton.dataset.id);
    const producto = bd.registroPorid(id);
    carrito.agregar(producto)
  });
}

}


const carrito = new Carrito();

