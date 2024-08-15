package cs.densol.back_end.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SecuritySettingsDto(
        @NotBlank(message = "Password must not be blank") @Pattern(regexp = "[A-Za-z0-9!@#$%^&]{8,20}", message = "Password must match the format") String newPassword,
        String currentPassword,
        String passwordConfirmation) {

}
