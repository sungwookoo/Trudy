package com.ssafy.trudy.etc.repository;

import com.ssafy.trudy.etc.model.Area;
import com.ssafy.trudy.etc.model.Sigungu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SigunguRepository extends JpaRepository<Sigungu, Long> {

    List<Sigungu> findAllByAreaCode(Area areacode);
}
