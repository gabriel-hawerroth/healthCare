package br.spin.crud.controllers;

import br.spin.crud.models.User;
import br.spin.crud.services.LoginService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/send-activate-account-email")
    private void activateAccount(@RequestParam long userId) {
        loginService.sendActivateAccountEmail(userId);
    }

    @GetMapping("/activate-account/{userId}/{token}")
    private ResponseEntity<Void> activeUser(@PathVariable long userId, @PathVariable String token) {
        return loginService.activaUser(userId, token);
    }

    @PostMapping("/send-change-password-email")
    private void sendChangePasswordEmail(@RequestParam long userId) {
        loginService.sendChangePasswordEmail(userId);
    }

    @GetMapping("/permit-change-password/{userId}/{token}")
    private ResponseEntity<Void> permitChangePassword(@PathVariable long userId, @PathVariable String token) {
        return loginService.permitChangePassword(userId, token);
    }

    @PutMapping("/change-password")
    private ResponseEntity<User> changePassword(@RequestParam long userId, @RequestParam String newPassword) {
        return loginService.changePassword(userId, newPassword);
    }
}
