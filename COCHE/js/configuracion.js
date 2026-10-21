// --- 1. CARGA INICIAL: SE EJECUTA AL ABRIR LA PÁGINA ---
document.addEventListener("DOMContentLoaded", function() {
    // A. Traer datos de texto guardados
    const infoGuardada = JSON.parse(localStorage.getItem("infoCoche"));
    
    if (infoGuardada) {
        // Rellenamos los inputs con lo que está en memoria
        document.getElementById("nombreEmpresa").value = infoGuardada.nombre || "";
        document.getElementById("nitEmpresa").value = infoGuardada.nit || "";
        document.getElementById("telEmpresa").value = infoGuardada.tel || "";
        document.getElementById("ciudadEmpresa").value = infoGuardada.ciudad || "";
        document.getElementById("dirEmpresa").value = infoGuardada.dir || "";
    }

    // B. Traer el logo guardado
    const logoGuardado = localStorage.getItem("logoCoche");
    const logoSidebar = document.getElementById("logoSidebar");
    const logoPreview = document.getElementById("logoPreview");

    if (logoGuardado) {
        if (logoSidebar) logoSidebar.src = logoGuardado;
        if (logoPreview) {
            logoPreview.src = logoGuardado;
            logoPreview.style.display = "block"; 
        }
    }

    // C. Carga del avatar de usuario (SENA)
    const nombreUser = localStorage.getItem("nombreUsuario");
    const avatarImg = document.getElementById("user-avatar");
    if (avatarImg && nombreUser) {
        avatarImg.src = `https://ui-avatars.com/api/?name=${nombreUser.replace(/\s+/g, '+')}&background=4b2c20&color=fff`;
    }
});

// --- 2. PREVISUALIZACIÓN: CUANDO ELIGES UN ARCHIVO ---
function previsualizarLogo(input) {
    const preview = document.getElementById('logoPreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// --- 3. GUARDADO: CUANDO DAS CLIC AL BOTÓN ---
function guardarCambios() {
    const datosEmpresa = {
        nombre: document.getElementById("nombreEmpresa").value.trim(),
        nit: document.getElementById("nitEmpresa").value.trim(),
        tel: document.getElementById("telEmpresa").value.trim(),
        ciudad: document.getElementById("ciudadEmpresa").value.trim(),
        dir: document.getElementById("dirEmpresa").value.trim(),
        logo: document.getElementById("logoPreview").src 
    };

    if (!datosEmpresa.nombre || !datosEmpresa.nit) {
        Swal.fire('Error', 'El nombre y el NIT son obligatorios', 'error');
        return;
    }

    // GUARDAMOS CON NOMBRE CLAVE "infoCoche"
    localStorage.setItem("infoCoche", JSON.stringify(datosEmpresa));
    localStorage.setItem("logoCoche", datosEmpresa.logo);

    Swal.fire({
        title: '¡Guardado!',
        text: 'Los datos de COCHÉ se actualizaron correctamente.',
        icon: 'success',
        confirmButtonColor: '#4b2c20'
    });
}