package foodcart.service;

import foodcart.pojo.AuthRequestPojo;
import foodcart.pojo.AuthResponsePojo;

public interface AuthService {

    AuthResponsePojo authenticate(AuthRequestPojo authenticateRequest);
}
