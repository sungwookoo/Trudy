package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.Post;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "post_like")
public class PostLike {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post postId;
}
