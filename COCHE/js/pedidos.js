let seleccionParaPagar = []; // Aquí guardaremos temporalmente lo que se va a cobrar
// 1. VARIABLES GLOBALES Y CONFIGURACIÓN INICIAL
let carrito = [];
let propina = 0;
let descuento = 0;
let ordenConfirmada = false; // Nueva variable de control de seguridad
// Definición de mesas disponibles en el café
const mesasDisponibles = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Barra 1", "Barra 2"];
const menu = [
    { id: 1, nombre: "Postre de Oreo", precio: 7500, categoria: "Postres" },
    { id: 2, nombre: "Postre de Milo", precio: 7500, categoria: "Postres" },
    { id: 3, nombre: "Postre de Limón", precio: 7000, categoria: "Postres" },
    { id: 4, nombre: "Capuchino", precio: 5500, categoria: "Cafés" },
    { id: 5, nombre: "Café Americano", precio: 3500, categoria: "Cafés" },
    { id: 6, nombre: "Granizado", precio: 6500, categoria: "Bebidas frias" },
    { id: 7, nombre: "Chocolate Caliente", precio: 4500, categoria: "Bebidas calientes" }
];

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const mesaId = params.get('mesa') || "1";
    document.getElementById("tituloMesa").innerText = `Pedido - Mesa ${mesaId}`;
    renderizarMenu();
});

// 2. RENDERIZADO Y FILTRADO
function renderizarMenu(productosAMostrar = menu) {
    const grid = document.getElementById("gridProductos");
    if (!grid) return;
    grid.innerHTML = "";

    productosAMostrar.forEach(p => {
        const div = document.createElement("div");
        div.className = "producto-card";
        // Si la orden ya está confirmada, deshabilitamos visualmente las cards
        const opacity = ordenConfirmada ? "style='opacity: 0.5; pointer-events: none;'" : "";
        
        div.innerHTML = `
            <div ${opacity}>
                <h4>${p.nombre}</h4>
                <p>$${p.precio.toLocaleString()}</p>
                <button onclick="agregarAlCarrito(${p.id})" ${ordenConfirmada ? 'disabled' : ''}>
                    <i class="fa-solid fa-plus"></i> Agregar
                </button>
            </div>
        `;
        grid.appendChild(div);
    });
}

function filtrarCategoria(categoria) {
    const botones = document.querySelectorAll('.cat-btn');
    botones.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtrados = (categoria === 'Todos') ? menu : menu.filter(p => p.categoria === categoria);
    renderizarMenu(filtrados);
}

function buscarProducto() {
    const texto = document.getElementById("inputBusqueda").value.toLowerCase();
    const filtrados = menu.filter(p => p.nombre.toLowerCase().includes(texto));
    renderizarMenu(filtrados);
}

// 3. LÓGICA DEL CARRITO
function agregarAlCarrito(id) {
    if (ordenConfirmada) return; // Bloqueo de seguridad

    const producto = menu.find(item => item.id === id);
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarInterfaz();
}


function eliminarDelCarrito(id) {
    if (ordenConfirmada) return; // Bloqueo de seguridad
    carrito = carrito.filter(item => item.id !== id);
    actualizarInterfaz();
}
function actualizarInterfaz() {
    const lista = document.getElementById("listaPedido");
    if (!lista) return;

    lista.innerHTML = "";
    let subtotal = 0;

    carrito.forEach(item => {
        const itemSubtotal = item.precio * item.cantidad;
        subtotal += itemSubtotal;

        // Mantenemos tu lógica de seguridad (X)
        const botonEliminar = !ordenConfirmada 
            ? `<button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">
                    <i class="fa-solid fa-xmark"></i>
               </button>` 
            : "";

        // Agregamos las clases: pedido-item, item-nombre e item-precio para el botón Dividir
        lista.innerHTML += `
            <div class="item-fila pedido-item">
                <div class="info-item">
                    <strong class="item-nombre">${item.nombre}</strong><br>
                    <small>${item.cantidad} x $${item.precio.toLocaleString()}</small>
                </div>
                <div class="precio-item">
                    <span class="item-precio">$${itemSubtotal.toLocaleString()}</span>
                    ${botonEliminar}
                </div>
            </div>
        `;
    });

    // Tus cálculos finales de COCHÉ CAFÉ
    const totalFinal = (subtotal + propina) - descuento;
    
    document.getElementById("subtotal").innerText = `$${subtotal.toLocaleString()}`;
    document.getElementById("val-propina").innerText = `$${propina.toLocaleString()}`;
    document.getElementById("totalFinal").innerText = `$${totalFinal.toLocaleString()}`;
}


