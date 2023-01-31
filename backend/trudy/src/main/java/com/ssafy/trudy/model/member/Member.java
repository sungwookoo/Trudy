package com.ssafy.trudy.model.member;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "members")
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    private String password;

    @Column(length = 30)
    private String name;

    private String image;

    @Column(length = 45)
    private String gender;

    @Column(length = 45)
    private String area;

    @Column(length = 8)
    private String birth;

    @Column(name = "is_local")
    private byte isLocal;

    @Column(name = "is_public")
    private byte isPublic;

    @Column(name = "last_access")
    private Timestamp lastAccess;


    public Member(String email, String password, String name, String image, String gender, String area, String birth, byte isLocal, byte isPublic, Timestamp lastAccess) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.image = image;
        this.gender = gender;
        this.area = area;
        this.birth = birth;
        this.isLocal = isLocal;
        this.isPublic = isPublic;
        this.lastAccess = lastAccess;
    }
}
