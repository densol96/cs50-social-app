package cs.densol.back_end.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import cs.densol.back_end.models.Post;

public interface IPostRepo extends JpaRepository<Post, Integer> {

}
