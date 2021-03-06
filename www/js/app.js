// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.filter']);
var $stateProviderRef;
app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,$controllerProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.tabs.position("bottom");     //配置tabs在android 或者ios平台在底部显示

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');//配置标题居中

        $ionicConfigProvider.platform.ios.backButton.previousTitleText(false);
        $ionicConfigProvider.platform.android.backButton.previousTitleText(false);//配置返回图标

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $ionicConfigProvider.backButton.text('');//配置返回按钮后面的字为空

        $ionicConfigProvider.views.maxCache(5);//最大缓存个数
        $ionicConfigProvider.templates.maxPrefetch(4);//预加载个数
        $ionicConfigProvider.scrolling.jsScrolling(false);//使用原生滚动
        ionic.Platform.isFullScreen = true;
        $ionicConfigProvider.views.swipeBackEnabled(false); //ionic禁止滑动返回操作---适配iOS平台
        app.registerController = $controllerProvider.register;


        $stateProviderRef = $stateProvider;

        app.loadControllerJs = function(isLoadCss){
            return function ($q,ControllerChecker,getViewData){
                function handleViewName (json){
                    var jsonName = {};
                    jsonName.name = json.self.name;
                    jsonName.controller = json.self.controller;
                    return jsonName;
                }
                var self = this;
                var viewData = getViewData;
                var jsonName = handleViewName(self);
                var viewName = jsonName.name;
                var viewController = jsonName.controller;
                isLoadCss ? addMovementCss(getViewData[viewName].cssPath): null;
                var deferred = $q.defer();
                if(!ControllerChecker.exists(viewController)){
                    var path = getViewData[viewName].ctrlJsPath;
                    $.getScript(path, function() {
                        deferred.resolve('加载成功');
                    });
                }else{
                    deferred.resolve('主ctrl已加载,无需再次引入');
                }
                return deferred.promise;
            };
        };
        $stateProvider
        // setup an abstract state for the tabs directive
           /* .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })*/

            // Each tab has its own nav history stack:
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/index.html',
                controller: 'loginCtrl'
            })

            .state('module1', {
                url: '/module1',
                templateUrl: 'templates/module1/tab-module1.html',
                controller: 'module1Ctrl'

            })

            .state('module2', {
                url: '/module2',
                templateUrl: 'templates/module2/tab-module2.html',
                controller: 'module2Ctrl'
            })

            .state('module3', {
                url: '/module3',
                params: {json: ''},
                templateUrl: 'templates/module3/tab-module3.html',
                controller: 'module3Ctrl',
                resolve: {
                    deps:app.loadControllerJs(1)
                }
            })
            .state('module4', {
                url: '/module4',
                templateUrl: 'templates/module4/tab-module4.html',
                controller: 'module4Ctrl',
                resolve: {
                    deps:app.loadControllerJs(1)
                }
            })
            .state('module3Child01', {
                url: 'module3Child01',
                params: {json: ''},
                templateUrl: 'templates/module3/module3Child01.html',
                controller: 'module3Child01Ctrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
