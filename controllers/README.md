# Controllers
- api : return as RESTful style
- core : 핵심 로직
- web : return as ejs(html) style


## Todos
1. 나중에는 web과 api의 로직을 통합해서 core에서 관리하고, render 부분만 나눠야 한다.

## 주의사항
* swagger 적용을 위해서 해당 폴더 내에 있는 function은 고유의 이름을 가져야 한다<br />
  즉, 비슷한 기능을 해도 이름을 다르게 구분해주어야 한다.<br />
  ex> api/test.js : helloAPI, web/test/js : hellp
