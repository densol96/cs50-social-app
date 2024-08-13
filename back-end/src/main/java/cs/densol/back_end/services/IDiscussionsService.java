package cs.densol.back_end.services;

import java.util.List;

import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.dto.PostDto;
import cs.densol.back_end.models.dto.PublishedPostDto;
import cs.densol.back_end.models.dto.TopicDto;

public interface IDiscussionsService {

    List<TopicDto> getAllTopics(Integer page, String searchTitle);

    Long getPagesNumTotalPerDiscussions();

    Long getPagesNumTotalPerDiscussions(String searchTitle);

    List<PostDto> getPostsForTheTopic(Integer topicId, Integer page);

    Integer getPagesNumPerTopic(Integer topicId);

    PublishedPostDto publishPost(String text, Integer topicId);

}
