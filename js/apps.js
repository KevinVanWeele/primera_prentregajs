class Producto {
  constructor(id, nombre, precio, categoria, imagen = false) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

let categoriaSeleccionada = "MLA1652";
const limiteProductos = 12;
let productos = [];
function registroPorId(id) {
  return productos.find((producto) => producto.id === id);
}


async function apiProductosPorCategoria(categoria = categoriaSeleccionada) {

  mostrarLoading();
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?category=${categoria}&limit=${limiteProductos}&offset=0`
  );
  const api = await response.json();
  const productosMercadoLibre = api.results;

  for (const productoMercadoLibre of productosMercadoLibre) {
    productos.push(
      new Producto(
        productoMercadoLibre.id,
        productoMercadoLibre.title.slice(0, 20) + "...",
        productoMercadoLibre.price,
        productoMercadoLibre.category_id,
        productoMercadoLibre.thumbnail_id
      )
    );
  }
  return productos;
  cargarProductos(productos);
  Swal.close();
}


async function apiProductosPorNombre(nombre) {

  mostrarLoading();
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?category=${categoriaSeleccionada}&q=${nombre}&limit=${limiteProductos}&offset=0`
  );
  const api = await response.json();
  const productosMercadoLibre = api.results;
  console.log(productosMercadoLibre);

  productos = [];
  for (const productoMercadoLibre of productosMercadoLibre) {
    productos.push(
      new Producto(
        productoMercadoLibre.id,
        productoMercadoLibre.title.slice(0, 20) + "...",
        productoMercadoLibre.price,
        productoMercadoLibre.category_id,
        productoMercadoLibre.thumbnail_id
      )
    );
  }
  return productos;
  cargarProductos(productos);
  Swal.close();
}

const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const inputBuscar = document.querySelector("#inputBuscar");
const botonCarrito = document.querySelector("section h1");
const botonComprar = document.querySelector("#botonComprar");
const botonesCategorias = document.querySelectorAll(".btnCategoria");


mostrarLoading();

apiProductosPorCategoria().then((productos) => {
  cargarProductos(productos);
  Swal.close();
});

apiProductosPorCategoria();

function mostrarLoading() {
  Swal.fire({
    title: "Cargando",
    html: "Estamos buscando productos...",
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    quitarClase();
    boton.classList.add("seleccionado");
    inputBuscar.value = "";

    mostrarLoading();

    categoriaSeleccionada = boton.dataset.categoria;

    apiProductosPorCategoria().then((productos) => {
      cargarProductos(productos);
      Swal.close();
    });
    apiProductosPorCategoria();
  });
});


function cargarProductos(productos) {
  divProductos.innerHTML = "";

  for (const producto of productos) {

    divProductos.innerHTML += `
        <div class="producto">
            <h2>${producto.nombre}</h2>
            <p class="precio">$${producto.precio}</p>
            <div class="imagen">
              <img src="https://http2.mlstatic.com/D_604790-${producto.imagen}-V.webp" />
            </div>
            <a href="#" class="btn btnAgregar" data-id="${producto.id}">Agregar al carrito</a>
        </div>
    `;
  }

  const botonesAgregar = document.querySelectorAll(".btnAgregar");
  for (const boton of botonesAgregar) {

    boton.addEventListener("click", (event) => {
      event.preventDefault();

      const id = boton.dataset.id;
      console.log(id);

      const producto = registroPorId(id);

      console.agregar(producto);
    });
  }
}

function quitarClase() {
  const botonSeleccionado = document.querySelector(".seleccionado");
  if (botonSeleccionado) {
    botonSeleccionado.classList.remove("seleccionado");
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

  agregar(producto) {

    const productoEnCarrito = this.estaEnCarrito(producto);
    if (productoEnCarrito) {

      productoEnCarrito.cantidad++;
    } else {

      this.carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(this.carrito));

    this.listar();

    Toastify({
      text: `${producto.nombre} fue agregado al carrito`,
      position: "center",
      className: "info",
      gravity: "bottom",
      style: {
        background: "linear-gradient(to right, blue, red)",
      },
    }).showToast();
  }

  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  listar() {

    this.total = 0;
    this.totalProductos = 0;
    divCarrito.innerHTML = "";

    for (const producto of this.carrito) {

      divCarrito.innerHTML += `
        <div class="productoCarrito">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <a href="#" data-id="${producto.id}" class="btn btnQuitar">Quitar del carrito</a>
        </div>
    `;

      this.total += producto.precio * producto.cantidad;
      this.totalProductos += producto.cantidad;
    }

    if (this.totalProductos > 0) {
      botonComprar.classList.remove("oculto");
    } else {
      botonComprar.classList.add("oculto");
    }

    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    for (const boton of botonesQuitar) {

      boton.onclick = (event) => {
        event.preventDefault();

        this.quitar(boton.dataset.id);
      };
    }

    spanCantidadProductos.innerText = this.totalProductos;
    spanTotalCarrito.innerText = this.total;
  }

  quitar(id) {

    const indice = this.carrito.findIndex((producto) => producto.id === id);

    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {

      this.carrito.splice(indice, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(this.carrito));

    this.listar();
  }

  vaciar() {
    this.carrito = [];
    localStorage.removeItem("carrito");
    this.listar();
  }
}

formBuscar.addEventListener("submit", (event) => {
  event.preventDefault();

  const palabra = inputBuscar.value;

  mostrarLoading();

  apiProductosPorNombre(palabra).then((productos) => {
    cargarProductos(productos);
    Swal.close();
  });
  apiProductosPorNombre(palabra);
});


botonCarrito.addEventListener("click", () => {
  document.querySelector("section").classList.toggle("ocultar");
});

botonComprar.addEventListener("click", (event) => {
  event.preventDefault();
  Swal.fire({
    title: "Su pedido está en camino",
    text: "¡Su compra ha sido realizada con éxito!",
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  carrito.vaciar();

  document.querySelector("section").classList.add("ocultar");
});

const carrito = new Carrito();

