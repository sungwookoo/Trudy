package com.ssafy.trudy.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
// jonghyun
@Entity
@Data
public class Follow {

    @Id
    @GeneratedValue
    private int id;

    private int follow_from;

    private int follow_to;
}
