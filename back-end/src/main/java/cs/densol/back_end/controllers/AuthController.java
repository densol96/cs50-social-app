package cs.densol.back_end.controllers;

import org.springframework.web.bind.annotation.RestController;

import cs.densol.back_end.models.dto.JwtAfterLoginDto;
import cs.densol.back_end.models.dto.LoginDto;
import cs.densol.back_end.models.dto.RegisterDto;
import cs.densol.back_end.models.dto.ResponseDto;

import cs.densol.back_end.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService service;

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(@Valid @RequestBody RegisterDto data) {
        return new ResponseEntity<>(service.register(data), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAfterLoginDto> login(@Valid @RequestBody LoginDto data) {
        return new ResponseEntity<>(service.login(data), HttpStatus.OK);
    }

}
