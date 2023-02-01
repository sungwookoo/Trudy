package com.ssafy.trudy.post.model;

import com.ssafy.trudy.address.model.Sigungu;
import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDateTime;

public class PostDto {

    @Data
    @AllArgsConstructor
    public static class PostListResponse {
        private Long id;
        private Member member;
        private String title;
        private String content;
        private int thumbnailImageId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @AllArgsConstructor
    public static class PostInsertRequest {

        private PostRequest postRequest;
        private PostAreaRequest postAreaRequest;
        private PostCategoryRequest postCategoryRequest;
        private PostImageRequest postImageRequest;
    }



    //요소
    @Data
    @AllArgsConstructor
    public static class PostRequest{
        private Member memberId;
        private String title;
        private String content;
        private int thumbnailImageId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @AllArgsConstructor
    public static class PostAreaRequest{
        private Post post;
        private Sigungu sigunguCode;
    }


    @Data
    @AllArgsConstructor
    public static class PostCategoryRequest{
        private Post postId;
        private String name;
    }

    @Data
    @AllArgsConstructor
    public static class PostImageRequest{
        private Post postId;
        private String imageId;
    }


}
