document.addEventListener("DOMContentLoaded", function() {
    /* === 1. SEGURIDAD: VERIFICAR LOGIN === */
    const nombreLogueado = localStorage.getItem("nombreUsuario");
    
    if (!nombreLogueado) {
        // Si no hay sesión, rebota al login
        window.location.replace("../Login.html"); 
        return;
    }

    /* === 2. APARIENCIA DEL USUARIO (Nombre y Avatar) === */
    const displayNombre = document.getElementById("usuario");
    const displayAvatar = document.getElementById("user-avatar");

    if (displayNombre) displayNombre.innerText = nombreLogueado;

    if (displayAvatar) {
        const nombreLimpio = nombreLogueado.trim().replace(/\s+/g, '+');
        displayAvatar.src = `https://ui-avatars.com/api/?name=${nombreLimpio}&background=4b2c20&color=fff`;
    }

    /* === 3. PERSISTENCIA DEL LOGO DE COCHÉ === */
    const logoGuardado = localStorage.getItem("logoCoche");
    const logoSidebar = document.getElementById("logoSidebar");

    if (logoGuardado && logoSidebar) {
        logoSidebar.src = logoGuardado;
    }

    /* === 4. SINCRONIZACIÓN DE CIERRE DE SESIÓN === */
    window.addEventListener('storage', (event) => {
        if (event.key === 'nombreUsuario' && !event.newValue) {
            window.location.replace("../Login.html");
        }
    });
});

/* === 5. FUNCIÓN DE SALIDA (Para el botón Cerrar Sesión) === */
function confirmarCierreSesion() {
    Swal.fire({
        title: '¿Cerrar Sesión?',
        text: "¡Esperamos verte pronto en COCHÉ CAFÉ!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4b2c20',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar',
        background: '#fdf5e6',
        color: '#4b2c20'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("nombreUsuario");
            // Nota: Usa una ruta relativa para que funcione en cualquier PC
            window.location.href = "../Login.html"; 
        }
    });
}
