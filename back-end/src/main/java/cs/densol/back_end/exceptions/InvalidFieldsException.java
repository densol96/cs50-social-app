package cs.densol.back_end.exceptions;

import java.util.HashMap;

import lombok.Getter;

@Getter
public class InvalidFieldsException extends RuntimeException {
    private final HashMap<String, String> errors;

    public InvalidFieldsException(HashMap<String, String> errors) {
        super();
        this.errors = errors;
    }
}
