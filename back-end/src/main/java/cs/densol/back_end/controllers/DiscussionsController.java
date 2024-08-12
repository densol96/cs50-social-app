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
    public HashMap<String, Object> getTopics(
            @RequestParam(required = false, name = "page") Integer page,
            @RequestParam(required = false, name = "searchTitle") String searchTitle) {
        List<TopicDto> topicsPerPage = service.getAllTopics(page, searchTitle);
        Long pagesTotal = searchTitle == null ? service.getPagesNumTotal() : service.getPagesNumTotal(searchTitle);
        HashMap<String, Object> json = new HashMap<>();
        json.put("topics", topicsPerPage);
        json.put("pagesTotal", pagesTotal);
        return json;
    }
}
