package foodkart.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import foodkart.backend.service.CartService;
import foodkart.backend.pojo.CartPojo;
import foodkart.backend.entity.Cart;

import java.util.List;

@RequestMapping("/cart")
@RestController
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/saveToCart")
    public String saveCart(@Valid @RequestBody CartPojo cartPojo) {
        cartService.saveCart(cartPojo);
        return "data inserted into cart successfully ";
    }

    @GetMapping("/getAllCarts")
    public List<Cart> findAll() {
        return cartService.findAll();
    }

    @GetMapping("/geCartByUserId/{id}")
    public List<Cart> findById(@PathVariable("id") Integer id) {
        return cartService.findByUserId(id);
    }

    @DeleteMapping("/deleteCartById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        cartService.deleteById(id);
    }
}
