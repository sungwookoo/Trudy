package com.ssafy.trudy.post.model;

import com.ssafy.trudy.etc.model.Area;
import com.ssafy.trudy.etc.model.Sigungu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    //포럼 글(post) 1개의 전체 정보 별 전달할 요소DTO
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostCombine {

        private PostElement postElement;
        private MemberElement memberElement;
        private List<PostImageElement> postImageElementList;
        private List<PostAreaElement> postAreaElementList;
        private List<PostCategoryElement> postCategoryElementList;

        private int postLikeCount;

    }


    //요소DTO 모음
    //post 내부 요소---------------------------------------------------------------------
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostElement{
        private Long id;
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

        private AreaElement areaElement;
        private SigunguElement sigunguElement;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostCategoryElement{
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostImageElement{
        private Long id;
        private String url;
    }

    //member 요소-----------------------
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

    //area, sigungu 요소----------------
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
        private String name;
    }
}
