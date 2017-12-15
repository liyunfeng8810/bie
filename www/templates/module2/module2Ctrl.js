
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



    })