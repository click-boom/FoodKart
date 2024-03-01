package foodkart.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Category {
    @Id
    @SequenceGenerator(name = "category_sequence_generator", sequenceName = "category_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "category_sequence_generator", strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "category", nullable = false)
    private String category;

}
