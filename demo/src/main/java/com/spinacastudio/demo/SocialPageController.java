package com.spinacastudio.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.ArrayList;
import java.util.Collection;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//import java.util.concurrent.atomic.AtomicLong;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/socialPage")
public class SocialPageController {
    
    SocialPage sp = new SocialPage();

    @PostMapping("/CreateUser")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean CreateUser(@RequestBody User user){
        return sp.TryAddUser(user);
    }

    @GetMapping("/users")
	public Collection<User> GetUsers(){
        return sp.getUsers();
    }

    @PutMapping("/update/user/{name}")
    public boolean ChangeUserName(@PathVariable String name, @RequestBody String newName) {
        
        System.out.println("Update user pulsado.");
        if(sp.ContainsUserName(newName)) return false;
        
        sp.UpdateName(name, newName);
        return true;
    }

    @DeleteMapping("/user/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable int id) {
        //sp.removeUser(id);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
    
}
