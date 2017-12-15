angularModuleSD.controller('loginCtrl', function($scope,$state,getData,$ionicLoading,$ionicModal,$ionicSlideBoxDelegate,$timeout) {
    $scope.windowH = $(window).height();
    //初始用户信息
    $scope.loginUserInfo = {
        name:'',
        psd:''
    };

    //初始注册信息
    $scope.registerInfo = {
        name:'',
        pswA:'',
        pswB:''
    };

    //验证登录密码
    var validateLoginPsd = function () {
        var loginPsdVal =  $scope.loginUserInfo;
        if(loginPsdVal==''){
            $ionicLoading.show({template: '密码为空!', noBackdrop: true, duration: 1000});
        }else{
            $state.go("tab.module1");
        }
    };

    //验证登录用户名
    var validateLoginInfo = function(){
        var emails =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var userNameVal  = $scope.loginUserInfo.name;
        if(emails.test(userNameVal)){
            //验证 通过
            validateLoginPsd();

        }else if(userNameVal==''){
            $ionicLoading.show({template: '邮箱为空!', noBackdrop: true, duration: 1000});
        }else{
            $ionicLoading.show({template: '邮箱格式不正确', noBackdrop: true, duration: 1000});
        }
    };

    //验证注册密码
    var validateRegistPsd = function () {
        var pswStrA = $scope.registerInfo.pswA;
        var pswStrB = $scope.registerInfo.pswB;
        if(pswStrA == pswStrB){
            //密码设置验证通过，请求接口

        }else if(pswStrA && pswStr.length<8){
            $ionicLoading.show({template: '密码长度不足8位', noBackdrop: true, duration: 1000});
        }else if(pswStrA==''){
            $ionicLoading.show({template: '密码为空', noBackdrop: true, duration: 1000});
        }
    };

    //验证注册用户名
    var validateRegistInfo = function () {
        var emails =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var usernameVal  = $scope.registerInfo.name;
        if(emails.test(usernameVal)){
            //用户名验证通过，验证密码
            validateRegistPsd();
        }else if(usernameVal==''){
            $ionicLoading.show({template: '邮箱为空!', noBackdrop: true, duration: 1000});
        }else{
            $ionicLoading.show({template: '邮箱格式不正确', noBackdrop: true, duration: 1000});
        }
    };


    //登录确定按钮
    $scope.loginGoHomePage = function () {
        $state.go("tab.module1");
        //validateLoginInfo();
    };

    //注册确定按钮
    $scope.registerUserInfo = function () {
        validateRegistInfo();
    };


    /*var Url = 'http://192.168.43.103:8080/server/doajax.do';
     var testFn = function (Param, Url) {
     getData.getData(Param, Url).then(function (result) {
     if (result.success){

     } else {
     $ionicLoading.show({template: '服务器繁忙，请稍后重试!', noBackdrop: true, duration: 1500});
     }
     }, function (result) {
     if (result.status == 0) {
     $ionicLoading.show({template: '网络异常，请稍后重试!', noBackdrop: true, duration: 1500});
     }
     });
     };
     //testFn({method:'test1'},Url)*/


    //注册弹框
    $ionicModal.fromTemplateUrl('register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.registerPopup = modal;
    })
});