// js/app.js
import { agregarItem, eliminarItem, vaciarCarrito, obtenerCarrito } from './carrito.js';
import { actualizarCarritoHTML, mostrarAlertaExito, manejarEstilosTarjeta, procesarPagoFinal } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const listaCursos = document.getElementById('lista-conferencias');
    const cartItemsModal = document.getElementById('cart-items');
    const errorPago = document.getElementById('error-pago');
    const btnPagar = document.getElementById('btn-pagar');

    // 1. Agregar al Carrito
    listaCursos.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const cursoSeleccionado = e.target.parentElement.parentElement;

            const infoCurso = {
                imagen: cursoSeleccionado.querySelector('img').src,
                titulo: cursoSeleccionado.querySelector('h4').textContent,
                precio: cursoSeleccionado.querySelector('.precio span').textContent.replace('$', ''),
                id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
                cantidad: 1
            };

            agregarItem(infoCurso);
            actualizarCarritoHTML(obtenerCarrito());
            mostrarAlertaExito();
        }
    });

    // 2. Eliminar del carrito
    if (cartItemsModal) {
        cartItemsModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('borrar-curso-offcanvas')) {
                const cursoId = e.target.getAttribute('data-id');
                eliminarItem(cursoId);
                actualizarCarritoHTML(obtenerCarrito());
            }
        });
    }

    // 3. Selección de Tarjetas
    document.querySelectorAll('.tarjeta-radio').forEach(radio => {
        radio.addEventListener('change', (e) => manejarEstilosTarjeta(e, errorPago));
    });

    // 4. Proceder al Pago
    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            const tarjetaSeleccionada = document.querySelector('input[name="tarjeta"]:checked');

            if (!tarjetaSeleccionada) {
                if (errorPago) errorPago.classList.remove('d-none');
                return;
            }

            procesarPagoFinal(tarjetaSeleccionada);
            vaciarCarrito();
            actualizarCarritoHTML(obtenerCarrito());
        });
    }
});