package com.ssafy.trudy.member.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "members")
@NoArgsConstructor
@AllArgsConstructor
public class Member implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column
    private String password;

    @Column(length = 30)
    private String name;

    private String image;

    @Column(name = "gender", length = 45)
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

    @Column
    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Column(name = "last_access")
    private LocalDateTime lastAccess;


    @Builder
    public Member(String email, String password, String name, String image, String gender, Long areaCode, Long sigunguCode ,String birth, byte isLocal, byte isPublic, MemberRole role, LocalDateTime lastAccess) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.image = image;
        this.gender = gender;
        this.areaCode = areaCode;
        this.sigunguCode = sigunguCode;
        this.birth = birth;
        this.isLocal = isLocal;
        this.isPublic = isPublic;
        this.role = role;
        this.lastAccess = lastAccess;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 계정의 권한 목록을 리턴
        Set<GrantedAuthority> roles = new HashSet<>();
        roles.add(new SimpleGrantedAuthority(role.getValue()));
        return roles;
    }

    @Override
    public String getPassword() {
        return this.password; // 계정의 비밀번호 리턴
    }

    @Override
    public String getUsername() {
        return this.email; // 계정의 고유한 값 리턴
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정의 만료 여부 리턴
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정의 잠김 여부 리턴
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // 비밀번호 만료 여부 리턴
    }

    @Override
    public boolean isEnabled() {
        return true; // 계정의 활성화 여부 리턴
    }

}
