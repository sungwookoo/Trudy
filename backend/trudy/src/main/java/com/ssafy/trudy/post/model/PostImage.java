package com.ssafy.trudy.post.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "post_images")
@NoArgsConstructor
public class PostImage {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post postId;

    private String url;

    @Column(name = "file_name")
    private String fileName;

    @Builder
    public PostImage(Long id, Post postId, String url) {
        this.id = id;
        this.postId = postId;
        this.url = url;
    }
}
