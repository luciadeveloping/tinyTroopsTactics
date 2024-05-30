package com.spinacastudio.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map; // Import statement for Map

@RestController
@RequestMapping("/socialPage")
public class SocialPageController {
    
    SocialPage sp = new SocialPage();

    @PostMapping("/CreateUser")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean SignUp(@RequestBody User user){
        return sp.TryAddUser(user);
    }

    @GetMapping("/user/{name}")
    public ResponseEntity<User> GetUserByName(@PathVariable String name) {
        User user = sp.GetUser(name);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users")
    public Collection<User> GetUsers(){
        return sp.getUsers();
    }

    @PostMapping("/user/{name}")
    public boolean SignIn(@PathVariable String name, @RequestBody String password) {
        if(!sp.ContainsUserName(name)) return false;
        return sp.CheckPasswordForUser(name, password);
    }

    @PutMapping("/update/user/{name}")
    public ResponseEntity<String> ChangeUserName(@PathVariable String name, @RequestBody String newName) {
        User user = sp.GetUser(name);
        if (user == null) return new ResponseEntity<>("Current username not found", HttpStatus.NOT_FOUND);
        if (sp.ContainsUserName(newName)) return new ResponseEntity<>("New username already exists", HttpStatus.CONFLICT);

        sp.UpdateName(user, newName);
        return new ResponseEntity<>("Username updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/user/{name}")
    public ResponseEntity<String> DeleteUser(@PathVariable String name, @RequestHeader("Authorization") String authorization) {
        String[] parts = authorization.split(" ");
        String password = parts[1]; // Obtener la contraseña del encabezado de autorización
        User user = sp.GetUser(name);
        if (user == null) return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        if (!sp.CheckPasswordForUser(user, password)) return new ResponseEntity<>("Incorrect password", HttpStatus.FORBIDDEN);
    
        sp.TryRemoveUser(user);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }
    
}
