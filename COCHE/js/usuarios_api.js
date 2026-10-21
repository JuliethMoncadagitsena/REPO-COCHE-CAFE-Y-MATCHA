//Ruta base de la API REST en Spring Boot para realizar peticiones HTTP
const API_URL = "http://localhost:8080/api/usuarios";

// Evento que se ejecuta automáticamente cuando el HTML ha terminado de cargar su estructura
document.addEventListener("DOMContentLoaded", () => {
    // Si la página tiene el elemento tbodyUsuarios (listar.html), llama a la función de listar
    if (document.getElementById("tbodyUsuarios")) {
        listarUsuarios();
    }
    // Si la página tiene el formulario formEditarUsuario (editar.html), carga los datos del registro a editar
    if (document.getElementById("formEditarUsuario")) {
        cargarDatosEdicion();
    }
    // Ejecuta la función de seguridad y generación del avatar del usuario
    inicializarSeguridadYAvatar();
});

// 1. FUNCIÓN PARA CONSULTAR Y LISTAR TODOS LOS USUARIOS (GET)
function listarUsuarios() {
    fetch(API_URL)                                      // Realiza la petición GET al Backend
        .then(response => response.json())              // Convierte la respuesta recibida en un objeto/arreglo JSON
        .then(data => {                                 // Recibe la lista de usuarios devuelta por MySQL
            const tbody = document.getElementById("tbodyUsuarios"); // Obtiene el elemento tbody de la tabla
            tbody.innerHTML = "";                       // Limpia el contenido previo de la tabla
            
            data.forEach(user => {                      // Iterador que recorre cada usuario obtenido de la BD
                const id = user.idUSUARIOS;             // Captura el valor del atributo idUSUARIOS
                const nombre = user.nombre_USUARIO || user.NOMBRE_USUARIO || "Sin Nombre"; // Captura el nombre mapeado
                const rol = user.rol || user.ROL || "Usuario"; // Captura el rol mapeado del usuario
                const pass = user.password || user.PASSWORD || "******"; // Captura la contraseña

                // Inserta dinámicamente la fila HTML con clases específicas en ID, Nombre y Rol para la búsqueda,
                // y el campo de contraseña con botón de ojo para alternar su visibilidad
                tbody.innerHTML += `
                    <tr>
                        <td class="col-id"><strong>${id}</strong></td>
                        <td class="col-nombre">${nombre}</td>
                        <td class="col-rol"><span class="role-badge ${rol.toLowerCase() === 'administrador' ? 'role-admin' : ''}">${rol}</span></td>
                        
                        <!-- NOTA: Columna para consultar contraseña con botón de ojo -->
                        <td>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <input 
                                    type="password" 
                                    value="${pass}" 
                                    readonly 
                                    class="input-pass" 
                                    style="border: none; background: transparent; width: 90px; font-size: 14px; outline: none;"
                                >
                                <button 
                                    type="button" 
                                    onclick="togglePassword(this)" 
                                    style="border: none; background: transparent; cursor: pointer; color: #666;"
                                    title="Mostrar/Ocultar Contraseña"
                                >
                                    <i class="fa-solid fa-eye-slash"></i>
                                </button>
                            </div>
                        </td>

                        <td class="actions">
                            <a href="editar.html?id=${id}" style="color:#4b2c20; margin-right: 15px;" title="Editar"><i class="fa-solid fa-pen-to-square"></i></a>
                            <a href="javascript:void(0)" onclick="confirmarEliminar(${id})" style="color:#d33;" title="Eliminar"><i class="fa-solid fa-trash"></i></a>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error al conectar con la API de usuarios:", error)); // Muestra en consola si hay error de red
}

// 2. FUNCIÓN PARA MOSTRAR Y OCULTAR LA CONTRASEÑA (OJITO)
function togglePassword(btn) {
    // 1. Localiza el contenedor padre (el div que agrupa el input y el botón)
    const contenedor = btn.parentElement;
    
    // 2. Encuentra el input de tipo clave y el elemento de ícono <i> dentro de ese contenedor
    const inputPass = contenedor.querySelector('.input-pass');
    const icono = btn.querySelector('i');

    // 3. Evalúa si está oculto (password) para mostrarlo (text) o viceversa, actualizando el icono
    if (inputPass.type === 'password') {
        inputPass.type = 'text';
        icono.classList.remove('fa-eye-slash');
        icono.classList.add('fa-eye');
    } else {
        inputPass.type = 'password';
        icono.classList.remove('fa-eye');
        icono.classList.add('fa-eye-slash');
    }
}

// 3. FUNCIÓN PARA BÚSQUEDA LOCAL EN TIEMPO REAL (MULTICRITERIO: ID, USUARIO, ROL)
function filtrarUsuarios() {
    // 1. Obtiene el valor escrito en el input del buscador, lo pasa a minúsculas y elimina espacios extras
    const input = document.getElementById("inputBuscar");
    if (!input) return;
    const texto = input.value.toLowerCase().trim();

    // 2. Obtiene todas las filas cargadas dentro del tbody
    const filas = document.querySelectorAll("#tbodyUsuarios tr");

    // 3. Recorre cada fila para evaluar si coincide con el filtro en ID, Nombre o Rol (Excluye la contraseña)
    filas.forEach(fila => {
        const id = fila.querySelector(".col-id")?.textContent.toLowerCase() || "";
        const nombre = fila.querySelector(".col-nombre")?.textContent.toLowerCase() || "";
        const rol = fila.querySelector(".col-rol")?.textContent.toLowerCase() || "";

        // Condición para saber si el texto ingresado coincide con alguna de las 3 columnas
        const coincide = id.includes(texto) || nombre.includes(texto) || rol.includes(texto);

        // Muestra u oculta la fila según la coincidencia
        if (coincide) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}

// 4. FUNCIÓN PARA REGISTRAR UN NUEVO USUARIO (POST)
function guardarUsuario() {
    // Agrupa los valores ingresados en el formulario en un objeto JSON
    const usuarioData = {
        NOMBRE_USUARIO: document.getElementById("NOMBRE_USUARIO").value, // Lee el valor del input de usuario
        PASSWORD: document.getElementById("PASSWORD").value,             // Lee la clave digitada
        ROL: document.getElementById("ROL").value                         // Lee el rol seleccionado del select
    };

    fetch(API_URL, {                                    // Realiza la petición POST enviando los datos
        method: "POST",                                 // Especifica el método de creación HTTP POST
        headers: { "Content-Type": "application/json" }, // Define las cabeceras indicando formato JSON
        body: JSON.stringify(usuarioData)               // Transforma el objeto JavaScript a texto JSON para enviarlo
    })
    .then(response => {
        if (response.ok) {                              // Evalúa si el servidor respondió con un código exitoso (200 OK)
            Swal.fire({                                 // Despliega modal de confirmación con SweetAlert2
                title: '¡Registrado!',
                text: 'Usuario guardado exitosamente.',
                icon: 'success',
                confirmButtonColor: '#4b2c20',
                background: '#fdf5e6',
                color: '#4b2c20'
            }).then(() => {
                window.location.href = "listar.html";    // Redirecciona al listado al presionar Aceptar
            });
        } else {
            alert("Error al intentar guardar el usuario."); // Alerta en caso de falla HTTP
        }
    })
    .catch(error => console.error("Error:", error));     // Captura y muestra errores de la promesa
}

// 5. FUNCIÓN PARA CARGAR Y ACTUALIZAR REGISTROS (GET POR ID Y PUT)
function cargarDatosEdicion() {
    const urlParams = new URLSearchParams(window.location.search); // Extrae los parámetros enviados en la URL
    const id = urlParams.get("id");                     // Obtiene el número de ID de la URL (ej: editar.html?id=2)

    if (id) {
        fetch(`${API_URL}/${id}`)                       // Realiza petición GET enviando el ID para traer sus datos
            .then(response => response.json())          // Convierte la respuesta del usuario en JSON
            .then(user => {                             // Llena los campos del formulario con los valores actuales
                document.getElementById("idUSUARIOS").value = user.idUSUARIOS; // Asigna ID al campo oculto
                document.getElementById("idVista").value = user.idUSUARIOS;    // Asigna ID al campo deshabilitado
                document.getElementById("NOMBRE_USUARIO").value = user.nombre_USUARIO || user.NOMBRE_USUARIO || ""; // Asigna nombre
                document.getElementById("PASSWORD").value = user.password || user.PASSWORD || "";                   // Asigna password
                document.getElementById("ROL").value = user.rol || user.ROL || "Usuario";                           // Asigna el rol
            });
    }
}

function actualizarUsuario() {
    // Agrupa los datos modificados incluyendo la clave primaria idUSUARIOS
    const usuarioData = {
        idUSUARIOS: parseInt(document.getElementById("idUSUARIOS").value), // Obtiene el ID numérico
        NOMBRE_USUARIO: document.getElementById("NOMBRE_USUARIO").value,    // Obtiene el nombre modificado
        PASSWORD: document.getElementById("PASSWORD").value,                // Obtiene la nueva clave
        ROL: document.getElementById("ROL").value                            // Obtiene el rol actualizado
    };

    fetch(API_URL, {                                    // Realiza la petición PUT para actualizar
        method: "PUT",                                  // Método HTTP PUT para modificación
        headers: { "Content-Type": "application/json" }, // Especifica envío en formato JSON
        body: JSON.stringify(usuarioData)               // Convierte objeto a formato de texto JSON
    })
    .then(response => {
        if (response.ok) {                              // Si la respuesta fue exitosa
            Swal.fire({                                 // Despliega alerta SweetAlert2 de éxito
                title: '¡Actualizado!',
                text: 'Datos actualizados en la base de datos.',
                icon: 'success',
                confirmButtonColor: '#4b2c20',
                background: '#fdf5e6',
                color: '#4b2c20'
            }).then(() => {
                window.location.href = "listar.html";    // Redirecciona nuevamente a la lista
            });
        } else {
            alert("Error al actualizar usuario.");
        }
    })
    .catch(error => console.error("Error:", error));
}

// 6. FUNCIÓN DE BÚSQUEDA VÍA BACKEND (OPCIONAL/ENDPOINT PERSONALIZADO SPRING BOOT)
function buscarUsuario() {
    const query = document.getElementById("cajaBuscar").value; // Obtiene el texto digitado en el buscador
    if (!query) return;                                         // Si la caja está vacía, no realiza la petición

    fetch(`${API_URL}/findNombres/${query}`)                    // Consume el endpoint personalizado de búsqueda en Spring Boot
        .then(response => response.json())                      // Parsea los datos a JSON
        .then(data => {
            const tbody = document.getElementById("tbodyBuscarResults"); // Obtiene el contenedor de resultados
            if (!tbody) return;
            tbody.innerHTML = "";                               // Limpia los resultados de búsquedas anteriores
            data.forEach(user => {                              // Renderiza cada registro coincidente en la tabla
                tbody.innerHTML += `
                    <tr>
                        <td><strong>${user.idUSUARIOS}</strong></td>
                        <td>${user.nombre_USUARIO || user.NOMBRE_USUARIO}</td>
                        <td>${user.rol || user.ROL}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error en la búsqueda:", error));
}

// 7. FUNCIÓN PARA ELIMINAR REGISTRO (DELETE)
function confirmarEliminar(id) {
    if (id) {
        Swal.fire({
            title: '¿Eliminar usuario?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#4b2c20',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#fdf5e6',
            color: '#4b2c20'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/${id}`, {             // Petición DELETE enviando el ID en la ruta URL
                    method: "DELETE"                    // Define el verbo de borrado HTTP DELETE
                })
                .then(response => {
                    if (response.ok) {                  // Si el Backend confirma la eliminación del registro
                        Swal.fire({                     // Despliega alerta emergente notificando borrado
                            title: '¡Eliminado!',
                            text: 'El usuario fue borrado de la base de datos.',
                            icon: 'success',
                            confirmButtonColor: '#4b2c20',
                            background: '#fdf5e6',
                            color: '#4b2c20'
                        }).then(() => {
                            listarUsuarios();           // Recarga la lista directamente sin recargar la página
                        });
                    } else {
                        alert("Error al eliminar el usuario.");
                    }
                })
                .catch(error => console.error("Error:", error));
            }
        });
    }
}

// 8. FUNCIONES COMPLEMENTARIAS PARA GESTIÓN DE SESIÓN Y AVATAR DENTRO DEL PANEL
function inicializarSeguridadYAvatar() {
    const nombre = localStorage.getItem("nombreUsuario"); // Recupera el nombre guardado en memoria durante el login
    const avatar = document.getElementById("user-avatar"); // Localiza el elemento imagen del avatar
    if (nombre && avatar) {
        const nombreLimpio = nombre.trim().replace(/\s+/g, '+'); // Prepara el formato del texto para la URL
        avatar.src = `https://ui-avatars.com/api/?name=${nombreLimpio}&background=4b2c20&color=fff`; // Genera avatar dinámico
    }
}

function confirmarCierreSesion() {
    Swal.fire({                                         // Modal para confirmar la salida del sistema
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
            localStorage.removeItem("nombreUsuario");   // Borra las credenciales guardadas en el navegador
            window.location.href = "../../Login.html";     // Redirige a la pantalla de inicio de sesión
        }
    });
    
}