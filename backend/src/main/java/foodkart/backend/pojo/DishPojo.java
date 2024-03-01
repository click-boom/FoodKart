package foodkart.backend.pojo;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DishPojo {

    private Integer id;

    @NotNull
    private String dish;

    @NotNull
    private Integer category_ID;

    private MultipartFile dishImage;

    @NotNull
    private Double price;
}
