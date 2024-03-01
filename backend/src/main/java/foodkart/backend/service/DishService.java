package foodkart.backend.service;

import foodkart.backend.entity.Dish;
import foodkart.backend.pojo.DishPojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface DishService {

    void saveDish(DishPojo productPojo) throws IOException;

    List<Dish> findAllDishes();

    Optional<Dish> getDishById(Integer id);

    void deleteDishById(Integer id);
}
