package com.coche.Entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class ProductosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPRODUCTOS")
    private Integer idPRODUCTOS;

    @Column(name = "NOMBRE", nullable = false, length = 45)
    private String NOMBRE;

    @Column(name = "PRECIO", nullable = false)
    private Double PRECIO;

    @Column(name = "STOCK", nullable = false)
    private Integer STOCK;

    @Column(name = "CATEGORIAS_idCATEGORIA", nullable = false)
    private Integer CATEGORIAS_idCATEGORIA;

    public Integer getIdPRODUCTOS() {
        return idPRODUCTOS;
    }

    public void setIdPRODUCTOS(Integer idPRODUCTOS) {
        this.idPRODUCTOS = idPRODUCTOS;
    }

    public String getNOMBRE() {
        return NOMBRE;
    }

    public void setNOMBRE(String nOMBRE) {
        NOMBRE = nOMBRE;
    }

    public Double getPRECIO() {
        return PRECIO;
    }

    public void setPRECIO(Double pRECIO) {
        PRECIO = pRECIO;
    }

    public Integer getSTOCK() {
        return STOCK;
    }

    public void setSTOCK(Integer sTOCK) {
        STOCK = sTOCK;
    }

    public Integer getCATEGORIAS_idCATEGORIA() {
        return CATEGORIAS_idCATEGORIA;
    }

    public void setCATEGORIAS_idCATEGORIA(Integer cATEGORIAS_idCATEGORIA) {
        CATEGORIAS_idCATEGORIA = cATEGORIAS_idCATEGORIA;
    }
    }