package com.ssafy.trudy.post.model;

import com.ssafy.trudy.etc.model.Area;
import com.ssafy.trudy.etc.model.Sigungu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostCombine {
        //private PostWithMemeber postWithMemeber;

        private PostElement postElement;
        private MemberElement memberElement;
        private List<PostImageElement> postImageElement;
        private List<PostAreaElement> postAreaElements;
        private List<PostCategoryElement> postCategoryElements;

        //private postCategoryRequest postCategoryRequest;
       // private PostCategoryRequest postCategoryRequest;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostWithMemeber {
        private PostElement postElement;
        private MemberElement memberElement;
    }



//    @Data
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class PostRequest {
//
//        private Post post;
//        private PostArea postArea;
//        private PostCategory postCategory;
//        private PostImage postImage;
//    }



    //요소
    //post 요소
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostElement{
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
    public static class PostAreaElement{

        //private Sigungu sigungu;
        //private SigunguElement sigunguElement;

        private AreaElement areaElement;
        private SigunguElement sigunguElement;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AreaElement{
        private int code;
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SigunguElement{
        private Long id;
        private int code;
        //private AreaElement areaElement;
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostCategoryElement{
        //private Post postId;
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostImageElement{
        private Long id;
        //private Post postId;
        private String url;
    }

    //member 요소

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberElement{
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
