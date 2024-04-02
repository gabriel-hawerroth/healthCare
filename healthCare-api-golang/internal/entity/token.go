package entity

type Token struct {
	Id      int    `json:"id"`
	User_id int    `json:"user_id"`
	Token   string `json:"token"`
}
