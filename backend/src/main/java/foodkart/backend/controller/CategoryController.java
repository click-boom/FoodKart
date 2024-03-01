package foodkart.backend.controller;

import foodkart.backend.entity.Category;
import foodkart.backend.pojo.CategoryPojo;
import foodkart.backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("category")
@Service
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping(value = "/createCategory")
    public String saveCategory(@Valid @RequestBody CategoryPojo categoryPojo) {
        categoryService.saveCategory(categoryPojo);
        return "Saved successfully";
    }

    @GetMapping("/getAllCategories")
    public List<Category> getAll() {
        return this.categoryService.findAll();
    }

    @GetMapping("/getCategoryById/{id}")
    public Optional<Category> getById(@PathVariable("id") Integer id) {
        return this.categoryService.findById(id);
    }

    @DeleteMapping("/deleteCategoryById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        this.categoryService.deleteById(id);
    }

}
