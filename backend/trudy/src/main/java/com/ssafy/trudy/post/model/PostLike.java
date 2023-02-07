package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "post_like")
@AllArgsConstructor
@NoArgsConstructor
public class PostLike {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post postId;

    public PostLike(Member memberId, Post postId) {
        this.memberId = memberId;
        this.postId = postId;
    }
}
