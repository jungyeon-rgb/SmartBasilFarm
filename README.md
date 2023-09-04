# 🪄 스마트팜 'BasilFarm'

<p align="center"><img width="500" alt="logo" src="https://github.com/jungyeon-rgb/SmartBasilFarm/assets/119380048/3920979c-a231-4181-8714-c8ce03a8f5be"></p>
<br />
<br />

집에서 농작물을 키워보고 싶지만 바쁜 2030 MZ세대 직장인들을 위해 원격으로 농작물의 상태를 확인하고 관리할 수 있는 스마트팜 프로젝트
<br />
<br />

## 🦖 프로젝트 정보
<br />

> - 엘리스 IoT 1기 팀 프로젝트 <br />
> - 개발 기간 : 23/4/24~23/5/19(4주) <br />
> - 프론트엔드 2명, 백엔드 2명, 디바이스 2명 <br />


<br />

## 🦖 기여한 점

![ezgif-1-6166135197](https://github.com/jungyeon-rgb/SmartBasilFarm/assets/119380048/0e98520c-a621-4e48-a7e2-b19194e78418)

1. 기획
- 페르소나를 설정해 프로젝트 컨셉 설정
- Figma를 이용해 와이어프레임 작성
- 화면흐름도 작성으로 백엔드와 효율적인 소통을 진행
- Notion을 이용한 문서 관리

2. 개발
- 메인 페이지,로그인, 회원가입, 마이페이지(회원정보, 디바이스 목록 및 추가 모달) 구현
- 빌드 후 변경이 없는 메인페이지, 로그인, 회원가입 페이지는 `SSG`을 적용
- 빌드 후 디바이스 추가가 있을 수 있는 마이페이지는 `SSR` 적용
- 로그인 상태를 recoil의 상태로 관리
- Axios : axios를 활용하여 서버와의 비동기 통신을 수행하고, 요청 전에 필요한 작업들을 일괄적으로 처리하기 위해 axiosInstance를 사용. 이를 통해 각 인스턴스에 다른 설정을 적용
- (모바일 반응형) PC, 태블릿 PC, 모바일 3가지에 맞춰 구현해 향상된 사용자 경험을 제공

2-1. 메인 페이지

2-2. 로그인 페이지
- 로그인 페이지에서 로그인을 할 경우 Recoil로 로그인 상태 전역 관리
- 이미 계정이 있는 경우 유저에게 확인할 수 있도록 alert창 구현

2-3. 회원가입 페이지
- 8~16자와 특수문자가 들어가지 않은 비밀번호를 작성시 alert창으로 재입력 요청

2-4. 마이페이지
- 디바이스 등록을 할 수 있도록 modal 구현

## 🦖 스택
### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)   

### Development

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logo=Emotion&logoColor=white)

### Comunication

![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)

<br />

## 🦖 배포주소
> 프론트엔드 배포 주소 : [smart-basil-farm.vercel.app](smart-basil-farm.vercel.app) <br />
<br />

## 🦖 시작 가이드

### Requirements

For building and running the application you need:

- [Node.js v16.13.0](https://nodejs.org/en/blog/release/v16.13.0)
- Npm v8.1.0

### Installation

```
$ git clone https://github.com/jungyeon-rgb/shoppingmall-website.git
```

### Frontend

```
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br />

## 🦖 디자인 레이아웃 및 플로우 차트

### 1. Figma

[👉🏻 Figma 보러가기](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fvpc6cgxrzFIsNXW8DFwlZs%2FIoT-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%3Fnode-id%3D0%3A1%26t%3D1BicK3MmUEdjRGTV-1)

### 2. 플로우 차트

![Basil Farm-Flow Chart drawio (3)](https://github.com/jungyeon-rgb/SmartBasilFarm/assets/119380048/d78d1f48-aa50-4070-81c8-b48c51b0a630)


<br />

## 🦖 Commit Convention

| 태그이름   | 설명                                                              |
| ---------- | ----------------------------------------------------------------- |
| [CHORE]    | 코드 수정, 내부 파일 수정                                         |
| [FEAT]     | 새로운 기능 구현                                                  |
| [ADD]      | FEAT 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 |
| [DEL]      | 쓸모 없는 코드 삭제                                               |
| [FIX]      | 버그, 오류 해결                                                   |
| [MOVE]     | 프로젝트 내 파일이나 코드의 이동                                  |
| [RENAME]   | 파일 이름 변경이 있을 때 사용                                     |
| [IMPROVE]  | 향상이 있을 때 사용                                               |
| [REFACTOR] | 전면 수정이 있을 때 사용                                          |
| [HOTFIX]   | issue나 QA에서 급한 버그 수정에 사용                              |
| [DOCS]     | README나 WIKI 등의 문서 개정                                      |
| [CORRECT]  | 주로 문법의 오류나 타입의 변경, 이름 변경에 사용                  |
