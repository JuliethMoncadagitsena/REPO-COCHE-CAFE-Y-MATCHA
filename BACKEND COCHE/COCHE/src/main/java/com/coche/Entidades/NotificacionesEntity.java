package com.coche.Entidades;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notificaciones")
public class NotificacionesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idNOTIFICACION;

    private String usuario;
    private String mensaje;
    private LocalDateTime fecha;
    private String estado;
    public Integer getIdNOTIFICACION() {
        return idNOTIFICACION;
    }
    public void setIdNOTIFICACION(Integer idNOTIFICACION) {
        this.idNOTIFICACION = idNOTIFICACION;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getMensaje() {
        return mensaje;
    }
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
}