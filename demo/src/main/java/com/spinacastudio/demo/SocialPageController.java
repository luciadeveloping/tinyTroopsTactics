package com.spinacastudio.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.ArrayList;
import java.util.Collection;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//import java.util.concurrent.atomic.AtomicLong;


@RestController
@RequestMapping("/socialPage")
public class SocialPageController {
    
    SocialPage sp = new SocialPage();

    @GetMapping("/chatLog")
	public Collection<Message> chatLog(){
        return sp.getChatLog();
    }

    @PostMapping("/message")
    @ResponseStatus(HttpStatus.CREATED)
    public Message newMessage(@RequestBody Message message){
        sp.addMessage(message);
        return message;
    }

    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    public User newUser(@RequestBody User user){
        sp.addUser(user);
        return user;
    }

    @DeleteMapping("/user/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable int id) {
        sp.removeUser(id);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

    
    /* @PutMapping("path/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable int id, @RequestBody Message message){

    }*/
    
}
