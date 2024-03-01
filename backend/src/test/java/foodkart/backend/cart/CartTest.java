package foodkart.backend.cart;

import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import foodkart.backend.entity.Cart;
import foodkart.backend.repo.CartRepo;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CartTest {

    @Autowired
    private CartRepo cartRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveCart() {
        Cart cart = new Cart();
        cart.setUser_id(1);
        cart.setDish_id(1);
        cart.setQuantity(2);
        cart = cartRepo.save(cart);

        Assertions.assertThat(cart.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findCartById() {
        Cart cart = cartRepo.findById(1).get();
        Assertions.assertThat(cart.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void findAllCarts() {
        List<Cart> cartList = cartRepo.findAll();
        Assertions.assertThat(cartList.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    public void updateCart() {
        Cart cart = cartRepo.findById(1).get();
        cart.setQuantity(3);
        cart = cartRepo.save(cart);
        Assertions.assertThat(cart.getQuantity()).isEqualTo(3);
    }

    @Test
    @Order(5)
    public void deleteCartById() {
        cartRepo.deleteById(1);

        Cart cart1 = null;
        Optional<Cart> cart = cartRepo.findById(1);

        if (cart.isPresent()) {
            cart1 = cart.get();
        }
        Assertions.assertThat(cart1).isNull();
    }

    @Test
    @Order(6)
    public void deleteCartByUserId() {
        cartRepo.deleteCartByUserId(1);

        List<Cart> carts = cartRepo.getCartByUserId(1);
        Assertions.assertThat(carts).isEmpty();
    }

    @Test
    @Order(7)
    public void getCartByUserId() {
        List<Cart> carts = cartRepo.getCartByUserId(1);
        Assertions.assertThat(carts).isNotEmpty();
    }
}