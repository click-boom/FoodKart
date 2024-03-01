package foodkart.backend.service;

import java.time.LocalDateTime;

import foodkart.backend.pojo.TokenPojo;

public interface TokenService {

    String sendEmail(String email);

    String generateResetToken(TokenPojo tokenPojo);

    boolean hasExipred(LocalDateTime expiryDateTime);

}
