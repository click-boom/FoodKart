package foodkart.backend.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import foodkart.backend.entity.User;
import foodkart.backend.pojo.UserPojo;
import foodkart.backend.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public String signUp(@Valid @RequestBody UserPojo userPojo) {
        userService.createUser(userPojo);

        return "success";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getById/{id}")
    public Optional<User> getUserById(@PathVariable("id") Integer id) {
        return userService.getUserById(Integer.valueOf(id));
    }

    @GetMapping("/getUserContact/{id}")
    public String getUserContact(@PathVariable("id") Integer id) {
        return userService.getUserContact(Integer.valueOf(id));
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        userService.deleteUserById(Integer.valueOf(id));
    }
}
