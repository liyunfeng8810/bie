
angularModuleSD
    .controller('module2Ctrl', function($scope, Chats,getData) {


        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })
    .controller('ChatDetailCtrl', function($scope, Chats,$stateParams) {
        $scope.chat = Chats.get($stateParams.chatId);



    })