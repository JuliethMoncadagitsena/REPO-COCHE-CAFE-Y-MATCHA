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
        return repositorio.save(entity);
    }

    public Object getById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }
}