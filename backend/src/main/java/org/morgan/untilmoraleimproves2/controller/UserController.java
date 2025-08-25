package org.morgan.untilmoraleimproves2.controller;

import org.morgan.untilmoraleimproves2.model.User;
import org.morgan.untilmoraleimproves2.repository.UserRepository;
import org.morgan.untilmoraleimproves2.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user){
        try {
            if (userService.existsByUserName(user.getUserName())){
                return ResponseEntity.badRequest().build();
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userService.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = userOpt.get();
        userService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updates){
        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User existingUser = userOpt.get();

        if (updates.getUserName() !=null) {
            existingUser.setUserName(updates.getUserName());
        }

        if (updates.getPassword() !=null) {
            existingUser.setPassword(passwordEncoder.encode(updates.getPassword()));
        }

        User patchedUser = userService.save(existingUser);
        return ResponseEntity.status(HttpStatus.OK).body(patchedUser);
    }
}