package com.ssafy.trudy.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

// 짱배의 똥칠
@Entity
public class PostCategory {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}
