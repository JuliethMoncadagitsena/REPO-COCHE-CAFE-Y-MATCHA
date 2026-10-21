package com.coche.Entidades;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ventas")
public class VentasEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idVENTAS")
    private Integer idVENTAS;

    @Column(name = "FECHA", nullable = false)
    private LocalDateTime FECHA;

    @Column(name = "TOTAL", nullable = false)
    private Double TOTAL;

    @Column(name = "USUARIOS_idUSUARIOS", nullable = false)
    private Integer USUARIOS_idUSUARIOS;

    public Integer getIdVENTAS() {
        return idVENTAS;
    }

    public void setIdVENTAS(Integer idVENTAS) {
        this.idVENTAS = idVENTAS;
    }

    public LocalDateTime getFECHA() {
        return FECHA;
    }

    public void setFECHA(LocalDateTime fECHA) {
        FECHA = fECHA;
    }

    public Double getTOTAL() {
        return TOTAL;
    }

    public void setTOTAL(Double tOTAL) {
        TOTAL = tOTAL;
    }

    public Integer getUSUARIOS_idUSUARIOS() {
        return USUARIOS_idUSUARIOS;
    }

    public void setUSUARIOS_idUSUARIOS(Integer uSUARIOS_idUSUARIOS) {
        USUARIOS_idUSUARIOS = uSUARIOS_idUSUARIOS;
    }
    
}
