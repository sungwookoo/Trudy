# 01.30

### 공통

- login -> signIn 이름 변경
  - App.tsx
  - Nav.tsx
  - Login.tsx
    - Login.tsx => SignIn.tsx
  - Login.css
    - Login.css => SignIn.css



### Account/SignIn.tsx

- Sign in 버튼
  - bg색상 변경 -> trudy
  - hover시 색상 변경 -> trudy-dark
- Sign up 버튼 생성
  - Sign in 버튼 복사



### Account/SignUp.tsx

- 생성



### Account/SignUp.css

- 생성



### Account/SignUpSelect.tsx

- 생성



### Account/SignUpSelect.css

- 생성



### tailwind.config.js

- custom color 추가

  - 'trudy', 'trudy-dark'

  - ```javascript
      theme: {
        extend: {
          colors: {
            'trudy': {
              DEFAULT: '#eefcef',
              'dark': '#baf3bf'
            },
          },
        },
      },
    ```





# 01.31

### 공통

- trudy color 변경
  - default : 유지
  - dark => dark2
  - dark1 생성 (\#cbf6cf)



### Planner/Planner.tsx

- 생성



### Planner/Planner.css

- 생성



### Planner/SideBarPlanner.tsx

- 생성



### Planner/SideBarPlanner.css

- 생성



### SignUpSelect.tsx

- password는 SignUp으로 이동
- 주석 추가



### SIgnUp.tsx

- password input 추가
  - autocomplete 속성 제거

- nickname input 추가
- gender input 추가
- birthday input 추가
- islocal input 추가
- region input 추가
- regionDetail input 추가
- 주석 추가





# 02.01

### App.tsx

- ```jsx
  <Route path="/square" element={<Square />} />
  ```



### Square/Square.tsx

- 생성



### Square/Square.css

- 생성







# To Do

## 기능

### Common

- Trudy Logo에 Trudy 글자 추가



### SignUp.tsx

- SignUpSelect로부터 이메일, 패스워드 데이터 받기
  - UseNavigate 사용

- region, regiondetail
  - 데이터 받아서 radio로 띄우기
  - region, regiondetail 이름 backend랑 맞추기

- form, input 을 form.group 등으로 바꾸기 (JWT Authentication - Part 2: React Typescript Authentication Page)



### SignUpSelect.tsx

- SignUp에 이메일, 패스워드 데이터 전달
  - UseNavigate 사용

- form, input 을 form.group 등으로 바꾸기 (JWT Authentication - Part 2: React Typescript Authentication Page)



## CSS

### Signin.tsx

- 배경 (이미지? or 색상?)

- Sign in to your account 문구 변경?

- email, password 입력칸

- Sign in, Sign up 버튼 간격

