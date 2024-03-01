package foodkart.backend.repo;

import foodkart.backend.entity.Cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {
    @Modifying
    @Query(value = "delete from cart where user_id=?", nativeQuery = true)
    void deleteCartByUserId(Integer id);

    @Query(value = "select * from cart where user_id=?", nativeQuery = true)
    List<Cart> getCartByUserId(Integer id);

}
