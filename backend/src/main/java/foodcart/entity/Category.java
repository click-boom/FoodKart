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
public class Category {
    @Id
    @SequenceGenerator(name = "category_sequence_genenrator", sequenceName = "category_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "category_sequence_genenrator", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String category;
}
