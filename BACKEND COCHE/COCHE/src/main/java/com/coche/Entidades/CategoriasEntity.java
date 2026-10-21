package com.coche.Entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Le indica a Spring que esta clase se vincula con la tabla "categorias" de MySQL
@Entity
@Table(name = "categorias")
public class CategoriasEntity {

    // Marca la llave primaria autoincrementable 'idCATEGORIA'
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCATEGORIA")
    private Integer idCATEGORIA;

    // Mapea la columna 'NOMBRE' (máximo 45 caracteres)
    @Column(name = "NOMBRE", nullable = false, length = 45)
    private String NOMBRE;

    public Integer getIdCATEGORIA() {
        return idCATEGORIA;
    }

    public void setIdCATEGORIA(Integer idCATEGORIA) {
        this.idCATEGORIA = idCATEGORIA;
    }

    public String getNOMBRE() {
        return NOMBRE;
    }

    public void setNOMBRE(String nOMBRE) {
        NOMBRE = nOMBRE;
    }
    
 }