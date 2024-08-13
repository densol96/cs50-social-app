package cs.densol.back_end.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PublishPostDto(
                @NotBlank(message = "Post cannot be blank") @Size(min = 5, max = 1500, message = "Post's text should be 5-1500 characters long") String text) {

}
