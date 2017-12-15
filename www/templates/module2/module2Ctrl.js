angularModuleSD.controller('module2Ctrl', function ($scope,$stateParams,getData,$state, $ionicLoading, $rootScope) {

    var proDetailGetData = function () {
        $.post("http://10.2.4.40:8080/server/doajax.do",{
            method:"queryJihuoxq",
            params:JSON.stringify({
                mktId:"10001"
            })
        },function(resultJSONObject){
            debugger
        },"json");
    };



});

