    package com.coche.Servicios; // Paquete donde se ubica esta clase dentro del proyecto

    import java.util.List; // Importa la interfaz List para retornar colecciones de Ventas
    import java.util.Optional; // Importa Optional para manejar valores que pueden ser nulos de forma segura

    import org.springframework.beans.factory.annotation.Autowired; // Importa la anotación para la inyección automática de dependencias
import org.springframework.stereotype.Service; // Importa la anotación que define esta clase como un servicio de Spring
    import com.coche.Entidades.VentasEntity;// Importa el modelo de la entidad Ventas
    import com.coche.Repositorios.VentasRepositorio;

    @Service // Marca la clase como componente de servicio (capa de lógica de negocio) en Spring Boot
    public class VentasServices {

        @Autowired // Le indica a Spring que inyecte e instancie automáticamente la interfaz del repositorio
        private VentasRepositorio repositorio; // Declaración de la variable para acceder a las consultas de MySQL

        public List<VentasEntity> getAll() { // Método público que retorna la lista completa de Ventas
            return repositorio.findAll(); // Ejecuta el método JPA que equivale a: SELECT * FROM Ventas;
        } // Cierre del método getAll

         public Optional<VentasEntity> getById(Integer id){ // Método que busca un usuario por su ID (retorna un Optional)
            return repositorio.findById(id); // Ejecuta la consulta de JPA: SELECT * FROM Ventas WHERE id = id;
        } // Cierre del método getById    

        public VentasEntity save(VentasEntity entity) { // Método para guardar o registrar una nueva categoria
            return repositorio.save(entity); // Inserta el objeto en la base de datos (INSERT INTO Ventas...)
        } // Cierre del método save

          public VentasEntity update(VentasEntity entity) { // Método para actualizar un usuario existente
            Optional<VentasEntity> categoria = repositorio.findById(entity.getIdVENTAS()); // Busca en la BD si el usuario existe usando su ID
            if (categoria.isPresent()) { // Comprueba si el Optional NO está vacío (es decir, el usuario sí existe)
                return repositorio.save(entity); // Sobrescribe y guarda los cambios del usuario en la base de datos
            } else { // Si el usuario no fue encontrado en la base de datos
                return null; // Retorna nulo para indicar que no se pudo actualizar
            } // Cierre del bloque if-else
        } // Cierre del método update

        public void delete (Integer id){ // Método que recibe un ID para eliminar un usuario sin retornar nada (void)
            repositorio.deleteById(id); // Ejecuta el borrado en la BD (DELETE FROM Ventas WHERE id = id;)
        } // Cierre del método
        // public List<VentasEntity> getByFECHA(String fecha) {
        public List<VentasEntity> getByFECHA(String fecha) {
         return repositorio.findByFECHALike(fecha);
}


        /* CRUD
        Create -- save
        Read -- getAll,getById
        Uptade -- update
        Delete -- delete
        */ // Comentario multilínea de referencia rápida sobre la estructura CRUD    

} // Cierre de la clase VentasServices




    

