package cs.densol.back_end.services.implementations;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import cs.densol.back_end.services.IAuthService;
import cs.densol.back_end.services.JwtService;
import cs.densol.back_end.exceptions.AppException;
import cs.densol.back_end.exceptions.InvalidFieldsException;
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
        HashMap<String, String> fieldErrors = new HashMap<>();
        if (!data.password().equals(data.passwordConfirm())) {
            fieldErrors.put("passwordConfirm", "Passwords must match");
            throw new InvalidFieldsException(fieldErrors);
        }

        if (userRepo.existsByEmail(data.email())) {
            fieldErrors.put("email", "Email is already in use");
            throw new InvalidFieldsException(fieldErrors);
        }

        User user = new User();
        user.setEmail(data.email());
        user.setUsername(data.username());
        user.setPassword(passwordEncoder.encode(data.password()));
        userRepo.save(user);
        return new ResponseDto("You have succefully created the account");
    }

    @Override
    public JwtAfterLoginDto login(LoginDto data) {
        HashMap<String, String> fieldErrors = new HashMap<>();
        User user = userRepo.findByEmail(data.email())
                .orElseThrow(() -> {
                    fieldErrors.put("email", "No user found with this email");
                    throw new InvalidFieldsException(fieldErrors);
                });

        if (!passwordEncoder.matches(data.password(), user.getPassword())) {
            fieldErrors.put("password", "Incorrect password");
            throw new InvalidFieldsException(fieldErrors);
        }
        return new JwtAfterLoginDto(jwtService.generateToken(user));
    }

    @Override
    public User extractUserFromCurrentRequest() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null)
            throw new AppException("This is a protected route", HttpStatus.FORBIDDEN);
        return (User) auth.getPrincipal();
    }

    @Override
    public MeDto getMe() {
        User user = extractUserFromCurrentRequest();
        return new MeDto(user.getEmail(), user.getActualUsername());
    }

    @Override
    public List<String> getCurrentlyActiveUsersNames() {
        final int howManyLastMinutes = 5;
        return userRepo.findByLastActiveIsGreaterThanEqual(LocalDateTime.now().minusMinutes(howManyLastMinutes))
                .stream().map(user -> user.getActualUsername()).collect(Collectors.toList());
    }
}
