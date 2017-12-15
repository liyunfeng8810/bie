angularModuleSD.controller('module1Ctrl', function ($scope, getData,$state, $ionicLoading, $rootScope) {
    console.log('module1Ctrl加载');
    $scope.proDetailDill = function () {
         console.log("22");
        $state.go("module2");
    };
    var param = {
        method: 'test1'
    };
    //getDataAll(param, module1Url.test);

    function getDataAll(param, url) {
        $ionicLoading.show();
        getData.getData(param, url).then(function (result) {
            $ionicLoading.hide();
            console.log(JSON.stringify(result) + "--" + result[0].id);
        }, function (result) {
            if (result.status == 0) {
                $ionicLoading.show({template: '网络异常，请稍后重试!', noBackdrop: true, duration: 1500});
            }
        });
    }
    //getDataAll();

});