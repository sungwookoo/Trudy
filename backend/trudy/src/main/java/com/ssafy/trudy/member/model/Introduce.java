package com.ssafy.trudy.member.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "introduces")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties("hibernateLazyInitializer")
public class Introduce {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String plan;

    private String self;

    private String language;

    private String facebook;

    private String instagram;

    private String twitter;

    private String github;
}
