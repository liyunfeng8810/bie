app.registerController('module4Ctrl', function($scope,$controller) {
    $controller('BaseViewCtrl',{$scope: $scope});
    console.log('加载module4Ctrl');


})