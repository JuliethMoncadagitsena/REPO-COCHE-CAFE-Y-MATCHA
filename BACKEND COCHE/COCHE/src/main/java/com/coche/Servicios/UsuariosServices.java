    package com.coche.Servicios; // Paquete donde se ubica esta clase dentro del proyecto

    import java.util.List; // Importa la interfaz List para retornar colecciones de Categorias
    import java.util.Optional; // Importa Optional para manejar valores que pueden ser nulos de forma segura

    import org.springframework.beans.factory.annotation.Autowired; // Importa la anotación para la inyección automática de dependencias
    import org.springframework.stereotype.Service; // Importa la anotación que define esta clase como un servicio de Spring

    import com.coche.Entidades.UsuariosEntity; // Importa el modelo de la entidad Usuarios
    import com.coche.Repositorios.UsuariosRepositorio; // Importa la interfaz del repositorio JPA

    @Service // Marca la clase como componente de servicio (capa de lógica de negocio) en Spring Boot
    public class UsuariosServices { // Declaración pública de la clase del servicio

        @Autowired // Le indica a Spring que inyecte e instancie automáticamente la interfaz del repositorio
        private UsuariosRepositorio repositorio; // Declaración de la variable para acceder a las consultas de MySQL

        public List<UsuariosEntity> getAll() { // Método público que retorna la lista completa de usuarios
            return repositorio.findAll(); // Ejecuta el método JPA que equivale a: SELECT * FROM usuarios;
        } // Cierre del método getAll

        public Optional<UsuariosEntity> getById(Integer id){ // Método que busca un usuario por su ID (retorna un Optional)
            return repositorio.findById(id); // Ejecuta la consulta de JPA: SELECT * FROM usuarios WHERE id = id;
        } // Cierre del método getById    

        public UsuariosEntity save(UsuariosEntity entity) { // Método para guardar o registrar un nuevo usuario
            return repositorio.save(entity); // Inserta el objeto en la base de datos (INSERT INTO usuarios...)
        } // Cierre del método save

        public UsuariosEntity update(UsuariosEntity entity) { // Método para actualizar un usuario existente
            Optional<UsuariosEntity> usuario = repositorio.findById(entity.getIdUSUARIOS()); // Busca en la BD si el usuario existe usando su ID
            if (usuario.isPresent()) { // Comprueba si el Optional NO está vacío (es decir, el usuario sí existe)
                return repositorio.save(entity); // Sobrescribe y guarda los cambios del usuario en la base de datos
            } else { // Si el usuario no fue encontrado en la base de datos
                return null; // Retorna nulo para indicar que no se pudo actualizar
            } // Cierre del bloque if-else
        } // Cierre del método update

        public void delete (Integer id){ // Método que recibe un ID para eliminar un usuario sin retornar nada (void)
            repositorio.deleteById(id); // Ejecuta el borrado en la BD (DELETE FROM usuarios WHERE id = id;)
        } // Cierre del método delete



        public List<UsuariosEntity> getByNOMBRES_USUARIOS( String nombres) { // Método público que retorna la lista completa de usuarios con nombre especifico
            return repositorio. findByNOMBRE_USUARIOLike("%"+nombres+"%"); // Ejecuta el método JPA que equivale a: SELECT * FROM usuarios;
        } // Cierre del método getAll
        
        /* CRUD
        Create -- save
        Read -- getAll,getById
        Uptade -- update
        Delete -- delete
        */ // Comentario multilínea de referencia rápida sobre la estructura CRUD    

    } // Cierre de la clase UsuariosServices

