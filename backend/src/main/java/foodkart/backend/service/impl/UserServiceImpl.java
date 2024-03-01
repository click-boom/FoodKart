package foodkart.backend.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.stereotype.Service;

import foodkart.backend.config.PasswordEncoderUtil;
import foodkart.backend.entity.User;
import foodkart.backend.pojo.UserPojo;
import foodkart.backend.repo.UserRepo;
import foodkart.backend.service.UserService;
import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    @Override
    public void createUser(UserPojo userPojo) {

        User user = new User();

        if (userPojo.getId() != null) {
            user = userRepo.findById(userPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        }

        user.setFirst_name(userPojo.getFirst_name());
        user.setLast_name(userPojo.getLast_name());
        user.setUser_name(userPojo.getUser_name());
        user.setEmail(userPojo.getEmail());
        user.setContact(userPojo.getContact());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));

        userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepo.findById(id);
    }

    @Override
    public void deleteUserById(Integer id) {
        userRepo.deleteById(id);
    }
    @Override
    public String getUserContact(Integer id) {
        return userRepo.getUserContact(id);
    }

}
