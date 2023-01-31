package com.ssafy.trudy.model.comment;

import com.ssafy.trudy.model.member.Member;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "nested_comments")
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
}
