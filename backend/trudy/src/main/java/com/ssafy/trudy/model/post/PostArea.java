package com.ssafy.trudy.model.post;

import com.ssafy.trudy.model.address.Area;
import com.ssafy.trudy.model.address.Sigungu;
import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Table(name = "post_area")
public class PostArea {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post postId;

//    @OneToOne
//    @JoinColumn(name = "area_code")
//    private Area areaCode;

    @OneToOne
    @JoinColumn(name = "sigungu_code")
    private Sigungu sigunguCode;


//    @Column(length = 45)
//    private String name;
}
