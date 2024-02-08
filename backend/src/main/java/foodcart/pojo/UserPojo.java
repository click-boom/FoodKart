package foodcart.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {
    private Integer id;

    @NotNull(message="first name is required")
    private String first_name;

    @NotNull
    private String last_name;

    @NotNull
    private String user_name;

    @NotNull
    private String email;

    @NotNull
    private String password;
}
