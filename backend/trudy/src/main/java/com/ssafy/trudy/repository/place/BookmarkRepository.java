package com.ssafy.trudy.repository.place;

import com.ssafy.trudy.model.place.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
