package br.spin.crud.models;

public record EmailDTO(
        String addressee,
        String subject,
        String content
) {}