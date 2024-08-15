package cs.densol.back_end.services;

import org.springframework.web.multipart.MultipartFile;

public interface ISettingsService {

    String saveImage(MultipartFile file);
}
