package com.ssafy.trudy.post.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// 관계 빼고 완료
@Entity
@Data
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(name = "thumbnail_image")
    private String thumbnailImage;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    ////////DB에 영향을 주지않을 것들
    @OneToMany(mappedBy = "postId")
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "postId")
    private List<PostImage> postImageList = new ArrayList<>();

    @OneToMany(mappedBy = "postId")
    private List<PostCategory> postCategoryList = new ArrayList<>();

    @OneToMany(mappedBy = "postId")
    private List<PostLike> postLikeList = new ArrayList<>();

}
