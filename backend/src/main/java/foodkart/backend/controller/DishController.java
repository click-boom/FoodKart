package foodkart.backend.controller;

import foodkart.backend.entity.Dish;
import foodkart.backend.pojo.DishPojo;
import foodkart.backend.service.DishService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("dish")
@RequiredArgsConstructor
public class DishController {

    private final DishService dishService;

    @PostMapping("/createDish")
    public String saveDish(@Valid @RequestBody @ModelAttribute DishPojo dishPojo) throws IOException {
        dishService.saveDish(dishPojo);
        return "Dish saved successfully";
    }

    @GetMapping("/findAllDishes")
    public List<Dish> findAll() {
        return dishService.findAllDishes();
    }

    @GetMapping("/findDishById/{id}")
    public Optional<Dish> getDishById(@PathVariable("id") Integer id) {
        return dishService.getDishById(id);
    }

    @DeleteMapping("/deleteDishById/{id}")
    public void deleteRestaurantById(@PathVariable("id") Integer id) {
        dishService.deleteDishById(id);
    }
}
