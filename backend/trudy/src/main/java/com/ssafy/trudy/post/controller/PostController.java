package com.ssafy.trudy.post.controller;

import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostDto;
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
    public String/*ResponseEntity<?>*/ postList(){
        //test
        postService.findPostList();
        //List<Post> findPostList = postService.findPostList();
        //List<PostListResponse> response = findPostList.stream()
//                .map(p -> new PostListResponse(
//                        p.getId(), p.getTitle(), p.getContent(), p.getThumbnailImageId(), p.getCreatedAt(), p.getUpdatedAt(),modelMapper.map(p.getMemberId(), PostDto.MemberRequest.class)
//                        /*p.getMemberId().getId(), p.getMemberId().getEmail(), p.getMemberId().getName(), p.getMemberId().getImage(), p.getMemberId().getGender(), p.getMemberId().getArea(),
//                            p.getMemberId().getBirth(), p.getMemberId().getIsLocal(), p.getMemberId().getIsPublic(), p.getMemberId().getLastAccess()*/ ))
//                .map(p -> new PostListResponse(modelMapper.map(p, PostDto.PostRequest.class), modelMapper.map(p.getMemberId(), PostDto.MemberRequest.class)))
//                .collect(Collectors.toList());

        //return response;

//        try{
//            List<Post> findPostList = postService.findPostList();
//            if(findPostList != null || !findPostList.isEmpty()){
//                /*List<PostListResponse> response = findPostList.stream()
//                        .map(p -> new PostListResponse(modelMapper.map(p, PostDto.PostRequest.class), modelMapper.map(p.getMemberId(), PostDto.MemberRequest.class), p.get) )
//                        .collect(Collectors.toList());*/
//
//                return ResponseEntity.ok().body("response");
//            } else {
//                return ResponseEntity.noContent().build();
//            }
//        } catch (Exception e){
//            e.getStackTrace();
//            return ResponseEntity.internalServerError().build();
//        }
        return "test end";

    }

    //포럼 게시글 작성
//    @PostMapping
//    public void postAdd(@RequestBody PostDto.Post postDto){
//        //1. dto안에 dto를 key, body 형식으로 받아온다.
//        postService.addPost(postDto);
//    }

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
    public ResponseEntity<?> postDetail(@PathVariable("post_id") Long postId){

        //존재하는지 확인 후 전송
        try{
            Optional<Post> findPost = postService.findPostDetail(postId);

            if(findPost.get() != null || findPost.isPresent()){
                Post p = findPost.get();
//                //PostListResponse postListResponse = new PostListResponse(p.getId(), p.getTitle(), p.getContent(), p.getThumbnailImageId(), p.getCreatedAt(), p.getUpdatedAt(), modelMapper.map(p.getMemberId(), PostDto.MemberRequest.class) );
//                PostListResponse postListResponse = new PostListResponse(modelMapper.map(p, PostDto.PostRequest.class), modelMapper.map(p.getMemberId(), PostDto.MemberRequest.class) );
                return ResponseEntity.ok().body("postListResponse");
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
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
