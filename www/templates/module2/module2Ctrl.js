angularModuleSD.controller('module2Ctrl', function ($scope,$stateParams,getData,$state, $ionicLoading, $rootScope) {
    var proDetailGetData = function () {
        $ionicLoading.show();
        var url =baseUrl + moduleAbUrl.proDetail;
        $.post(url,{
            method:"queryJihuoxq",
            params:JSON.stringify({
                mktId:"10001"
            })
        },function(result){
            var json = $.parseJSON(result);
            $scope.custList = json.custList;
            $scope.group = json.group;
            $scope.market = json.market;
            $scope.$apply();
        },"json");
        $ionicLoading.hide();
    };
    proDetailGetData();

    //立即参团
    $scope.doGroupNow = function () {
        $state.go("tab.module1");
    };
    //分享团
    $scope.doGroupNow = function () {
        $state.go("tab.module1");
    };
});

