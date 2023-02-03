package com.ssafy.trudy.etc.repository;

import com.ssafy.trudy.etc.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AreaRepository extends JpaRepository<Area, Long> {
    List<Area> findAll();
    Area findByCode(Long code);
}