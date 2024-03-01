package foodkart.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tokenTable")
public class PasswordResetToken {
    @Id
    @SequenceGenerator(name = "token_sequence_generator", sequenceName = "token_id_sequence", allocationSize = 1)
    @GeneratedValue(generator = "token_sequence_generator", strategy = GenerationType.SEQUENCE)
    private int id;

    @Column(name = "token", nullable = false)
    private String token;

    @Column(name = "expiryDateTime", nullable = false)
    private LocalDateTime expiryDateTime;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

}