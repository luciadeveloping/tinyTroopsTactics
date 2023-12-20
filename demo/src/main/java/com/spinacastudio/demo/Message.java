package com.spinacastudio.demo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String content;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    

    // Constructor predeterminado
    public Message() {
    }

    // Constructor para inicializar un mensaje con un usuario y contenido
    public Message(User user, String content) {
        this.user = user;
        this.content = content;
    }

    // Retorna la ID del usuario
    public Long getId() {
        return (user != null) ? user.getId() : null;
    }
    

    // Retorna el usuario asociado al mensaje
    public User getUser() {
        return user;
    }

    // Retorna el contenido del mensaje
    public String getContent() {
        return content;
    }

    // Establece el usuario asociado al mensaje
    public void setUser(User user) {
        this.user = user;
    }

    // Establece el contenido del mensaje
    public void setContent(String content) {
        this.content = content;
    }
}

