package cs.densol.back_end.services;

import java.util.List;

import cs.densol.back_end.models.dto.TopicDto;

public interface IDiscussionsService {

    public List<TopicDto> getAllTopics(Integer page);
}
