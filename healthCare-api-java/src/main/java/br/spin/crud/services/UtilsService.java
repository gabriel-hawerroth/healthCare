package br.spin.crud.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UtilsService {
    public static String calculateHash(String input) {
        try {
            final MessageDigest digest = MessageDigest.getInstance("SHA-256");
            final byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            // Converter bytes em representação hexadecimal
            final StringBuilder hexStringBuilder = new StringBuilder();
            for (byte b : hashBytes) {
                hexStringBuilder.append(String.format("%02x", b));
            }

            return hexStringBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
