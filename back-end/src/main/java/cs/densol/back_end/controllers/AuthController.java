package cs.densol.back_end.controllers;

import org.springframework.web.bind.annotation.RestController;

import cs.densol.back_end.models.dto.JwtAfterLoginDto;
import cs.densol.back_end.models.dto.LoginDto;
import cs.densol.back_end.models.dto.MeDto;
import cs.densol.back_end.models.dto.RegisterDto;
import cs.densol.back_end.models.dto.ResponseDto;

import cs.densol.back_end.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
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

    @GetMapping("/me")
    public ResponseEntity<MeDto> getMe() {
        return new ResponseEntity<>(service.getMe(), HttpStatus.OK);

    }

}
