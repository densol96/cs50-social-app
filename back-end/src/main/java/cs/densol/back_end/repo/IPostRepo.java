package cs.densol.back_end.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import cs.densol.back_end.models.Post;
import java.util.List;

public interface IPostRepo extends JpaRepository<Post, Integer> {

    List<Post> findByTopicId(Integer topicId, Pageable pageable);
}
