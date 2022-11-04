# WANTED_PRE_ONBOARDING

## 과제설명
Node.js 로 아래의 요구사항을 만족하는 REST API 서버 개발<br/>
<br/>

## 요구사항
과제 외부공개 제한으로 요구사항은 작성하지 않습니다.<br/>
## 기술스택
 - Typeorm
 - Mysql 8.0
 - AWS
 - Express
 - Node v16.17.0
<br/>

## API Documentation
[API Documentation](https://hollow-dirt-849.notion.site/b8b90985418f42c49bfba669aa694d44?v=0489ebd4310a401ca9dd7be45cb7481c)
## 구현사항

### 1. 게시글 작성
사용자는 Body에 title, content, password를 입력하여 게시글을 등록할 수 있습니다.<br/>
```javascript
POST http://localhost:8080/post
```
### 2. 게시글 수정
사용자는 Body에 id, title, content, password 를 입력하여 게시글을 수정할 수 있습니다.<br/>
```javascript
PATCH http://localhost:8080/post
```
### 3. 게시글 목록조회
사용자는 모든 게시글을 가장 최근에 등록한 순서로 조회할 수 있습니다.<br/>
```javascript
GET http://localhost:8080/post/list
```
### 4. 게시글 상세조회
사용자는 모든 게시글을 가장 최근에 등록한 순서로 조회할 수 있습니다.<br/>
```javascript
GET http://localhost:8080/post
```

## 추가구현사항

### 1. 게시글의 개수가 많을 때, 사용자가 앱이나 웹에서 스크롤을 내릴 때마다 오래된 글들이 계속 로드 되는 형태로 API 를 수정해주세요.

1) pointer 가 없는 경우 - 전체 게시글의 생성시간을 기준으로 최신순으로 조회합니다.
```javascript
http://127.0.0.1:8080/post/list
```

2) pointer 가 있는 경우 - 포인터를 기준으로 포인터 이후 20개를 조회합니다.
```javascript
http://127.0.0.1:8080/post/list?pointer=2022110409244900
```

### 2. 외부 API 를 활용하여, 사용자가 게시글을 업로드한 시점의 날씨(예: 맑음, 흐림, 소나기, 눈 등) 정보가 게시글에 포함되도록 해주세요.
