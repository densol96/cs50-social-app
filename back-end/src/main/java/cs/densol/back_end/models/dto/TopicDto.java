package cs.densol.back_end.models.dto;

import java.time.LocalDateTime;

import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.User;

public record TopicDto(
        Integer id,
        String title,
        String originalPost,
        AuthorDto author,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Integer totalMessages) {

}
