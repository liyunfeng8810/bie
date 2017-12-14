angularModuleSD.controller('loginCtrl', function($scope,$state,getData,$ionicLoading,$ionicSlideBoxDelegate,$timeout) {
    $scope.windowH = $(window).height();

    $scope.loginGoHomePage = function () {
        console.log("22 ")
        $state.go("tab.module1");
    };
    var Url = 'http://192.168.43.103:8080/server/doajax.do';
    /*var testFn = function (Param, Url) {
        getData.getData(Param, Url).then(function (result) {
            if (result.success) {

            } else {
                $ionicLoading.show({template: '服务器繁忙，请稍后重试!', noBackdrop: true, duration: 1500});
            }
        }, function (result) {
            if (result.status == 0) {
                $ionicLoading.show({template: '网络异常，请稍后重试!', noBackdrop: true, duration: 1500});
            }
        });
    };*/
    //testFn({method:'test1'},Url)
});