document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar el logo y nombre de usuario (Si no usas global.js, déjalo aquí)
    const logoGuardado = localStorage.getItem("logoCoche");
    const logoSidebar = document.getElementById("logoSidebar");
    if (logoGuardado && logoSidebar) {
        logoSidebar.src = logoGuardado;
    }

    // 2. Dibujar las mesas
    renderizarMesas();
});

// Datos de las mesas de COCHÉ
const mesasCoche = [
    { id: 1, numero: "Mesa 1", estado: "libre" },
    { id: 2, numero: "Mesa 2", estado: "ocupada" },
    { id: 3, numero: "Mesa 3", estado: "libre" },
    { id: 4, numero: "Mesa 4", estado: "libre" },
    { id: 5, numero: "Mesa 5", estado: "ocupada" },
    { id: 6, numero: "Mesa 6", estado: "libre" },
    { id: 7, numero: "Mesa 7", estado: "libre" },
    { id: 8, numero: "Mesa 8", estado: "libre" }
];

function renderizarMesas() {
    const grid = document.getElementById("gridMesas");
    if (!grid) return;

    grid.innerHTML = ""; // Limpiar panel

    mesasCoche.forEach(mesa => {
        const mesaDiv = document.createElement("div");
        // Agregamos la clase mesa-item y el estado (libre/ocupada) para el CSS
        mesaDiv.classList.add("mesa-item", mesa.estado);
        
        mesaDiv.innerHTML = `
            <div class="mesa-icon">
                <i class="fa-solid fa-utensils"></i>
            </div>
            <div class="mesa-info">
                <h3>${mesa.numero}</h3>
                <span>${mesa.estado === 'libre' ? 'Disponible' : 'Ocupada'}</span>
            </div>
        `;

        // Al hacer clic, ejecutamos la lógica de SweetAlert
        mesaDiv.onclick = () => manejarClickMesa(mesa);

        grid.appendChild(mesaDiv);
    });
}

function manejarClickMesa(mesa) {
    if (mesa.estado === "libre") {
        // VENTANA PARA MESA LIBRE
        Swal.fire({
            title: `¿Abrir ${mesa.numero}?`,
            text: "Se iniciará una nueva comanda para esta mesa.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4b2c20', // Café COCHÉ
            cancelButtonColor: '#d33',
            confirmButtonText: '<i class="fa-solid fa-check"></i> Abrir Mesa',
            cancelButtonText: 'Cancelar',
            background: '#fdf5e6', // Hueso COCHÉ
            color: '#4b2c20'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigimos pasando el ID de la mesa por la URL
                window.location.href = `pedidos_usuarios.html?mesa=${mesa.id}`;
            }
        });
    } else {
        // VENTANA PARA MESA OCUPADA
        Swal.fire({
            title: `Detalle de ${mesa.numero}`,
            text: "La mesa está en consumo. ¿Deseas ver o editar el pedido?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4b2c20',
            cancelButtonColor: '#7f8c8d',
            confirmButtonText: '<i class="fa-solid fa-eye"></i> Ver Pedido',
            cancelButtonText: 'Cerrar',
            background: '#fdf5e6',
            color: '#4b2c20'
        }).then((result) => {
            if (result.isConfirmed) {
                // También redirigimos a la toma de pedidos para ver lo que ya pidió
                window.location.href = `pedidos_usuarios.html?mesa=${mesa.id}`;
            }
        });
    }
    // Busca donde manejas el click de la mesa ocupada y pega esto:
Swal.fire({
    title: `Mesa ${mesa.id}`,
    text: "Abriendo el panel de pedidos...",
    icon: 'info',
    iconColor: '#4b2c20',
    showConfirmButton: false,
    timer: 1500, // Se cierra solo en segundo y medio
    background: '#fdf5e6', // Fondo color hueso de COCHÉ
    color: '#4b2c20', // Letras color café
    backdrop: `rgba(75, 44, 32, 0.3)` // Oscurece el fondo con un tono café suave
}).then(() => {
    // Cuando se cierra el aviso, entramos a pedidos
    window.location.href = `pedidos_usuarios.html?mesa=${mesa.id}`;
});
}