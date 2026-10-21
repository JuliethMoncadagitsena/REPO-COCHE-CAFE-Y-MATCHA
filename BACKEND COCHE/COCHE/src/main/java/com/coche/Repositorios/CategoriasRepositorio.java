// Indica el paquete o carpeta exacta donde se encuentra ubicado este archivo
package com.coche.Repositorios;
// Importa la interfaz JpaRepository de Spring Data, que provee las funciones para consultar la base de datos
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// Importa la clase de entidad Usuarios para vincular este repositorio con esa tabla
import com.coche.Entidades.CategoriasEntity;
import java.util.List;

// Define la interfaz del repositorio heredando (extends) las operaciones CRUD de JpaRepository
// <Usuarios, Integer> indica la clase Entidad a gestionar y el tipo de dato de su llave primaria (idUSUARIOS)
public interface CategoriasRepositorio extends JpaRepository <CategoriasEntity, Integer> {

        @Query("SELECT u FROM CategoriasEntity u WHERE u.NOMBRE LIKE :nombre")
List<CategoriasEntity> findByNOMBRELike(@Param("nombre") String nombre);

       
    
}
