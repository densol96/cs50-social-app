package cs.densol.back_end.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import cs.densol.back_end.models.Topic;
import java.util.List;
import java.time.LocalDateTime;

public interface ITopicRepo extends JpaRepository<Topic, Integer> {

}
