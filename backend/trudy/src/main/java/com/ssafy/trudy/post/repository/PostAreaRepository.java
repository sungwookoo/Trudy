package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostArea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostAreaRepository extends JpaRepository<PostArea, Long> {
    public List<PostArea> findByPostId(Post post);

    public void deleteByPostId(Post postId);

}
