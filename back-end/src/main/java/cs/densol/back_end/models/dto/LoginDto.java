package cs.densol.back_end.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDto(
        @NotBlank(message = "Email must not be blank") @Email(message = "Email must be valid") @Size(min = 4, max = 35, message = "Email length must be 4-35 characters long") String email,
        @NotBlank(message = "Password must not be blank") String password) {

}
