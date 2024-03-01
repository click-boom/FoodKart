package foodkart.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @SequenceGenerator(name = "cart_item_sequence_generator", sequenceName = "cart_item_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "cart_item_sequence_generator", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer user_id;

    @Column(name = "dish_id", nullable = false)
    private Integer dish_id;


    @Column(name = "quantity", nullable = false, length = 255)
    private Integer quantity;

}