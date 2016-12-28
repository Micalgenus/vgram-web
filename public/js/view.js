/**
 * Created by yoonsKim on 15. 9. 21..
 */

app.controller("article-view", function ($rootScope, $scope,$http) {

    setTimeout(function () {

        api.article.one(null,null, function (data) {
            data=data[0];
            $scope.photo_url = data.PHOTO_NAME;
            $scope.comment = data.COMMENT;
            console.log(data);
            embedpano({swf:"/"+$scope.photo_url+".swf", xml:"/"+$scope.photo_url+".xml", target:"pano", html5:"prefer", passQueryParameters:true});

        },[$scope.pid]);

    },10);

    //$scope.share_facebook = function () {       // index와 view에서 동시에 사용하기 때문에 전역으로 옮김
    //
    //    var url = window.location.href;
    //    var popUrl = "https://www.facebook.com/dialog/feed?app_id=914907761923860&display=popup&caption=An%20example%20caption&link="+url+"&redirect_uri="+url;	//팝업창에 출력될 페이지 URL
    //    var popOption = "width=600, height=300, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
    //    window.open(popUrl,"",popOption);
    //
    //}

});