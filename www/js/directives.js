angular.module('starter.directives', [])
    .directive('eChart', [function () {
        function link($scope, element, attrs) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(element[0]);
            //监听options变化
            $scope.$watch(attrs['uiOptions'], function () {
                var option = $scope.$eval(attrs.uiOptions);
                if (angular.isObject(option)) {
                    myChart.setOption(option, {
                        notMerge: true
                    });
                }
            }, true);
            $scope.getDom = function () {
                return {
                    'height': element[0].offsetHeight,
                    'width': element[0].offsetWidth
                };
            };
            $scope.$watch($scope.getDom, function () {
                // resize echarts图表
                myChart.resize();
            }, true);
            if (attrs.hasOwnProperty('echartsClick')) {
                myChart.on('click', function (params) {
                    try {
                        if (typeof $scope[attrs['echartsClick']] === 'function') {
                            $scope[attrs['echartsClick']](params);
                        } else {
                            console.error('echarts-click绑定的变量不是一个方法!');
                        }
                    } catch (e) {
                        console.error('echarts-click绑定错误！' + e);
                    }
                });
            }
            if (attrs.hasOwnProperty('isClearEcharts')) {
                $scope.$watch(attrs['isClearEcharts'], function () {
                    var isClearEcharts = $scope.$eval(attrs.isClearEcharts);
                    if (isClearEcharts) {
                        myChart.clear();
                    } else {
                        var option = $scope.$eval(attrs.uiOptions);
                        if (angular.isObject(option)) {
                            myChart.setOption(option, {
                                notMerge: true
                            });
                        }
                    }
                }, true);
            }
        }

        return {
            restrict: 'A',
            link: link
        };
    }])
    .directive("ngTouchstart", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {
                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    var method = $element.attr("ng-touchstart");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

            }]
        }
    })
    .directive("ngTouchmove", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    event.preventDefault();
                    $element.bind("touchmove", onTouchMove);
                    $element.bind("touchend", onTouchEnd);
                }

                function onTouchMove(event) {
                    var method = $element.attr("ng-touchmove");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

                function onTouchEnd(event) {
                    event.preventDefault();
                    $element.unbind("touchmove", onTouchMove);
                    $element.unbind("touchend", onTouchEnd);
                }
            }]
        }
    })
    .directive("ngTouchend", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchend", onTouchEnd);
                function onTouchEnd(event) {
                    var method = $element.attr("ng-touchend");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

            }]
        }
    })
    .directive('adaptive', function () {
        function link($scope, element, attrs) {
            var dom = element[0];
            var wPercent = attrs.adaptiveW;
            var hPercent = attrs.adaptiveH;
            var pPercent = attrs.adaptiveP ? attrs.adaptiveP.split(",") : null;
            var mPercent = attrs.adaptiveM ? attrs.adaptiveM.split(",") : null;
            setWAndH();
            function setWAndH() {
                var screenW = Math.min(document.documentElement.clientWidth, window.innerWidth);
                var screenH = Math.min(document.documentElement.clientHeight, window.innerHeight);
                if (wPercent) { //宽度
                    dom.style.width = wPercent * screenW + "px";
                }
                if (hPercent) {  //高度
                    dom.style.height = hPercent * screenH + "px";
                }
                if (pPercent) {//padding
                    dom.style.paddingTop = pPercent[0] * screenH + "px";
                    dom.style.paddingRight = pPercent[1] * screenW + "px";
                    dom.style.paddingBottom = pPercent[2] * screenH + "px";
                    dom.style.paddingLeft = pPercent[3] * screenW + "px";
                }
                if (mPercent) {//margin
                    dom.style.marginTop = mPercent[0] * screenH + "px";
                    dom.style.marginRight = mPercent[1] * screenW + "px";
                    dom.style.marginBottom = mPercent[2] * screenH + "px";
                    dom.style.marginLeft = mPercent[3] * screenW + "px";
                }
            }

            window.onresize = function () {
                setWAndH();
            };
        }

        return {
            restrict: 'A',
            link: link
        };
    })
    .directive('myfocus', function ($timeout, $parse) {
        return {
            link: function (scope, element, attrs) {
                var model = $parse(attrs.myfocus);
                scope.$watch(model, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    } else if (value === false) {
                        $timeout(function () {
                            element[0].blur();
                        });
                    }
                });
            }
        };
    })
    .directive('noScroll', function ($document) {    /*深度学习指令*/
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $document.on('touchmove', function (e) {
                    e.preventDefault();
                });
            }
        }
    })
    .directive('bindScroll', function ($ionicScrollDelegate, $timeout) {    /*滚动绑定*/
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var attrFlag = attr.bindScroll;
                var attrIndex = parseInt(attr.scrollViewIndex);
                var extfn = attr.scrollExtendFn;
                if (attrFlag === 'left') {
                    if (!scope.scrollElements.left[attrIndex]) {
                        scope.scrollElements.left[attrIndex] = element;
                    }
                    element.bind('touchstart', function () {
                        element.unbind('scroll').bind('scroll', scrollLeft);
                        scope.scrollElements.right[attrIndex].unbind('scroll');
                    });
                    function scrollLeft() {
                        extfn ? scope[extfn](scope.handles.leftHandle[attrIndex].getScrollPosition().top) : '';
                        scope.handles.rightHandle[attrIndex].scrollTo(scope.handles.rightHandle[attrIndex].getScrollPosition().left, scope.handles.leftHandle[attrIndex].getScrollPosition().top, false);
                    }
                } else if (attrFlag === 'right') {
                    if (!scope.scrollElements.right[attrIndex]) {
                        scope.scrollElements.right[attrIndex] = element;
                    }
                    element.bind('touchstart', function () {
                        if (scope.handles.leftHandle[attrIndex] && scope.handles.headHandle[attrIndex]) {
                            element.unbind('scroll').bind('scroll', scrollRight);
                        } else if (scope.handles.leftHandle[attrIndex]) {
                            element.unbind('scroll').bind('scroll', scrollRightWithLeft);
                        } else if (scope.handles.headHandle[attrIndex]) {
                            element.unbind('scroll').bind('scroll', scrollRightWithTop);
                        } else {
                            element.unbind('scroll');
                        }
                        if (scope.handles.leftHandle[attrIndex]) {
                            scope.scrollElements.left[attrIndex].unbind('scroll');
                        }
                        if (scope.handles.headHandle[attrIndex] && !scope.freezeStates[attrIndex]) {
                            scope.scrollElements.head[attrIndex].unbind('scroll');
                        }
                    });
                    function scrollRight() {
                        extfn ? scope[extfn](scope.handles.rightHandle[attrIndex].getScrollPosition().top) : '';
                        scope.handles.headHandle[attrIndex].scrollTo(scope.handles.rightHandle[attrIndex].getScrollPosition().left, 0, false);
                        scope.handles.leftHandle[attrIndex].scrollTo(0, scope.handles.rightHandle[attrIndex].getScrollPosition().top, false);
                    }

                    function scrollRightWithTop() {
                        scope.handles.headHandle[attrIndex].scrollTo(scope.handles.rightHandle[attrIndex].getScrollPosition().left, 0, false);
                    }

                    function scrollRightWithLeft() {
                        scope.handles.leftHandle[attrIndex].scrollTo(0, scope.handles.rightHandle[attrIndex].getScrollPosition().top, false);
                    }
                } else if (attrFlag === 'head') {
                    scope.freezeStates[attrIndex] = Boolean(attr.freezeScrollView == 'true');
                    if (!scope.scrollElements.head[attrIndex]) {
                        scope.scrollElements.head[attrIndex] = element;
                    }
                    if (scope.freezeStates[attrIndex]) {
                        $timeout(function () {
                            scope.handles.headHandle[attrIndex].freezeScroll(true);
                        }, 1000);
                    } else {
                        element.bind('touchstart', function () {
                            element.unbind('scroll').bind('scroll', scrollhead);
                            scope.scrollElements.right[attrIndex].unbind('scroll');
                        });
                        function scrollhead() {
                            scope.handles.rightHandle[attrIndex].scrollTo(scope.handles.headHandle[attrIndex].getScrollPosition().left, scope.handles.rightHandle[attrIndex].getScrollPosition().top, false);
                        }
                    }
                }
            }
        }
    })
    .directive('ionicRatings', function () {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="text-center ionic_ratings">' +
            '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-if="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-if="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-if="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-if="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-if="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-if="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-if="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-if="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-if="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-if="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
            '</div>',
            scope: {
                ratingsObj: '=ratingsobj',
                index: '=index'
            },
            link: function (scope, element, attrs) {

                //Setting the default values, if they are not passed
                scope.iconOn = scope.ratingsObj.iconOn || 'ion-ios-star';
                scope.iconOff = scope.ratingsObj.iconOff || 'ion-ios-star-outline';
                scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(200, 200, 100)';
                scope.iconOffColor = scope.ratingsObj.iconOffColor || 'rgb(200, 100, 100)';
                scope.rating = scope.ratingsObj.rating || 0;
                scope.minRating = scope.ratingsObj.minRating || 0;
                scope.readOnly = scope.ratingsObj.readOnly || false;
                scope.index = scope.index || 0;

                //Setting the color for the icon, when it is active
                scope.iconOnColor = {
                    color: scope.iconOnColor
                };

                //Setting the color for the icon, when it is not active
                scope.iconOffColor = {
                    color: scope.iconOffColor
                };

                //Setting the rating
                scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

                //Setting the previously selected rating
                scope.prevRating = 0;

                scope.$watch('ratingsObj.rating', function (newValue, oldValue) {
                    setRating(newValue);
                });

                function setRating(val, uiEvent) {
                    if (scope.minRating !== 0 && val < scope.minRating) {
                        scope.rating = scope.minRating;
                    } else {
                        scope.rating = val;
                    }
                    scope.prevRating = val;
                    if (uiEvent) scope.ratingsObj.callback(scope.rating, scope.index);
                }

                //Called when he user clicks on the rating
                scope.ratingsClicked = function (val) {
                    setRating(val, true);
                };

                //Called when he user un clicks on the rating
                scope.ratingsUnClicked = function (val) {
                    if (scope.minRating !== 0 && val < scope.minRating) {
                        scope.rating = scope.minRating;
                    } else {
                        scope.rating = val;
                    }
                    if (scope.prevRating == val) {
                        if (scope.minRating !== 0) {
                            scope.rating = scope.minRating;
                        } else {
                            scope.rating = 0;
                        }
                    }
                    scope.prevRating = val;
                    scope.ratingsObj.callback(scope.rating, scope.index);
                };
            }
        }
    })
;
