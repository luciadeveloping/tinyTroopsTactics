package com.spinacastudio.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/messages")
public class MessageController {

    // Para almacenar mensajes
    private Map<Long, Message> messages = new ConcurrentHashMap<>();

    // Generador de ID atómico para asignar nuevas IDs a los mensajes
    private AtomicLong nextId = new AtomicLong(0);

    private synchronized long generateMessageId(long userId) {
        return nextId.incrementAndGet();
    }

    // Obtiene todos los mensajes almacenados
    @GetMapping
    public Collection<Message> getMessages() {
        return messages.values();
    }

    // Crea un nuevo mensaje y lo guarda en el mapa de mensajes
    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Message newMessage(@RequestBody Message message) {
        // Obtén el usuario actual del sistema (sesión, token, etc.)
        User currentUser = getCurrentUser();

        // Asegúrate de establecer el usuario actual antes de crear el nuevo mensaje
        message.setUser(currentUser);
        currentUser.getMessages().add(message);

        // Utiliza la ID del usuario como parte de la generación de la ID del mensaje
        long id = generateMessageId(currentUser.getId());
        // Guarda el mensaje en el mapa de mensajes
        messages.put(id, message);
        return message;
    }

    
    // Actualiza un mensaje existente con la ID dada
    @PutMapping("/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable long id, @RequestBody Message updatedMessage) {
        Message savedMessage = messages.get(id);

        if (savedMessage != null) {
            updatedMessage.setUser(savedMessage.getUser()); // Preserva la información del usuario
            messages.put(id, updatedMessage);
            return new ResponseEntity<>(updatedMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Obtiene un mensaje con la ID dada
    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessage(@PathVariable long id) {
        Message savedMessage = messages.get(id);

        if (savedMessage != null) {
            return new ResponseEntity<>(savedMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Elimina un mensaje con la ID dada
    @DeleteMapping("/{id}")
    public ResponseEntity<Message> deleteMessage(@PathVariable long id) {
        Message savedMessage = messages.get(id);

        if (savedMessage != null) {
            messages.remove(savedMessage.getId());
            return new ResponseEntity<>(savedMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Método privado para obtener el usuario actual (implementación simulada)
    private User getCurrentUser() {
        // Implementación para obtener el usuario actual
        return new User();
    }
}
