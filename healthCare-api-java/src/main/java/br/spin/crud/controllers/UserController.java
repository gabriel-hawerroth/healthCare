package br.spin.crud.controllers;

import br.spin.crud.models.User;
import br.spin.crud.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    private List<User> listUsers() {
        return userService.listaUsuarios();
    }

    @GetMapping("/{id}")
    private ResponseEntity<User> findById(@PathVariable long id) {
        return userService.findById(id);
    }

    @GetMapping("/get-by-email")
    private User findByEmail(@RequestParam String email) {
        return userService.findByEmail(email);
    }

    @PostMapping
    private ResponseEntity<User> saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deleteUser(@PathVariable long id) {
        return userService.deleteUser(id);
    }
}
