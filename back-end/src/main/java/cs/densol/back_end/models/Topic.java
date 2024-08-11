package cs.densol.back_end.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import cs.densol.back_end.models.Post;

@Entity
@Table(name = "topics")
@NoArgsConstructor
@Data
public class Topic {
    @Setter(value = AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Pattern(regexp = "[A-Z][a-z0-9,.?!-\'\" ]{2,50}", message = "Topic title must start with an uppercase letter and be 3-51 characters long")
    private String title;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Post originalPost;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL)
    List<Post> posts;

    @ManyToOne
    @NotNull
    private User author;

    @NotNull
    private LocalDateTime createdAt = LocalDateTime.now();

    @NotNull
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Topic(String title, User author) {
        this.title = title;
        this.author = author;
    }

    public void setOriginalPost(Post post) {
        if (originalPost != null) {
            throw new RuntimeException("This topic already has an original post!");
        }

        if (post.getTopic().getId() != this.getId()) {
            throw new RuntimeException("The provided post does not belong to this topic!");
        }

        this.originalPost = post;
    }

    public void addPost(Post post) {
        if (posts == null) {
            posts = new ArrayList<Post>();
        }
        updatedAt = LocalDateTime.now();
        posts.add(post);
    }
}