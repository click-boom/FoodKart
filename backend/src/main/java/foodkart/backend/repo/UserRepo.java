package foodkart.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import foodkart.backend.entity.User;


@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    @Query(value = "Select * from users where email=?", nativeQuery = true)
    Optional<User> getUserByEmail(String email);

    @Query(value = "Select phone from users where id=?", nativeQuery = true)
    String getUserContact(Integer id);
}
