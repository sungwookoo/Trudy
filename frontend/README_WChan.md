# 01.30

### 공통

- login -> signIn 이름 변경
  - App.tsx
  - Nav.tsx
  - Login.tsx
    - Login.tsx => SignIn.tsx
  - Login.css
    - Login.css => SignIn.css



### SignIn.tsx

- 



- Sign in 버튼
  - bg색상 변경 -> trudy
  - hover시 색상 변경 -> trudy-dark
- Sign up 버튼 생성
  - Sign in 버튼 복사



### Signup.tsx

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



# To Do

### Common

- Trudy Logo에 Trudy 글자 추가



### Login.tsx CSS

- 배경 (이미지? or 색상?)
- Sign in to your account 문구 변경?

- email, password 입력칸
- Sign in, Sign up 버튼 간격