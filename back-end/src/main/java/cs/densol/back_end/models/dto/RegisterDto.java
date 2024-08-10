package cs.densol.back_end.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterDto(
		@NotBlank(message = "Full name must not be blank") @Pattern(regexp = "[A-Z][a-z]{1,15}( [A-Z][a-z]{1,15})?", message = "Full name must match theformat") String fullName,

		@NotBlank(message = "Password must not be blank") @Pattern(regexp = "[A-Za-z0-9!@#$%^&]{8,20}", message = "Password must match the format") String password,

		String passwordConfirm,

		@NotBlank(message = "Email must not be blank") @Email(message = "Email must be valid") @Size(min = 4, max = 35, message = "Email length must be 4-35 characters long") String email) {
}
