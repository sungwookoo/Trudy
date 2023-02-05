package com.ssafy.trudy.planner.model;

import com.ssafy.trudy.place.model.Place;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "day_items")
@NoArgsConstructor
@AllArgsConstructor
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

    public DayItem(Place placeId, Day dayId, String memo, String sequence, String customTitle, String customImage) {
        this.placeId = placeId;
        this.dayId = dayId;
        this.memo = memo;
        this.sequence = sequence;
        this.customTitle = customTitle;
        this.customImage = customImage;
    }
}
