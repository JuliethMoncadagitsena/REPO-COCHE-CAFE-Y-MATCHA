    package com.coche.Controladores; // Paquete donde se ubica esta clase dentro de la estructura del proyecto
    import java.util.List;
    import java.util.Optional; // Importa Optional para manejar búsquedas que pueden devolver un valor existente o nulo
    import org.springframework.beans.factory.annotation.Autowired; // Importa la anotación para inyectar automáticamente el servicio
    import org.springframework.http.ResponseEntity; // Importa ResponseEntity para construir las respuestas HTTP (200 OK, 404 Not Found, etc.)
    import org.springframework.web.bind.annotation.CrossOrigin; // Importa CrossOrigin para permitir peticiones desde aplicaciones frontend
    import org.springframework.web.bind.annotation.DeleteMapping; // Importa la anotación para manejar peticiones HTTP DELETE
    import org.springframework.web.bind.annotation.GetMapping; // Importa la anotación para manejar peticiones HTTP GET
    import org.springframework.web.bind.annotation.PathVariable; // Importa PathVariable para extraer variables enviadas dentro de la URL
    import org.springframework.web.bind.annotation.PostMapping; // Importa la anotación para manejar peticiones HTTP POST
    import org.springframework.web.bind.annotation.PutMapping; // Importa la anotación para manejar peticiones HTTP PUT
    import org.springframework.web.bind.annotation.RequestBody; // Importa RequestBody para convertir el cuerpo del JSON recibido en un objeto Java
    import org.springframework.web.bind.annotation.RequestMapping; // Importa RequestMapping para definir la ruta base del controlador
    import org.springframework.web.bind.annotation.RestController; // Importa RestController para marcar la clase como un controlador de API REST

    import com.coche.Entidades.VentasEntity; // Importa la clase de la entidad Ventas
    import com.coche.Servicios.VentasServices; // Importa la clase de servicio que maneja la lógica de negocio de Ventas

    @RestController // Define esta clase como un controlador REST que retornará respuestas en formato JSON
    @RequestMapping ("/api/Ventas") // Establece la URL base del servicio: http://localhost:8080/api/Ventas
    public class VentasController { // Declaración pública de la clase del controlador

        @Autowired // Inyecta e instancia automáticamente la clase de servicio de Ventas
        private VentasServices servicio; // Objeto para invocar los métodos de la capa de servicios

        @CrossOrigin(origins = "*" ) // Permite peticiones HTTP enviadas desde cualquier origen o frontend
        @GetMapping // Define que este método responde a peticiones HTTP GET a la ruta base
        public ResponseEntity<?> listarTodos() { // Método que retorna la respuesta HTTP con la lista de Ventas
            return ResponseEntity.ok(servicio.getAll()); // Retorna un código HTTP 200 OK junto con la lista completa de Ventas
        } // Cierre del método listarTodos

        @CrossOrigin(origins = "*" ) // Permite peticiones HTTP enviadas desde cualquier origen
        @GetMapping ("/{id}") // Define que este método responde a peticiones HTTP GET agregando un ID en la URL
        public ResponseEntity<?> listarPorId(@PathVariable (value="id") Integer id) { // Captura el parámetro {id} recibido en la URL
            Optional <VentasEntity> entidad = servicio.getById(id); // Busca el usuario por su ID en la base de datos
            
            if(entidad.isPresent()) // Condición que evalúa si el usuario fue encontrado
                return ResponseEntity.ok(entidad); // Retorna HTTP 200 OK adjuntando los datos del usuario encontrado
            else // En caso de que no exista el registro
                return ResponseEntity.notFound().build(); // Retorna un código HTTP 404 Not Found
        } // Cierre del método listarPorId

        @CrossOrigin(origins = "*" ) // Permite peticiones HTTP enviadas desde cualquier origen
        @PostMapping // Define que este método responde a peticiones HTTP POST para crear un recurso
        public ResponseEntity<?> crearEntidad(@RequestBody VentasEntity entity) { // Convierte el JSON recibido a un objeto VentasEntity
            return ResponseEntity.ok(servicio.save(entity)); // Guarda el usuario en la BD y retorna HTTP 200 OK con el objeto creado
        } // Cierre del método crearEntidad

        @CrossOrigin(origins = "*" ) // Permite peticiones HTTP enviadas desde cualquier origen
        @PutMapping // Define que este método responde a peticiones HTTP PUT para actualizar un recurso existente
        public ResponseEntity<?> ActualizarEntidad(@RequestBody VentasEntity entity) { // Recibe el JSON con los datos actualizados del usuario
            return ResponseEntity.ok(servicio.update(entity)); // Actualiza los datos en la BD y retorna HTTP 200 OK
        } // Cierre del método ActualizarEntidad

        @CrossOrigin(origins = "*" ) // Permite peticiones HTTP enviadas desde cualquier origen
        @DeleteMapping ("/{id}") // Define que este método responde a peticiones HTTP DELETE enviando un ID en la URL
        public ResponseEntity<?> eliminarEntidad (@PathVariable (value="id") Integer id) { // Captura el {id} que se desea eliminar de la URL
            Optional <VentasEntity> entidad = servicio.getById(id); // Busca el usuario en la base de datos para verificar su existencia
            
            if(entidad.isPresent()){ // Si el usuario existe
                servicio.delete(id); // Procede a eliminar el registro en la base de datos
                return ResponseEntity.ok(entidad); // Retorna HTTP 200 OK con los datos del usuario que acaba de ser eliminado
            } // Cierre del bloque if
            else // Si el usuario no fue encontrado
                return ResponseEntity.notFound().build(); // Retorna un código HTTP 404 Not Found
            
        } // Cierre del método eliminarEntidad

        @CrossOrigin(origins = "*") // Permite peticiones desde Apidog o la interfaz web
    @GetMapping("/findFecha/{fecha}") // Mapea la petición GET con la variable {fecha} en la URL
    public ResponseEntity<List<VentasEntity>> ListarPorFecha(@PathVariable("fecha") String fecha) { // Extrae el texto {fecha} de la URL
        List<VentasEntity> entidad = servicio.getByFECHA(fecha); // Llama al método del servicio pasando la fecha a buscar
        return ResponseEntity.ok(entidad); // Retorna la lista de ventas encontradas con estado HTTP 200 (OK)
    }
    } // Cierre de la clase VentasController