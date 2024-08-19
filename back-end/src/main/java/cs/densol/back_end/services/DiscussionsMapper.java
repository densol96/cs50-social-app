package cs.densol.back_end.services;

import org.springframework.stereotype.Service;

import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.Topic;
import cs.densol.back_end.models.dto.AuthorDto;
import cs.densol.back_end.models.dto.PostDto;
import cs.densol.back_end.models.dto.TopicDto;

@Service
public class DiscussionsMapper {
    public TopicDto topicToDto(Topic topic) {

        if (topic == null) {
            throw new NullPointerException("Topic cannot be null");
        }

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

    public PostDto postToDto(Post post) {

        if (post == null) {
            throw new NullPointerException("Post cannot be null");
        }

        return new PostDto(
                post.getId(),
                post.getAuthor().getActualUsername(),
                post.getAuthor().getJoinDateTime(),
                post.getAuthor().getPostsTotal(),
                post.getText(),
                post.getCreatedAt(),
                post.getAuthor().getAvatar());
    }
}
