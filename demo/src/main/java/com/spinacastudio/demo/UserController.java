package com.spinacastudio.demo;

// Importa las clases necesarias
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/users")
public class UserController {

    // Mapa para almacenar usuarios, con clave como ID del usuario
    private final Map<Long, User> users = new ConcurrentHashMap<>();

    // Contador atómico para generar IDs únicos para nuevos usuarios
    private final AtomicLong nextId = new AtomicLong(0);

    // Obtiene la lista de todos los usuarios
    @GetMapping
    public Collection<User> users() {
        return users.values();
    }

    // Crea un nuevo usuario y lo agrega al mapa de usuarios
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User newUser(@RequestBody User user) {
        long id = nextId.incrementAndGet();
        user.setId(id);
        user.setMessages(new ArrayList<>());  // Inicializa la lista de mensajes
        users.put(id, user);

        // Escribir usuarios en el archivo
        UserFileHandler.writeUsers(new ArrayList<>(users.values()));

        return user;
    }

    // Actualiza un usuario existente con la información proporcionada
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User userUpdated) {
        User savedUser = users.get(id);

        if (savedUser != null) {
            users.put(id, userUpdated);

            // Escribir usuarios en el archivo
            UserFileHandler.writeUsers(new ArrayList<>(users.values()));

            // Preserva la información de los mensajes del usuario original
            userUpdated.setMessages(savedUser.getMessages());
            users.put(id, userUpdated);

            return new ResponseEntity<>(userUpdated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Obtiene un usuario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        User savedUser = users.get(id);

        if (savedUser != null) {
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Elimina un usuario por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable long id) {
        User savedUser = users.get(id);

        if (savedUser != null) {
            users.remove(savedUser.getId());

            // Escribir usuarios en el archivo
            UserFileHandler.writeUsers(new ArrayList<>(users.values()));

            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}


