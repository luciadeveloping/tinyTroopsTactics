package com.spinacastudio.demo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String name;

    @Column(nullable = false)
    private Integer victories;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Message> messages;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Message currentMessage;

    // Constructor por defecto
    public User() {
        this.messages = new ArrayList<>(); // Inicializa la lista de mensajes
    }

    // Constructor con parámetro para el nombre del usuario
    public User(String newName) {
        name = newName;
        victories = 0;
        this.messages = new ArrayList<>(); // Inicializa la lista de mensajes
    }

    // Métodos getter y setter para el ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Métodos getter y setter para las victorias
    public Integer getVictories() {
        return victories;
    }

    public void setVictories(Integer victories) {
        this.victories = victories;
    }

    // Métodos getter y setter para la lista de mensajes
    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    // Resto del código
}
