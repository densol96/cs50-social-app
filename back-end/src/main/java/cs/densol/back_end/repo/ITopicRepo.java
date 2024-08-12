package cs.densol.back_end.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cs.densol.back_end.models.Topic;
import java.util.List;
import java.time.LocalDateTime;

public interface ITopicRepo extends JpaRepository<Topic, Integer> {

    List<Topic> findAllByTitleContaining(Pageable pageable, String searchQuery);

    Long countAllByTitleContaining(String searchQuery);

}
