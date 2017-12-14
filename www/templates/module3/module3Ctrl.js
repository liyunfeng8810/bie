
app.registerController('module3Ctrl', function($scope,getData,$controller) {
    $controller('BaseViewCtrl',{$scope: $scope});
    console.log('加载module4Ctrl');




})