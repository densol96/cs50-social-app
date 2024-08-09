package cs.densol.back_end.exceptions;

import java.util.HashMap;

public record ErrorDto(
                String message,
                HashMap<String, String> errors) {
}
