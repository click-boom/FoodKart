package foodkart.backend.service.impl;

import foodkart.backend.entity.User;
import foodkart.backend.pojo.AuthRequestPojo;
import foodkart.backend.pojo.AuthResponsePojo;
import foodkart.backend.repo.UserRepo;
import foodkart.backend.security.JWTService;
import foodkart.backend.service.AuthService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

        private final UserRepo userRepo;
        private final AuthenticationManager authenticationManager;
        private final JWTService jwtService;

        @Override
        public AuthResponsePojo authenticate(AuthRequestPojo authenticateRequest) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                authenticateRequest.getEmail(), authenticateRequest.getPassword()));

                User user = userRepo.getUserByEmail(authenticateRequest.getEmail())
                                .orElseThrow(() -> new EntityNotFoundException("User not found."));
                UserDetails userDetails = (UserDetails) user;
                String jwtToken = jwtService.generateToken(userDetails);
                return AuthResponsePojo.builder().token(jwtToken).userId(user.getId()).isAdmin(user.getId() == 1)
                                .build();
        }
}
