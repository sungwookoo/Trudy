package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostArea;
import com.ssafy.trudy.post.model.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {
    public List<PostCategory> findByPostId(Post post);

    void deleteByPostId(Post postEntityFind);
}
