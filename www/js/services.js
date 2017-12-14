angular.module('starter.services', [])
    .service('LocalsetGet', ['$window', function ($window) {      //保存本地变量
        return {        //存储单个属性
            set: function (key, value) {
                $window.localStorage[key] = value;
            },        //读取单个属性
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },        //存储对象，以JSON格式存储
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },        //读取对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            remove: function (keyName) {
                $window.localStorage.removeItem(keyName);
            }
        };
    }])

    .service('ControllerChecker', ['$controller', function ($controller) {      //检查crl是否已经可以调用
        return {
            exists: function (controllerName) {
                if (typeof window[controllerName] == 'function') {
                    return true;
                }
                try {
                    $controller(controllerName);
                    return true;
                } catch (error) {
                    return !(error instanceof TypeError);
                }
            }
        };
    }])
    .service('loadModelFileAll', ['ControllerChecker', function (ControllerChecker) {      //检查crl是否已经可以调用
        return {
            load: function (data) {
                loadFileAll(data, ControllerChecker);
                return data.ctrlJs;
            },
            loadAll: function (data) {
                if (data) {
                    loadCtrlJs(data, ControllerChecker);        //动态加载子级js,
                    loadAppState(data.ziji);                    //子级路由
                }
            },
            removeAllfile:function(data){
                function handleFileName(pathStr){
                    var pathStrArr = pathStr.split( '/');
                   // console.log(pathStrArr[(pathStrArr.length-1)]);
                    return pathStrArr[(pathStrArr.length-1)];
                }
                if (data) {
                    //removejscssfile(handleFileName(data.ctrlJsPath), 'js');     //移除主js 引用
                    removejscssfile(handleFileName(data.cssPath), 'css');  //移除css文件
                   /* for(var i = 0; i < data.ziji.length;i++){       //移除子级js引用文件
                        console.log('移除----' + data.ziji[i].ctrlJsPath);
                        removejscssfile(handleFileName(data.ziji[i].ctrlJsPath), 'js');
                    }*/
                    /*for(var i = 0;i < angularModuleSD._invokeQueue.length;i++){       //移除ctrl
                        console.log(angularModuleSD._invokeQueue[i][2][0] == 'pkgTableDetailCtrl')
                    }*/
                }
            }

        };
    }])
    .service('HandleViews', ['$ionicHistory', function ($ionicHistory) {      //精确清除一个或多个缓存
        return {
            clearNameCache: function (stateNames) {
                var objArray = [];
                for (var i in $ionicHistory.viewHistory().views) {
                    if (stateNames.indexOf($ionicHistory.viewHistory().views[i].stateName) != -1) {
                        objArray.push($ionicHistory.viewHistory().views[i].stateId);
                    }
                }
                objArray.length > 0 ? $ionicHistory.clearCache(objArray) : null;
            }
        };
    }])
    .factory('getData', function ($q) {                     //通用data,其他特殊需求可新建
        function getData(param, url) {
            param.masterId = masterId;
            var url = baseUrl + url;
            var deferred = $q.defer();
            var datas = deferred.promise;
            $.ajax({
                url: url,
                type: 'get',
                timeout: 20000, //超时时间设置，单位毫秒
                dataType: 'json',
                data: param,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (data) {
                    deferred.resolve(data);
                }
            });
            return datas;
        }

        return {
            getData: getData
        };
    })
    .factory('getMainCtrlJsFile', function ($q, ControllerChecker) {                     //通用data,其他特殊需求可新建
        function getCtrlJsFile(data) {
            if (ControllerChecker.exists(data.ctrlJs)) {        //加载主ctrl
                return;
            }
            var deferred = $q.defer();
            var datas = deferred.promise;
            $.getScript(data.ctrlJsPath, function (data, textStatus) {
                deferred.resolve(textStatus);
            });
            return datas;
        }

        return {
            getCtrlJsFile: getCtrlJsFile
        };
    })
    .factory('postData', function ($q) {                     //通用data,其他特殊需求可新建
        function postData(param, url) {
            var url = baseUrl + url + "?masterId=" + masterId;
            var deferred = $q.defer();
            var datas = deferred.promise;
            $.ajax({
                url: url,
                type: 'post',
                timeout: 20000, //超时时间设置，单位毫秒
                dataType: 'json',
                data: param,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (data) {
                    deferred.resolve(data);
                }
            });
            return datas;
        }

        return {
            postData: postData
        };
    })



    .factory('CityNames', function ($q) {//城市数据地点回传
        var cityDatas = {"num": "", "id": "", "name": "", "privateCityData": ""};
        return cityDatas;
    })

    .factory('EhcartsHandle', function () {//新动态图表
        return {
            handleDTSP: function (data, str) {
                var xZhou = [];
                var serieData1 = [];
                var serieData2 = [];
                for (var i = 0; i < data.length; i++) {
                    xZhou.push(data[i].incomeDt.substring(4, 6) + '/' + data[i].incomeDt.substring(6));
                    serieData1.push(data[i].curVal);
                    serieData2.push(data[i].tolVal);
                }
                return {
                    color: ['#99c2ff', '#ff9705'],
                    tooltip: {
                        /* trigger: 'axis',
                         axisPointer: {
                         animation: false,
                         type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

                         }*/
                        textStyle: {
                            fontSize: "12"
                        },
                        backgroundColor: "rgba(0,0,0,0.4)",
                        hideDelay: 1000,
                        trigger: 'axis',
                        showContent: true,
                        axisPointer: {
                            type: 'shadow',
                            lineStyle: {
                                color: "#173c73"
                            }
                        }
                        /*formatter: function (params) {
                         console.log(JSON.stringify(params) + "----");
                         var res;
                         if(params.length>1){
                         res = '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#99C2FF;margin: 7px 6px 0 0;"></div>' + TransedData.title[0]+" : " + formatNum(params[0].data != undefined ? params[0].data : "") + '</div>';
                         res += '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#FF9705;margin: 7px 6px 0 0;"></div>' + "预计 : " + formatNum(params[1].data != undefined ? params[1].data : "") + '</div>';
                         }else{
                         res = '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:" + params[0].color + ";margin: 7px 6px 0 0;"></div>' + params[0].seriesName+" : " + formatNum(params[0].data != undefined ? params[0].data : "") + '</div>';
                         }
                         return res;
                         },*/
                    },
                    grid: {
                        top: 5
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: [str, '预计']
                    },
                    xAxis: {
                        nameTextStyle: {
                            color: '#E99B9C',
                        },
                        nameLocation: 'middle',
                        nameGap: -50,
                        axisTick: {
                            interval: 0,
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#B9BABC'
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                        },
                        splitLine: {
                            show: false
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: xZhou
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        },
                        //去掉刻度
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        }
                    },
                    series: [
                        {
                            name: str,
                            barGap: 0,
                            type: 'bar',
                            barWidth: 15,
                            data: serieData1
                        },
                        {
                            name: '预计',
                            type: 'line',
                            data: serieData2
                        }
                    ]
                };
            }
        }
    })

    .factory('initParames', function () {                   //初始化参数用
        return {
            init: function () {

            }
        };
    })


    .service('calendar', function () {
        var nstr;
        var ynow;
        var mnow;
        var dnow;
        var realYnow;
        var realMnow;
        var realDnow;
        this.getCalendarData = function (y, m) {
            initCurrentDateValue();
            if (y && m) {
                ynow = parseInt(y);
                mnow = parseInt(m) - 1;
            } else {
                if (mnow != realMnow || ynow != realYnow) {
                    ynow = realYnow;
                    mnow = realMnow;
                    dnow = realDnow;
                }
            }
            return calendar(nstr, ynow, mnow, dnow);
        };

        var initCurrentDateValue = function () {
            if (!nstr) {
                nstr = new Date();
                ynow = realYnow = nstr.getFullYear();
                mnow = realMnow = nstr.getMonth();
                dnow = realDnow = nstr.getDate();
            }
            return nstr;
        };

        this.getCurrentYear = function () {
            initCurrentDateValue();
            return realYnow;
        };

        this.getCurrentMonth = function () {
            initCurrentDateValue();
            return realMnow + 1;
        };

        this.getCurrentDay = function () {
            initCurrentDateValue();
            return realDnow;
        };

        this.getCurrentDateFormat = function (f) {
            if (f) {
                initCurrentDateValue();
                var rm = realMnow + 1;
                if (f === "yyyymmdd") {
                    return realYnow + "" + (rm < 10 ? "0" + rm : rm) + "" + (realDnow < 10 ? "0" + realDnow : realDnow);
                } else if (f === "yyyy-mm-dd") {
                    return realYnow + "-" + (rm < 10 ? "0" + rm : rm) + "-" + (realDnow < 10 ? "0" + realDnow : realDnow);
                } else if (f === "yyyy/mm/dd") {
                    return realYnow + "/" + (rm < 10 ? "0" + rm : rm) + "/" + (realDnow < 10 ? "0" + realDnow : realDnow);
                }
            } else {
                console.error("getCurrentDateFormat有且仅有一个必填参数format，该format传入或格式错误");
                return false;
            }
        };

        this.getWeekWithDay = function (d) {
            initCurrentDateValue();
            if (d) {
                var m_days = new Array(31, 28 + is_leap(ynow), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);  //每个月的天数
                var yy = d.substring(0, 4);
                var mm = d.substring(4, 6);
                var dd = d.substring(6, 8);
                var curD = parseInt(dd);
                var curM = parseInt(mm);
                var weekArray = [];
                var nlstr = new Date(yy, curM - 1, curD);
                var week = nlstr.getDay();
                var weekStr = "";
                switch (week) {
                    case 0:
                        weekStr = "日";
                        break;
                    case 1:
                        weekStr = "一";
                        break;
                    case 2:
                        weekStr = "二";
                        break;
                    case 3:
                        weekStr = "三";
                        break;
                    case 4:
                        weekStr = "四";
                        break;
                    case 5:
                        weekStr = "五";
                        break;
                    case 6:
                        weekStr = "六";
                        break;

                }
                weekArray.push({day: dd, date: d, week: weekStr});
                for (var i = 0; i < 6; i++) {
                    if (week == 0) {
                        week = 6;
                    } else {
                        week--;
                    }
                    switch (week) {
                        case 0:
                            weekStr = "日";
                            break;
                        case 1:
                            weekStr = "一";
                            break;
                        case 2:
                            weekStr = "二";
                            break;
                        case 3:
                            weekStr = "三";
                            break;
                        case 4:
                            weekStr = "四";
                            break;
                        case 5:
                            weekStr = "五";
                            break;
                        case 6:
                            weekStr = "六";
                            break;

                    }
                    if (curD == 1) {
                        curD = m_days[curM - 2];
                        curM--;
                        weekArray.push({
                            day: curD,
                            date: yy + (curM < 10 ? ("0" + curM) : ("" + curM)) + curD,
                            week: weekStr
                        });
                        continue;
                    }
                    curD--;
                    var curDStr = curD;
                    if (curD < 10) {
                        curDStr = "0" + curD;
                    }
                    weekArray.push({
                        day: curDStr,
                        date: yy + (curM < 10 ? ("0" + curM) : ("" + curM)) + curDStr,
                        week: weekStr
                    });
                }
                return weekArray.reverse();
            } else {
                console.error("请传入一个日期参数");
                return false;
            }
        };

        function is_leap(year) {  //判断是否为闰年
            return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
        }

        this.preMonth = function () {  //上一个月
            if (mnow <= 0) {
                mnow = 11;
                ynow = ynow - 1;
            } else {
                mnow--;
            }
            return calendar(nstr, ynow, mnow, dnow);
        };

        this.nextMonth = function () {   //下一个月
            if (mnow >= 11) {
                mnow = 0;
                ynow = ynow + 1;
            } else {
                mnow++;
            }
            return calendar(nstr, ynow, mnow, dnow);
        };

        function calendar(nstr, ynow, mnow, dnow) {
            var calendarData = {};
            var m = calendarData.month = mnow + 1 >= 10 ? "" + (mnow + 1) : "0" + (mnow + 1);
            calendarData.year = ynow + "";
            calendarData.dateList = [];
            var nlstr = new Date(ynow, mnow, 1);  //当月第一天
            var firstday = nlstr.getDay();        //第一天星期几

            var m_days = new Array(31, 28 + is_leap(ynow), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);  //每个月的天数

            var tr_str = Math.ceil((m_days[mnow] + firstday) / 7);   //当前月天数+第一天是星期几的数值   获得 表格行数
            var i, k, idx, date_str;
            for (i = 0; i < tr_str; i++) {
                for (k = 0; k < 7; k++) {
                    idx = i * 7 + k; //单元格自然序列号
                    date_str = idx - firstday + 1; //计算日期
                    (date_str <= 0 || date_str > m_days[mnow]) ? date_str = "" : date_str = ((idx - firstday + 1) >= 10) ? (idx - firstday + 1) : "0" + (idx - firstday + 1); //过滤无效日期（小于等于零的、大于月总天数的）
                    var d = {};
                    d.dataD = ynow + "" + m + "" + date_str;
                    d.weekD = k + "";
                    d.day = date_str;
                    calendarData.dateList.push(d);
                }
            }
            return calendarData;
        }
    })
    .factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
;
