package com.coche.Controladores;

import com.coche.Entidades.NotificacionesEntity;
import com.coche.Repositorios.NotificacionesRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notificaciones")
@CrossOrigin(origins = "*")
public class NotificacionesController {

    @Autowired
    private NotificacionesRepositorio repositorio;

    @GetMapping
    public ResponseEntity<List<NotificacionesEntity>> obtenerTodas() {
        return ResponseEntity.ok(repositorio.findAll());
    }

    @PostMapping
    public ResponseEntity<NotificacionesEntity> crearSolicitud(@RequestBody NotificacionesEntity entidad) {
        NotificacionesEntity guardada = repositorio.save(entidad);
        return ResponseEntity.ok(guardada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEstadoNotificacion(@PathVariable Integer id, @RequestBody NotificacionesEntity datosActualizados) {
        try {
            Optional<NotificacionesEntity> notificacionOpt = repositorio.findById(id);

            if (notificacionOpt.isPresent()) {
                NotificacionesEntity notificacion = notificacionOpt.get();
                notificacion.setEstado(datosActualizados.getEstado());
                
                NotificacionesEntity guardada = repositorio.save(notificacion);
                return ResponseEntity.ok(guardada);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al actualizar: " + e.getMessage());
        }
    }
}