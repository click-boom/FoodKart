package foodcart.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Restaurant {
    @Id
    @SequenceGenerator(name = "restaurant_sequence_genenrator", sequenceName = "restaurant_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "restaurant_sequence_genenrator", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String restaurant;

    @Column(name = "description", nullable = false)
    private String description;
    
    @Column(name = "image", nullable = false)
    private String image;
}
