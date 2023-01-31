package com.ssafy.trudy.controller;

import com.ssafy.trudy.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post")
@Slf4j
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    //포럼 게시글 목록 가져오기
    @GetMapping
    public void postList(){

    }

    //포럼 게시글 작성
    @PostMapping
    public void postAdd(){

    }

    //포럼 게시글 수정
    @PutMapping("/{post_id}")
    public void postModify(){

    }

    //포럼 게시글 삭제
    @DeleteMapping("/{post_id}")
    public void postRemove(){

    }

    //포럼 게시글 상세보기
    @GetMapping("/{post_id}")
    public void postDetail(){

    }

    //포럼 게시글 좋아요
    @PostMapping("/like/{member_id}/{post_id}")
    public void postLikeAdd(){

    }

    //포럼 게시글 댓글 작성
    @PostMapping("/comment/{post_id}")
    public void postCommentAdd(){

    }

    //댓글 삭제
    @DeleteMapping("/comment/{comment_id}")
    public void postCommentRemove(){

    }

    //대댓글 작성
    @PostMapping("/nested-comment/{member_id}/{comment_id}")
    public void postNestedCommentAdd(){

    }

    //대댓글 좋아요
    @PostMapping("/nested-comment/like/{member_id}/{nested_comment_id}")
    public void postNestedCommentLikeAdd(){

    }

    //대댓글 삭제
    @DeleteMapping("/nested-comment/{nested_comment_id}")
    public void postNestedCommentRemove(){

    }


}
