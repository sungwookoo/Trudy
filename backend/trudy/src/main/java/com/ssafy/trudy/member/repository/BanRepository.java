package com.ssafy.trudy.member.repository;

import com.ssafy.trudy.member.model.Ban;
import com.ssafy.trudy.member.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BanRepository extends JpaRepository<Ban, Long> {
    Page<Ban> findAllByBanFrom(Member member, Pageable pageable);

    boolean existsByBanFromAndBanTo(Member member, Member targetMember);

    Ban findByBanFromAndBanTo(Member member, Member targetMember);
}
