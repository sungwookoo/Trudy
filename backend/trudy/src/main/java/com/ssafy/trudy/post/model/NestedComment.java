package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "nested_comments")
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"nestedCommentLikeList"})
public class NestedComment {
    
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment commentId;

    @ManyToOne(fetch = FetchType.LAZY)
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

    //DB에 없는 필드(대댓글 좋아요)

    @OneToMany(mappedBy = "nestedCommentId", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<NestedCommentLike> nestedCommentLikeList = new ArrayList<>();

}
