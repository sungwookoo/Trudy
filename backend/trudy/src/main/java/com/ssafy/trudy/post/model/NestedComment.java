package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "nested_comments")
@AllArgsConstructor
@NoArgsConstructor
public class NestedComment {
    
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment commentId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;
    
    private String content;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public NestedComment(Comment commentId, Member memberId, String content, LocalDateTime createdAt) {
        this.commentId = commentId;
        this.memberId = memberId;
        this.content = content;
        this.createdAt = createdAt;
    }
}
