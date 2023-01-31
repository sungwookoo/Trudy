package com.ssafy.trudy.model.like;

import com.ssafy.trudy.model.comment.NestedComment;
import com.ssafy.trudy.model.member.Member;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "nested_comment_like")
public class NestedCommentLike {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "nested_comment_id")
    private NestedComment nestedCommentId;
}
