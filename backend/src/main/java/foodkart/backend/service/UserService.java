package foodkart.backend.service;

import java.util.List;
import java.util.Optional;

import foodkart.backend.entity.User;
import foodkart.backend.pojo.UserPojo;

public interface UserService {
    void createUser(UserPojo userPojo);

    List<User> getAllUsers();

    Optional<User> getUserById(Integer id);

    void deleteUserById(Integer id);

    String getUserContact(Integer id);


}
