package foodkart.backend.service;

import foodkart.backend.pojo.CartPojo;
import foodkart.backend.entity.Cart;

import java.util.List;


public interface CartService {

    void saveCart(CartPojo cartPojo);

    List<Cart> findAll();

    List<Cart> findByUserId(Integer id);

    void deleteById(Integer id);
}
