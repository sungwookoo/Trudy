package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.Post;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "comments")
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"nestedCommentList", "commentLikeList"})
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post postId;

    @ManyToOne(fetch = FetchType.LAZY)
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

    ////////DB에 없는 필드(대댓글, 댓글좋아요)
    @OneToMany(mappedBy = "commentId", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<NestedComment> nestedCommentList = new ArrayList<>();

    @OneToMany(mappedBy = "commentId", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<CommentLike> commentLikeList= new ArrayList<>();
}
