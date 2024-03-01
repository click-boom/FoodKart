package foodkart.backend.dish;

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

import foodkart.backend.entity.Dish;
import foodkart.backend.repo.DishRepo;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class DishTest {

    @Autowired
    private DishRepo dishRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveDish() {
        Dish dish = new Dish();
        dish.setDish("Pizza");
        dish.setCategory_ID(1);
        dish.setDishImage("pizza.jpg");
        dish.setPrice(9.99);
        dish = dishRepo.save(dish);

        Assertions.assertThat(dish.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findDishById() {
        Dish dish = dishRepo.findById(1).get();
        Assertions.assertThat(dish.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void findAllDishes() {
        List<Dish> dishList = dishRepo.findAll();
        Assertions.assertThat(dishList.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    public void updateDish() {
        Dish dish = dishRepo.findById(1).get();
        dish.setDish("Updated Dish");
        dish = dishRepo.save(dish);
        Assertions.assertThat(dish.getDish()).isEqualTo("Updated Dish");
    }

    @Test
    @Order(5)
    public void deleteDishById() {
        dishRepo.deleteById(1);

        Dish dish1 = null;
        Optional<Dish> dish = dishRepo.findById(1);

        if (dish.isPresent()) {
            dish1 = dish.get();
        }
        Assertions.assertThat(dish1).isNull();
    }
}