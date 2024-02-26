package br.spin.crud.controllers;

import br.spin.crud.models.User;
import br.spin.crud.services.LoginService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    @GetMapping
    private List<User> listaUsuarios() {
        return loginService.listaUsuarios();
    }

    @GetMapping("/{id}")
    private User findById(@PathVariable long id) {
        return loginService.findById(id);
    }

    @GetMapping("/getByEmail")
    private User findByEmail(@RequestParam String email) {
        return loginService.findByEmail(email);
    }

    @PostMapping("/new-user")
    private User novoUsuario(@RequestBody User user) {
        return loginService.novoUsuario(user);
    }

    @PutMapping("/editUser")
    private User editUser(@RequestBody User user) {
        return loginService.editUser(user);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> excluirUsuario(@PathVariable long id) {
        return loginService.excluirUsuario(id);
    }

    @PostMapping("/sendActivateAccountEmail")
    private void activateAccount(@RequestParam long userId) {
        loginService.activateAccount(userId);
    }

    @GetMapping("/activate-account/{userId}/{token}")
    private ResponseEntity<Void> activaUser(@PathVariable long userId, @PathVariable String token) {
        return loginService.activaUser(userId, token);
    }

    @PostMapping("/sendChangePasswordEmail")
    private void requestPermissionToChangePassword(@RequestParam long userId) {
        loginService.requestPermissionToChangePassword(userId);
    }

    @GetMapping("/permit-change-password/{userId}/{token}")
    private ResponseEntity<Void> permitChangePassword(@PathVariable long userId, @PathVariable String token) {
        return loginService.permitChangePassword(userId, token);
    }

    @PutMapping("/changePassword")
    private ResponseEntity<User> changePassword(@RequestParam long userId, @RequestParam String newPassword) {
        return loginService.changePassword(userId, newPassword);
    }
}
