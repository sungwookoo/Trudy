package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "comment_like")
@AllArgsConstructor
@NoArgsConstructor
public class CommentLike {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment commentId;

    public CommentLike(Member memberId, Comment commentId) {
        this.memberId = memberId;
        this.commentId = commentId;
    }
}
