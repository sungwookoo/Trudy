package com.ssafy.trudy.model.post;

import com.ssafy.trudy.model.member.Member;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

// 관계 빼고 완료
@Entity
@Data
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;
    private String title;
    private String content;
    @Column(name = "thumbnail_image_id")
    private int thumbnailImageId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
