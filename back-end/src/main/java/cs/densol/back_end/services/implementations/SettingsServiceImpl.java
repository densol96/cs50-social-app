package cs.densol.back_end.services.implementations;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cs.densol.back_end.exceptions.AppException;
import cs.densol.back_end.models.User;
import cs.densol.back_end.repo.IUserRepo;
import cs.densol.back_end.services.IAuthService;
import cs.densol.back_end.services.ISettingsService;
import lombok.RequiredArgsConstructor;

import java.io.File;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements ISettingsService {

    private final IAuthService authService;
    private final IUserRepo userRepo;
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

}
