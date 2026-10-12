// js/carrito.js
export let carrito = [];

export function agregarItem(infoCurso) {
    const existe = carrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        carrito = carrito.map(curso => {
            if (curso.id === infoCurso.id) curso.cantidad++;
            return curso;
        });
    } else {
        carrito.push(infoCurso);
    }
}

export function eliminarItem(id) {
    carrito = carrito.filter(curso => curso.id !== id);
}

export function vaciarCarrito() {
    carrito = [];
}

export function obtenerCarrito() {
    return carrito;
}