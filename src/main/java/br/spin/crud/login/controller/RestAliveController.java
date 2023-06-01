package br.spin.crud.login.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("rest")
public class RestAliveController {

    @GetMapping("/alive/aberto")
    public LocalDate endpointAberto() {
        return LocalDate.now();
    }

    @GetMapping("/alive/fechado")
    public LocalDate endpointFechado() {
        return LocalDate.now();
    }

}
