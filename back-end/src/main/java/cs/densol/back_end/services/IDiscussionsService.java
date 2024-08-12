package cs.densol.back_end.services;

import java.util.List;

import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.dto.PostDto;
import cs.densol.back_end.models.dto.TopicDto;

public interface IDiscussionsService {

    List<TopicDto> getAllTopics(Integer page, String searchTitle);

    Long getPagesNumTotal();

    Long getPagesNumTotal(String searchTitle);

    List<PostDto> getPostsForThePost(Integer postId, Integer page);
}
