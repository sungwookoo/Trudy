package com.ssafy.trudy.service;

import com.ssafy.trudy.model.post.Post;
import com.ssafy.trudy.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    //포럼 게시글 목록 가져오기
    public List<Post> findPostList(){
        List<Post> post = postRepository.findAll();
        return post;
    }

    //포럼 게시글 작성
    public void addPost(){
    }

    //포럼 게시글 수정
    public void modifyPost(){

    }

    //포럼 게시글 삭제
    public void removePost(){

    }

    //포럼 게시글 상세보기
    public void findPostDetail(){

    }

    //포럼 게시글 좋아요
    public void addPostLike(){

    }

    //포럼 게시글 댓글 작성
    public void addPostComment(){

    }

    //댓글 삭제
    public void removePostComment(){

    }

    //대댓글 작성
    public void addPostNestedComment(){

    }

    //대댓글 좋아요
    public void addPostNestedCommentLike(){

    }

    //대댓글 삭제
    public void removePostNestedComment(){

    }

}
