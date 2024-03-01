package foodkart.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.ui.Model;

import foodkart.backend.config.PasswordEncoderUtil;
import foodkart.backend.entity.PasswordResetToken;
import foodkart.backend.entity.User;
import foodkart.backend.pojo.UserPojo;
import foodkart.backend.repo.TokenRepo;
import foodkart.backend.repo.UserRepo;
import foodkart.backend.service.TokenService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class ResetController {

    private final UserRepo userRepo;
    private final TokenRepo tokenRepository;
    private final TokenService tokenService;

    @PostMapping("/forgotPassword")
    public boolean forgotPassordProcess(@RequestBody UserPojo userPojo) {
        String output = "";
        User user = userRepo.getUserByEmail(userPojo.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        if (user != null) {
            output = tokenService.sendEmail(userPojo.getEmail());
        }
        if (output.equals("success")) {
            return true;
        }
        return false;
    }

    @GetMapping("/resetPassword/{token}")
    public boolean resetPasswordForm(@PathVariable String token, Model model) {
        PasswordResetToken reset = tokenRepository.findByToken(token);

        if (reset != null && tokenService.hasExipred(reset.getExpiryDateTime())) {
            model.addAttribute("email", reset.getUser().getEmail());
            return true;
        }
        return false;
    }

    @PostMapping("/resetPassword")
    public boolean passwordResetProcess(@RequestBody UserPojo userPojo) {
        User user = userRepo.getUserByEmail(userPojo.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        if (user != null) {
            user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));
            userRepo.save(user);
        }
        return true;
    }

}
