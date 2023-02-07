package com.ssafy.trudy.post.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.trudy.member.model.Member;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.util.Lazy;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// 관계 빼고 완료
@Entity
@Data
@Table(name = "posts")
@ToString(exclude = {"commentList", "postImageList", "postCategoryList", "postAreaList","postLikeList"})
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(name = "thumbnail_image")
    private String thumbnailImage;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;



    //insert 전용 생성자
    public Post(Member memberId, String title, String content) {
        this.memberId = memberId;
        this.title = title;
        this.content = content;
    }

    ////////DB에 영향을 주지않는 필드(댓글, 사진, 카테고리, 게시글 좋아요)
    @OneToMany(mappedBy = "postId", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "postId", cascade = {CascadeType.ALL})
    private List<PostImage> postImageList = new ArrayList<>();

    @OneToMany(mappedBy = "postId", cascade = {CascadeType.ALL})
    private List<PostCategory> postCategoryList = new ArrayList<>();

    @OneToMany(mappedBy = "postId", cascade = {CascadeType.ALL})
    private List<PostArea> postAreaList = new ArrayList<>();

    @OneToMany(mappedBy = "postId", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<PostLike> postLikeList = new ArrayList<>();


}
