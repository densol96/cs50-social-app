package cs.densol.back_end.controllers;

import java.util.HashMap;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cs.densol.back_end.models.dto.BasicSettingsDto;
import cs.densol.back_end.models.dto.SecuritySettingsDto;
import cs.densol.back_end.services.ISettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class SettingsController {

    private final ISettingsService service;

    @PatchMapping("/avatar")
    @ResponseStatus(HttpStatus.OK)
    public HashMap<String, String> updateAvatar(@RequestParam(name = "image", required = false) MultipartFile file) {
        var json = new HashMap<String, String>();
        json.put("avatar", service.saveImage(file));
        return json;
    }

    @PatchMapping("/basic")
    @ResponseStatus(HttpStatus.OK)
    public void updateBasicInfo(@Valid @RequestBody BasicSettingsDto data) {
        service.updateBasicInfo(data);
    }

    @PatchMapping("/security")
    @ResponseStatus(HttpStatus.OK)
    public void updatePassword(@Valid @RequestBody SecuritySettingsDto data) {
        service.updateSecurityInfo(data);
    }
}
