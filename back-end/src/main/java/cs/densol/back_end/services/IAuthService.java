package cs.densol.back_end.services;

import java.util.List;

import cs.densol.back_end.models.User;
import cs.densol.back_end.models.dto.JwtAfterLoginDto;
import cs.densol.back_end.models.dto.LoginDto;
import cs.densol.back_end.models.dto.MeDto;
import cs.densol.back_end.models.dto.RegisterDto;
import cs.densol.back_end.models.dto.ResponseDto;

public interface IAuthService {
    ResponseDto register(RegisterDto data);

    JwtAfterLoginDto login(LoginDto data);

    MeDto getMe();

    List<String> getCurrentlyActiveUsersNames();

    User extractUserFromCurrentRequest();
}
