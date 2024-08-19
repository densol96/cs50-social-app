package cs.densol.back_end.services.implementations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;

import cs.densol.back_end.exceptions.AppException;
import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.Topic;
import cs.densol.back_end.models.User;
import cs.densol.back_end.models.dto.AuthorDto;
import cs.densol.back_end.models.dto.PostDto;
import cs.densol.back_end.models.dto.PublishedPostDto;
import cs.densol.back_end.models.dto.TopicDto;
import cs.densol.back_end.repo.IPostRepo;
import cs.densol.back_end.repo.ITopicRepo;
import cs.densol.back_end.repo.IUserRepo;
import cs.densol.back_end.services.DiscussionsMapper;
import cs.densol.back_end.services.IAuthService;
import cs.densol.back_end.services.IDiscussionsService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiscussionsServiceImpl implements IDiscussionsService {

    private final int RESULTS_PER_PAGE = 5;
    private final ITopicRepo topicRepo;
    private final IPostRepo postRepo;
    private final IAuthService authService;
    private final IUserRepo userRepo;
    private final DiscussionsMapper mapper;

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
        return results.stream().map(topic -> mapper.topicToDto(topic)).collect(Collectors.toList());
    }

    @Override
    public Long getPagesNumTotalPerDiscussions() {
        return (long) Math.ceil(topicRepo.count() / (double) (RESULTS_PER_PAGE));
    }

    @Override
    public Long getPagesNumTotalPerDiscussions(String searchTitle) {
        return (long) Math.ceil(topicRepo.countAllByTitleContaining(searchTitle) / (double) (RESULTS_PER_PAGE));
    }

    @Override
    public List<PostDto> getPostsForTheTopic(Integer topicId, Integer page) {
        if (topicId == null || topicId < 1)
            throw new AppException("Invalid request topicId parameter", HttpStatus.BAD_REQUEST);
        page = page == null ? 0 : page - 1;
        if (page < 0)
            throw new AppException("Invalid request page parameter", HttpStatus.BAD_REQUEST);
        if (!topicRepo.existsById(topicId)) {
            throw new AppException("No topic with such id", HttpStatus.BAD_REQUEST);
        }
        Pageable pageable = PageRequest.of(page, RESULTS_PER_PAGE, Sort.by("createdAt").ascending());
        return postRepo.findByTopicId(topicId, pageable).stream().map(post -> mapper.postToDto(post))
                .collect(Collectors.toList());
    }

    @Override
    public Integer getPagesNumPerTopic(Integer topicId) {
        return (int) Math.ceil(postRepo.countAllByTopicId(topicId) / (double) RESULTS_PER_PAGE);
    }

    @Override
    public PublishedPostDto publishPost(String text, Integer topicId) {
        // Text validated on the Dto level
        if (topicId < 1)
            throw new AppException("Invalid topic id format (cannot be negative)", HttpStatus.BAD_REQUEST);
        Topic topic = topicRepo.findById(topicId).orElseThrow(
                () -> new AppException("No topic with such id", HttpStatus.BAD_REQUEST));
        User postAuthor = authService.extractUserFromCurrentRequest();
        Post newPost = new Post(postAuthor, text, topic);
        postRepo.save(newPost);
        postAuthor.incrementPostsTotal();
        userRepo.save(postAuthor);
        topic.setUpdatedAt(LocalDateTime.now());
        topicRepo.save(topic);
        /*
         * I want to send back the totalPageNum as it might have changed by adding a new
         * post
         * and my client logic relies on it to redirect to the last page after
         * submitting a new post.
         */
        return new PublishedPostDto(newPost.getId(), getPagesNumPerTopic(topicId));

    }

    @Override
    public void createNewTopic(String title, String text) {
        User topicAuthor = authService.extractUserFromCurrentRequest();
        Topic newTopic = new Topic(title, topicAuthor);
        topicRepo.save(newTopic);
        Post originalPost = new Post(topicAuthor, text, newTopic);
        postRepo.save(originalPost);
        newTopic.setOriginalPost(originalPost);
        topicRepo.save(newTopic);
        topicAuthor.incrementPostsTotal();
        userRepo.save(topicAuthor);
    }
}
