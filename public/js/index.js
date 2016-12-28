/**
 * Created by yoonsKim on 15. 9. 17..
 */
app.controller("index", function ($rootScope, $scope,$http) {

    $scope.test="시작해봅시다";
    var scroll_idx = 0;
    var is_loading = false;
    var is_finished = false;
    $scope.articleList = [];

    $scope.loadScroll = function (count) {
        if(is_finished){
            //console.log($scope.articleList);
            return;
        }
        if(is_loading){
            return;
        }
        is_loading= true;
        api.article.all(null,{start:scroll_idx,count:count}, function (data,status,header,config) {
            if(data.length==0){
                is_finished=true;
                return;
            }
            for(var i in data){
                console.log(data[i]);
                $scope.articleList.push(data[i]);
            }
            scroll_idx+=count;
            is_loading=false;
        });

    };
    $scope.loadScroll(2);

});