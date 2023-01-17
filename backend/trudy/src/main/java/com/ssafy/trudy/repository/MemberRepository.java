package com.ssafy.trudy.repository;

import com.ssafy.trudy.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
