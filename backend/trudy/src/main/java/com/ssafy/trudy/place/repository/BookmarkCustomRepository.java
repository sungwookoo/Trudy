package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;


import java.util.List;

public interface BookmarkCustomRepository {

    List<Place> findBookmarkList();
}
