package com.ssafy.trudy.post.model;

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

    @Column(name = "name", length = 45)
    @Enumerated(EnumType.STRING)
    private CategoryName categoryName;
//    private String name;
}
