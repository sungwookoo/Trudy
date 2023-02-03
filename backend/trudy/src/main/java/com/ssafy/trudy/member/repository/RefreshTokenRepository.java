package com.ssafy.trudy.member.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    void deleteByToken(String refreshToken);

    Optional<RefreshToken> findByToken(String refreshToken);

    void deleteByMemberId(Long memberId);

    void deleteByMember(Member member);
}
