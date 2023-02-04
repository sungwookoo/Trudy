package com.ssafy.trudy.member.repository;

import com.ssafy.trudy.member.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, SearchMemberRepository {
    Optional<Member> findByEmail(String email);

    Page<Member> findByNameContainingOrEmailContaining(String name, String email, Pageable pageable);

    Page<Member> findByEmailContaining(String email, Pageable pageable);

    Page<Member> findByNameContaining(String name, Pageable pageable);
}
