package foodcart.service.impl;


import foodcart.entity.User;
import foodcart.pojo.AuthRequestPojo;
import foodcart.pojo.AuthResponsePojo;
import foodcart.repository.UserRepository;
import foodcart.security.JwtService;
import foodcart.service.AuthService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public AuthResponsePojo authenticate(AuthRequestPojo authenticateRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticateRequest.getEmail(), authenticateRequest.getPassword()
                )
        );

        User user= userRepo.getUserByEmail(authenticateRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        UserDetails userDetails = (UserDetails) user;
        String jwtToken = jwtService.generateToken(userDetails);
        return AuthResponsePojo.builder().token(jwtToken).userId(user.getId()).build();
    }
}
