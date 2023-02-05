package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "comments")
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
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

    public Comment(Post postId, Member memberId, String content, byte isDeleted, LocalDateTime createdAt) {
        this.postId = postId;
        this.memberId = memberId;
        this.content = content;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
    }
}
