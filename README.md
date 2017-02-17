# NODE TODO API
This is a NodeJS full API that you can use to test with your SPAs or Mobile apps.

현재 규모로는 본 프로젝트에서 Web 개발과 API 개발을 동시에 진행한다.

지정 도메인 : cozyhouzz.co.kr



## How to use it

###1. Main Server(Page Router) 부팅

`gulp [--type] [arg] [task]`

개발시 : gulp

배포시 : gulp --type prod production

Google Sheet(cozyhouzz_개발자료 : Client-Web 작업구성)을 참고 바람.

구동 후, test route를 이용하여 작동 확인 가능

back-end 패키지 추가 할 때 : npm install [package-name] [--save|--save-dev]

frond-end 패키지 추가 할 때 : bower install [package-name] [--save|--save-dev]

`(http://stackoverflow.com/questions/18641899/what-is-the-difference-between-bower-and-npm)`

#### **`!! 서버 업로드시 꼭 파일실행권한 (chmod 755) 를 바꿔줘야 한다!!!`**



###2. Image Server 부팅(리사이징)
`https://github.com/tripviss/image-resizer`

개발시 : npm install --global --production windows-build-tools -> cd image-resizer -> npm install & npm run start 

배포시 : forever나 pm2 이용 --type prod production

`port : 3003번, file path : /resources, ".env"를 통하여 각종 설정을 바꿀 수 있음(image-resizer github 참고)`

설치 에러 발생시(error C2373) : https://github.com/nodejs/node-gyp/issues/972 ->  참고('npm -g install npm@next')


**주의사항 : media 파일만 가져올 수 있다, attached, vtour형식의 파일은 Main Server에서 로딩해야 한다**

`향후 개발시 media server에서 vtour까지 변환이 가능하게 하고, 이미지를 제외한 나머지 파일은 Main Server에서 라우팅하게 해야한다.`



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
* Central Event Hub를 기점으로 여러가지 클라우드 서비스를 조합하여 이용하면 가격, 성능, 확장성을 고려할 수 있음
