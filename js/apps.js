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
  return this,productos.find((producto) => producto.id == id);
}

}

class Carrito {
  constructor() {
this.carrito = [];
this.total = 0;
this.totalProductos = 0;

}

esasEnCarrtito({ id }){
  return this.carrito.find(producto => producto.id == id);
}

agregar(producto){
  let productoEnCarrito = this.estaEnCarrito(producto);
  if (productoEnCarrito){
    productoEnCarrito.cantidad++;
  } else {
      this.carrito.push({...producto, cantidad: 1 });
  }
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


cargarProductos();



function cargarProductos(){
  const productos = bd.traerRegistros();
  divProductos,innerHTML = "";

  for (const producto of productos) {
    divProductos.innerHTML += `
   <div class="producto">
   <h2>${producto.nombre}</h2>
   <p>${producto.precio}</p>
   <img src="img/${producto.imagen}" />
   <p><a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a></p>
   
   
   </div>
   
   
    `;
  }

const botonesAgregar = document.querySelectorAll(".btnAgregar");
for (const boton of botonesAgregar){
  boton.addEventListener("clikc" , (event) => {
    event.preventDefault();
    const id = Number(boton.dataset.id);
    const producto = bd.registroPorid(id);
    console.log("Esta agregando el producto:" , producto.nombre);
  });
}

}


const carrito = new Carrito();

