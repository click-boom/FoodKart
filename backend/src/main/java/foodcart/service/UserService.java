package foodcart.service;

import foodcart.entity.User;
import foodcart.pojo.UserPojo;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void saveUser(UserPojo userPojo);

    List<User> getAllData();

    Optional<User> getById(Integer id);

    void deleteById(Integer id);
}