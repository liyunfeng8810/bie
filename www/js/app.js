// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.filter'])

    .run(function ($ionicPlatform) {
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

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.module1', {
                url: '/module1',
                views: {
                    'tab-module1': {
                        templateUrl: 'templates/module1/tab-module1.html',
                        controller: 'module1Ctrl'
                    }
                }
            })

            .state('tab.module2', {
                url: '/module2',
                views: {
                    'tab-module2': {
                        templateUrl: 'templates/module2/tab-module2.html',
                        controller: 'module2Ctrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/module2/:chatId',
                views: {
                    'tab-module2': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.module3', {
                url: '/module3',
                views: {
                    'tab-module3': {
                        templateUrl: 'templates/module3/tab-module3.html',
                        controller: 'module3Ctrl'
                    }
                }
            })
            .state('tab.module4', {
                url: '/module4',
                views: {
                    'tab-module4': {
                        templateUrl: 'templates/module4/tab-module4.html',
                        controller: 'module4Ctrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/module1');

    });
