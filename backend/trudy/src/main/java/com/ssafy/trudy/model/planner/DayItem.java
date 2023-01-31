package com.ssafy.trudy.model.planner;

import com.ssafy.trudy.model.place.Place;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "day_items")
public class DayItem {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place placeId;

    @ManyToOne
    @JoinColumn(name = "day_id")
    private Day dayId;

    private String memo;

    @Column(length = 45)
    private String sequence;

    @Column(name = "custom_title")
    private String customTitle;

    @Column(name = "custom_image")
    private String customImage;
}
