var angularModuleSD = angular.module('starter.controllers', []);



angularModuleSD.controller('BaseViewCtrl', function($scope, $ionicHistory) {

  var currentViewData;    //当前的view信息
  var viewStateName = '';    //当前view视图名称
  function BaseCtrlloaded(){
    currentViewData=$ionicHistory.currentView();
    viewStateName=currentViewData.stateName.replace("tab.","");
    console.log(viewStateName+'------BaseCtr-loaded');
    loadModelFileAll.loadAll(isPushController[viewStateName]);
  }
  $scope.$on('$ionicView.loaded', function () {
    // 初始化
    BaseCtrlloaded();

  });

  $scope.$on('$ionicView.unloaded', function () {
    console.log(viewStateName+'------BaseCtr-unloaded');
    //主ctrl退出之后 移除文件
    loadModelFileAll.removeAllfile(isPushController[viewStateName]);
    /* setTimeout(function(){
     console.log(ControllerChecker.exists('pkgTableDetailCtrl') + "----unloaded");
     },2000);*/
  });
})

