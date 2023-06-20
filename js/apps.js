class Carrito {
    constructor() {
      this.productos = [];
      this.total = 0;
    }
  
    enCarrito(nuevoProducto) {
      return this.productos.find((producto) => {
        if (producto.nombre == nuevoProducto.nombre && producto.precio == nuevoProducto.precio) {
          return true;
        }
        return false;
      });
    }
  
    
    agregar(nuevoProducto) {
    
      let productoEncontrado = this.enCarrito(nuevoProducto);
      if (productoEncontrado) {
    
        productoEncontrado.cantidad += 1;
        productoEncontrado.precio = nuevoProducto.precio;
        productoEncontrado.subtotal = nuevoProducto.precio * productoEncontrado.cantidad;
  
        
        let cantidad = document.querySelector("#" + productoEncontrado.nombre.toLowerCase());
        cantidad.innerText = productoEncontrado.cantidad;
      } else {
        
        this.productos.push(nuevoProducto);
        alert("El producto " + nuevoProducto.nombre + " fue agregado al carrito.");
  
        
        console.log(elementoCarrito);
        elementoCarrito.innerHTML += `
          <h1>${nuevoProducto.nombre}</h1>
          <p>Cantidad: <span id="${nuevoProducto.nombre.toLowerCase()}">${
          nuevoProducto.cantidad
        }</span></p>
          <p>Precio: $${nuevoProducto.precio}</p>
          <p>Subtotal: $${nuevoProducto.subtotal}</p>
        `;
      }

      this.listar();
    }
  
  
    listar() {
      console.clear();
      console.log("Mis productos en el carrito:");
   
      this.productos.forEach((producto) => {
        console.log("------");
        console.log("Nombre: " + producto.nombre);
        console.log("Precio: " + producto.precio);
        console.log("Cantidad: " + producto.cantidad);
        console.log("Subtotal: " + producto.subtotal);
      });
  

      this.total = this.productos.reduce(
        (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
        0
      );
      console.log("------");
      console.log("TOTAL DEl CARRITO: $" + this.total);
    }
  

    quitar(producto) {

      let productoEncontrado = this.enCarrito(producto);
      if (productoEncontrado) {
     
        let indice = this.productos.indexOf(productoEncontrado);
        this.productos.splice(indice, 1);
        alert("El producto " + producto.nombre + " fue borrado del carrito");
        this.listar();
      }
    }
  

    buscar(nombreProducto) {

      let resultado = this.productos.filter((producto) =>

        producto.nombre.includes(nombreProducto)
      );

      console.clear();
      console.log("Productos encontrados:");
      resultado.forEach((producto) => {
        console.log("------");
        console.log("Nombre: " + producto.nombre);
        console.log("Precio: " + producto.precio);
        console.log("Cantidad: " + producto.cantidad);
        console.log("Subtotal: " + producto.subtotal);
      });
    }
  }
  

  const elementoCarrito = document.querySelector("#carrito");
  const btnAgregar = document.querySelector("#btnAgregar");
  const btnQuitar = document.querySelector("#btnQuitar");
  const btnListar = document.querySelector("#btnListar");
  const btnBuscar = document.querySelector("#btnBuscar");
  

  const carrito = new Carrito();
  
  btnAgregar.addEventListener("click", agregarProducto);
  btnQuitar.addEventListener("click", quitarProducto);
  btnListar.addEventListener("click", function () {
    carrito.listar();
  });
  btnBuscar.addEventListener("click", buscarProducto);
  

  
  function agregarProducto() {

  

    let nombre = prompt("Introduzca el nombre del producto");

    if (nombre == "") {
      alert("El nombre ingresado es inválido, ingrese los datos de nuevo.");
      return;
    }
  

    let precio = prompt("Introduzca el precio del producto");

    if (precio == "" || parseInt(precio) <= 0) {
      alert("El precio ingresado es inválido, ingrese los datos de nuevo.");
      return;
    }
  

    const nuevoProducto = {
      nombre: nombre,
      precio: parseInt(precio),
      cantidad: 1,
      subtotal: parseInt(precio),
    };
  

    carrito.agregar(nuevoProducto);
  }
  
  function quitarProducto() {

    let nombre = prompt("Introduzca el nombre del producto que desea quitar");
    let precio = prompt("Introduzca el precio del producto que desea quitar");


    carrito.quitar({ nombre: nombre, precio: precio });
  }
  
  function buscarProducto() {

    let nombre = prompt("Introduzca el nombre del producto que desea buscar");
  

    carrito.buscar(nombre);
  }