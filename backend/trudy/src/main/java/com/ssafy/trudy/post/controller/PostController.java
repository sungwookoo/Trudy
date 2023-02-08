package com.ssafy.trudy.post.controller;

import com.ssafy.trudy.post.model.CategoryName;
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
import org.springframework.web.multipart.MultipartFile;

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

    @Operation(summary = "get posts", description = "포럼 게시글 목록 가져오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = Post.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })

    //포럼 게시글 목록 가져오기 - 정상 동작
    @GetMapping
    public ResponseEntity<?> postList(){
        try{
            List<PostDto.PostCombine> findPostCombines = postService.findPostList();
            if(findPostCombines != null || !findPostCombines.isEmpty()){
                return ResponseEntity.ok().body(findPostCombines);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //포럼 게시글 작성 - 정상 동작
    @PostMapping
    public ResponseEntity<?> postAdd(/*@RequestParam String title,
                        @RequestParam String content,
//                        @RequestParam MultipartFile[] upload,
                        @RequestParam Long[] sigunguIdList,
                        @RequestParam Long memberId,
                        @RequestParam CategoryName[] categoryList*/
            /*@RequestBody PostDto.InsertPost insertPostDto*/
            @RequestParam(value="upload", required = false) MultipartFile[] upload){



        try{
            //        postService.addPost(title, content, upload, sigunguId, memberId, category);
            //postService.addPost(title, content, sigunguIdList,memberId, categoryList);
            //postService.addPost(insertPostDto);
            log.info("============== test complete ===========");

            log.info("check : " + upload[0].getOriginalFilename());
            //log.info(insertPostDto.getUpload().toString());
            log.info("controller ========== try ok");
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            log.info("controller ========== try bad");
            return ResponseEntity.ok().build();
        }
    }

    //포럼 게시글 수정 - 정상 동작
    @PutMapping("/{post_id}")
    public ResponseEntity<?> postModify(@PathVariable("post_id") Long postId,
                           /*@RequestParam String title,
                           @RequestParam String content,
//                        @RequestParam MultipartFile[] upload,
                           @RequestParam Long[] sigunguIdList,
                           @RequestParam CategoryName[] categoryList*/
                                @RequestBody PostDto.InsertPost insertPostDto){
        try{
            //postService.modifyPost(postId, title, content, sigunguIdList, categoryList);
            postService.modifyPost(postId, insertPostDto);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //포럼 게시글 삭제 - 정상 작동
    @DeleteMapping("/{post_id}")
    public ResponseEntity<?> postRemove(@PathVariable("post_id") Long postId){
        try{
            postService.removePost(postId);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //포럼 게시글 상세보기 - 정상 동작
    @GetMapping("/{post_id}")
    public ResponseEntity<?> postDetail(@PathVariable("post_id") Long postId){

        try {
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
    public ResponseEntity<?> postLikeAdd(@PathVariable("member_id") Long memberId, @PathVariable("post_id") Long postId){
        try{
            postService.addPostLike(memberId, postId);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //포럼 게시글 댓글 작성 - 정상 동작
    @PostMapping("/comment/{member_id}/{post_id}")
    public ResponseEntity<?> postCommentAdd(@PathVariable("member_id") Long memberId, @PathVariable("post_id") Long postId, @RequestParam("content") String content){
        try{
            postService.addPostComment(memberId, postId, content);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //포럼 댓글 좋아요 - 정상 동작
    @PostMapping("/comment/like/{member_id}/{comment_id}")
    public ResponseEntity<?> postCommentLikeAdd(@PathVariable("member_id") Long memberId, @PathVariable("comment_id") Long commentId){
        try{
            postService.addPostCommentLike(memberId, commentId);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //댓글 삭제 - 정상 동작 - 수정해야 -> 대댓글 없으면 걍 날리는 걸로
    @DeleteMapping("/comment/{comment_id}")
    public ResponseEntity<?> postCommentRemove(@PathVariable("comment_id") Long commentId){
        try{
            postService.removePostComment(commentId);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //대댓글 작성 - 정상 동작
    @PostMapping("/nested-comment/{member_id}/{comment_id}")
    public ResponseEntity<?> postNestedCommentAdd(@PathVariable("member_id") Long memberId, @PathVariable("comment_id") Long commentId, @RequestParam("content") String content){
        try{
            postService.addPostNestedComment(memberId, commentId, content);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //대댓글 좋아요 - 정상 동작
    @PostMapping("/nested-comment/like/{member_id}/{nested_comment_id}")
    public ResponseEntity<?> postNestedCommentLikeAdd(@PathVariable("member_id") Long memberId, @PathVariable("nested_comment_id") Long nestedCommentId){
        try{
            postService.addPostNestedCommentLike(memberId, nestedCommentId);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //대댓글 삭제 - 정상 동작
    @DeleteMapping("/nested-comment/{nested_comment_id}")
    public ResponseEntity<?> postNestedCommentRemove(@PathVariable("nested_comment_id") Long nestedCommentId){
        try{
            postService.removePostNestedComment(nestedCommentId);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


}
