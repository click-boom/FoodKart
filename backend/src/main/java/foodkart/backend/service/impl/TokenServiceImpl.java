package foodkart.backend.service.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import foodkart.backend.entity.PasswordResetToken;
import foodkart.backend.entity.User;
import foodkart.backend.pojo.TokenPojo;
import foodkart.backend.repo.TokenRepo;
import foodkart.backend.repo.UserRepo;
import foodkart.backend.service.TokenService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class TokenServiceImpl implements TokenService {
    private final UserRepo userRepo;
    @Autowired
    TokenRepo tokenRepository;

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public String sendEmail(String email) {
        TokenPojo tokenPojo = new TokenPojo();
        User user = userRepo.getUserByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        tokenPojo.setUser(user);
        try {
            String resetLink = generateResetToken(tokenPojo);

            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom("onlystudiesplz@gmail.com");
            msg.setTo(email);

            msg.setSubject("FoodKart Password Recovery");
            msg.setText("Hello \n\n" + "Please enter this code in the verification field to reset your Password :"
                    + resetLink + "\n\n"
                    + "Regards \n" + "FoodKart Team");

            javaMailSender.send(msg);

            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }

    }

    @Override
    public String generateResetToken(TokenPojo tokenPojo) {
        User user = tokenPojo.getUser();
        PasswordResetToken existingToken = tokenRepository.findByUser(user);

        if (existingToken != null) {
            existingToken.setToken(UUID.randomUUID().toString());
            existingToken.setExpiryDateTime(LocalDateTime.now().plusMinutes(30));
            tokenRepository.save(existingToken);
            return existingToken.getToken();
        } else {

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setExpiryDateTime(LocalDateTime.now().plusMinutes(30));
            resetToken.setToken(UUID.randomUUID().toString());
            resetToken.setUser(user);
            PasswordResetToken savedToken = tokenRepository.save(resetToken);
            return savedToken.getToken();
        }
    }

    @Override
    public boolean hasExipred(LocalDateTime expiryDateTime) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return expiryDateTime.isAfter(currentDateTime);
    }

}
