package com.ssafy.trudy.model.post;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "post_category")
public class PostCategory {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post postId;

    @Column(length = 45)
    private String name;
}
