package foodcart.controller;

import foodcart.pojo.AuthRequestPojo;
import foodcart.pojo.AuthResponsePojo;
import foodcart.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authenticateService;

    @PostMapping("/authenticate")
    public AuthResponsePojo authenticate(@RequestBody AuthRequestPojo authenticateRequest) {

        return authenticateService.authenticate(authenticateRequest);
    }

}

