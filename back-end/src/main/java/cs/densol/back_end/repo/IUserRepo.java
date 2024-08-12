package cs.densol.back_end.repo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cs.densol.back_end.models.User;

public interface IUserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> findByLastActiveIsGreaterThanEqual(LocalDateTime activeThreshold);
}
