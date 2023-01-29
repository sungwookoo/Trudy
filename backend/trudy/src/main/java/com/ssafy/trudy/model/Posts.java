package com.ssafy.trudy.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

// 짱배의 똥칠
@Entity
@Data
public class Posts {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private int thumbnail_image_id;
}
