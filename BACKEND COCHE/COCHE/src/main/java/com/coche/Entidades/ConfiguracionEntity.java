package com.coche.Entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "configuracion")
public class ConfiguracionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCONFIGURACION")
    private Integer idCONFIGURACION;

    @Column(name = "NIT", length = 20)
    private String NIT;

    @Column(name = "NOMBRE_COMERCIAL", length = 45)
    private String NOMBRE_COMERCIAL;

    @Column(name = "DIRECCION", length = 45)
    private String DIRECCION;

    @Column(name = "TELEFONO", length = 15)
    private String TELEFONO;

    @Column(name = "CORREO", length = 45)
    private String CORREO;

    @Column(name = "LOGO", length = 200)
    private String LOGO;

    @Column(name = "MENSAJE_FACTURA", length = 300)
    private String MENSAJE_FACTURA;

// --- Métodos Getters y Stters
    public Integer getIdCONFIGURACION() {
        return idCONFIGURACION;
    }

    public void setIdCONFIGURACION(Integer idCONFIGURACION) {
        this.idCONFIGURACION = idCONFIGURACION;
    }

    public String getNIT() {
        return NIT;
    }

    public void setNIT(String nIT) {
        NIT = nIT;
    }

    public String getNOMBRE_COMERCIAL() {
        return NOMBRE_COMERCIAL;
    }

    public void setNOMBRE_COMERCIAL(String nOMBRE_COMERCIAL) {
        NOMBRE_COMERCIAL = nOMBRE_COMERCIAL;
    }

    public String getDIRECCION() {
        return DIRECCION;
    }

    public void setDIRECCION(String dIRECCION) {
        DIRECCION = dIRECCION;
    }

    public String getTELEFONO() {
        return TELEFONO;
    }

    public void setTELEFONO(String tELEFONO) {
        TELEFONO = tELEFONO;
    }

    public String getCORREO() {
        return CORREO;
    }

    public void setCORREO(String cORREO) {
        CORREO = cORREO;
    }

    public String getLOGO() {
        return LOGO;
    }

    public void setLOGO(String lOGO) {
        LOGO = lOGO;
    }

    public String getMENSAJE_FACTURA() {
        return MENSAJE_FACTURA;
    }

    public void setMENSAJE_FACTURA(String mENSAJE_FACTURA) {
        MENSAJE_FACTURA = mENSAJE_FACTURA;
    }

    
}
