package entity

type User struct {
	Id                  *int    `json:"id"`
	Email               *string `json:"email"`
	Senha               *string `json:"senha"`
	Nome                *string `json:"nome"`
	Sobrenome           *string `json:"sobrenome"`
	Acesso              *string `json:"acesso"`
	Situacao            *string `json:"situacao"`
	Can_change_password *bool   `json:"can_change_password"`
}
