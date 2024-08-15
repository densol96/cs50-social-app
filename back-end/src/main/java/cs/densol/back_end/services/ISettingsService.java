package cs.densol.back_end.services;

import org.springframework.web.multipart.MultipartFile;

import cs.densol.back_end.models.dto.BasicSettingsDto;
import cs.densol.back_end.models.dto.SecuritySettingsDto;

public interface ISettingsService {

    String saveImage(MultipartFile file);

    void updateBasicInfo(BasicSettingsDto data);

    void updateSecurityInfo(SecuritySettingsDto data);
}
