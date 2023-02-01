package com.ssafy.trudy.post.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "post_images")
public class PostImage {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post postId;

    private String url;
}
