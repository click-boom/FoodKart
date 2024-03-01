package foodkart.backend.User;

import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import foodkart.backend.entity.User;
import foodkart.backend.repo.UserRepo;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserTest {

    @Autowired
    private UserRepo userRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveUser() {
        User user = new User();
        user.setFirst_name("Test");
        user.setLast_name("Case");
        user.setUser_name("test_case");
        user.setContact("0987654321");
        user.setEmail("testcase@example.com");
        user.setPassword("testcasesuccess");
        user = userRepo.save(user);

        Assertions.assertThat(user.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findUserById() {
        User user = userRepo.findById(1).get();
        Assertions.assertThat(user.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void findAllUsers() {
        List<User> userList = userRepo.findAll();
        Assertions.assertThat(userList.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    public void updateUser() {
        User user = userRepo.findById(1).get();
        user.setFirst_name("Updated");
        user = userRepo.save(user);
        Assertions.assertThat(user.getFirst_name()).isEqualTo("Updated");
    }

    @Test
    @Order(5)
    public void deleteUserById() {
        userRepo.deleteById(1);

        User user1 = null;
        Optional<User> user = userRepo.findById(1);

        if (user.isPresent()) {
            user1 = user.get();
        }
        Assertions.assertThat(user1).isNull();
    }
}