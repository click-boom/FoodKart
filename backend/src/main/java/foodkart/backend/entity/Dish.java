package foodkart.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dishes")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Dish {
    @Id
    @SequenceGenerator(name = "dish_sequence_generator", sequenceName = "dish_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "dish_sequence_generator", strategy = GenerationType.SEQUENCE)

    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "dish", nullable = false)
    private String dish;

    @Column(name = "category_id", nullable = false)
    private Integer category_ID;

    @Column(name = "dish_image", nullable = false)
    private String dishImage;

    @Column(name = "price", nullable = false)
    private Double price;

}
