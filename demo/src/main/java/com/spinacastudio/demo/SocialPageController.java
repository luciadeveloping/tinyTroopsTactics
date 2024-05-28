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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/socialPage")
public class SocialPageController {
    
    SocialPage sp = new SocialPage();

    @PostMapping("/CreateUser")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean SignUp(@RequestBody User user){
        return sp.TryAddUser(user);
    }

    @GetMapping("/users")
	public Collection<User> GetUsers(){
        return sp.getUsers();
    }

    @PostMapping("/user/{name}")
    public boolean SingIn(@PathVariable String name, @RequestBody String password) {

        if(!sp.ContainsUserName(name)) return false;
        if(!sp.CheckPasswordForUser(name, password)) return false;

        return true;
    }
    

    @PutMapping("/update/user/{name}")
    public boolean ChangeUserName(@PathVariable String name, @RequestBody String newName) {
        
        if(!sp.ContainsUserName(name)) return false;
        if(sp.ContainsUserName(newName)) return false;
        
        sp.UpdateName(name, newName);
        return true;
    }

    @DeleteMapping("/delete/user/{name}")
	public boolean DeleteUser(@PathVariable String name, @RequestBody String password) {

        if(!sp.ContainsUserName(name)) return false;

        if(!sp.CheckPasswordForUser(name, password)) return false;
        return sp.TryRemoveUser(name);
	}
    
}
