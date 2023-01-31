package com.ssafy.trudy.repository.like;

import com.ssafy.trudy.model.like.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
}
