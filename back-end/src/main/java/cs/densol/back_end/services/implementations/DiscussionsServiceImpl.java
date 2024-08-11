package cs.densol.back_end.services.implementations;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;

import cs.densol.back_end.exceptions.AppException;
import cs.densol.back_end.models.Topic;
import cs.densol.back_end.models.dto.AuthorDto;
import cs.densol.back_end.models.dto.TopicDto;
import cs.densol.back_end.repo.ITopicRepo;
import cs.densol.back_end.services.IDiscussionsService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiscussionsServiceImpl implements IDiscussionsService {

    private final int RESULTS_PER_PAGE = 5;
    private final ITopicRepo topicRepo;

    @Override
    public List<TopicDto> getAllTopics(Integer page) {
        /*
         * pageNumber 0 corresponse to firstPage
         * => need to make a design-decision whether we subtract 1 from requestParam or
         * pass the expected pageNumber on theClient
         */
        page = page == null ? 0 : page - 1;
        if (page < 0)
            throw new AppException("Page parameter cannot be a less or equal to 0", HttpStatus.BAD_REQUEST);
        Pageable pageable = PageRequest.of(page, RESULTS_PER_PAGE, Sort.by("updatedAt").descending());
        // if [] => thats perfectly fine
        return topicRepo.findAll(pageable).stream().map(topic -> mapTopicToDto(topic)).collect(Collectors.toList());
    }

    private TopicDto mapTopicToDto(Topic topic) {

        AuthorDto authorDto = new AuthorDto(topic.getAuthor().getFullName(), topic.getAuthor().getEmail());

        return new TopicDto(
                topic.getId(),
                topic.getTitle(),
                topic.getOriginalPost().getText(),
                authorDto,
                topic.getCreatedAt(),
                topic.getUpdatedAt(),
                topic.getPosts().size());
    }
}
