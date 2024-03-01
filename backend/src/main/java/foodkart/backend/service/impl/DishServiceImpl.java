
package foodkart.backend.service.impl;

import foodkart.backend.entity.Dish;
import foodkart.backend.pojo.DishPojo;
import foodkart.backend.repo.DishRepo;
import foodkart.backend.service.DishService;

import foodkart.backend.util.ImageToBase64;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DishServiceImpl implements DishService {

    private final DishRepo dishRepository;

    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir"))
            .append("/foodkart_app/dishImages").toString();

    ImageToBase64 imageToBase64 = new ImageToBase64();

    @Override
    public void saveDish(DishPojo dishPojo) throws IOException {
        Dish dish;
        if (dishPojo.getId() != null) {
            dish = dishRepository.findById(
                    dishPojo.getId())
                    .orElseThrow(
                            () -> new EntityNotFoundException(
                                    "Dish not found with ID: " + dishPojo.getId()));
        } else {
            dish = new Dish();
        }

        dish.setDish(dishPojo.getDish());
        dish.setCategory_ID(dishPojo.getCategory_ID());

        if (dishPojo.getDishImage() != null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY,
                    dishPojo.getDishImage().getOriginalFilename());
            fileNames.append(dishPojo.getDishImage().getOriginalFilename());
            Files.write(fileNameAndPath, dishPojo.getDishImage().getBytes());
            dish.setDishImage(dishPojo.getDishImage().getOriginalFilename());
        }
        dish.setPrice(dishPojo.getPrice());

        dishRepository.save(dish);
    }

    @Override
    public List<Dish> findAllDishes() {
        List<Dish> dishes = dishRepository.findAll();
        dishes = dishes.stream().map(dish -> {
            dish.setDishImage(
                    imageToBase64.getImageBase64("/dishImages/" + dish.getDishImage()));
            return dish;
        }).collect(Collectors.toList());
        return dishes;
    }

    @Override
    public Optional<Dish> getDishById(Integer id) {
        // Reuse the same logic as findAllDishes
        return dishRepository.findById(id).map(dish -> {
            dish.setDishImage(
                    imageToBase64.getImageBase64("/dishImages/" + dish.getDishImage()));
            return dish;
        });
    }

    @Override
    public void deleteDishById(Integer id) {
        dishRepository.deleteById(id);
    }


}
