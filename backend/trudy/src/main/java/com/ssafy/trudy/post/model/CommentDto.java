package com.ssafy.trudy.post.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentDto {

    public static class CommentCombine{
        private Long id;

        private String content;
        private byte isDeleted;
        private LocalDateTime createdAt;
    }


    //element
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Comment{
        private Long id;

        private String content;
        private byte isDeleted;
        private LocalDateTime createdAt;
    }

}


