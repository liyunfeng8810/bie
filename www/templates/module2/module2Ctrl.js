
angularModuleSD
    .controller('module2Ctrl', function($scope, Chats) {


        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })