angularModuleSD.controller('module1Ctrl', function ($scope,$state, $ionicLoading) {
    var proListGetData = function () {
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
            $scope.$apply();
        },"json");
        $ionicLoading.hide();
    };
    proListGetData();
});