// 4. FUNCIONES DE GESTIÓN DE CUENTA
function gestionarPropina() {
    if (ordenConfirmada) return;
    Swal.fire({
        title: 'Agregar Propina',
        input: 'number',
        inputPlaceholder: 'Ej: 1500',
        inputLabel: 'Monto en pesos',
        confirmButtonColor: '#4b2c20',
        background: '#fdf5e6'
    }).then((result) => {
        if (result.value) {
            propina = parseFloat(result.value);
            actualizarInterfaz();
        }
    });
}

function agregarDescuento() {
    if (ordenConfirmada) return; // Bloqueo si ya se confirmó la comanda

    Swal.fire({
        title: 'Aplicar Descuento',
        input: 'number', // Cambiamos de 'select' a 'number' para que puedas escribir
        inputLabel: 'Ingresa el monto del descuento en pesos',
        inputPlaceholder: 'Ej: 1500',
        showCancelButton: true,
        confirmButtonText: 'Aplicar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4b2c20',
        background: '#fdf5e6',
        inputValidator: (value) => {
            if (!value || value < 0) {
                return 'Por favor, ingresa un monto válido';
            }
            // Opcional: Validar que el descuento no sea mayor al subtotal
            const subtotalActual = carrito.reduce((s, i) => s + (i.precio * i.cantidad), 0);
            if (parseFloat(value) > subtotalActual) {
                return 'El descuento no puede ser mayor al subtotal';
            }
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            descuento = parseFloat(result.value);
            
            // Mostrar la fila de descuento en la interfaz
            const rowDescuento = document.getElementById("row-descuento");
            if (rowDescuento) {
                rowDescuento.style.display = "flex";
            }
            
            const valDescuento = document.getElementById("val-descuento");
            if (valDescuento) {
                valDescuento.innerText = `-$${descuento.toLocaleString()}`;
            }
            
            actualizarInterfaz();
            
            Swal.fire({
                title: 'Descuento Aplicado',
                text: `Se han restado $${descuento.toLocaleString()} al total.`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

function cambiarMesa() {
    // Creamos el objeto de opciones para el SweetAlert
    let opcionesMesas = {};
    mesasDisponibles.forEach(m => {
        opcionesMesas[m] = m;
    });

    Swal.fire({
        title: 'Seleccionar Mesa',
        input: 'select',
        inputOptions: opcionesMesas,
        inputPlaceholder: '¿A qué mesa se mueven?',
        showCancelButton: true,
        confirmButtonColor: '#4b2c20',
        cancelButtonText: 'Cancelar',
        background: '#fdf5e6',
        inputValidator: (value) => {
            if (!value) return 'Debes seleccionar una mesa';
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Actualizamos el título con la mesa elegida
            document.getElementById("tituloMesa").innerText = `Pedido - ${result.value}`;
            
            Swal.fire({
                title: 'Mesa Cambiada',
                text: `Ahora estás atendiendo en la ${result.value}`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

// 5. FLUJO DE CIERRE (CONFIRMAR -> PAGAR -> PDF)
function confirmarComanda() {
    if (carrito.length === 0) return Swal.fire("Atención", "El carrito está vacío", "warning");
    
    Swal.fire({
        title: '¿Confirmar Pedido?',
        text: "Una vez confirmado, se habilitará la opción de dividir cuenta y se bloquearán cambios en los productos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4b2c20',
        confirmButtonText: 'Sí, confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            ordenConfirmada = true; 

            // BLOQUEO SELECTIVO:
            // Solo bloqueamos Descuento y Propina (y los de agregar del menú)
            // Pero NO bloqueamos el botón de Mesa
            const btnDescuento = document.querySelector('button[onclick="agregarDescuento()"]');
            const btnPropina = document.querySelector('button[onclick="gestionarPropina()"]');
            
            if(btnDescuento) { btnDescuento.disabled = true; btnDescuento.style.opacity = "0.5"; }
            if(btnPropina) { btnPropina.disabled = true; btnPropina.style.opacity = "0.5"; }

            // Re-renderizar catálogo para deshabilitar botones de "Agregar"
            renderizarMenu();
            // Actualizar lista para quitar las "X"
            actualizarInterfaz();

            // Intercambiar botones de acción
            document.getElementById("btnConfirmar").style.display = "none";
            const btnPagar = document.getElementById("btnPagar");
            btnPagar.style.display = "block";
            btnPagar.disabled = false;

            Swal.fire("¡Confirmado!", "La orden ha sido enviada. Ya puedes dividir la cuenta si lo necesitas.", "success");
        }
    });
}

async function irAFacturacion() {
    const totalFinal = (carrito.reduce((s, i) => s + (i.precio * i.cantidad), 0) + propina) - descuento;

    const { value: metodo } = await Swal.fire({
        title: 'Medio de Pago',
        input: 'radio',
        inputOptions: { 'Efectivo': 'Efectivo', 'Nequi': 'Nequi', 'Tarjeta': 'Tarjeta' },
        confirmButtonColor: '#4b2c20',
        inputValidator: (v) => !v && 'Seleccione un medio'
    });

    if (!metodo) return;

    let pagoCon = totalFinal;
    let vueltas = 0;

    if (metodo === 'Efectivo') {
        const { value: monto } = await Swal.fire({
            title: 'Pago en Efectivo',
            text: `Total a cobrar: $${totalFinal.toLocaleString()}`,
            input: 'number',
            inputLabel: '¿Con cuánto paga el cliente?',
            inputAttributes: { min: totalFinal },
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            inputValidator: (value) => {
                if (!value || parseFloat(value) < totalFinal) {
                    return 'El monto debe ser mayor o igual al total';
                }
            }
        });

        if (!monto) return;
        pagoCon = parseFloat(monto);
        vueltas = pagoCon - totalFinal;
        // VENTANA DE CAMBIO ESTILO CALCULADORA
        await Swal.fire({
            title: 'CAMBIO A ENTREGAR',
            html: `
                <div style="font-size: 3em; font-weight: bold; color: #28a745; margin: 20px 0; background: #f0fdf4; padding: 20px; border-radius: 10px; border: 2px dashed #28a745;">
                    $${vueltas.toLocaleString()}
                </div>
                <p style="color: #4b2c20; font-weight: 500;">Cobro realizado con éxito</p>
            `,
            icon: 'success',
            confirmButtonText: 'ENTREGADO Y CERRAR',
            confirmButtonColor: '#4b2c20',
            allowOutsideClick: false
        });
    }
    // 1. Generar PDF
    generarFacturaPDF(metodo, pagoCon, vueltas);

    // 2. LIMPIEZA TOTAL (Lo que te faltaba)
    carrito = [];
    propina = 0;
    descuento = 0;
    ordenConfirmada = false;

    // 3. ACTUALIZAR INTERFAZ Y BOTONES
    actualizarInterfaz();
    document.getElementById("btnConfirmar").style.display = "block";
    document.getElementById("btnPagar").style.display = "none";
    document.getElementById("row-descuento").style.display = "none";
    
    // Re-renderizar menú para habilitar botones de "Agregar"
    renderizarMenu();

    Swal.fire({
        title: '¡Venta Finalizada!',
        text: 'La pantalla se ha limpiado y la mesa está disponible.',
        icon: 'success',
        confirmButtonColor: '#4b2c20'
    });
}

function generarFacturaPDF(metodo, pagoCon = 0, vueltas = 0) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: [80, 150] });

    const config = JSON.parse(localStorage.getItem("infoCoche"));
    const logoBase64 = localStorage.getItem("logoCoche");

    const nombre = config ? config.nombre : "COCHÉ CAFÉ";
    const nit = config ? config.nit : "NIT: 000.000.000-0";
    const direccion = config ? config.dir : "Dirección";
    const ciudadTel = config ? `${config.ciudad} - ${config.tel}` : "Ciudad - Tel";

    let y = 10; 

    if (logoBase64 && logoBase64.startsWith("data:image")) {
        try {
            const props = doc.getImageProperties(logoBase64);
            const ratio = props.height / props.width;
            const widthLogo = 35; 
            const heightLogo = widthLogo * ratio; 
            doc.addImage(logoBase64, 'PNG', 22.5, y, widthLogo, heightLogo);
            y += heightLogo + 5; 
        } catch (e) { console.error(e); y += 5; }
    }

    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.text(nombre.toUpperCase(), 40, y, { align: "center" });
    
    doc.setFontSize(9).setFont("helvetica", "normal");
    y += 5; doc.text(nit, 40, y, { align: "center" });
    y += 4; doc.text(direccion, 40, y, { align: "center" });
    y += 4; doc.text(ciudadTel, 40, y, { align: "center" });
    y += 6; doc.text("--------------------------------------------------", 40, y, { align: "center" });

    y += 6; doc.setFont("helvetica", "bold").text("DETALLES DE LA VENTA", 10, y);
    doc.setFont("helvetica", "normal");
    y += 5; doc.text(`Mesa: ${document.getElementById("tituloMesa").innerText}`, 10, y);
    y += 4; doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y);
    y += 4; doc.text(`Hora: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`, 10, y);
    y += 4; doc.text(`Forma de Pago: ${metodo}`, 10, y);
    y += 6; doc.text("--------------------------------------------------", 40, y, { align: "center" });

    y += 5; doc.setFont("helvetica", "bold");
    doc.text("Cant", 10, y);
    doc.text("Detalle", 22, y);
    doc.text("Total", 70, y, { align: "right" });
    
    y += 5; doc.setFont("helvetica", "normal");
    let subtotalCalculado = 0;
    carrito.forEach(item => {
        let totalItem = item.precio * item.cantidad;
        subtotalCalculado += totalItem;
        doc.text(`${item.cantidad}`, 10, y);
        doc.text(item.nombre.substring(0, 20), 22, y);
        doc.text(`$${totalItem.toLocaleString()}`, 70, y, { align: "right" });
        y += 5; 
    });

    y += 5; doc.text("-----------------------", 70, y, { align: "right" });
    y += 6; doc.text("Subtotal:", 40, y); 
    doc.text(`$${subtotalCalculado.toLocaleString()}`, 70, y, { align: "right" });
    
    if (propina > 0) {
        y += 5; doc.text("Propina:", 40, y);
        doc.text(`$${propina.toLocaleString()}`, 70, y, { align: "right" });
    }
    if (descuento > 0) {
        y += 5; doc.text("Descuento:", 40, y);
        doc.text(`-$${descuento.toLocaleString()}`, 70, y, { align: "right" });
    }

    const totalFinal = (subtotalCalculado + propina - descuento);
    y += 8;
    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text("TOTAL PAGADO:", 10, y);
    doc.text(`$${totalFinal.toLocaleString()}`, 70, y, { align: "right" });

    // SECCIÓN DE CALCULADORA (Solo si es Efectivo)
    if (metodo === 'Efectivo' && pagoCon > 0) {
        y += 7;
        doc.setFontSize(9).setFont("helvetica", "normal");
        doc.text("Recibido:", 10, y);
        doc.text(`$${pagoCon.toLocaleString()}`, 70, y, { align: "right" });
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.text("CAMBIO:", 10, y);
        doc.text(`$${vueltas.toLocaleString()}`, 70, y, { align: "right" });
    }

    y += 15;
    doc.setFontSize(9).setFont("helvetica", "italic");
    doc.text("¡Gracias por tu visita a COCHÉ!", 40, y, { align: "center" });
    doc.save(`Ticket_Coche_Final.pdf`);
}
function generarFacturaPDF_Parcial(metodo, productosPagados, pagoCon = 0, vueltas = 0) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: [80, 150] });

    const config = JSON.parse(localStorage.getItem("infoCoche"));
    const logoBase64 = localStorage.getItem("logoCoche");

    const nombre = config ? config.nombre : "COCHÉ CAFÉ";
    const nit = config ? config.nit : "NIT: 000.000.000-0";
    const direccion = config ? config.dir : "Dirección";
    const ciudadTel = config ? `${config.ciudad} - ${config.tel}` : "Ciudad - Tel";

    let y = 10; 

    if (logoBase64 && logoBase64.startsWith("data:image")) {
        try {
            const props = doc.getImageProperties(logoBase64);
            const ratio = props.height / props.width;
            const widthLogo = 35; 
            const heightLogo = widthLogo * ratio; 
            doc.addImage(logoBase64, 'PNG', 22.5, y, widthLogo, heightLogo);
            y += heightLogo + 5; 
        } catch (e) { console.error(e); y += 5; }
    }

    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.text(nombre.toUpperCase(), 40, y, { align: "center" });
    
    doc.setFontSize(9).setFont("helvetica", "normal");
    y += 5; doc.text(nit, 40, y, { align: "center" });
    y += 4; doc.text(direccion, 40, y, { align: "center" });
    y += 4; doc.text(ciudadTel, 40, y, { align: "center" });
    y += 6; doc.text("--------------------------------------------------", 40, y, { align: "center" });

    y += 6; doc.setFont("helvetica", "bold").text("PAGO PARCIAL", 10, y);
    doc.setFont("helvetica", "normal");
    y += 5; doc.text(`Mesa: ${document.getElementById("tituloMesa").innerText}`, 10, y);
    y += 4; doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y);
    y += 4; doc.text(`Hora: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`, 10, y);
    y += 4; doc.text(`Forma de Pago: ${metodo}`, 10, y);
    y += 6; doc.text("--------------------------------------------------", 40, y, { align: "center" });

    y += 5; doc.setFont("helvetica", "bold");
    doc.text("Cant", 10, y);
    doc.text("Detalle", 22, y);
    doc.text("Total", 70, y, { align: "right" });
    
    y += 5; doc.setFont("helvetica", "normal");
    let subtotalCalculado = 0;
    productosPagados.forEach(item => {
        let totalItem = item.precio * item.cantidad;
        subtotalCalculado += totalItem;
        doc.text(`${item.cantidad}`, 10, y);
        doc.text(item.nombre.substring(0, 20), 22, y);
        doc.text(`$${totalItem.toLocaleString()}`, 70, y, { align: "right" });
        y += 5; 
    });

    y += 5; doc.text("-----------------------", 70, y, { align: "right" });
    y += 6; doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text("TOTAL PAGADO:", 10, y);
    doc.text(`$${subtotalCalculado.toLocaleString()}`, 70, y, { align: "right" });

    // SECCIÓN DE CALCULADORA (Igual que la completa)
    if (metodo === 'Efectivo' && pagoCon > 0) {
        y += 7;
        doc.setFontSize(9).setFont("helvetica", "normal");
        doc.text("Recibido:", 10, y);
        doc.text(`$${pagoCon.toLocaleString()}`, 70, y, { align: "right" });
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.text("CAMBIO:", 10, y);
        doc.text(`$${vueltas.toLocaleString()}`, 70, y, { align: "right" });
    }

    y += 15;
    doc.setFontSize(9).setFont("helvetica", "italic");
    doc.text("¡Gracias por tu visita a COCHÉ!", 40, y, { align: "center" });
    doc.save(`Ticket_Parcial_Coche.pdf`);
}
/* === FUNCIÓN PARA DIVIDIR CUENTA POR PRODUCTO === */
function dividirCuenta() {
    // NUEVA REGLA: No disponible antes de aceptar la comanda
    if (!ordenConfirmada) {
        Swal.fire({
            title: 'Acción no permitida',
            text: 'Debes confirmar la comanda antes de poder dividir la cuenta.',
            icon: 'info',
            confirmButtonColor: '#4b2c20'
        });
        return;
    }

    if (carrito.length === 0) {
        Swal.fire({ title: 'Mesa vacía', icon: 'info', confirmButtonColor: '#4b2c20' });
        return;
    }

    // Reiniciamos la selección cada vez que abrimos el modal
    seleccionParaPagar = [];
    abrirModalSeleccion();
}

function devolverAlCarrito(id) {
    const yaSeleccionado = seleccionParaPagar.find(item => item.id === id);
    if (!yaSeleccionado) return;

    const productoOriginal = carrito.find(item => item.id === id);
    if (productoOriginal) {
        productoOriginal.cantidad++; // Regresa a la mesa
    }
    
    yaSeleccionado.cantidad--;
    if (yaSeleccionado.cantidad <= 0) {
        seleccionParaPagar = seleccionParaPagar.filter(item => item.id !== id);
    }
    
    abrirModalSeleccion();
}


function marcarParaPagar(id) {
    const productoOriginal = carrito.find(item => item.id === id);
    if (!productoOriginal || productoOriginal.cantidad <= 0) return;

    let yaSeleccionado = seleccionParaPagar.find(item => item.id === id);

    if (yaSeleccionado) {
        yaSeleccionado.cantidad++;
    } else {
        // Usamos el spread (...) para crear una copia y que no se bugee el precio
        seleccionParaPagar.push({ ...productoOriginal, cantidad: 1 });
    }
    
    productoOriginal.cantidad--; // Se resta de la mesa temporalmente
    abrirModalSeleccion(); // Refresca el modal para mostrar los cambios
}

/* === SECCIÓN DE DIVISIÓN DE CUENTA CORREGIDA === */

function procesarPagoParcial() {
    // 1. Calculamos cuánto suma solo lo seleccionado
    const totalSeleccionado = seleccionParaPagar.reduce((total, item) => total + (item.precio * item.cantidad), 0);

    if (totalSeleccionado === 0) {
        return Swal.fire("Atención", "No hay productos seleccionados para pagar", "warning");
    }

    // 2. Llamamos al selector de método de pago
    abrirModalMetodoPagoParcial(totalSeleccionado);
}

async function abrirModalMetodoPagoParcial(totalParcial) {
    const { value: metodo } = await Swal.fire({
        title: 'Medio de Pago (Parcial)',
        html: `<p>Total a cobrar: <strong>$${totalParcial.toLocaleString()}</strong></p>`,
        input: 'radio',
        inputOptions: { 
            'Efectivo': 'Efectivo', 
            'Nequi': 'Nequi / A la mano', 
            'Tarjeta': 'Tarjeta' 
        },
        confirmButtonColor: '#4b2c20',
        inputValidator: (v) => !v && 'Seleccione un medio de pago'
    });

    if (metodo) {
        ejecutarCierreDeCajaParcial(metodo, totalParcial);
    }
}

async function ejecutarCierreDeCajaParcial(metodoPago, totalParcial) {
    let pagoCon = totalParcial; 
    let vueltas = 0;

    if (metodoPago === 'Efectivo') {
        const { value: monto } = await Swal.fire({
            title: 'Pago en Efectivo',
            text: `Total Parcial: $${totalParcial.toLocaleString()}`,
            input: 'number',
            inputLabel: '¿Con cuánto paga el cliente?',
            inputAttributes: { min: totalParcial },
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            inputValidator: (value) => {
                if (!value || parseFloat(value) < totalParcial) return 'Monto insuficiente';
            }
        });

        if (!monto) return;
        pagoCon = parseFloat(monto);
        vueltas = pagoCon - totalParcial;
        // VENTANA DE CAMBIO ESTILO CALCULADORA
        await Swal.fire({
            title: 'CAMBIO A ENTREGAR',
            html: `
                <div style="font-size: 3em; font-weight: bold; color: #28a745; margin: 20px 0; background: #f0fdf4; padding: 20px; border-radius: 10px; border: 2px dashed #28a745;">
                    $${vueltas.toLocaleString()}
                </div>
                <p style="color: #4b2c20; font-weight: 500;">Cobro parcial realizado</p>
            `,
            icon: 'success',
            confirmButtonText: 'ENTREGADO Y CONTINUAR',
            confirmButtonColor: '#4b2c20',
            allowOutsideClick: false
        });
    }
    

    generarFacturaPDF_Parcial(metodoPago, seleccionParaPagar, pagoCon, vueltas);

    // Filtrar el carrito para eliminar productos con cantidad 0
    carrito = carrito.filter(item => item.cantidad > 0);
    seleccionParaPagar = [];
    actualizarInterfaz();
    
    // Verificación de mesa vacía
    if (carrito.length === 0) {
        ordenConfirmada = false;
        propina = 0;
        descuento = 0;
        document.getElementById("btnConfirmar").style.display = "block";
        document.getElementById("btnPagar").style.display = "none";
        document.getElementById("row-descuento").style.display = "none";
        renderizarMenu();
        
        Swal.fire({
            title: '¡Mesa Finalizada!',
            text: 'Se pagó el último saldo pendiente. La mesa queda libre.',
            icon: 'success',
            confirmButtonColor: '#4b2c20'
        });
    } else {
        Swal.fire({
            title: 'Pago Parcial Exitoso',
            text: 'Quedan productos pendientes en la mesa.',
            icon: 'info',
            confirmButtonColor: '#4b2c20'
        });
    }
}
function lanzarFacturacion(productosAPagar) {
    const totalPagar = productosAPagar.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);

    Swal.fire({
        title: 'Finalizar Pago Parcial',
        text: `Total a cobrar: $${totalPagar.toLocaleString()}. ¿Método de pago?`,
        input: 'select',
        inputOptions: {
            'efectivo': 'Efectivo',
            'transferencia': 'Transferencia / Nequi',
            'tarjeta': 'Tarjeta'
        },
        confirmButtonText: 'Generar Factura',
        confirmButtonColor: '#4b2c20'
    }).then((result) => {
        if (result.isConfirmed) {
            // Aquí llamas a tu función de generar PDF/Factura enviándole productosAPagar
            Swal.fire('¡Cobrado!', 'La factura se ha generado. Lo demás sigue en la mesa.', 'success');
        }
    });
}

function abrirModalSeleccion() {
    let htmlProductos = "";
    
    // Generar lista de productos que aún están en la mesa
    carrito.forEach(item => {
        if (item.cantidad > 0) {
            htmlProductos += `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 10px; background: #fff; border-radius: 8px; border: 1px solid var(--beige);">
                    <div style="text-align: left;">
                        <strong>${item.nombre}</strong><br>
                        <small>Disponible: ${item.cantidad}</small>
                    </div>
                    <button onclick="marcarParaPagar(${item.id})" style="background: var(--cafe-oscuro); color: white; border: none; padding: 5px 12px; border-radius: 5px; cursor: pointer;">
                        Pagar uno <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>`;
        }
    });

    let htmlSeleccionados = "";
    let totalParcial = 0;
    
    // Generar lista de lo que se va a cobrar YA
    seleccionParaPagar.forEach(item => {
        totalParcial += (item.precio * item.cantidad);
        htmlSeleccionados += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding: 8px; background: #fdf5e6; border-left: 4px solid #28a745;">
                <span style="font-size: 0.9em;">${item.cantidad}x ${item.nombre}</span>
                <button onclick="devolverAlCarrito(${item.id})" style="background: #d32f2f; color: white; border: none; padding: 2px 8px; border-radius: 4px; cursor: pointer;">
                    <i class="fa-solid fa-rotate-left"></i>
                </button>
            </div>`;
    });

    Swal.fire({
        title: '<i class="fa-solid fa-columns"></i> Dividir Cuenta',
        html: `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: center;">
                <div>
                    <p style="margin-bottom: 10px; font-weight: bold; color: var(--cafe-medio);">En la Mesa</p>
                    <div style="max-height: 300px; overflow-y: auto;">${htmlProductos || '<p>No hay más productos</p>'}</div>
                </div>
                <div style="background: #f1eee9; padding: 10px; border-radius: 10px;">
                    <p style="margin-bottom: 10px; font-weight: bold; color: #28a745;">Para Cobrar</p>
                    <div style="max-height: 250px; overflow-y: auto;">${htmlSeleccionados || '<p>Selecciona productos...</p>'}</div>
                    <hr style="margin: 10px 0;">
                    <p style="font-size: 1.2em;">Total: <strong>$${totalParcial.toLocaleString()}</strong></p>
                </div>
            </div>
        `,
        width: '800px',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: '<i class="fa-solid fa-cash-register"></i> COBRAR ESTO',
        confirmButtonColor: '#28a745',
        background: '#fdf5e6',
        preConfirm: () => {
            if (seleccionParaPagar.length === 0) {
                Swal.showValidationMessage('Debes seleccionar al menos un producto');
            }
            return true;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            procesarPagoParcial();
        }
    });
}