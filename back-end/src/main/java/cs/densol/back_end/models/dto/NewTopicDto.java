package cs.densol.back_end.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record NewTopicDto(
        @NotBlank @Pattern(regexp = "[A-Z][a-z0-9,.?!-\'\" ]{2,50}", message = "Topic title must start with an uppercase letter and be 3-51 characters long") String title,
        @NotBlank @Size(min = 5, max = 1500, message = "Topic's text should be 5-1500 characters long") String text) {

}
