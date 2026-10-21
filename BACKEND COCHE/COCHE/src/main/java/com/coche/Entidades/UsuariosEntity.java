// Indica la carpeta (paquete) donde se encuentra guardado este archivo
package com.coche.Entidades;

// Importaciones de JPA necesarias para mapear la clase Java con la base de datos MySQL
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Le indica a Spring/Hibernate que esta clase es una Entidad que representa una tabla en MySQL
@Entity
// Especifica el nombre exacto de la tabla física en tu base de datos bd_coche
@Table(name = "usuarios")
public class UsuariosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUSUARIOS")
    private Integer idUSUARIOS;

    @Column(name = "NOMBRE_USUARIO", nullable = false, length = 45)
    private String NOMBRE_USUARIO;

    //SELECT *form usuarios shere nombres LIKE  "%xxxxx%"

    @Column(name = "PASSWORD", nullable = false, length = 45)
    private String PASSWORD;

    @Column(name = "ROL", nullable = false, length = 20)
    private String ROL;

      // --- Métodos Getters y Stters
    public Integer getIdUSUARIOS() {
        return idUSUARIOS;
    }

    public void setIdUSUARIOS(Integer idUSUARIOS) {
        this.idUSUARIOS = idUSUARIOS;
    }

    public String getNOMBRE_USUARIO() {
        return NOMBRE_USUARIO;
    }

    public void setNOMBRE_USUARIO(String nOMBRE_USUARIO) {
        NOMBRE_USUARIO = nOMBRE_USUARIO;
    }

    public String getPASSWORD() {
        return PASSWORD;
    }

    public void setPASSWORD(String pASSWORD) {
        PASSWORD = pASSWORD;
    }

    public String getROL() {
        return ROL;
    }

    public void setROL(String rOL) {
        ROL = rOL;
    }

  }

