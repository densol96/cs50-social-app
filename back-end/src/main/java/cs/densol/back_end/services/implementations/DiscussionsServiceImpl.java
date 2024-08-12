package cs.densol.back_end.services.implementations;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;

import cs.densol.back_end.exceptions.AppException;
import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.Topic;
import cs.densol.back_end.models.dto.AuthorDto;
import cs.densol.back_end.models.dto.PostDto;
import cs.densol.back_end.models.dto.TopicDto;
import cs.densol.back_end.repo.IPostRepo;
import cs.densol.back_end.repo.ITopicRepo;
import cs.densol.back_end.services.IDiscussionsService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiscussionsServiceImpl implements IDiscussionsService {

    private final int RESULTS_PER_PAGE = 5;
    private final ITopicRepo topicRepo;
    private final IPostRepo postRepo;

    @Override
    public List<TopicDto> getAllTopics(Integer page, String searchTitle) {
        /*
         * pageNumber 0 corresponse to firstPage
         * => need to make a design-decision whether we subtract 1 from requestParam or
         * pass the expected pageNumber on theClient
         */
        page = page == null ? 0 : page - 1;
        if (page < 0)
            throw new AppException("Page parameter cannot be a less or equal to 0", HttpStatus.BAD_REQUEST);
        Pageable pageable = PageRequest.of(page, RESULTS_PER_PAGE, Sort.by("updatedAt").descending());

        List<Topic> results = searchTitle == null ? topicRepo.findAll(pageable).toList()
                : topicRepo.findAllByTitleContaining(pageable, searchTitle);
        return results.stream().map(topic -> mapTopicToDto(topic)).collect(Collectors.toList());
    }

    private TopicDto mapTopicToDto(Topic topic) {

        AuthorDto authorDto = new AuthorDto(topic.getAuthor().getActualUsername(), topic.getAuthor().getEmail());

        return new TopicDto(
                topic.getId(),
                topic.getTitle(),
                topic.getOriginalPost().getText(),
                authorDto,
                topic.getCreatedAt(),
                topic.getUpdatedAt(),
                topic.getPosts().size());
    }

    @Override
    public Long getPagesNumTotal() {
        return (long) Math.ceil(topicRepo.count() / (double) (RESULTS_PER_PAGE));
    }

    @Override
    public Long getPagesNumTotal(String searchTitle) {
        return (long) Math.ceil(topicRepo.countAllByTitleContaining(searchTitle) / (double) (RESULTS_PER_PAGE));
    }

    @Override
    public List<PostDto> getPostsForThePost(Integer topicId, Integer page) {
        if (topicId == null || topicId < 1 || page < 1)
            throw new AppException("Invalid request parameters", HttpStatus.BAD_REQUEST);
        page = page == null ? 0 : page - 1;
        Pageable pageable = PageRequest.of(page, RESULTS_PER_PAGE, Sort.by("createdAt").ascending());
        return postRepo.findByTopicId(topicId, pageable).stream().map(post -> postToDto(post))
                .collect(Collectors.toList());
    }

    private PostDto postToDto(Post post) {
        return new PostDto();
    }
}
