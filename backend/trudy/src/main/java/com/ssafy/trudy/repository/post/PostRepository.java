package com.ssafy.trudy.repository.post;

import com.ssafy.trudy.model.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
