package com.ssafy.trudy.repository.post;

import com.ssafy.trudy.model.post.Post;

import java.util.List;

public interface SearchPostRepository {
    List<Post> getList();
}
