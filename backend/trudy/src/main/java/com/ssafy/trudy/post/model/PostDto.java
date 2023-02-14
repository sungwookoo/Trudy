package com.ssafy.trudy.post.model;

import com.ssafy.trudy.etc.model.Area;
import com.ssafy.trudy.etc.model.Sigungu;
import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

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
    @Builder
    public static class PostCombine {
        private PostElement postElement;
        private MemberElement memberElement;
        private int postLikeCount;
        private List<Long> sigunguCodeList;
        private List<String> categoryNameList;
    }

    //포럼 글 마다 댓글+좋아요 개수, 댓글의 대댓글+좋아요 구조로 가져옴
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class CommentCombine{
        private List<CommentElement> commentElementList;
    }

    //포럼 글 받기
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InsertPost{
        private String title;
        private String content;
        private Long[] sigunguIdList;
        private Long memberId;
        private String[] categoryList;
        private String thumbnailImage;
    }


    /////////////////////////////////////////////////////

    //요소DTO 모음
    //Comment
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CommentElement{
        //1. comment 내용
        private Long id;
        private String content;
        private byte isDeleted;
        private LocalDateTime createdAt;

        //2. 필요한 member 정보만 전달
        private CustomMemberForComment customMemberForComment;

        //3. Comment like count
        private int commentLikeCount;

        //4. 해당 comment에 대한 nested_comment list
        private List<NestedCommentElement> nestedCommentList;
    }

    //Nested_comment
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NestedCommentElement{
        //1. nested_comment 정보
        private Long id;

        private String content;
        private LocalDateTime createdAt;

        //2. nested_comment를 작성한 member custom 정보
        private CustomMemberForComment customMemberForComment;

        //3. nested_comment_like count
        private int nestedCommentLikeCount;
    }

    //Custom Comment Member
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CustomMemberForComment{
        private Long id;
        private String name;
        private String image;
    }



    //post 내부 요소---------------------------------------------------------------------
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PostElement{
        private Long id;
        private String title;
        private String content;
        private String thumbnailImage;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PostImageElement{
        private Long id;
        private String url;
    }

    //member 요소-----------------------
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MemberElement{
        private Long id;
        private String email;
        private String name;
        private String image;
        private String gender;
        private Long areaCode;
        private Long sigunguCode;
        private String birth;
        private String isLocal;
        private String isPublic;
        private LocalDateTime lastAccess;
    }

    //area, sigungu 요소----------------
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class AreaElement{
        private int code;
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class SigunguElement{
        private Long id;
        private int code;
        private String name;
    }
}
