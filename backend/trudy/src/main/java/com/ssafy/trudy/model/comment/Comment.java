package com.ssafy.trudy.model.comment;

import com.ssafy.trudy.model.member.Member;
import com.ssafy.trudy.model.post.Post;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post postId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @Column(nullable = false)
    private String content;

    @Column(name = "is_deleted")
    private byte isDeleted;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
