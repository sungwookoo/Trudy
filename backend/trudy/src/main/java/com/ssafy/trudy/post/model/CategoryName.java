package com.ssafy.trudy.post.model;

import lombok.Setter;

public enum CategoryName {

    Restaurant("82"),
    Hotel("80"),
    Festival("85"),
    Attraction("76"),
    Culture("78"),
    Sport("75"),
    Shopping("79");

    private final String categoryName;

    CategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
