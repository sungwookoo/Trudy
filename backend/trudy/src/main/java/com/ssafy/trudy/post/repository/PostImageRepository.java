package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostImageRepository extends JpaRepository<PostImage, Long> {
}
