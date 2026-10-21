// Datos de ejemplo para el prototipo (Simulando la futura BD)
let inventarioInsumos = [
    { id: 1, nombre: "Harina de Trigo", stock: 50, unidad: "kg", minimo: 10 },
    { id: 2, nombre: "Azúcar Blanca", stock: 25, unidad: "kg", minimo: 10 },
    { id: 3, nombre: "Leche Entera", stock: 10, unidad: "litros", minimo: 15 }, // Saldrá en alerta
    { id: 4, nombre: "Huevos", stock: 5, unidad: "unidades", minimo: 12 }       // Saldrá en alerta
];

function cargarInventario() {
    const cuerpo = document.getElementById("cuerpoTablaInventario");
    cuerpo.innerHTML = "";

    inventarioInsumos.forEach(insumo => {
        const esBajoStock = insumo.stock <= insumo.minimo;
        const fila = document.createElement("tr");
        
        if (esBajoStock) fila.classList.add("fila-alerta");

        fila.innerHTML = `
            <td>${insumo.nombre}</td>
            <td>${insumo.stock}</td>
            <td>${insumo.unidad}</td>
            <td>${esBajoStock ? "Alerta de Nivel Mínimo" : "En Stock"}</td>
            <td>
                <button onclick="editarInsumo(${insumo.id})">✏️</button>
                <button onclick="eliminarInsumo(${insumo.id})">🗑️</button>
            </td>
        `;
        cuerpo.appendChild(fila);
    });
}

// 1. Función corregida: Ahora solo muestra el mensaje de aviso
function abrirModalRegistro() {
    // Usamos SweetAlert2 para mostrar el mensaje igual a tu plantilla
    Swal.fire({
        title: 'Nuevo Registro',
        text: 'Próximamente: Formulario de registro de inventario.',
        icon: 'info', // El círculo azul con la "i" de información
        confirmButtonText: 'OK',
        confirmButtonColor: '#4b2c20' // El color marrón exacto de COCHÉ
    });
}

// 2. Mantenemos esta parte para que la tabla se vea al cargar la página
function cargarInventario() {
    const cuerpo = document.getElementById("cuerpoTablaInventario");
    if(!cuerpo) return; 

    cuerpo.innerHTML = "";

    inventarioInsumos.forEach(insumo => {
        const esBajoStock = insumo.stock <= insumo.minimo;
        const fila = document.createElement("tr");
        
        if (esBajoStock) fila.classList.add("fila-alerta");

        fila.innerHTML = `
            <td>${insumo.nombre}</td>
            <td>${insumo.stock}</td>
            <td>${insumo.unidad}</td>
            <td>${esBajoStock ? "Alerta de Nivel Mínimo" : "En Stock"}</td>
            <td>
                <button class="btn-accion">✏️</button>
                <button class="btn-accion">🗑️</button>
            </td>
        `;
        cuerpo.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", cargarInventario);
// 3. Lógica del Buscador (Filtrado en tiempo real)
// Función del Buscador para Inventario
function filtrarInventario() {
    // 1. Obtenemos el texto del buscador (el ID debe ser busquedaInsumo)
    const filtro = document.getElementById("busquedaInsumo").value.toLowerCase();
    
    // 2. Obtenemos las filas de la tabla de INVENTARIO
    const filas = document.querySelectorAll("#cuerpoTablaInventario tr");

    filas.forEach(fila => {
        // 3. Buscamos el nombre en la primera celda (columna Insumo)
        const nombreInsumo = fila.cells[0].innerText.toLowerCase();
        
        // 4. Si el nombre coincide, se muestra; si no, se oculta
        if (nombreInsumo.includes(filtro)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}