package foodkart.backend.service;






import foodkart.backend.entity.Category;
import foodkart.backend.pojo.CategoryPojo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public interface CategoryService {
    void saveCategory(CategoryPojo categoryPojo);

    List<Category> findAll();


    Optional<Category> findById(Integer id);

    void deleteById(Integer id);
}
