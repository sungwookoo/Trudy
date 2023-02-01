package com.ssafy.trudy.repository.post;

import com.ssafy.trudy.model.post.Post;
import com.ssafy.trudy.model.post.PostDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, SearchPostRepository {
}
