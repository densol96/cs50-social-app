package cs.densol.back_end;

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
			User me = new User("Deniss Solovjovs", encoder.encode("password123"),
					"solo@deni.com");
			userRepo.save(me);

			Topic newTopic = new Topic("My first thread", me);
			topicRepo.save(newTopic);
			Post postOne = new Post(me, "Hello, I am looking for friends!", newTopic);
			postRepo.save(postOne);
			newTopic.setOriginalPost(postOne);
			topicRepo.save(newTopic);

			Post postTwo = new Post(me, "I can be your friend!!", newTopic);
			Post postThree = new Post(me, "And me too!!", newTopic);
			newTopic.addPost(postTwo);
			newTopic.addPost(postThree);
			topicRepo.save(newTopic);

			// Additional topics
			Topic t1 = new Topic("Davidka", me);
			topicRepo.save(t1);
			Post p1 = new Post(me, "jknjknew", t1);
			postRepo.save(p1);
			t1.setOriginalPost(p1);
			topicRepo.save(t1);

			for (int i = 0; i < 10; i++) {
				Topic topic = new Topic(i < 5 ? "Topic one" : "Anime is nice", me);
				topicRepo.save(topic);
				Post p = new Post(me, "jknjknew", topic);
				postRepo.save(p);
				topic.setOriginalPost(p);
				topicRepo.save(topic);
			}

		};
	}
}