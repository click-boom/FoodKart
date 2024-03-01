package foodkart.backend.controller;

import foodkart.backend.pojo.AuthRequestPojo;
import foodkart.backend.pojo.AuthResponsePojo;
import foodkart.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authenticateService;

    @PostMapping("/signin")
    public AuthResponsePojo authenticate(@RequestBody AuthRequestPojo authenticateRequest) {

        return authenticateService.authenticate(authenticateRequest);
    }

}
