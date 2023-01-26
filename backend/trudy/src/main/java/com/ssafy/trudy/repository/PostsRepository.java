package com.ssafy.trudy.repository;

import com.ssafy.trudy.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

// 짱배의 똥칠
public interface PostsRepository extends JpaRepository<Posts, Long> {
}
