package com.coche.Servicios;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.coche.Entidades.NotificacionesEntity;
import com.coche.Repositorios.NotificacionesRepositorio;

@Service
public class NotificacionesServices {

    @Autowired
    private NotificacionesRepositorio repositorio;

    public List<NotificacionesEntity> getAll() {
        return repositorio.findAll();
    }

    public NotificacionesEntity save(NotificacionesEntity entity) {
        if (entity.getEstado() == null || entity.getEstado().isEmpty()) {
            entity.setEstado("Pendiente");
        }
        return repositorio.save(entity);
    }
}