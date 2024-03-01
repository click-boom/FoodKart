package foodkart.backend.service.impl;

import foodkart.backend.entity.Category;
import foodkart.backend.pojo.CategoryPojo;
import foodkart.backend.repo.CategoryRepo;
import foodkart.backend.service.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepo categoryRepo;
    @Override
    public void saveCategory(CategoryPojo categoryPojo){
        Category category;
        if(categoryPojo.getId()!=null) {
            category = categoryRepo.findById(categoryPojo.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + categoryPojo.getId()));
        }
        else{
            category = new Category();
        }
        category.setCategory(categoryPojo.getCategory());
        categoryRepo.save(category);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }
    @Override
    public void deleteById(Integer id) {
        categoryRepo.deleteById(id);
    }
    @Override
    public Optional<Category> findById(Integer id) {
        return categoryRepo.findById(id);
    }
}


