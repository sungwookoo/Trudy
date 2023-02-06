package com.ssafy.trudy.post.controller;

import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostDto;
import com.ssafy.trudy.post.repository.PostCategoryRepository;
import com.ssafy.trudy.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Tag(name = "post", description = "게시물 API")
@RestController
@RequestMapping("/api/post")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
public class PostController {

    private final PostService postService;

    ModelMapper modelMapper = new ModelMapper();

    //포럼 게시글 목록 가져오기
    @Operation(summary = "get posts", description = "포럼 게시글 목록 가져오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = Post.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping
    public ResponseEntity<?> postList(){

        try{
            log.info("========post Controller / postList===========");
            List<PostDto.PostCombine> findPostCombines = postService.findPostList();
            if(findPostCombines != null || !findPostCombines.isEmpty()){
                /*List<PostListResponse> response = findPostList.stream()
                        .map(p -> new PostListResponse(modelMapper.map(p, PostDto.PostRequest.class), modelMapper.map(p.getMemberId(), PostDto.MemberRequest.class), p.get) )
                        .collect(Collectors.toList());*/

                return ResponseEntity.ok().body(findPostCombines);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //포럼 게시글 작성
    @PostMapping
    public void postAdd(){
        //1. dto안에 dto를 key, body 형식으로 받아온다.
        postService.addPost();

    }

    //포럼 게시글 수정
    @PutMapping("/{post_id}")
    public void postModify(){

    }

    //포럼 게시글 삭제
    @DeleteMapping("/{post_id}")
    public void postRemove(@PathVariable("post_id") Long postId){
        postService.removePost(postId);
    }

    //포럼 게시글 상세보기 - 정상 동작
    @GetMapping("/{post_id}")
    public ResponseEntity<?> postDetail(@PathVariable("post_id") Long postId){

        try {
            log.info("post Detail");
            Map<String, Object> response = postService.findPostDetail(postId);

            if(!response.isEmpty() && response != null){

                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }

    //포럼 게시글 좋아요 - 정상 동작
    @PostMapping("/like/{member_id}/{post_id}")
    public void postLikeAdd(@PathVariable("member_id") Long memberId, @PathVariable("post_id") Long postId){
        postService.addPostLike(memberId, postId);
    }

    //포럼 게시글 댓글 작성 - 정상 동작
    @PostMapping("/comment/{member_id}/{post_id}")
    public void postCommentAdd(@PathVariable("member_id") Long memberId, @PathVariable("post_id") Long postId, @RequestParam("content") String content){
        postService.addPostComment(memberId, postId, content);
    }

    //포럼 댓글 좋아요 - 정상 동작
    @PostMapping("/comment/like/{member_id}/{comment_id}")
    public void postCommentLikeAdd(@PathVariable("member_id") Long memberId, @PathVariable("comment_id") Long commentId){
        postService.addPostCommentLike(memberId, commentId);
    }

    //댓글 삭제 - 정상 동작 - 수정해야 -> 대댓글 없으면 걍 날리는 걸로
    @DeleteMapping("/comment/{comment_id}")
    public void postCommentRemove(@PathVariable("comment_id") Long commentId){
        postService.removePostComment(commentId);
    }

    //대댓글 작성 - 정상 동작
    @PostMapping("/nested-comment/{member_id}/{comment_id}")
    public void postNestedCommentAdd(@PathVariable("member_id") Long memberId, @PathVariable("comment_id") Long commentId, @RequestParam("content") String content){
        postService.addPostNestedComment(memberId, commentId, content);
    }

    //대댓글 좋아요 - 정상 동작
    @PostMapping("/nested-comment/like/{member_id}/{nested_comment_id}")
    public void postNestedCommentLikeAdd(@PathVariable("member_id") Long memberId, @PathVariable("nested_comment_id") Long nestedCommentId){
        log.info("test1");
        postService.addPostNestedCommentLike(memberId, nestedCommentId);
    }

    //대댓글 삭제 - 정상 동작
    @DeleteMapping("/nested-comment/{nested_comment_id}")
    public void postNestedCommentRemove(@PathVariable("nested_comment_id") Long nestedCommentId){
        postService.removePostNestedComment(nestedCommentId);
    }


}
