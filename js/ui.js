// js/ui.js
const cartItemsModal = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const modalTotal = document.getElementById('modal-total');
const cartCount = document.getElementById('cart-count');
const btnProcederPago = document.getElementById('btn-proceder-pago');

export function actualizarCarritoHTML(carrito) {
    if (!cartItemsModal) return;

    cartItemsModal.innerHTML = '';
    let total = 0;
    let conteo = 0;

    carrito.forEach(curso => {
        const precioNumerico = parseFloat(curso.precio);
        total += precioNumerico * curso.cantidad;
        conteo += curso.cantidad;

        cartItemsModal.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="${curso.imagen}" class="cart-item-img me-3 rounded" alt="${curso.titulo}">
                    <div>
                        <h6 class="my-0 fw-bold">${curso.titulo}</h6>
                        <small class="text-muted">$${curso.precio} x ${curso.cantidad}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-danger borrar-curso-offcanvas fw-bold" data-id="${curso.id}">X</button>
            </li>
        `;
    });

    if (cartTotal) cartTotal.innerText = total.toFixed(2);
    if (modalTotal) modalTotal.innerText = total.toFixed(2);
    if (cartCount) cartCount.innerText = conteo;
    if (btnProcederPago) btnProcederPago.disabled = carrito.length === 0;
}

export function mostrarAlertaExito() {
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-success position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow-lg text-center';
    alerta.setAttribute('role', 'alert');
    Object.assign(alerta.style, {
        zIndex: '9999', fontWeight: 'bold', opacity: '1',
        transition: 'opacity 0.3s ease', minWidth: '300px'
    });
    alerta.innerHTML = `✔ Producto agregado al carrito.`;

    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => alerta.remove(), 300);
    }, 1200);
}

export function manejarEstilosTarjeta(e, errorPago) {
    document.querySelectorAll('.tarjeta-img').forEach(img => {
        img.classList.remove('border-primary', 'border-3', 'shadow');
    });
    if (e.target.checked) {
        e.target.nextElementSibling.classList.add('border', 'border-primary', 'border-3', 'shadow');
    }
    if (errorPago) errorPago.classList.add('d-none');
}

export function procesarPagoFinal(tarjetaSeleccionada) {
    // Llenar comprobante
    document.getElementById('comprobante-tarjeta').innerText = tarjetaSeleccionada.value;
    document.getElementById('comprobante-total').innerText = modalTotal.innerText;
    document.getElementById('comprobante-folio').innerText = Math.floor(Math.random() * 900000) + 100000;

    // Cerrar y abrir ventanas
    bootstrap.Offcanvas.getInstance(document.getElementById('carritoOffcanvas')).hide();
    bootstrap.Modal.getInstance(document.getElementById('pagoModal')).hide();
    new bootstrap.Modal(document.getElementById('comprobanteModal')).show();

    // Limpiar estilo visual de tarjetas
    tarjetaSeleccionada.checked = false;
    document.querySelectorAll('.tarjeta-img').forEach(img => {
        img.classList.remove('border-primary', 'border-3', 'shadow');
    });
}