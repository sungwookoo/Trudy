package com.ssafy.trudy.model.member;

import lombok.*;

import javax.persistence.*;

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
    private boolean isLocal;

    @Column(name = "is_public")
    private boolean isPublic;


    public Member(String email, String password, String name, String image, String gender, String area, String birth, boolean isLocal, boolean isPublic) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.image = image;
        this.gender = gender;
        this.area = area;
        this.birth = birth;
        this.isLocal = isLocal;
        this.isPublic = isPublic;
    }
}
