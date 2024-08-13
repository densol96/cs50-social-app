package cs.densol.back_end.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import cs.densol.back_end.models.dto.PublishPostDto;
import cs.densol.back_end.models.dto.PublishedPostDto;
import cs.densol.back_end.models.dto.TopicDto;
import cs.densol.back_end.services.IDiscussionsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/discussions")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class DiscussionsController {

    private final IDiscussionsService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public HashMap<String, Object> getTopics(
            @RequestParam(required = false, name = "page") Integer page,
            @RequestParam(required = false, name = "searchTitle") String searchTitle) {
        List<TopicDto> topicsPerPage = service.getAllTopics(page, searchTitle);
        Long pagesTotal = searchTitle == null ? service.getPagesNumTotalPerDiscussions()
                : service.getPagesNumTotalPerDiscussions(searchTitle);
        HashMap<String, Object> json = new HashMap<>();
        json.put("topics", topicsPerPage);
        json.put("pagesTotal", pagesTotal);
        return json;
    }

    @GetMapping("/{topicId}")
    @ResponseStatus(HttpStatus.OK)
    public HashMap<String, Object> getTopicPosts(
            @PathVariable(name = "topicId") Integer topicId,
            @RequestParam(required = false, name = "page") Integer page) {
        HashMap<String, Object> json = new HashMap<>();
        json.put("posts", service.getPostsForTheTopic(topicId, page));
        json.put("pagesTotal", service.getPagesNumPerTopic(topicId));
        return json;
    }

    @PostMapping("/{topicId}")
    @ResponseStatus(HttpStatus.OK)
    public PublishedPostDto getTopicPosts(@Valid @RequestBody PublishPostDto body,
            @PathVariable(name = "topicId") Integer topicId) {
        return service.publishPost(body.text(), topicId);
    }
}
