package foodkart.backend.service.impl;

import foodkart.backend.util.ImageToBase64;
import foodkart.backend.entity.Cart;
import foodkart.backend.pojo.CartPojo;
import foodkart.backend.service.CartService;
import foodkart.backend.repo.CartRepo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepo cartRepository;
    ImageToBase64 imageToBase64 = new ImageToBase64();

    @Override
    public void saveCart(CartPojo cartPojo) {
        Cart cart = new Cart();
        if (cartPojo.getId() != null) {
            cart = cartRepository.findById(cartPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        }
        cart.setQuantity(cartPojo.getQuantity());
        cart.setUser_id(cartPojo.getUser_id());
        cart.setDish_id(cartPojo.getDish_id());
        
        cartRepository.save(cart);

    }

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public List<Cart> findByUserId(Integer id) {
        return cartRepository.getCartByUserId(id);
    }

    @Override
    public void deleteById(Integer id) {
        cartRepository.deleteById(id);
    }

}
