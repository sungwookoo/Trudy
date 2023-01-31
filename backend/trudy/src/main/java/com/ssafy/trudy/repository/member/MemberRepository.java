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

    // 모든 멤버 정보를 받기
    public List<Member> findMemberList() {
        return em.createQuery("select m from Member m order by lastAccess asc", Member.class)
                .getResultList();
    }

//    public List<Member> findMemberListFiltered(MemberSearch memberSearch) {
//        String jpql = "select m From Member m";
//
//        }
//    }
}