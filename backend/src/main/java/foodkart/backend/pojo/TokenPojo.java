package foodkart.backend.pojo;

import java.time.LocalDateTime;

import foodkart.backend.entity.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenPojo {
    private Integer id;

    @NotEmpty(message = "First name can't be empty")
    private LocalDateTime expiryDatetime;

    @NotEmpty(message = "First name can't be empty")
    private String token;

    @NotEmpty(message = "Last name can't be empty")
    private User user;

}
