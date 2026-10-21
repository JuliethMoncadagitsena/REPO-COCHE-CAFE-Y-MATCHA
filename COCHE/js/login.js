// Prevención de navegación hacia atrás en el historial del navegador
window.history.pushState(null, null, window.location.href);            // Inserta un estado nulo en el historial del navegador
window.onpopstate = function () {                                       // Detecta cuándo el usuario intenta presionar el botón "Atrás"
    window.history.go(1);                                               // Fuerza al navegador a avanzar, bloqueando el retorno tras cerrar sesión
};

// URL base del endpoint de usuarios en Spring Boot
const API_URL = "http://localhost:8080/api/usuarios";                  // Dirección del controlador de la API REST en el Backend

function validar() {
    // 1. Captura de datos ingresados en los inputs según los IDs del HTML
    const user = document.getElementById("usuario").value.trim();      // Captura el valor del campo usuario removiendo espacios extras
    const pass = document.getElementById("password").value.trim();     // Captura la contraseña digitada
    const toast = document.getElementById("toast");                    // Referencia al contenedor de notificaciones del HTML

    // 2. Función encargada de mostrar el mensaje flotante (Toast)
    function mostrarMensaje(texto) {
        toast.innerHTML = texto;                                       // Asigna el texto a mostrar dentro del toast
        toast.className = "toast show";                                // Agrega la clase CSS que hace visible la animación del mensaje
        setTimeout(() => { 
            toast.className = toast.className.replace("show", "");     // Oculta el mensaje transcurridos 3 segundos
        }, 3000);
    }

    // Validación de campos vacíos antes de realizar la petición HTTP
    if (!user || !pass) {
        mostrarMensaje("⚠️ Por favor ingresa usuario y contraseña");
        return;
    }

    // 3. CONSULTA DINÁMICA A LA BASE DE DATOS (SPRING BOOT + MYSQL)
    fetch(API_URL)                                                     // Realiza petición GET hacia la API de usuarios
        .then(response => response.json())                             // Convierte la respuesta recibida en un arreglo JSON
        .then(usuarios => {                                            // Recibe el listado de usuarios existentes en MySQL
            
            // Busca si existe un usuario ignorando mayúsculas/minúsculas
            const usuarioEncontrado = usuarios.find(u => {
                const nombreBD = (u.nombre_USUARIO || u.NOMBRE_USUARIO || u.nombre_usuario || "").toString().trim().toLowerCase();
                const passBD = (u.password || u.PASSWORD || "").toString().trim();

                return nombreBD === user.trim().toLowerCase() && passBD === pass.trim();
           });

            if (usuarioEncontrado) {
                // Captura las propiedades del usuario autenticado
                const rol = (usuarioEncontrado.rol || usuarioEncontrado.ROL || "Usuario").toLowerCase(); // Normaliza el rol a minúsculas
                const nombre = usuarioEncontrado.nombre_USUARIO || usuarioEncontrado.NOMBRE_USUARIO;     // Nombre del usuario

                // Almacenamiento de variables de sesión en la memoria local del navegador
                localStorage.setItem("nombreUsuario", nombre);         // Almacena el nombre para generar el avatar dinámico
                localStorage.setItem("rolUsuario", rol);               // Almacena el rol para control de accesos

                // Redirección condicionada según el rol configurado en MySQL
                if (rol === "administrador") {
                    mostrarMensaje("✅ ¡Bienvenid@! Entrando como Admin..."); // Muestra Toast de éxito para Administrador
                    setTimeout(() => {
                        window.location.href = "html/index_admin.html";    // Redirige al panel principal del Administrador
                    }, 2000);
                } else {
                    mostrarMensaje("✅ Acceso concedido: Rol Usuario");    // Muestra Toast de éxito para el rol Usuario
                    setTimeout(() => {
                        window.location.href = "html/index_usuarios.html";  // Redirige a la vista correspondiente
                    }, 2000);
                }

            } else {
                // Si el usuario o la contraseña no existen en la base de datos
                mostrarMensaje("❌ Usuario o contraseña incorrectos");
            }
        })
        .catch(error => {
            console.error("Error en la conexión:", error);             // Imprime el detalle del error en la consola del navegador
            mostrarMensaje("❌ Error de conexión con el servidor");    // Notifica si Spring Boot no está disponible
        });
}


// Función para gestionar la recuperación de contraseña notificando al administrador (CORREGIDA)
function recuperarContrasena(event) {
    event.preventDefault(); // Evita que la página se recargue por defecto

    Swal.fire({
        title: 'Notificar al Administrador',
        text: 'Ingresa tu usuario o correo electrónico registrado para solicitar el restablecimiento de contraseña:',
        input: 'text',
        inputPlaceholder: 'Ejemplo: erika_admin o correo@ejemplo.com',
        showCancelButton: true,
        confirmButtonText: 'Enviar solicitud',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#5c3d2e', // Tono café corporativo de COCHÉ
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar tu usuario o correo!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const usuarioSolicitante = result.value;

            // Petición al Back-End (Spring Boot) para guardar la notificación al admin
            fetch('http://localhost:8080/api/notificaciones/solicitud-clave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuarioSolicitante,
                    mensaje: `El usuario '${usuarioSolicitante}' ha solicitado un restablecimiento de contraseña.`,
                    fecha: new Date().toISOString(),
                    estado: "Pendiente" // <--- Esto es clave para que no se guarde en NULL
            })
            
            })
            .then(response => {
                // Valida si el servidor respondió con un código de éxito (200-299)
                if (!response.ok) {
                    throw new Error("El servidor respondió con un error: " + response.status);
                }
                return response.text().then(text => text ? JSON.parse(text) : {}); // Maneja respuestas JSON vacías o con texto
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Solicitud enviada',
                    text: 'Se ha enviado una notificación al Administrador para restablecer tu contraseña.',
                    confirmButtonColor: '#5c3d2e'
                });
            })
            .catch(error => {
                console.error("Error al enviar la solicitud:", error);
                // Si ocurre un error de red o Spring Boot devuelve error, muestra alerta de fallo
                Swal.fire({
                    icon: 'error',
                    title: 'Error de envío',
                    text: 'No se pudo conectar con el servidor de Spring Boot para notificar al Administrador.',
                    confirmButtonColor: '#5c3d2e'
                });
            });
        }
    });
}