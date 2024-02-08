package foodcart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;


@Getter
@Entity
@Setter

@Table(name="users")
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name = "user_sequence_generator", sequenceName = "user_id_sequence",allocationSize = 1)
    @GeneratedValue(generator="user_sequence_generator", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name="first_name", nullable = false, length = 255)
    private String first_name;

    @Column(name="last_name", nullable = false)
    private String last_name;

    @Column(name="user_name", nullable = false)
    private String user_name;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            foreignKey = @ForeignKey(name = "FK_users_roles_userId"),
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseForeignKey = @ForeignKey(name = "FK_users_roles_roleId"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            uniqueConstraints = @UniqueConstraint(name = "UNIQUE_users_roles_userIdRoleId",
                    columnNames = {"user_id", "role_id"})
    )
    private Collection<Role> roles;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList());
    }





    @Override
    public String getUsername() {
        return this.user_name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

