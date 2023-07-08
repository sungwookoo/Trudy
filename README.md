# Trudy
🛫 외국인 관광객을 위한 한국 현지인 연결 플랫폼 - Trudy

![1](https://github.com/sungwookoo/Trudy/assets/53362965/ef0273d5-6b63-4ddf-9123-b0e4e6de0982)


✔️ **구현 사항**

- 외국인 관광객을 위한 한국 현지인 연결 플랫폼

- 외국인 관광객에게 현지인을 통한 로컬 정보를 제공

- 포럼, 커뮤니티 기능 제공

✔️ **담당 역할**

**- DB 설계, ERD 작성**

- ERD
    
   ![2](https://github.com/sungwookoo/Trudy/assets/53362965/83721ab6-f849-489e-b8e1-e29d9d3c5596)
 
    

**- 아키텍처 설계**

- 아키텍처 구성도

  ![3](https://github.com/sungwookoo/Trudy/assets/53362965/2f858746-95e5-4f01-b7f8-ca2aea0f2a84)
 
    

**- SpringBoot**

- 회원 도메인 담당 및 서비스 구현

- 인증 및 인가 프로세스 구축 (SpringSecurity, JWT)

**- 인프라** 

- AWS EC2 ubuntu 서버 기반 CI/CD 환경 구축 

- Docker, Jenkins, Nginx 활용

- SSL 발급 및 HTTPS 적용

✔️ **기술 스택**

- Backend : SpringBoot, Spring Security, MySQL

- Frontend : React, HTML, CSS

- Infra : AWS EC2, AWS RDS(MySQL), Docker, Jenkins, Nginx, Gitlab

✔️ **프로젝트 성과**

- 사용자 중심 디자인: 외국인 관광객이 현지인과 손쉽게 연결될 수 있는 사용자 경험 디자인 구현

- 보안 강화: SpringSecurity와 JWT를 통해 사용자 데이터의 안전성 확보

- 효율적 인프라 관리: Docker와 Jenkins를 활용하여 지속적인 통합 및 배포를 자동화함으로써 개발 및 운영 효율성 향상

✔️ **프로젝트 리뷰**

Trudy 프로젝트를 진행하며, 인프라 구축에 대해 많은 공부를 하게 되었습니다.

프로젝트 이전에는 프로젝트 배포라고 하면 EC2 서버에서 ‘nohup’과 ‘&’ 명령어를 실행하는 정도로 알고 있었습니다. 하지만, CI/CD를 공부하며 많은 것을 알게 되었고 더 넓은 시야를 갖게 되었습니다.

인프라에 대해 공부하며 **DevOps Engineer**에 대해 알아보았고, 제가 추구하는 개발자로서의 핵심 가치에 부합하다는 사실을 알게 되었습니다.

제가 추구하는 개발자로서의 핵심 가치는 **사용자의 편의**고, DevOps Engineer는 개발 팀과 IT 운영 팀 간의 커뮤니케이션 및 협업에 대한 장벽을 허물며 결국 고객 만족과 더 빠른 가치 제공이라는 핵심 가치를 추구하기 때문입니다. 

Trudy 프로젝트를 진행하며, 제가 느낀 인프라 담당자의 역할은 팀 내 **개발자들이 개발에만 집중할 수 있도록** 환경을 제공해주는 것입니다.

**회원 도메인과 인증/인가 프로세스**도 담당하며 SpringBoot 개발 역량도 향상되었지만, 그로 인해 더 나은 인프라 환경을 구축할 시간이 부족했던 점이 이번 프로젝트에서 아쉬운 부분이라고 할 수 있습니다.

하지만, 다음 프로젝트에서는 더 나은 인프라 환경을 구축하겠다는 목표를 설정 할 수 있는 좋은 계기가 되었습니다.

✔️ **결과**

**[로그인]**
![4](https://github.com/sungwookoo/Trudy/assets/53362965/54301c72-5a5a-4efd-91e1-6a10b5f8a8b4)


[**회원가입 - 이메일 인증 전]**
![5](https://github.com/sungwookoo/Trudy/assets/53362965/c227cea0-fbd6-4dea-a54f-67c287358d3e)


[**회원가입 - 이메일 인증 후]**
![6](https://github.com/sungwookoo/Trudy/assets/53362965/93322946-b369-4578-a539-1fa693902f5d)


[**지도(GoogleMap API) 내 관광지 검색]**
![7](https://github.com/sungwookoo/Trudy/assets/53362965/538aaa02-b482-480d-81fb-a86ba69e9110)


[**포럼]**
![8](https://github.com/sungwookoo/Trudy/assets/53362965/74687990-bf77-4395-a50d-75ab9f8f6dca)


[**포럼 작성]**
![9](https://github.com/sungwookoo/Trudy/assets/53362965/08e06183-52ed-4fe6-a46b-3d69d3920bff)


[**채팅]**
![10](https://github.com/sungwookoo/Trudy/assets/53362965/cc61cb62-6873-4893-9bef-24407d98e598)
