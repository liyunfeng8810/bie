angularModuleSD.controller('module2Ctrl', function ($scope,$stateParams,getData,$state, $ionicLoading, $rootScope) {

<<<<<<< HEAD
angularModuleSD
    .controller('module2Ctrl', function($scope, Chats,getData,$state) {


        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };

        $scope.goModule3 = function(){
            $state.go("module3");
        }

    })
    .controller('ChatDetailCtrl', function($scope, Chats,$stateParams) {
        $scope.chat = Chats.get($stateParams.chatId);
=======
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


>>>>>>> b80d9822b322e6587990ba4bdfe17df23957f7f7

});

