package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.Post;

import java.util.List;

public interface SearchPostRepository {
    List<Post> getList();
}
