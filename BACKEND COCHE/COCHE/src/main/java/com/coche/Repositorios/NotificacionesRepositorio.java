package com.coche.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.coche.Entidades.NotificacionesEntity;

@Repository
public interface NotificacionesRepositorio extends JpaRepository<NotificacionesEntity, Integer> {
}