package com.ssafy.trudy.model.post;

import com.ssafy.trudy.model.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;
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
}
