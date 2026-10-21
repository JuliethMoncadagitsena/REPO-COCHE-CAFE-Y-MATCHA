package com.coche.Entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "detalle_venta")
public class DetalleVentasEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDETALLE_VENTA")
    private Integer idDETALLE_VENTA;

    @Column(name = "VENTAS_idVENTAS", nullable = false)
    private Integer VENTAS_idVENTAS;

    @Column(name = "VENTAS_USUARIOS_idUSUARIOS", nullable = false)
    private Integer VENTAS_USUARIOS_idUSUARIOS;

    @Column(name = "PRODUCTOS_idPRODUCTOS", nullable = false)
    private Integer PRODUCTOS_idPRODUCTOS;

    @Column(name = "PRODUCTOS_CATEGORIAS_idCATEGORIA", nullable = false)
    private Integer PRODUCTOS_CATEGORIAS_idCATEGORIA;

    @Column(name = "CANTIDAD", nullable = false)
    private Integer CANTIDAD;

    @Column(name = "PRECIO_UNITARIO", nullable = false)
    private Double PRECIO_UNITARIO;

    public Integer getIdDETALLE_VENTA() {
        return idDETALLE_VENTA;
    }

    public void setIdDETALLE_VENTA(Integer idDETALLE_VENTA) {
        this.idDETALLE_VENTA = idDETALLE_VENTA;
    }

    public Integer getVENTAS_idVENTAS() {
        return VENTAS_idVENTAS;
    }

    public void setVENTAS_idVENTAS(Integer vENTAS_idVENTAS) {
        VENTAS_idVENTAS = vENTAS_idVENTAS;
    }

    public Integer getVENTAS_USUARIOS_idUSUARIOS() {
        return VENTAS_USUARIOS_idUSUARIOS;
    }

    public void setVENTAS_USUARIOS_idUSUARIOS(Integer vENTAS_USUARIOS_idUSUARIOS) {
        VENTAS_USUARIOS_idUSUARIOS = vENTAS_USUARIOS_idUSUARIOS;
    }

    public Integer getPRODUCTOS_idPRODUCTOS() {
        return PRODUCTOS_idPRODUCTOS;
    }

    public void setPRODUCTOS_idPRODUCTOS(Integer pRODUCTOS_idPRODUCTOS) {
        PRODUCTOS_idPRODUCTOS = pRODUCTOS_idPRODUCTOS;
    }

    public Integer getPRODUCTOS_CATEGORIAS_idCATEGORIA() {
        return PRODUCTOS_CATEGORIAS_idCATEGORIA;
    }

    public void setPRODUCTOS_CATEGORIAS_idCATEGORIA(Integer pRODUCTOS_CATEGORIAS_idCATEGORIA) {
        PRODUCTOS_CATEGORIAS_idCATEGORIA = pRODUCTOS_CATEGORIAS_idCATEGORIA;
    }

    public Integer getCANTIDAD() {
        return CANTIDAD;
    }

    public void setCANTIDAD(Integer cANTIDAD) {
        CANTIDAD = cANTIDAD;
    }

    public Double getPRECIO_UNITARIO() {
        return PRECIO_UNITARIO;
    }

    public void setPRECIO_UNITARIO(Double pRECIO_UNITARIO) {
        PRECIO_UNITARIO = pRECIO_UNITARIO;
    }
    }
