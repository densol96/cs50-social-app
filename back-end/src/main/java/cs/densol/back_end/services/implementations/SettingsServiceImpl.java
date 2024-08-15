package cs.densol.back_end.services.implementations;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cs.densol.back_end.exceptions.AppException;
import cs.densol.back_end.exceptions.InvalidFieldsException;
import cs.densol.back_end.models.User;
import cs.densol.back_end.models.dto.BasicSettingsDto;
import cs.densol.back_end.models.dto.SecuritySettingsDto;
import cs.densol.back_end.repo.IUserRepo;
import cs.densol.back_end.services.IAuthService;
import cs.densol.back_end.services.ISettingsService;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements ISettingsService {

    private final IAuthService authService;
    private final IUserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final String uploadPath = "/home/solodeni/studying/cs_50_stuff/cs50-social-app/back-end/src/main/resources/static/images/";

    @Override
    public String saveImage(MultipartFile file) {
        User currentUser = authService.extractUserFromCurrentRequest();

        if (file == null) {
            currentUser.setAvatar(null);
            /*
             * On client side, if user.avatar is null => /images/default.jpg is requested
             * 
             * Also, could delete the file from the system, but then it will get overwritten
             * on the next file upload anyway since I am using the specific file naming
             * approch (userId + ".jpg")
             */
        } else {
            if (!file.getContentType().startsWith("image/")) {
                throw new AppException("Inavlid image file format", HttpStatus.BAD_REQUEST);
            }
            File directory = new File(uploadPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            File targetFileOnDisk = new File(uploadPath + currentUser.getId() + ".jpg");
            try {
                // Files.write(targetFileOnDisk);
                file.transferTo(targetFileOnDisk);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                throw new RuntimeException("Unable to save the image to disk");
            }
            currentUser.setAvatar(currentUser.getId() + ".jpg");
        }
        userRepo.save(currentUser);
        return currentUser.getAvatar();
    }

    @Override
    public void updateBasicInfo(BasicSettingsDto data) {
        User currentUser = authService.extractUserFromCurrentRequest();
        String username = data.username();
        String email = data.email();

        var errors = new HashMap<String, String>();

        if (!currentUser.getActualUsername().equals(username) && userRepo.existsByUsername(username)) {
            errors.put("username", "This username is taken");
            throw new InvalidFieldsException(errors);
        }

        if (!currentUser.getEmail().equals(email) && userRepo.existsByEmail(email)) {
            errors.put("email", "This email is taken");
            throw new InvalidFieldsException(errors);
            // throw new AppException("This email is taken", HttpStatus.BAD_REQUEST);
        }
        currentUser.setEmail(email);
        currentUser.setUsername(username);
        userRepo.save(currentUser);
    }

    @Override
    public void updateSecurityInfo(SecuritySettingsDto data) {

        User currentUser = authService.extractUserFromCurrentRequest();

        String currentPassword = data.currentPassword();
        String newPassword = data.newPassword();
        String confirmationPassword = data.passwordConfirmation();

        if (!newPassword.equals(confirmationPassword)) {
            System.out.println(!newPassword.equals(confirmationPassword));
            System.out.println(newPassword + " --- " + confirmationPassword);
            throw new AppException("New password and confirmation do not match", HttpStatus.BAD_REQUEST);

        }

        if (!passwordEncoder.matches(currentPassword, currentUser.getPassword())) {
            throw new AppException("Incorrect current password", HttpStatus.BAD_REQUEST);
        }

        currentUser.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(currentUser);
    }
}
