package foodkart.backend.pojo;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderPojo {
    private Integer id;
    private Integer userId;
    private Integer dishId;
    private BigDecimal price;
    private Integer quantity;
    private String deliveryDate;
    private String deliveryTime;
    private String deliveryStatus;

}
