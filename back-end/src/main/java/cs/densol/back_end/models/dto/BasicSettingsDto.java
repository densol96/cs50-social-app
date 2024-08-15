package cs.densol.back_end.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record BasicSettingsDto(
        @NotBlank(message = "Username must not be blank / empty") @Pattern(regexp = "[a-z0-9]{4,25}", message = "Username can only contain lowercase letters and numbers and be 4-25 characters long") String username,
        @NotBlank(message = "Email must not be blank") @Email(message = "Email must be valid") @Size(min = 4, max = 35, message = "Email length must be 4-35 characters long") String email) {

}
