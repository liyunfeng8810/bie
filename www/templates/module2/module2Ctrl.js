
angularModuleSD
    .controller('module2Ctrl', function($scope, Chats,getData) {


        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })