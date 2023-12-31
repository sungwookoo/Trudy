package com.ssafy.trudy.post.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "post_category", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
@AllArgsConstructor
@NoArgsConstructor
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

    public PostCategory(CategoryName categoryName) {
        this.categoryName = categoryName;
    }

    //    private String name;
}
