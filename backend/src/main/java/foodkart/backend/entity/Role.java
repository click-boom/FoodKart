package foodkart.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @SequenceGenerator(name = "role_sequence_generator", sequenceName = "role_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "role_sequence_generator", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "role", nullable = false)
    private String role;
}
