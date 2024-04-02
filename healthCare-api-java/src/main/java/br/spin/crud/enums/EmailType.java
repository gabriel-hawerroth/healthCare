package br.spin.crud.enums;

import lombok.Getter;

@Getter
public enum EmailType {
    ACTIVATE_ACCOUNT("activate-account"),
    CHANGE_PASSWORD("permit-change-password");

    private final String value;

    EmailType(String value) {
        this.value = value;
    }

}
