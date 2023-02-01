package com.ssafy.trudy.repository.member;

import com.ssafy.trudy.model.member.Member;
import com.ssafy.trudy.model.member.MemberSearch;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Repository
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    // 모든 멤버 정보를 받기(from DB)
    public List<Member> findMemberList() {
        return em.createQuery("select m from Member m order by lastAccess asc", Member.class)
                .getResultList();
    }

    // 필터된 멤버 정보를 받기(from DB)
    public List<Member> findMemberListFiltered(byte userType, String gender) {
        return em.createQuery("select m from Member m where m.isLocal=:userType and m.gender=:gender", Member.class)
                .getResultList();
    }
}