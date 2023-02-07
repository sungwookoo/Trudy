package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.Comment;
import com.ssafy.trudy.post.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    public List<Comment> findByPostId(Post postEntity);
}
