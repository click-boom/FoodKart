package foodkart.backend.service;

import foodkart.backend.pojo.AuthRequestPojo;
import foodkart.backend.pojo.AuthResponsePojo;

public interface AuthService {

    AuthResponsePojo authenticate(AuthRequestPojo authenticateRequest);
}
