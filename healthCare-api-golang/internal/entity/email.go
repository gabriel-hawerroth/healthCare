package entity

type MailDTO struct {
	Addressee string
	Subject   string
	Content   string
}

const (
	EmailTypeActivateAccount = "activate-account"
	EmailTypeChangePassword  = "permit-change-password"
)
