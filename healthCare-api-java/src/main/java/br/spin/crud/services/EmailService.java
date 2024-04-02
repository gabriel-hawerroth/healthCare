package br.spin.crud.services;

import br.spin.crud.enums.EmailType;
import br.spin.crud.models.EmailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;

    public void enviarEmail(EmailDTO email) throws MessagingException {
        final MimeMessage message = javaMailSender.createMimeMessage();
        final MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email.addressee());
        helper.setSubject(email.subject());
        helper.setText(email.content(), true);

        javaMailSender.send(message);
    }

    public String buildEmailTemplate(EmailType emailType, Long userId, String token) {
        final String url = "https://api.hawetec.com.br/healthcare/login/" + emailType.getValue() + "/" + userId + "/" + token;

        final String action = switch (emailType) {
            case ACTIVATE_ACCOUNT -> "ativar sua conta.";
            case CHANGE_PASSWORD -> "redefinir sua senha.";
        };

        return """
                Clique <a href='
                """
                + url +
                """
                '>aqui</a> para
                 """
                + action +
                """
                <br><br>
                Obrigado pelo tempo dedicado ao teste do sistema, sinta-se a vontade
                para enviar um email com sugestões de melhoria, dúvidas ou qualquer outro assunto.
                """;
    }
}