package cs.densol.back_end.exceptions;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorDto> handleNoSuchUserException(Exception e) {
        return new ResponseEntity<>(new ErrorDto("Request body is empty", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> handleValidationException(MethodArgumentNotValidException e) {
        HashMap<String, String> validationErrors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            validationErrors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(new ErrorDto("Invalid input", validationErrors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorDto> handleConstraintViolationException(ConstraintViolationException e) {
        HashMap<String, String> validationErrors = new HashMap<>();
        e.getConstraintViolations().forEach(error -> {
            String violatedColumnName = error.getPropertyPath().toString();
            validationErrors.put(violatedColumnName, error.getMessage());
        });
        return new ResponseEntity<ErrorDto>(new ErrorDto("Invalid input", validationErrors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorDto> handleExceptionFromCode(AppException e) {
        return new ResponseEntity<>(new ErrorDto(e.getMessage(), null), e.getStatusCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> handleExceptionFromCode(Exception e) {
        errorLog(e);
        return new ResponseEntity<>(new ErrorDto("Service is currently unavailable", null),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //

    private void errorLog(Exception e) {
        System.out.println("##### UNEXPECTED EXCEPTION ######");
        System.out.println("MESSAGE: " + e.getMessage());
        System.out.println("CAUSE: " + e.getCause());
        System.out.println("###############");
    }

}
