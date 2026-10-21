// Indica el paquete o carpeta exacta donde se encuentra ubicado este archivo
package com.coche.Repositorios;
// Importa la interfaz JpaRepository de Spring Data, que provee las funciones para consultar la base de datos
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// Importa la clase de entidad Usuarios para vincular este repositorio con esa tabla
import com.coche.Entidades.UsuariosEntity;
import java.util.List;

// Define la interfaz del repositorio heredando (extends) las operaciones CRUD de JpaRepository
// <Usuarios, Integer> indica la clase Entidad a gestionar y el tipo de dato de su llave primaria (idUSUARIOS)
public interface UsuariosRepositorio extends JpaRepository <UsuariosEntity, Integer> {

    @Query("SELECT u FROM UsuariosEntity u WHERE u.NOMBRE_USUARIO LIKE :nombre")
List<UsuariosEntity> findByNOMBRE_USUARIOLike(@Param("nombre") String nombre);

}