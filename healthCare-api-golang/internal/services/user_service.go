package services

import (
	"errors"
	"fmt"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	UserRepository repository.UserRepository
}

func NewUserService(userRepository repository.UserRepository) *UserService {
	return &UserService{UserRepository: userRepository}
}

func (s *UserService) GetUsersList() ([]*entity.User, error) {
	return s.UserRepository.GetList()
}

func (s *UserService) GetUserById(userId int) (*entity.User, error) {
	return s.UserRepository.GetById(userId)
}

func (s *UserService) GetUserByMail(mail string) (*entity.User, error) {
	return s.UserRepository.GetByMail(mail)
}

func (s *UserService) SaveUser(user entity.User) (*entity.User, error) {
	var isNewUser = user.Id == nil
	var changePassword = user.Senha != nil

	existentUser, err := s.UserRepository.GetByMail(*user.Email)
	if err == nil && (isNewUser || *user.Id != *existentUser.Id) {
		return nil, errors.New("user already exists")
	}

	if isNewUser || changePassword {
		hash, err := bcrypt.GenerateFromPassword([]byte(*user.Senha), bcrypt.DefaultCost)
		if err != nil {
			return nil, err
		}

		*user.Senha = string(hash)
	}

	if isNewUser {
		_, err = s.UserRepository.Insert(user)
	} else {
		_, err = s.UserRepository.Update(user)
	}
	if err != nil {
		return nil, err
	}

	if changePassword {
		err = s.UserRepository.UpdatePassword(*user.Id, *user.Senha)
		if err != nil {
			fmt.Printf("err: %v\n", err)
			return nil, err
		}
	}

	return s.UserRepository.GetByMail(*user.Email)
}

func (s *UserService) DeleteUser(userId int) error {
	return s.UserRepository.Delete(userId)
}
