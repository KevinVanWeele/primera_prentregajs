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
  
    // Agregar al carrito
    agregar(nuevoProducto) {
      // Si encuentra algún producto, lo guardo en una variable
      let productoEncontrado = this.enCarrito(nuevoProducto);
      if (productoEncontrado) {
        // Con el producto en una variable, puedo sumarle directamente
        // la cantidad y multiplicar su precio
        productoEncontrado.cantidad += 1;
        productoEncontrado.precio = nuevoProducto.precio;
        productoEncontrado.subtotal = nuevoProducto.precio * productoEncontrado.cantidad;
  
        // Actualizamos la cantidad en vivo y en directo
        let cantidad = document.querySelector("#" + productoEncontrado.nombre.toLowerCase());
        cantidad.innerText = productoEncontrado.cantidad;
      } else {
        // Si no está en el carrito, lo agrego al array.
        this.productos.push(nuevoProducto);
        alert("El producto " + nuevoProducto.nombre + " fue agregado al carrito.");
  
        // Actualizar HTML
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
      // Muestro la lista de productos llamando al método listar
      this.listar();
    }
  
    // Muestro la lista de productos en consola
    listar() {
      console.clear(); // Limpia consola
      console.log("Mis productos en el carrito:");
      // Variante usando forEach en vez de el clásico for
      this.productos.forEach((producto) => {
        console.log("------");
        console.log("Nombre: " + producto.nombre);
        console.log("Precio: " + producto.precio);
        console.log("Cantidad: " + producto.cantidad);
        console.log("Subtotal: " + producto.subtotal);
      });
  
      // Uso la el método reduce para sumar el total de los productos
      this.total = this.productos.reduce(
        (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
        0
      );
      console.log("------");
      console.log("TOTAL DEl CARRITO: $" + this.total);
    }
  
    // Remueve un producto del carrito
    quitar(producto) {

      let productoEncontrado = this.enCarrito(producto);
      if (productoEncontrado) {
        // Obtengo el índice
        let indice = this.productos.indexOf(productoEncontrado);
        this.productos.splice(indice, 1); // Lo vuelo con splice
        alert("El producto " + producto.nombre + " fue borrado del carrito");
        this.listar();
      }
    }
  
    // Buscador con filter e includes en una sola línea (is majeco)
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
  
  // Elementos
  const elementoCarrito = document.querySelector("#carrito");
  const btnAgregar = document.querySelector("#btnAgregar");
  const btnQuitar = document.querySelector("#btnQuitar");
  const btnListar = document.querySelector("#btnListar");
  const btnBuscar = document.querySelector("#btnBuscar");
  
  // Creo el objeto carrito
  const carrito = new Carrito();
  
  btnAgregar.addEventListener("click", agregarProducto);
  btnQuitar.addEventListener("click", quitarProducto);
  btnListar.addEventListener("click", function () {
    carrito.listar();
  });
  btnBuscar.addEventListener("click", buscarProducto);
  
  // Funciones para los botones
  
  function agregarProducto() {
    // Pido por prompt los datos del producto
  
    // Nombre
    let nombre = prompt("Introduzca el nombre del producto");
    // Validación
    if (nombre == "") {
      alert("El nombre ingresado es inválido, ingrese los datos de nuevo.");
      return;
    }
  
    // Precio
    let precio = prompt("Introduzca el precio del producto");
    // Validación
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