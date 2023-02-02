package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "comment_like")
public class CommentLike {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment commentId;
}
