package cs.densol.back_end.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cs.densol.back_end.models.dto.TopicDto;
import cs.densol.back_end.services.IDiscussionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/discussions")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class DiscussionsController {

    private final IDiscussionsService service;

    @GetMapping
    public List<TopicDto> getTopics(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) String title) {
        return service.getAllTopics(page);
    }
}
