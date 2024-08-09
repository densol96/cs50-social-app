package cs.densol.back_end.exceptions;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private HttpStatus statusCode;

    public AppException(String message, HttpStatus code) {
        super(message);
        this.statusCode = code;
    }
}
