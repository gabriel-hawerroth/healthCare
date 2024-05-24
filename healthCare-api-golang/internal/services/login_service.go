package services

import (
	"errors"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
	"github.com/gabriel-hawerroth/HealthCare/internal/security"
	"golang.org/x/crypto/bcrypt"
)

type LoginService struct {
	LoginRepository repository.LoginRepository
	TokenRepository repository.TokenRepository
	UserRepository  repository.UserRepository
}

func NewLoginService(lr repository.LoginRepository, tr repository.TokenRepository, ur repository.UserRepository) *LoginService {
	return &LoginService{
		LoginRepository: lr,
		TokenRepository: tr,
		UserRepository:  ur,
	}
}

func (s *LoginService) DoLogin(mail string, password string) (*security.LoginResponse, error) {
	user, err := s.UserRepository.GetByMail(mail)
	if err != nil {
		return nil, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(*user.Senha), []byte(password))
	if err != nil {
		return nil, err
	}

	token, err := security.GenerateToken(*user.Id)
	if err != nil {
		return nil, errors.New("error generating token")
	}

	response := security.LoginResponse{
		User:  *user,
		Token: token,
	}

	return &response, nil
}

func (s *LoginService) SendActivateAccountEmail(userId int) error {
	tok, tokErr := s.TokenRepository.GetByUserId(userId)
	user, err := s.UserRepository.GetById(userId)
	if err != nil {
		return err
	}

	token := entity.Token{
		User_id: userId,
		Token:   CalculateHash(*user.Email),
	}

	if tokErr != nil {
		s.TokenRepository.Insert(token)
	} else {
		token.Id = tok.Id
		s.TokenRepository.Update(token)
	}

	return SendEmail(
		entity.MailDTO{
			Addressee: *user.Email,
			Subject:   "Ativação da conta HealthCare",
			Content:   BuildEmailTemplate(entity.EmailTypeActivateAccount, *user.Id, token.Token),
		},
	)
}

func (s *LoginService) ActivateAccount(userId int, token string) error {
	tok, err := s.TokenRepository.GetByUserId(userId)
	if err != nil {
		return err
	}

	user, err := s.UserRepository.GetById(userId)
	if err != nil {
		return err
	}

	if token != tok.Token {
		return errors.New("invalid token")
	}

	*user.Situacao = "A"
	_, err = s.UserRepository.Update(*user)

	return err
}

func (s *LoginService) SendChangePasswordEmail(userId int) error {
	tok, tokErr := s.TokenRepository.GetByUserId(userId)
	user, err := s.UserRepository.GetById(userId)
	if err != nil {
		return err
	}

	token := entity.Token{
		User_id: userId,
		Token:   CalculateHash(*user.Email),
	}

	if tokErr != nil {
		s.TokenRepository.Insert(token)
	} else {
		token.Id = tok.Id
		s.TokenRepository.Update(token)
	}

	return SendEmail(
		entity.MailDTO{
			Addressee: *user.Email,
			Subject:   "Alteração da senha HealthCare",
			Content:   BuildEmailTemplate(entity.EmailTypeChangePassword, *user.Id, token.Token),
		},
	)
}

func (s *LoginService) PermitChangePassword(userId int, token string) error {
	tok, err := s.TokenRepository.GetByUserId(userId)
	if err != nil {
		return err
	}

	user, err := s.UserRepository.GetById(userId)
	if err != nil {
		return err
	}

	if token != tok.Token {
		return errors.New("invalid token")
	}

	*user.Can_change_password = true
	_, err = s.UserRepository.Update(*user)

	return err
}

func (s *LoginService) ChangePassword(userId int, newPassword string) error {
	user, err := s.UserRepository.GetById(userId)
	if err != nil {
		return err
	}

	if !*user.Can_change_password {
		return errors.New("whitout permission to change password")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	*user.Senha = string(hash)

	err = s.UserRepository.UpdatePassword(*user.Id, string(hash))
	if err != nil {
		return err
	}

	*user.Can_change_password = false
	_, err = s.UserRepository.Update(*user)

	return err
}
