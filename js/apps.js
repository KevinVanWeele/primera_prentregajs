let precio;
let descuento;


while(isNaN(precio + descuento)) {

if (isNaN(precio)) {
    precio = Number(prompt("introduzca el precio del producto"));
}


if (isNaN(descuento)) {
    descuento = Number(prompt("cupon de descuento (0 a 100)"));
}
}

let cupon = (precio * descuento) / 100;
let precio_final = precio - cupon;

alert('precio del producto: $' + precio + ' -$' + cupon + ' precio_final : $$ ' + precio_final + '');