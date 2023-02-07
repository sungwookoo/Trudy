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

    @Column(name = "custom_image_file_name")
    private String customImageFileName;

    // place값이 들어오지 않을 때, custom place 생성자
    public DayItem(Day dayId, String memo, String sequence, String customTitle){
        this.dayId = dayId;
        this.memo = memo;
        this.sequence = sequence;
        this.customTitle = customTitle;
    }

    // place값이 들어올 때 만들 생성자
    public DayItem(Place placeId, Day dayId, String memo, String sequence, String customTitle, String customImage) {
        this.placeId = placeId;
        this.dayId = dayId;
        this.memo = memo;
        this.sequence = sequence;
        this.customTitle = customTitle;
        this.customImage = customImage;
    }
}
