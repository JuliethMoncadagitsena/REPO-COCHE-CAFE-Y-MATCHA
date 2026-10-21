    package com.coche.Servicios; // Paquete donde se ubica esta clase dentro del proyecto

    import java.util.List; // Importa la interfaz List para retornar colecciones de DetalleVentas
    import java.util.Optional; // Importa Optional para manejar valores que pueden ser nulos de forma segura

    import org.springframework.beans.factory.annotation.Autowired; // Importa la anotación para la inyección automática de dependencias
    import org.springframework.stereotype.Service; // Importa la anotación que define esta clase como un servicio de Spring
    import com.coche.Entidades.DetalleVentasEntity;// Importa el modelo de la entidad DetalleVentas
    import com.coche.Repositorios.DetalleVentaRepositorio;

    @Service // Marca la clase como componente de servicio (capa de lógica de negocio) en Spring Boot
    public class DetalleVentasServices {

        @Autowired // Le indica a Spring que inyecte e instancie automáticamente la interfaz del repositorio
        private DetalleVentaRepositorio repositorio; // Declaración de la variable para acceder a las consultas de MySQL

        public List<DetalleVentasEntity> getAll() { // Método público que retorna la lista completa de DetalleVentas
            return repositorio.findAll(); // Ejecuta el método JPA que equivale a: SELECT * FROM DetalleVentas;
        } // Cierre del método getAll

         public Optional<DetalleVentasEntity> getById(Integer id){ // Método que busca un usuario por su ID (retorna un Optional)
            return repositorio.findById(id); // Ejecuta la consulta de JPA: SELECT * FROM DetalleVentas WHERE id = id;
        } // Cierre del método getById    

        public DetalleVentasEntity save(DetalleVentasEntity entity) { // Método para guardar o registrar una nueva categoria
            return repositorio.save(entity); // Inserta el objeto en la base de datos (INSERT INTO DetalleVentas...)
        } // Cierre del método save

          public DetalleVentasEntity update(DetalleVentasEntity entity) { // Método para actualizar un usuario existente
            Optional<DetalleVentasEntity> categoria = repositorio.findById(entity.getIdDETALLE_VENTA()); // Busca en la BD si el usuario existe usando su ID
            if (categoria.isPresent()) { // Comprueba si el Optional NO está vacío (es decir, el usuario sí existe)
                return repositorio.save(entity); // Sobrescribe y guarda los cambios del usuario en la base de datos
            } else { // Si el usuario no fue encontrado en la base de datos
                return null; // Retorna nulo para indicar que no se pudo actualizar
            } // Cierre del bloque if-else
        } // Cierre del método update

        public void delete (Integer id){ // Método que recibe un ID para eliminar un usuario sin retornar nada (void)
            repositorio.deleteById(id); // Ejecuta el borrado en la BD (DELETE FROM DetalleVentas WHERE id = id;)
        } // Cierre del método delete

        /* CRUD
        Create -- save
        Read -- getAll,getById
        Uptade -- update
        Delete -- delete
        */ // Comentario multilínea de referencia rápida sobre la estructura CRUD    

} // Cierre de la clase DetalleVentasServices




    

