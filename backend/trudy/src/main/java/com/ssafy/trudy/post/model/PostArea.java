package com.ssafy.trudy.post.model;

import com.ssafy.trudy.etc.model.Sigungu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Data
@Table(name = "post_area")
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
