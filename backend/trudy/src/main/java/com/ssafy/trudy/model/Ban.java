package com.ssafy.trudy.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
//jonghyun
@Entity
@Data
public class Ban {
    @Id
    @GeneratedValue
    private int id;

    private int ban_from;

    private int ban_to;
}
