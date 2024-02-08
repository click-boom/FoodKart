package foodcart.service.impl;

import foodcart.config.PasswordEncoderUtil;
import foodcart.entity.User;
import foodcart.pojo.UserPojo;
import foodcart.repository.UserRepository;
import foodcart.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public void saveUser(UserPojo userPojo) {

        User user = new User();

        if(userPojo.getId()!=null){
            user=userRepository.findById(userPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        user.setFirst_name(userPojo.getFirst_name());
        user.setLast_name(userPojo.getLast_name());
        user.setUser_name(userPojo.getUser_name());
        user.setEmail(userPojo.getEmail());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));



        userRepository.save(user);
    }

    @Override
    public List<User> getAllData() {
        return userRepository.findAll(); // select * from users
    }

    @Override
    public Optional<User> getById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}

