package foodkart.backend.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartPojo {
    private Integer id;

    @NotNull
    private Integer user_id;

    @NotNull
    private Integer dish_id;

    @NotNull
    private Integer quantity;

}
