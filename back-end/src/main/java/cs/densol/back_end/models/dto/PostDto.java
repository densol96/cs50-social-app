package cs.densol.back_end.models.dto;

import java.time.LocalDateTime;

public record PostDto(
                Integer postId,
                String authorUsername,
                LocalDateTime authorJoinDateTime,
                Integer authorTotalMessages,
                String postText,
                LocalDateTime postedDate,
                String authorAvatar) {

}
