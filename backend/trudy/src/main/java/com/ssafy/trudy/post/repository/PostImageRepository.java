package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostArea;
import com.ssafy.trudy.post.model.PostDto;
import com.ssafy.trudy.post.model.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostImageRepository extends JpaRepository<PostImage, Long> {
    public List<PostImage> findByPostId(Post post);

}
