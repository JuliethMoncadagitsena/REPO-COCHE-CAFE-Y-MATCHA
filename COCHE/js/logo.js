document.addEventListener("DOMContentLoaded", function() {
    // 1. Intentar traer el logo guardado
    const logoGuardado = localStorage.getItem("logoCoche");
    const logoSidebar = document.getElementById("logoSidebar");

    // 2. Si existe un logo en memoria, ponerlo en el sidebar
    if (logoGuardado && logoSidebar) {
        logoSidebar.src = logoGuardado;
    }
});