package com.spinacastudio.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/socialPage")
public class SocialPageController {
    
    SocialPage sp = new SocialPage();

    @GetMapping("/chatLog")
	public Collection<Message> chatLog(){
        return sp.getChatLog();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Message newMessage(@RequestBody Message message){
        sp.addMessage(message);
        return message;
    }

    /* @PutMapping("path/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable int id, @RequestBody Message message){

    }*/
    
}
