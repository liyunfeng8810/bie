angularModuleSD.controller('loginCtrl', function($scope,$state,$ionicLoading,$ionicModal,$ionicSlideBoxDelegate,$timeout) {
    $scope.windowH = $(window).height();
    //初始用户信息
    $scope.loginUserInfo = {
        name:'liyunfeng11@163.com',
        pwd:'123'
    };

    //初始注册信息
    $scope.registerInfo = {
        nikName:'',
        name:'',
        pwdA:'',
        pwdB:''
    };
    //注册请求
    var  registUserData = function() {
        $ionicLoading.show();
        var url =loginUrl.register;
        var param = {
            email:$scope.registerInfo.name,
            unname:$scope.registerInfo.nikName,
            pwd:$scope.registerInfo.pwdA
        };
        $.post(baseUrl+url,param,function(result){
            if(result.result == 'SUCCESS'){
                registerPopup.hide();
            }else if(result.result == 'ERROE'){
                $ionicLoading.show({template: '注册失败!', noBackdrop: true, duration: 1000});
            }
            $timeout(function () {
                $ionicLoading.hide();
            },200)
        },"json");
        $timeout(function () {
            $ionicLoading.hide();
        },10000)
    };

    //登录请求
    var getloginData = function() {
        $ionicLoading.show();
        var url =loginUrl.login;
        var param = {
            email:$scope.loginUserInfo.name,
            pwd:$scope.loginUserInfo.pwd
        };

        $.post(baseUrl+url,param,function(result){
            if(result.result == 'success'){
                $state.go("module2");
            }else if(result.result == 'fail'){
                $ionicLoading.show({template: '用户名或密码错误!', noBackdrop: true, duration: 1000});;
            }else if(result.result == 'error'){
                $ionicLoading.show({template: '系统错误!', noBackdrop: true, duration: 1000});
            }
            $timeout(function () {
                $ionicLoading.hide();
            },200)
        },"json");
        $timeout(function () {
            $ionicLoading.hide();
        },10000)
    };

    //验证登录密码
    var validateLoginPsd = function () {
        var loginPsdVal =  $scope.loginUserInfo;
        if(loginPsdVal==''){
            $ionicLoading.show({template: '密码为空!', noBackdrop: true, duration: 1000});
        }else{
            getloginData();
        }
    };

    //验证登录用户名
    var validateLoginInfo = function(){
        var emails =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var userNameVal  = $scope.loginUserInfo.name;
        if(emails.test(userNameVal)){
            validateLoginPsd();
        }else if(userNameVal==''){
            $ionicLoading.show({template: '邮箱为空!', noBackdrop: true, duration: 1000});
        }else{
            $ionicLoading.show({template: '邮箱格式不正确', noBackdrop: true, duration: 1000});
        }
    };

    //验证注册密码
    var validateRegistPsd = function () {
        var pwdStrA = $scope.registerInfo.pwdA;
        var pwdStrB = $scope.registerInfo.pwdB;
        if(pwdStrA == pwdStrB){
            //密码设置验证通过，请求接口
            registUserData()
        }else if(pwdStrA && pwdStr.length<8){
            $ionicLoading.show({template: '密码长度不足8位', noBackdrop: true, duration: 1000});
        }else if(pwdStrA==''){
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
        validateLoginInfo();
    };

    //注册确定按钮
    $scope.registerUserInfo = function () {
        validateRegistInfo();
    };



    //注册弹框
    $ionicModal.fromTemplateUrl('register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.registerPopup = modal;
    })
});