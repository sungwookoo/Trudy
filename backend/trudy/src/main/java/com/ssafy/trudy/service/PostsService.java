package com.ssafy.trudy.service;

import com.ssafy.trudy.model.Posts;
import com.ssafy.trudy.repository.MemberRepository;
import com.ssafy.trudy.repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// 짱배의 똥칠
@Service
@Transactional
public class PostsService {
    @Autowired
    PostsRepository postsRepository;

    public List<Posts> allPosts() { return postsRepository.findAll();}
}
