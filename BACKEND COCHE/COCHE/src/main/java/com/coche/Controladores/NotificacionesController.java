package com.coche.Controladores;

import com.coche.Entidades.NotificacionesEntity;
import com.coche.Servicios.NotificacionesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notificaciones")
@CrossOrigin(origins = "*") // Vital para evitar bloqueos con JavaScript
public class NotificacionesController {

    @Autowired
    private NotificacionesServices servicio;

    // Endpoint para listar todas las notificaciones (Usado en el Panel Admin)
    @GetMapping
    public ResponseEntity<List<NotificacionesEntity>> obtenerTodas() {
        return ResponseEntity.ok(servicio.getAll());
    }

    // Endpoint para guardar la solicitud de clave (Usado en el Login)
    @PostMapping("/solicitud-clave")
    public ResponseEntity<NotificacionesEntity> crearSolicitud(@RequestBody NotificacionesEntity entidad) {
        NotificacionesEntity guardada = servicio.save(entidad);
        return ResponseEntity.ok(guardada);
    }

    // Endpoint para marcar como atendida o actualizar estado (Usado en el Admin con el botón Hecho)
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEstadoNotificacion(@PathVariable Integer id, @RequestBody NotificacionesEntity datosActualizados) {
        try {
            // Buscamos directamente con el repositorio o servicio
            List<NotificacionesEntity> todas = servicio.getAll();
            Optional<NotificacionesEntity> notificacionOpt = todas.stream()
                .filter(n -> n.getIdNOTIFICACION().equals(id))
                .findFirst();

            if (notificacionOpt.isPresent()) {
                NotificacionesEntity notificacion = notificacionOpt.get();
                notificacion.setEstado(datosActualizados.getEstado());
                NotificacionesEntity guardada = servicio.save(notificacion);
                return ResponseEntity.ok(guardada);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al actualizar: " + e.getMessage());
        }
    }
}