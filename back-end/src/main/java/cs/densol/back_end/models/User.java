package cs.densol.back_end.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import cs.densol.back_end.models.enums.Role;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Data
public class User implements UserDetails {

    @Setter(value = AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Username must not be blank / empty")
    @Pattern(regexp = "[a-z0-9]{4,25}", message = "Username can only contain lwoercase letters and numbers and be 4-25 characters long")
    private String username;

    @NotBlank(message = "Password must not be blank")
    // In DB password will be hashed => leave the regexp for Dto
    private String password;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be valid")
    @Size(min = 4, max = 35, message = "Email length must be 4-35 characters long")
    private String email;

    @NotNull(message = "Role cannot be null")
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    private LocalDateTime joinDateTime = LocalDateTime.now();

    private LocalDateTime lastActive;

    @Min(value = 0, message = "Total posts number cannot be a negative value")
    @Max(value = 50000, message = "Total posts number is unlikely to be more than 50000")
    private Integer postsTotal = 0;

    private String avatar;

    public User(String username, String encodedPassword, String email) {
        this.username = username;
        this.password = encodedPassword;
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getActualUsername() {
        return username;
    }

    public void incrementPostsTotal() {
        postsTotal++;
    }

}
