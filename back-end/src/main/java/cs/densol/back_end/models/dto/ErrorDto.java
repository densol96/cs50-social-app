package cs.densol.back_end.models.dto;

import java.util.HashMap;

public record ErrorDto(
        String message,
        HashMap<String, String> errors) {
}
