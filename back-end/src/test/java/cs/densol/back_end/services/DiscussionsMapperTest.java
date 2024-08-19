package cs.densol.back_end.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.Topic;
import cs.densol.back_end.models.User;
import cs.densol.back_end.models.dto.PostDto;
import cs.densol.back_end.models.dto.TopicDto;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Collections;

public class DiscussionsMapperTest {

    private DiscussionsMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new DiscussionsMapper();
    }

    @Test
    void testTopicToDto_valid() {
        User author = mock(User.class);
        Post post = mock(Post.class);
        Topic topic = mock(Topic.class);

        Integer id = 1;
        String title = "title";
        String text = "text";
        String actualUsername = "actualUsername";
        String email = "email";

        when(topic.getId()).thenReturn(id);
        when(topic.getTitle()).thenReturn(title);
        when(topic.getOriginalPost()).thenReturn(post);
        when(post.getText()).thenReturn(text);
        when(topic.getAuthor()).thenReturn(author);
        when(author.getActualUsername()).thenReturn(actualUsername);
        when(author.getEmail()).thenReturn(email);
        when(topic.getCreatedAt()).thenReturn(LocalDateTime.now());
        when(topic.getUpdatedAt()).thenReturn(LocalDateTime.now());
        when(topic.getPosts()).thenReturn(Collections.emptyList());

        TopicDto dto = mapper.topicToDto(topic);

        assertNotNull(dto);
        assertEquals(id, dto.id());
        assertEquals(title, dto.title());
        assertEquals(text, dto.originalPost());
        assertEquals(actualUsername, dto.author().username());
        assertEquals(email, dto.author().email());
        assertEquals(0, dto.totalMessages());
    }

    @Test
    void testTopicToDto_invalid() {
        NullPointerException thrown = assertThrows(NullPointerException.class, () -> mapper.topicToDto(null));
        assertEquals("Topic cannot be null", thrown.getMessage());
    }

    @Test
    void testPostToDto_valid() {
        User author = mock(User.class);
        Post post = mock(Post.class);

        Integer postId = 1;
        String username = "username";
        Integer postsTotal = 2;
        String text = "text";
        String avatar = "avatar";

        when(post.getId()).thenReturn(postId);
        when(post.getAuthor()).thenReturn(author);
        when(author.getActualUsername()).thenReturn(username);
        when(author.getJoinDateTime()).thenReturn(LocalDateTime.now());
        when(author.getPostsTotal()).thenReturn(postsTotal);
        when(post.getText()).thenReturn(text);
        when(post.getCreatedAt()).thenReturn(LocalDateTime.now());
        when(author.getAvatar()).thenReturn(avatar);

        PostDto dto = mapper.postToDto(post);

        assertEquals(postId, dto.postId());
        assertEquals(username, dto.authorUsername());
        assertNotNull(dto.authorJoinDateTime());
        assertEquals(postsTotal, dto.authorTotalMessages());
        assertEquals(text, dto.postText());
        assertNotNull(dto.postedDate());
        assertEquals(avatar, dto.authorAvatar());
    }

    @Test
    void testPostToDto_invalid() {
        NullPointerException thrown = assertThrows(NullPointerException.class, () -> mapper.postToDto(null));
        assertEquals("Post cannot be null", thrown.getMessage());
    }
}
