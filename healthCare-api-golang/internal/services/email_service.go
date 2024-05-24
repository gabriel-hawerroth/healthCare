package services

import (
	"fmt"
	"os"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"gopkg.in/gomail.v2"
)

var senderEmail = os.Getenv("HEALTHCARE_EMAIL")
var senderPassword = os.Getenv("HEALTHCARE_EMAIL_PASSWORD")

func BuildEmailTemplate(emailType string, userId int, token string) string {
	url := fmt.Sprintf("https://apihealthcare.hawetec.com.br/login/%s/%d/%s", emailType, userId, token)
	// url := fmt.Sprintf("http://localhost:8081/login/%s/%d/%s", emailType, userId, token)

	var action string
	switch emailType {
	case entity.EmailTypeActivateAccount:
		action = "ativar sua conta."
	case entity.EmailTypeChangePassword:
		action = "redefinir sua senha."
	}

	return fmt.Sprintf(`
		Clique <a href='%s'>aqui</a> para %s
		<br><br>
		Obrigado pelo tempo dedicado ao teste do sistema, sinta-se a vontade
		para enviar um email com sugestões de melhoria, dúvidas ou qualquer outro assunto.
	`, url, action)
}

func SendEmail(email entity.MailDTO) error {
	m := gomail.NewMessage()
	m.SetHeader("From", senderEmail)
	m.SetHeader("To", email.Addressee)
	m.SetHeader("Subject", email.Subject)
	m.SetBody("text/html", email.Content)

	d := gomail.NewDialer("smtp.gmail.com", 587, senderEmail, senderPassword)

	return d.DialAndSend(m)
}
