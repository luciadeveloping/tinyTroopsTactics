package com.spinacastudio.demo;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController //identifies this class as a controller
@RequestMapping("/users") //finds this class in /users
public class UserController {

    Map<Long, User> users = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0); //ids start from 0

    @GetMapping //gets all users values
	public Collection<User> users() {
		return users.values();
	}

    @PostMapping //like a setter
	@ResponseStatus(HttpStatus.CREATED)
	public User newUser(@RequestBody User user) {

		long id = nextId.incrementAndGet();
		user.setId(id);
		users.put(id, user);

		return user;
	}

    @PutMapping("/{id}") //updates given ID ./users/{id}
	public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User userUpdated) {

		User savedUser = users.get(userUpdated.getId());

		if (savedUser != null) {

			users.put(id, userUpdated);

			return new ResponseEntity<>(userUpdated, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

    @GetMapping("/{id}") //gets given ID
	public ResponseEntity<User> getUser(@PathVariable long id) {

		User savedUser = users.get(id);

		if (savedUser != null) {
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
    
	@DeleteMapping("/{id}") //deletes given ID
	public ResponseEntity<User> deleteUser(@PathVariable long id) {

		User savedUser = users.get(id);

		if (savedUser != null) {
			users.remove(savedUser.getId());
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	} 
    
}
