package br.spin.crud.login.controller;

import br.spin.crud.login.models.PasswordReset;
import br.spin.crud.login.repository.LoginRepository;
import br.spin.crud.login.models.Login;
import br.spin.crud.login.repository.PasswordResetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/login")
public class LoginController {

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String encriptedPassword = "";

    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @GetMapping("/listaUsuarios")
    private List<Login> listaLogins() {
        return loginRepository.findAll();
    }

    @GetMapping("/solicitacoesToken") //lista de todas as solicitações de token
    private List<PasswordReset> listaTokens(){
        return passwordResetRepository.findAll();
    }

    @PostMapping // método para cadastrar um novo usuário
    private Login salvarLogin(@RequestBody Login login) {
        encriptedPassword = encoder.encode(login.getSenha());
        login.setSenha(encriptedPassword);
        return loginRepository.save(login);
    }

//    gabrielhawerroth04@gmail.com, Gabriel123
//    administrador, adm@234
//    consulta, 123456

}
