package cs.densol.back_end.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "posts")
@Entity
@Data
@NoArgsConstructor
public class Post {
    @Setter(value = AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 5, max = 500, message = "Topic's text should be 5-500 characterslong")
    private String text;

    @ManyToOne
    @JoinColumn(name = "author_id")
    @NotNull
    private User author;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    @NotNull
    private Topic topic;

    @NotNull
    private LocalDateTime createdAt = LocalDateTime.now();

    public Post(User author, String text, Topic topic) {
        this.author = author;
        this.text = text;
        this.topic = topic;
    }
}
