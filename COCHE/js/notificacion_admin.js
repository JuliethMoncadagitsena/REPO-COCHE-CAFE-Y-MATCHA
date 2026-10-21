/* ======================================================== */
/* GESTIÓN DE NOTIFICACIONES Y SOLICITUDES - COCHÉ CAFÉ    */
/* ======================================================== */

// URL base del endpoint de notificaciones conectado al backend de Spring Boot
const API_NOTIFICACIONES = "http://localhost:8080/api/notificaciones";

/**
 * NOTA: Función encargada de consultar la base de datos a través de la API REST,
 * filtrar únicamente las solicitudes que estén pendientes y renderizarlas en el HTML.
 */
function cargarNotificacionesAdmin() {
    const contenedor = document.getElementById("listaNotificaciones");
    if (!contenedor) return; 
    
    contenedor.innerHTML = ""; // Limpia el contenido previo antes de pintar

    fetch(API_NOTIFICACIONES)
        .then(response => response.json())
        .then(notificaciones => {
            // Filtrar del listado general las solicitudes pendientes (incluyendo si el estado es null o vacío)
            const pendientes = notificaciones.filter(n => !n.estado || n.estado.toLowerCase() === "pendiente");

            // Si no hay solicitudes pendientes, muestra un mensaje de éxito en el panel
            if (pendientes.length === 0) {
                contenedor.innerHTML = "<p style='color: #2e7d32; font-weight: bold;'>✅ No hay solicitudes pendientes de contraseña.</p>";
                return;
            }

            // Construcción dinámica del diseño HTML para cada notificación pendiente
            let htmlContent = "";
            pendientes.forEach(notif => {
                // Formatea la fecha obtenida de la base de datos de manera legible
                const fechaFormateada = notif.fecha ? new Date(notif.fecha).toLocaleString() : "Fecha no registrada";
                
                // Obtener el ID de la notificación de manera segura
                const idNotif = notif.idNOTIFICACION || notif.id;

                htmlContent += `
                    <div style="background: #fff8f6; border-left: 5px solid #5c3d2e; padding: 12px 15px; margin-bottom: 10px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <strong>Usuario:</strong> ${notif.usuario} <br>
                            <small style="color: #777;">📅 ${fechaFormateada}</small>
                            <p style="margin: 5px 0 0 0; color: #333;">${notif.mensaje}</p>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <!-- Botón 1: Despliega la alerta limpia para ir al listado -->
                            <button onclick="atenderSolicitud('${notif.usuario}')" 
                                    style="background-color: #5c3d2e; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;">
                                Restablecer Clave
                            </button>
                            <!-- Botón 2: Lanza la alerta con solo completar tarea o cancelar -->
                            <button onclick="confirmarHecho('${idNotif}')" 
                                    style="background-color: #2e7d32; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;">
                                <i class="fa-solid fa-check"></i> Hecho
                            </button>
                        </div>
                    </div>
                `;
            });

            // Inserta el contenido generado dentro del contenedor HTML principal
            contenedor.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error al obtener notificaciones:", error);
            contenedor.innerHTML = "<p style='color: #c62828;'>⚠️ No se pudieron cargar las notificaciones. Verifica que el backend esté activo.</p>";
        });
}

/**
 * NOTA: Al hacer clic en "Restablecer Clave", despliega la alerta SweetAlert2 
 * únicamente con la opción de ir a listar o cancelar.
 */
function atenderSolicitud(usuario) {
    Swal.fire({
        title: 'Atender Solicitud',
        text: `¿Deseas ir al listado de usuarios para cambiar la clave de '${usuario}'?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Solo ir a Listar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#5c3d2e',
        cancelButtonColor: '#777',
        background: '#fdf5e6',
        color: '#4b2c20'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `Usuarios/Listar.html?buscar=${encodeURIComponent(usuario)}`;
        }
    });
}

/**
 * NOTA: Al hacer clic en "Hecho", despliega la alerta de confirmación 
 * únicamente con las opciones "Sí, completé la tarea" y "Cancelar".
 */
function confirmarHecho(id) {
    Swal.fire({
        title: 'Confirmar Tarea',
        text: '¿Deseas continuar si ya completaste la tarea?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, completé la tarea',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#2e7d32',
        cancelButtonColor: '#777',
        background: '#fdf5e6',
        color: '#4b2c20'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si elige "Sí, completé la tarea", ejecuta la petición PUT y borra la tarjeta
            marcarComoAtendida(id);
        }
    });
}

/**
 * NOTA: Ejecuta la petición PUT al backend para actualizar el estado a "Atendido" 
 * y recarga la interfaz para eliminar la tarjeta de la vista al instante.
 */
function marcarComoAtendida(id) {
    fetch(`${API_NOTIFICACIONES}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: "Atendido" })
    })
    .then(async response => {
        if (response.ok) {
            cargarNotificacionesAdmin(); // Refresca la lista y borra la tarjeta al instante
        } else {
            const errorTexto = await response.text();
            console.error("Error del servidor:", errorTexto);
            Swal.fire('Error', 'No se pudo actualizar la solicitud en el servidor.', 'error');
        }
    })
    .catch(error => {
        console.error("Error de conexión:", error);
        Swal.fire('Error', 'Fallo de comunicación con el servidor.', 'error');
    });
}

// Evento que ejecuta la carga de notificaciones automáticamente al abrir la página
document.addEventListener("DOMContentLoaded", cargarNotificacionesAdmin);