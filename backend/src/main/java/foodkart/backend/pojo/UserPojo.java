package foodkart.backend.pojo;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserPojo {

    private Integer id;

    @NotEmpty(message = "First name can't be empty")
    private String first_name;

    @NotEmpty(message = "Last name can't be empty")
    private String last_name;

    @NotEmpty(message = "Username can't be empty")
    private String user_name;

    @NotEmpty(message = "Email can't be empty")
    private String email;

    @NotEmpty(message = "Phone number can't be empty")
    private String contact;

    @NotEmpty(message = "Password can't be empty")
    private String password;

}
