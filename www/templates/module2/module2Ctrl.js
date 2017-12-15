angularModuleSD.controller('module2Ctrl', function ($scope,$stateParams,getData,$state, $ionicLoading, $rootScope) {
    var proDetailGetData = function () {
        $ionicLoading.show();
        var url =baseUrl + moduleAbUrl.proDetail;
        $.post(url,{
            method:"queryJihuoxq",
            params:JSON.stringify({
                mktId:"1001"
            })
        },function(result){
            var json = $.parseJSON(result);
            $scope.perSize = json.custSize;
            $scope.custList = json.custList;
            $scope.group = json.group;
            $scope.market = json.market;
            debugger
            $scope.$apply();
        },"json");
        $ionicLoading.hide();
    };
    proDetailGetData();

    //立即抱团
    $scope.doGroupNow = function () {
        $state.go("module3");
    };
    //分享团
    $scope.shareGroupInfo = function () {
        $state.go("module3Child01");
    };

});

