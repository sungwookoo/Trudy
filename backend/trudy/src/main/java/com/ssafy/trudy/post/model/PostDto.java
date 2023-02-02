package com.ssafy.trudy.post.model;

import com.ssafy.trudy.address.model.Sigungu;
import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class PostDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostListResponse {
//        private Long id;
//        private String title;
//        private String content;
//        private int thumbnailImageId;
//        private LocalDateTime createdAt;
//        private LocalDateTime updatedAt;
        private PostRequest post;
        private MemberRequest member;
        private PostImageRequest postImageRequest;

        //private postCategoryRequest postCategoryRequest;
       // private PostCategoryRequest postCategoryRequest;


    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostInsertRequest {

        private PostRequest postRequest;
        private PostAreaRequest postAreaRequest;
        private PostCategoryRequest postCategoryRequest;
        private PostImageRequest postImageRequest;
    }



    //요소
    //post 요소
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostRequest{
        private Long id;
        //private Member memberId;
        private String title;
        private String content;
        private int thumbnailImageId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostAreaRequest{
        private Post post;
        private Sigungu sigunguCode;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostCategoryRequest{
        //private Post postId;
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostImageRequest{
        //private Post postId;
        private String imageId;
    }

    //member 요소

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberRequest{
        private Long id;
        private String email;
        private String name;
        private String image;
        private String gender;
        private String area;
        private String birth;
        private byte isLocal;
        private byte isPublic;
        private Timestamp lastAccess;
    }

}
