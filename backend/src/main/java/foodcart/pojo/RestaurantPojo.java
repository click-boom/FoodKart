package foodcart.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantPojo {
    private Integer id;

    @NotNull(message = "restaurant name is required")
    private String restaurant;

    @NotNull
    private String description;

    @NotNull
    private String image;
}
