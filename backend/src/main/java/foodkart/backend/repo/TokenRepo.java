package foodkart.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import foodkart.backend.entity.PasswordResetToken;
import foodkart.backend.entity.User;

public interface TokenRepo extends JpaRepository<PasswordResetToken, Integer> {

    PasswordResetToken findByToken(String token);

    PasswordResetToken findByUser(User user);

}
