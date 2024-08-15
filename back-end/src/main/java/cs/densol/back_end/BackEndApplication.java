package cs.densol.back_end;

import java.io.File;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import cs.densol.back_end.models.User;
import cs.densol.back_end.models.Post;
import cs.densol.back_end.models.Topic;
import cs.densol.back_end.repo.IPostRepo;
import cs.densol.back_end.repo.ITopicRepo;
import cs.densol.back_end.repo.IUserRepo;

@SpringBootApplication
public class BackEndApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	@Bean
	public CommandLineRunner populateDatabase(IUserRepo userRepo, PasswordEncoder encoder, ITopicRepo topicRepo,
			IPostRepo postRepo) {
		return (String... args) -> {
			// Create a user
			User me = new User("solodeni", encoder.encode("password123"),
					"solo@deni.com");
			userRepo.save(me);

			// 1 topic + 1 original post
			Topic newTopic = new Topic("My first thread", me);
			topicRepo.save(newTopic);
			Post postOne = new Post(me, "Hello, I am looking for friends!", newTopic);
			postRepo.save(postOne);
			newTopic.setOriginalPost(postOne);
			topicRepo.save(newTopic);

			// 2 more posts added
			Post postTwo = new Post(me, "I can be your friend!!", newTopic);
			Post postThree = new Post(me, "And me too!!", newTopic);
			newTopic.addPost(postTwo);
			newTopic.addPost(postThree);
			topicRepo.save(newTopic);

			// Generate more topic and posts
			for (int i = 0; i < 10; i++) {
				// Create a topic + original post
				Topic topic = new Topic(i < 8 ? "Topic one" : "Anime is nice", me);
				topicRepo.save(topic);
				Post p = new Post(me,
						"Has anyone tried the new software update? I'm noticing a significant improvement in performance, but still encountering some minor bugs. Curious to hear your thoughts!",
						topic);
				postRepo.save(p);
				topic.setOriginalPost(p);
				topicRepo.save(topic);
				if (i < 5) {
					for (int j = 0; j < 6; j++) {
						Post posty = new Post(me,
								"Has anyone tried the new software update? I'm noticing a significant improvement in performance, but still encountering some minor bugs. Curious to hear your thoughts!",
								topic);
						postRepo.save(posty);
					}
				} else {
					for (int j = 0; j < 12; j++) {
						Post posty = new Post(me,
								"Has anyone tried the new software update? I'm noticing a significant improvement in performance, but still encountering some minor bugs. Curious to hear your thoughts!",
								topic);
						postRepo.save(posty);
					}
				}
			}

			User u2 = new User("someman", encoder.encode("password123"),
					"man@deni.com");
			User u3 = new User("someguy", encoder.encode("password123"),
					"guy@deni.com");
			userRepo.saveAll(List.of(u2, u3));
		};
	}
}