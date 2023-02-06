package com.ssafy.trudy.member.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "members")
public class Member {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column(length = 30)
    private String name;

    private String image;

    @Column
    private String gender;

    @Column(name = "area_code")
    private Long areaCode;

    @Column(name = "sigungu_code")
    private Long sigunguCode;
    @Column(length = 8)
    private String birth;

    @Column(name = "is_local")
    private byte isLocal;

    @Column(name = "is_public")
    private byte isPublic;

    @CollectionTable(
            name = "member_roles",
            joinColumns = @JoinColumn(name = "member_id")
    )
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<MemberRole> roles;

    @Column(name = "last_access")
    private LocalDateTime lastAccess;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "introduce_id", referencedColumnName = "id")
    private Introduce introduceId;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<RefreshToken> refreshTokens = new ArrayList<>();


    @Builder(builderMethodName = "signupBuilder")
    public Member(String email, String password, String name, String image, String gender, Long areaCode, Long sigunguCode ,String birth, byte isLocal, byte isPublic, LocalDateTime lastAccess) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.areaCode = areaCode;
        this.sigunguCode = sigunguCode;
        this.birth = birth;
        this.isLocal = isLocal;
        this.isPublic = isPublic;
        this.roles = Stream.of(MemberRole.MEMBER)
                .collect(Collectors.toSet());
        this.lastAccess = lastAccess;
    }

    public void setLastAccess(LocalDateTime lastAccess) {
        this.lastAccess = lastAccess;
    }

    public void setIntroduceId(Introduce introduceId) {
        this.introduceId = introduceId;
    }

    public void setRefreshTokens(List<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }
}