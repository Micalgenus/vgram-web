# NODE TODO API
This is a NodeJS full API that you can use to test with your SPAs or Mobile apps.

현재 규모로는 본 프로젝트에서 Web 개발과 API 개발을 동시에 진행한다.

지정 도메인 : cozyhouzz.co.kr



## How to use it

###1. Main Server(Page Router) 부팅
`gulp [--type] [arg] [task]`

##### 개발시 : gulp
##### 배포시 : gulp --type prod production

Google Sheet(cozyhouzz_개발자료 : Client-Web 작업구성)을 참고 바람.
구동 후, test route를 이용하여 작동 확인 가능

##### back-end 패키지 추가 할 때 : npm install [package-name] [--save|--save-dev]
##### frond-end 패키지 추가 할 때 : bower install [package-name] [--save|--save-dev]
`(http://stackoverflow.com/questions/18641899/what-is-the-difference-between-bower-and-npm)`

#### **`!! 서버 업로드시 꼭 파일실행권한 (chmod 755) 를 바꿔줘야 한다!!!`**



### ~~2. Image Server 부팅(리사이징)~~
`https://github.com/tripviss/image-resizer`

##### 개발시 : npm install --global --production windows-build-tools -> cd image-resizer -> npm install & npm run start
##### 배포시 : forever나 pm2 이용 --type prod production
`기본설정 : port : 3003번, file path : /resources, ".env"를 통하여 각종 설정을 바꿀 수 있음(trpviss/image-resizer github 참고)`

##### 설치 에러 발생시
* 권한 관련 에러가 발생하면 cmd창을 관리자모드로 실행한 후 npm install을 수행한다. 
* error C2373 : https://github.com/nodejs/node-gyp/issues/972 ->  참고('npm -g install npm@next')
* error TRK0005 : https://trello.com/c/vG0Ngvyi/102-cl-exe -> Visual Studio Community를 설치하고 C++ 프로젝트 파일을 생성하면
업데이트가 따로 뜨는데 그것을 설치하고 npm을 돌려야지 잘 돌아간다. 이 업데이트에는 C++ 컴파일러 관련된 컴포넌트들이 존재한다.

**주의사항 : media 파일만 가져올 수 있다, attached, vtour형식의 파일은 Main Server에서 로딩해야 한다**

`향후 개발시 media server에서 vtour까지 변환이 가능하게 하고, 이미지를 제외한 나머지 파일은 Main Server에서 라우팅하게 해야한다.`



### 3. Swagger 이용(API 개발시)
`현재 개발중인 엑셀버전 대체용, ./swagger 폴더 참고`

##### 실행방법
 1. ./swagger 폴더로 이동
 2. npm install --global http-server 설치
 3. ./swagger에서 cmd 실행 -> "http-server --cors ./api/swagger" 실행
 4. npm run start 실행(Server)
 5. npm run edit -> 브라우저 자동실행 -> API 내용 확인 & 테스트 진행(UI 실행)

##### 설치 에러 발생시
* 권한 관련 에러가 발생하면 cmd창을 관리자모드로 실행한 후 npm install을 수행한다. 
* Swagger Server/Client 실행 포트 확인
* 그 외 문법문제 발생시 http://swagger.io/specification/ OR http://editor.swagger.io/#/ 참고
* swagger-ui Pointer Resolution 설정방법 : https://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-8-splitting-specification-file/




## Available

### Routes

Available methods:

* **GET /**: Default route - `index`
* **GET /test**: route test - `json data`



## Authenticate account

If you want, you can run this server for YOUR Auth0 account. For that, you just need to create a `.env` file and set the `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET` variables with the information from your account:

````bash
AUTH0_CLIENT_ID=YourClientId
AUTH0_CLIENT_SECRET=YourClientSecret
````

## Next Plan
* Central Event Hub를 기점으정로 여러가지 클라우드 서비스를 조합하여 이용하면 가격, 성능, 확장성을 고려할 수 있음
* 다국어 서비스를 위한 view부분의 i18n 모듈 적용이 필요함
* 언어 번역 => 언어별 글꼴설정 => 언어별 레이아웃 설정
* DB Modeling 상의 설정과 sequelize상 설정을 일치시키기(index설정등)
