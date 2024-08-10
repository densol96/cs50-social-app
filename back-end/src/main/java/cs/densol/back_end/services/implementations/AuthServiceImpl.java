package cs.densol.back_end.services.implementations;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import cs.densol.back_end.services.IAuthService;
import cs.densol.back_end.services.JwtService;
import cs.densol.back_end.exceptions.AppException;
import cs.densol.back_end.models.User;
import cs.densol.back_end.models.dto.JwtAfterLoginDto;
import cs.densol.back_end.models.dto.LoginDto;
import cs.densol.back_end.models.dto.MeDto;
import cs.densol.back_end.models.dto.RegisterDto;
import cs.densol.back_end.models.dto.ResponseDto;
import cs.densol.back_end.repo.IUserRepo;

/*
 * All the input validation is handled on the Dto level with @Valid in the controller + RestControlerAdvice 
 * used for Global Exceptions Handling
 */

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final IUserRepo userRepo;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseDto register(RegisterDto data) {
        if (!data.password().equals(data.passwordConfirm()))
            throw new AppException("Password and confirmation must match", HttpStatus.BAD_REQUEST);

        if (userRepo.existsByEmail(data.email()))
            throw new AppException("Email is already in use", HttpStatus.BAD_REQUEST);

        User user = new User();
        user.setEmail(data.email());
        user.setFullName(data.fullName());
        user.setPassword(passwordEncoder.encode(data.password()));
        userRepo.save(user);
        return new ResponseDto("You have succefully created the account");
    }

    @Override
    public JwtAfterLoginDto login(LoginDto data) {
        User user = userRepo.findByEmail(data.email())
                .orElseThrow(() -> new AppException("No user found with this email", HttpStatus.BAD_REQUEST));

        if (!passwordEncoder.matches(data.password(), user.getPassword()))
            throw new AppException("Incorrect password", HttpStatus.BAD_REQUEST);

        return new JwtAfterLoginDto(jwtService.generateToken(user));
    }

    @Override
    public MeDto getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null)
            throw new AppException("This is a protected route", HttpStatus.FORBIDDEN);
        User user = (User) auth.getPrincipal();
        return new MeDto(user.getEmail(), user.getFullName());
    }
}
