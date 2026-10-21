// 1. Datos del catálogo (Basados en las imágenes de COCHÉ)
const productosCatalogo = [
    { id: 1, nombre: "Postre de Oreo", categoria: "Postres", precio: 7500 },
    { id: 2, nombre: "Postre de Milo", categoria: "Postres", precio: 7500 },
    { id: 3, nombre: "Postre de Limón", categoria: "Postres", precio: 7000 },
    { id: 4, nombre: "Capuchino", categoria: "Bebidas Calientes", precio: 5500 },
    { id: 5, nombre: "Café Americano", categoria: "Bebidas Calientes", precio: 3500 },
    { id: 6, nombre: "Granizado", categoria: "Bebidas Frías", precio: 6500 },
    { id: 7, nombre: "Chocolate Caliente", categoria: "Bebidas Calientes", precio: 4500 }
];

// 2. Cargar la tabla al iniciar
document.addEventListener("DOMContentLoaded", () => {
    cargarTablaProductos();
});

function cargarTablaProductos() {
    const cuerpo = document.getElementById("cuerpoTablaProductos");
    
    if (!cuerpo) {
        console.error("No se encontró el elemento con ID: cuerpoTablaProductos");
        return;
    }

    cuerpo.innerHTML = ""; // Limpiar tabla antes de pintar

    productosCatalogo.forEach(prod => {
        const fila = document.createElement("tr");
        
        fila.innerHTML = `
            <td class="nombre-producto">${prod.nombre}</td>
            <td>${prod.categoria}</td>
            <td>$${prod.precio.toLocaleString()}</td>
            <td><span class="badge-disponible">Disponible</span></td>
            <td>
                <button class="btn-accion" title="Editar">✏️</button>
                <button class="btn-accion" title="Eliminar">🗑️</button>
            </td>
        `;
        cuerpo.appendChild(fila);
    });
}

// 3. Lógica del Buscador (Filtrado en tiempo real)
function filtrarProductos() {
    const filtro = document.getElementById("inputBusqueda").value.toLowerCase();
    const filas = document.querySelectorAll("#cuerpoTablaProductos tr");

    filas.forEach(fila => {
        const nombre = fila.cells[0].innerText.toLowerCase();
        // Muestra la fila si el nombre coincide con el buscador
        fila.style.display = nombre.includes(filtro) ? "" : "none";
    });
}

// 4. Modal de "Nuevo Producto" (SweetAlert2)
function abrirModalNuevoProducto() {
    Swal.fire({
        title: 'Nuevo Registro',
        text: 'Próximamente: Formulario de creación de productos vinculados a insumos de inventario.',
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#4b2c20'
    });
}