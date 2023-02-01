package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
