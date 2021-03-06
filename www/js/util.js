

function loadCtrlJs(list, ControllerChecker) {
    for (var i = 0; i < list.child.length; i++) {              //重新回到页面重新循环判断是否已经全部加载ctrl
        if (!ControllerChecker.exists(list.child[i].ctrlJs)) {        //判断是否ctrl是否可用
            $.getScript(list.child[i].ctrlJsPath);
        }
    }
}
function loadAppState(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].isGoCtrl) {               //动态加载路由  只设置了收入快报
            $stateProviderRef.state(list[i].name, list[i].state);
            list[i].isGoCtrl = false;
        }
    }
}
function isInclude(name) {                   //判断是否引入css 或者 js 调用 isInclude("abc.js")  isInclude("icommonyd.css")
    var js = /js$/i.test(name);
    var es = document.getElementsByTagName(js ? 'script' : 'link');
    for (var i = 0; i < es.length; i++)
        if (es[i][js ? 'src' : 'href'].indexOf(name) != -1)return true;
    return false;
}
function addMovementCss(path) {
    if (!isInclude(path)) {           //动态加载css文件
        $("<link>")
            .attr({
                rel: "stylesheet",
                type: "text/css",
                href: path
            })
            .appendTo("head");
    }
}
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none";
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none";
    var allsuspects=document.getElementsByTagName(targetelement);
    for (var i=allsuspects.length; i>=0; i--){
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}
function loadFileAll(list, ControllerChecker) {       //动态加载模块的全部文件和注册路由.
    if(list){
        loadCtrlJs(list, ControllerChecker);        //动态加载js,
        loadAppState(list.ziji);                //路由
        addMovementCss(list.cssPath);           //css
    }
}

function isEmptyObject(e) {         //判断为空
    var t;
    for (t in e)
        return !1;
    return !0
}

var autoPopUpsData = {
    autoPopUpsVersion: {        //总更新弹窗缓存控制
        key: 'showAutoPopUps',
        value: 11.5
    },
    moreModelVersion: {        //更多的引导页
        key: 'moreModelVersion',
        value: 10.0
    },
    questionHelp: {            //问号弹窗
        key: 'questionHelpVersion',
        value: 10.4
    },
    quotaBannrControl: true,
    textList: [
        {text: '【<strong>指标模块</strong>】指标模块进行全面改版，功能更丰富，排版更精简，重要的是可以自定义指标！自定义指标！自定义指标！重要的事说三遍。玩过股票的都知道！欢迎各位同学尽情探索！'},
        {text: '【双十二高峰战报】双十一已过，各位有没有被我们的高峰战报所惊艳？双十二即将到来，惊艳继续！'},
        {text: '【融合项目】新增组织选择、指标列表的搜索功能。更方便，更快捷！'},
        {text: '【双十二高峰总结】一份总结凝聚了我们浓浓的关切，这份关切即将到来，敬请期待！'},
        {text: '<strong>伟大的产品总会留有不足来督促，我们正在路上，请督促我们！</strong>'}]
};
function findFirstNotNullName(array) {
    if (!array) {
        return;
    }
    var result = 0;
    var resultName;
    for (var i = 0; i < array.length; i++) {
        if (array[i].data) {
            for (var j = array[i].data.length - 1; j >= (0 + result); j--) {
                if (array[i].data[j]) {
                    if (array[i].data[j].value && array[i].data[j].name != "累计") {
                        result = j;
                        resultName = array[i].data[j].name;
                        break;
                    }
                }
            }
        }
    }
    //console.log(resultName);
    return resultName;
}
var itemData = [
    {name: '利润', value: '0', deng: '0', id: 'ID0501'},
    {name: '市占', value: '0', deng: '0', id: 'ID0502'},
    {name: '品牌', value: '0', deng: '0', id: 'ID0504'},
    {name: '抗风险', value: '0', deng: '0', id: 'ID0505'},
    {name: '质量', value: '0', deng: '0', id: 'ID0503'}];
var itemLeijiData = [
    {name: '利润', value: '0', deng: '0', id: 'ID0501'},
    {name: '市占', value: '0', deng: '0', id: 'ID0502'},
    {name: '品牌', value: '0', deng: '0', id: 'ID0504'},
    {name: '抗风险', value: '0', deng: '0', id: 'ID0505'},
    {name: '质量', value: '0', deng: '0', id: 'ID0503'}];
var max = 1;
var maxLeiji = 1;

function handleLeidaShu(data) {
    if (data.length == 1) {
        return "   " + data + "  ";
    } else if (data.length == 2) {
        return " " + data + "  ";
    } else if (data.length == 3) {
        return " " + data + "  ";
    } else {
        return data;
    }

}
//全景雷达echarts图
function echartsQuanJing(itemDataJson) {
    var valueList = [];
    for (var i = 0; i < itemDataJson.length; i++) {
        valueList.push(itemDataJson[i].value);
    }
    var maxNei = Number(max) + 1;
    var option = {
        radar: {
            indicator: [
                {name: itemDataJson[0].name + " " + handleLeidaShu(itemDataJson[0].value), max: maxNei},
                {name: itemDataJson[1].name + " " + handleLeidaShu(itemDataJson[1].value), max: maxNei},
                {name: itemDataJson[2].name + " " + handleLeidaShu(itemDataJson[2].value), max: maxNei},
                {name: itemDataJson[3].name + " " + handleLeidaShu(itemDataJson[3].value), max: maxNei},
                {name: itemDataJson[4].name + " " + handleLeidaShu(itemDataJson[4].value), max: maxNei}
            ],
            symbol: {},
            name: {
                textStyle: {
                    color: '#2B2E33',
                    fontSize: 14
                }
            },
            splitArea: {
                show: false
            },
            nameGap: 7,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'c8deff'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: [
                        '#c8deff', '#f0f5fd',
                        '#f0f5fd', '#f0f5fd',
                        '#f0f5fd', '#f0f5fd'
                    ].reverse()
                }
            }
        },
        grid: {
            top: 5
        },
        series: [{
            tooltip: {
                trigger: 'item'
            },
            radar: {
                symbol: 'roundRect'
            },
            itemStyle: {
                normal: {
                    color: '#9dc4ff'
                }
            },
            areaStyle: {
                normal: {
                    color: 'rgba(153,194,255,0.3)'
                }
            },
            type: 'radar',
            symbol: "none",
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#2B2E33',
                        fontSize: 14
                    }
                },
                emphasis: {
                    show: false
                }
            },
            data: [
                {
                    value: valueList
                }
            ]
        }]
    };
    return option;
}
//经营诊断首页的雷达图
function echartsJYZDHome(itemDataJson) {
    var valueList = [];
    //var a = 0;
    for (var i = 0; i < itemDataJson.length; i++) {
        valueList.push(itemDataJson[i].value);
    }
    var maxNei = Number(max) + 1;
    var option = {
        radar: {
            indicator: [
                {name: itemDataJson[0].name + " " + handleLeidaShu(itemDataJson[0].value), max: maxNei},
                {name: itemDataJson[1].name + " " + handleLeidaShu(itemDataJson[1].value), max: maxNei},
                {name: itemDataJson[2].name + " " + handleLeidaShu(itemDataJson[2].value), max: maxNei},
                {name: itemDataJson[3].name + " " + handleLeidaShu(itemDataJson[3].value), max: maxNei},
                {name: itemDataJson[4].name + " " + handleLeidaShu(itemDataJson[4].value), max: maxNei}
            ],
            symbol: {},
            name: {
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 14
                }
            },
            splitArea: {
                show: false
            },
            nameGap: 7,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: [
                        'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.2)',
                        'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)',
                        'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'
                    ].reverse()
                }
            }
        },
        grid: {
            top: 5
        },
        series: [{
            tooltip: {
                trigger: 'item'
            },
            radar: {
                symbol: 'roundRect'
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,0.6)'
                }
            },
            areaStyle: {
                normal: {
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            type: 'radar',
            symbol: "none",
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14
                    }
                },
                emphasis: {
                    show: false
                }
            },
            data: [
                {
                    value: valueList
                }
            ]
        }]
    };
    return option;
}

//全景雷达累计echarts图
function echartsQuanJingLeiji(itemData) {
    var valueList = [];
    for (var i = 0; i < itemData.length; i++) {
        valueList.push(itemData[i].value);
    }
    var maxNeiLeiji = Number(maxLeiji) + 1;
    var option = {
        radar: {
            indicator: [
                {name: itemData[0].name + " " + handleLeidaShu(itemData[0].value), max: maxNeiLeiji},
                {name: itemData[1].name + " " + handleLeidaShu(itemData[1].value), max: maxNeiLeiji},
                {name: itemData[2].name + " " + handleLeidaShu(itemData[2].value), max: maxNeiLeiji},
                {name: itemData[3].name + " " + handleLeidaShu(itemData[3].value), max: maxNeiLeiji},
                {name: itemData[4].name + " " + handleLeidaShu(itemData[4].value), max: maxNeiLeiji}
            ],
            symbol: {},
            name: {
                textStyle: {
                    color: '#2B2E33',
                    fontSize: 14
                }
            },
            splitArea: {
                show: false
            },
            nameGap: 7,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'c8deff'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: [
                        '#c8deff', '#f0f5fd',
                        '#f0f5fd', '#f0f5fd',
                        '#f0f5fd', '#f0f5fd'
                    ].reverse()
                }
            }
        },
        grid: {
            top: 5
        },
        series: [{
            tooltip: {
                trigger: 'item'
            },
            itemStyle: {
                normal: {
                    color: '#9dc4ff'
                }
            },
            areaStyle: {
                normal: {
                    color: 'rgba(153,194,255,0.3)'
                }
            },
            type: 'radar',
            symbol: "none",
            data: [
                {
                    value: valueList
                }
            ]
        }]
    };
    return option;
}

//复用柱状echarts图
function echartsShiZhan(data, str, indexid) {
    //var str1 = str + indexIDDw(indexid);
    //var shouru = new Array();
    var xZhou = [];
    var option = "";
    var value1 = [];
    var value2 = [];
    var value3 = [];
    var danwei = indexIDDw(indexid);
    var str1 = '';
    var str2 = '';
    var str3 = '';
    /*var tongbi = new Array();
     var dacheng = new Array();*/
    //无目标值
    if (indexid == 'ID050305' || indexid == 'ID050306' || indexid == 'ID050405' || indexid == 'ID050502') {
        danwei = indexIDDw(indexid);
        str1 = '本月' + danwei;
        str2 = '上月' + danwei;
        str3 = '环比' + (indexid == 'ID050502' ? '(次)' : '%');
        for (var i = data.length - 7; i < data.length; i++) {
            xZhou.push(data[i].mont_code.substring(4, 6) + "月");
            value1.push(data[i].mont_value);
            value2.push(data[i].last_mont_value);
            value3.push(data[i].mont_value_qoq);
        }
    } else {      //有目标值
        str1 = '实际值' + danwei;
        str2 = '目标值' + danwei;
        str3 = '达成率' + (indexid == 'ID050502' ? '(次)' : '%');
        for (var i = data.length - 7; i < data.length; i++) {
            xZhou.push(data[i].mont_code.substring(4, 6) + "月");
            value1.push(data[i].mont_value);
            value2.push(data[i].mont_target_value);
            value3.push(data[i].mont_rate);
        }
    }
    option = {
        color: ['#9dc4ff', '#C6C9FA', '#FF9705'],
        tooltip: {
            trigger: "axis",
            showContent: true,
            backgroundColor: 'rgba(50,50,50,0.5)',
            axisPointer: {
                type: "shadow",
                lineStyle: {
                    "color": "#173c73"
                }
            },
            extraCssText: 'text-align:left;'
        },
        legend: {
            textStyle: {
                color: '#828A99',
                fontStyle: 10
            },
            left: 'center',
            x: 'center',
            y: 'bottom',
            data: [str1, str2, str3]
        },
        grid: {
            left: '3%',
            right: '3%',
            top: 10,
            x: 50,
            x2: 50
        },
        xAxis: {
            axisLabel: {
                interval: 0
            },
            type: 'category',
            data: xZhou,
            axisLine: { //隐藏y轴
                lineStyle: {
                    color: "#828A99",
                    width: 1
                }
            },
            axisTick: { //隐藏刻度
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 0,
                    formatter: '{value}'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {    //背景网格线
                    show: false
                }
            },
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 5,
                    formatter: '{value}.0%'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#eaeaea'],
                        width: 1,
                        type: 'dashed'
                    }
                }
            }
        ],
        series: [{
            name: str1,
            type: 'bar',
            barGap: 0,
            smooth: true,
            yAxisIndex: 0,
            barWidth: 15,
            data: value1
        },
            {
                name: str2,
                smooth: true,
                barGap: 0,
                yAxisIndex: 0,
                type: 'bar',
                barWidth: 15,
                data: value2
            },
            {
                name: str3,
                smooth: true,
                yAxisIndex: 1,
                type: 'line',
                barWidth: 1,
                data: value3
            },
        ]
    };
    return option;
}

//市占柱状echarts图
function echartsShiZhanDandu(data, str, indexid) {        //单独的市占echarts
    var str1 = '达成率(%)';
    var str2 = '目标值(万元)';
    var xZhou = [];
    var shouru = [];
    var shouruValue = [];
    var shourumubiao = [];

    for (var i = data.length - 7; i < data.length; i++) {
        xZhou.push(data[i].mont_code.substring(4, 6) + "月");
        shouru.push(data[i].mont_rate);
        shouruValue.push(data[i].mont_value);
        shourumubiao.push(data[i].mont_target_value);
    }
    var option = {
        color: ['#9dc4ff', '#C6C9FA', '#FF9705'],
        tooltip: {
            trigger: "axis",
            showContent: true,
            backgroundColor: 'rgba(50,50,50,0.4)',
            axisPointer: {
                "type": "shadow",
                "lineStyle": {
                    "color": "#173c73"
                }
            },
            extraCssText: 'text-align:left;'
        },
        legend: {
            textStyle: {
                color: '#828A99',
                fontStyle: 10
            },
            x: 'center',
            y: 'bottom',
            data: ['实际值(万元)', str2, str1]
        },
        grid: {
            left: '3%',
            right: '3%',
            top: 10,
            x: 50,
            x2: 50
        },
        xAxis: {
            axisLabel: {
                interval: 0
                //rotate: 60,
            },
            type: 'category',
            data: xZhou,
            axisLine: { //隐藏y轴
                lineStyle: {
                    color: "#828A99",
                    width: 1
                }
            },
            axisTick: { //隐藏刻度
                show: false
            },
            splitLine: {
                show: false
            }
        }
        ,
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 0,
                    formatter: '{value}'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {    //背景网格线
                    show: false
                }
            },
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 5,
                    formatter: '{value}.0%'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#eaeaea'],
                        width: 1,
                        type: 'dashed'
                    }
                }
            }
        ],
        series: [{
            name: '实际值(万元)',
            type: 'bar',
            barGap: 0,
            smooth: true,
            yAxisIndex: 0,
            barWidth: 15,
            data: shouruValue
        }, {
            name: str2,
            smooth: true,
            barGap: 0,
            yAxisIndex: 0,
            type: 'bar',
            barWidth: 15,
            data: shourumubiao
        },
            {
                name: str1,
                smooth: true,
                yAxisIndex: 1,
                type: 'line',
                barWidth: 1,
                data: shouru
            }
        ]
    };
    return option;
}


function indexIDDw(input) {      //指标单位
    if (input == 'ID050101' || input == 'ID050501' || input == 'ID05030202' || input == 'ID05030302' || input == 'ID05030301' || input == 'ID05030201' || input == 'ID050403' || input == 'ID05040401') {
        return "(%)";
    } else if (input == 'ID050301' || input == 'ID05040102' || input == 'ID05040101') {
        return "(百万分)";
    } else if (input == 'ID050201') {
        return "(元)";
    } else if (input == 'ID050304') {
        return "(小时)";
    } else if (input == 'ID050502') {
        return "(次)";
    } else {
        return "%";
    }
}

//融合项目一个饼图
function echartsYuanXiao(fontSize, M, D, textM, textD) {
    var rest = parseInt(D - M);
    return {
        color: ['#4791FF', '#DAE9FF'],
        grid: [{
            top: 0
        }],
        series: [
            {
                type: 'pie',
                silent: true,  //取消点击响应
                radius: ['70%', '80%'],
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [
                    {
                        value: M, name: '未达标部分',
                        label: {
                            normal: {
                                formatter: function () {
                                    return M + '/' + D;
                                },
                                textStyle: {
                                    fontSize: fontSize
                                }
                            }
                        }
                    },
                    {
                        value: rest, name: '达标部分',
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: '#DAE9FF'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '\n' + textM + '/' + '\n' + textD,
                                textStyle: {
                                    color: '#828A99',
                                    fontSize: 9
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
}

//融合项目新饼图
function pieEchart(options) {
    var M = options.molecule;
    var D = options.denominator;
    var maxRadius = options.maxRadius;
    var minRadius = options.minRadius;
    var rest = D - M;
    return {
        grid: [{
            top: 0
        }],
        series: [
            {
                type: 'pie',
                silent: true,  //取消点击响应
                radius: [minRadius, maxRadius],
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: M, name: '',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0.5, 0, 1, 1, [{
                                    offset: 0,
                                    color: '#57F7D3'
                                }, {
                                    offset: 1,
                                    color: '#0CF1D9'
                                }])
                            }
                        }
                    },
                    {
                        value: rest, name: '',
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#64ACFF'
                                }, {
                                    offset: 1,
                                    color: '#098DFF'
                                }])
                            }
                        }
                    }
                ]
            }
        ]
    }
}


function realTimePieEcharts(option) {
    return {
        color: option.colors,
        legend: {
            left: '15%',
            top: '35%',
            itemWidth: 12,
            itemHeight: 12,
            orient: 'vertical',
            data: ['待处理', '已处理'],
            textStyle: {
                color: '#666666',
                fontSize: 14
            }
        },
        series: [
            {
                type: 'pie',
                radius: [option.minRadius, option.maxRadius],
                center: ['70%', '50%'],
                selectedMode: false,
                hoverAnimation: false,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: option.values[0],
                        name: option.names[0]
                    },
                    {
                        value: option.values[1],
                        name: option.names[1]
                    }
                ]
            }
        ]
    };
}

function radarEchart(options) {
    var value = options.value;
    var indicatorValue = options.indicatorValue;
    var tipName = options.tipName;
    return {
        tooltip: {
            formatter: function (params, ticket, callback) {
                var res = '<div>' + params.name + '<div>';
                res += '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#FF9705;margin: 7px 6px 0 0;"></div>' + indicatorValue[0].name + ": " + ((!params.value[0] || params.value[0] == '-') ? '-' : (parseFloat(params.value[0]) * 100).toFixed(1) + ' %') + '</div>';
                res += '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#FF9705;margin: 7px 6px 0 0;"></div>' + indicatorValue[3].name + ": " + ((!params.value[3] || params.value[3] == '-') ? '-' : (parseFloat(params.value[3]) * 100).toFixed(1) + ' %') + '</div>';
                res += '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#FF9705;margin: 7px 6px 0 0;"></div>' + indicatorValue[2].name + ": " + ((!params.value[2] || params.value[2] == '-') ? '-' : (parseFloat(params.value[2]) * 100).toFixed(1) + ' %') + '</div>';
                res += '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#FF9705;margin: 7px 6px 0 0;"></div>' + indicatorValue[1].name + ": " + ((!params.value[1] || params.value[1] == '-') ? '-' : (parseFloat(params.value[1]) * 100).toFixed(1) + ' %') + '</div>';
                return res;
            }
        },
        radar: {
            name: {
                textStyle: {
                    fontSize: 12,
                    color: '#666666'
                }
            },
            center: ['50%', '50%'],
            radius: '60%',
            splitNumber: 5,
            splitArea: {
                areaStyle: {
                    opacity: 0
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['rgba(71,145,255,0.5)',
                        'rgba(71,145,255,0.4)',
                        'rgba(71,145,255,0.3)',
                        'rgba(71,145,255,0.2)',
                        'rgba(71,145,255,0.1)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(71,145,255,0.5)'
                }
            },
            // shape: 'circle',
            indicator: indicatorValue
        },
        series: [{
            type: 'radar',
            // areaStyle: {normal: {}},
            areaStyle: {
                normal: {
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //     offset: 0,
                    //     color: '#4D8BFF'
                    // }, {
                    //     offset: 1,
                    //     color: '#FF679C'
                    // }])
                    color: '#4D8BFF'
                }
            },
            data: [
                {
                    value: value,
                    name: tipName
                }
            ]
        }]
    };
}

function lineSampleTrendEcharts(option) {
    var trend = {
        color: ['#FF9705'],
        grid: {
            x: 0,
            y: 10,
            x2: 0,
            y2: 0
        },
        xAxis: {
            axisLabel: {
                interval: 0
            },
            type: 'category',
            axisLine: {
                show: false,
                lineStyle: {
                    width: 0
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 5,
                    formatter: '{value}.0%'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#eaeaea'],
                        width: 1,
                        type: 'dashed'
                    }
                }
            }
        ],
        series: [{
            name: "",
            smooth: true,
            yAxisIndex: 0,
            type: 'line',
            barWidth: 1,
            data: option.data1
        }
        ]
    };
    return trend;
}

function lineTrendEcharts(option) {
    var trend = {
        color: ['#4BA3FF', '#FF9705'],
        tooltip: {
            trigger: "axis",
            showContent: true,
            backgroundColor: 'rgba(50,50,50,0.4)',
            axisPointer: {
                "type": "shadow",
                "lineStyle": {
                    "color": "#173c73"
                }
            },
            extraCssText: 'text-align:left;',
            formatter: function (params, ticket, callback) {
                if (option.isDefineTip) {
                    var res;
                    if (params.length > 1) {
                        res = '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#4BA3FF;margin: 7px 6px 0 0;"></div>' + params[0].seriesName + ": " + (!params[0].value || params[0].value == '-' ? '-' : params[0].value) + '</div>';
                        res += '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#FF9705;margin: 7px 6px 0 0;"></div>' + params[1].seriesName + ": " + (!params[1].value || params[1].value == '-' ? '-' : ((parseFloat(params[1].value) * 100).toFixed(1) + ' %')) + '</div>';
                    } else {
                        res = '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;margin: 7px 6px 0 0;"></div>' + params[0].seriesName + ": " + (params[0].seriesType == "line" ? (!params[0].value || params[0].value == '-' ? '-' : ((parseFloat(params[0].value) * 100).toFixed(1) + ' %')) : (!params[0].value || params[0].value == '-' ? '-' : params[0].value)) + '</div>';
                    }
                    return res;
                } else {
                    option.func(params);
                }

            }
        },
        legend: {
            textStyle: {
                color: '#828A99',
                fontStyle: 10
            },
            itemGap: 20,
            x: 'center',
            y: 'bottom',
            data: [option.str2, option.str1]
        },
        grid: {
            show: true,
            backgroundColor: 'rgba(33,150,243,0.05)',
            borderWidth: 0,
            x: 20,
            y: 20,
            x2: 20,
            y2: 50
        },
        xAxis: {
            axisLabel: {
                interval: 0,
                color: '#999999'
            },
            type: 'category',
            data: option.xZhou,
            axisLine: { //隐藏y轴
                lineStyle: {
                    color: "#2196F3",
                    width: 1
                }
            },
            axisTick: { //隐藏刻度
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 0,
                    formatter: '{value}'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: true,
                    lineStyle: {
                        color: "#2196F3",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {    //背景网格线
                    show: false
                }
            },
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 5,
                    formatter: '{value}.0%'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#eaeaea'],
                        width: 1,
                        type: 'dashed'
                    }
                }
            }
        ],
        series: [{
            name: option.str2,
            smooth: true,
            barGap: 0,
            yAxisIndex: 0,
            type: 'bar',
            barWidth: 15,
            data: option.data2
        }, {
            name: option.str1,
            smooth: true,
            yAxisIndex: 1,
            // areaStyle: {
            //     normal: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //             offset: 0,
            //             color: '#AEFFF9'
            //         }, {
            //             offset: 1,
            //             color: '#6AE5EB'
            //         }])
            //     }
            // },
            type: 'line',
            barWidth: 1,
            data: option.data1
        }
        ]
    };
    return trend;
}

function prepend(arr, item) {
    return [item].concat(arr);
}
var ScrollFix = function (elem) {
    // Variables to track inputs
    var startY, startTopScroll;

    elem = elem || document.querySelector(elem);

    // If there is no element, then do nothing
    if (!elem)
        return;

    // Handle the start of interactions
    elem.addEventListener('touchstart', function (event) {
        startY = event.touches[0].pageY;
        startTopScroll = elem.scrollTop;

        if (startTopScroll <= 0)
            elem.scrollTop = 1;

        if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
            elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }, false);
};
//最经典的柱状图+折线图
function barLineTrend(str1, str2, xZhou, data1, data2) {
    var option = {
        color: ['#99C2ff', '#FF9705'],
        tooltip: {
            trigger: "axis",
            showContent: true,
            backgroundColor: 'rgba(50,50,50,0.4)',
            axisPointer: {
                "type": "shadow",
                "lineStyle": {
                    "color": "#173c73"
                }
            },
            extraCssText: 'text-align:left;',
            formatter: function (params) {
                var res;
                if (params.length > 1) {
                    res = '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#99C2FF;margin: 7px 6px 0 0;"></div>' + params[0].seriesName + ": " + (params[0].value == undefined ? '-' : params[0].value) + '</div>';
                    res += '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;background-color:#FF9705;margin: 7px 6px 0 0;"></div>' + params[1].seriesName + ": " + (params[1].value == undefined ? '-' : (parseFloat(params[1].value).toFixed(2))) + '</div>';
                } else {
                    res = '<div style="display: flex;">' + '<div style="border-radius:6px;width:9px;height:9px;margin: 7px 6px 0 0;"></div>' + params[0].seriesName + ": " + (params[0].seriesType == "line" ? (params[0].value == undefined ? '-' : (parseFloat(params[0].value).toFixed(2))) : (params[0].value == undefined ? '-' : params[0].value)) + '</div>';
                }
                return res;
            }
        },
        legend: {
            textStyle: {
                color: '#828A99',
                fontStyle: 10
            },
            itemGap: 20,
            x: 'center',
            y: 'bottom',
            data: [str1, str2]
        },
        grid: {
            left: '3%',
            right: '3%',
            top: 10,
            x: 50,
            x2: 50
        },
        xAxis: {
            axisLabel: {
                interval: 0
            },
            type: 'category',
            data: xZhou,
            axisLine: { //隐藏y轴
                lineStyle: {
                    color: "#828A99",
                    width: 1
                }
            },
            axisTick: { //隐藏刻度
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 0,
                    formatter: '{value}'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {    //背景网格线
                    show: false
                }
            },
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    margin: 5,
                    formatter: '{value}.0%'
                },
                axisTick: { //隐藏刻度
                    show: false
                },
                axisLine: { //隐藏坐标轴
                    show: false,
                    lineStyle: {
                        color: "#828A99",
                        width: 1,
                        fontSize: 10
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#eaeaea'],
                        width: 1,
                        type: 'dashed'
                    }
                }
            }
        ],
        series: [{
            name: str1,
            smooth: true,
            barGap: 0,
            yAxisIndex: 0,
            type: 'bar',
            barWidth: 20,
            data: data1
        }, {
            name: str2,
            smooth: true,
            yAxisIndex: 1,
            type: 'line',
            barWidth: 1,
            data: data2
        }]
    };
    return option;
}
//经典的圆环进度图
function circleProgress(progressText, progressValue, textFont, valueFont) {
    var option = {
        tooltip: {
            show: false
        },
        series: [{
            type: 'pie',
            radius: ['68%', '80%'],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: progressValue,
                name: progressText,
                label: {
                    normal: {
                        formatter: function (params) {
                            return Number(params.value).toFixed(1) + '%';
                        },
                        textStyle: {
                            color: progressValue < 100 ? '#FF5937' : '#4791ff',
                            fontSize: valueFont
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: progressValue < 100 ? '#FF5937' : '#4791ff'
                    },
                    emphasis: {
                        color: progressValue < 100 ? '#FF5937' : '#4791ff'
                    }
                }
            }, {
                value: 100 - (progressValue >= 100 ? 100 : progressValue),
                label: {
                    normal: {
                        formatter: progressText,
                        textStyle: {
                            color: '#9EAAC2',
                            fontSize: textFont
                        }
                    }
                },
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: progressValue > 100 ? '#DAE9FF' : 'rgba(255,89,55,0.3)'
                    },
                    emphasis: {
                        color: progressValue > 100 ? '#DAE9FF' : 'rgba(255,89,55,0.3)'
                    }
                },
                hoverAnimation: false
            }]
        }]
    };
    return option;
}
//表盘仪
function timePan(text, unit, data, titleFont) {
    var option = {
        tooltip: {
            formatter: "{a} {b} : <br/> {c}" + unit
        },
        toolbox: {
            show: false
        },
        series: [
            {
                name: '',
                type: 'gauge',
                min: 0,
                max: 100,
                splitNumber: 10,
                radius: '90%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 6
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 14,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                title: {
                    textStyle: {fontSize: titleFont, color: '#828a99'},
                    offsetCenter: [0, '-30%']
                },
                pointer: {
                    length: '80%',
                    width: 4
                },
                detail: {
                    formatter: data,
                    fontSize: 19,
                    fontWeight: 'bolder',
                    fontFamily: 'Arial',
                    color: 'auto',
                    offsetCenter: [0, '35%'],
                    rich: {}
                },
                data: [{value: data, name: text}]
            }
        ]
    };
    return option;
}

function areaEcharts(data, data2) {
    var area = {
        animation: true,
        xAxis: {
            show: false
        },
        yAxis: {
            show: false
        },
        grid: {
            top: 20,
            left: 0,
            right: 0,
            height: 100
        },
        series: [
            {
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                sampling: 'average',
                showSymbol: false,
                itemStyle: {
                    normal: {
                        color: '#35B3AA'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#35B3AA',
                        width: 1
                    }
                },
                stack: 'a',
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#BBF7F3'
                        }, {
                            offset: 1,
                            color: '#97EFE7'
                        }])
                    }
                },
                data: data
            },
            {
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#0D8191'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#35B3AA',
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#06C3DD'
                        }, {
                            offset: 1,
                            color: '#0EE3F1'
                        }])
                    }
                },
                data: data2
            }

        ]
    };
    return area;
}

function pieDoubleEcharts(options) {
    var smallDivisor = options.smallDivisor || 0;
    var smallDividend = options.smallDividend || 1;
    var bigDivisor = options.bigDivisor || 0;
    var bigDividend = options.bigDividend || 1;
    var smallSurplus = Number(smallDividend) - Number(smallDivisor);
    var bigSurplus = Number(bigDividend) - Number(bigDivisor);
    var pie = {
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['47%', '67%'],
                clockwise: false,
                silent: true,
                label: {
                    normal: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: smallDivisor, name: '', itemStyle: {
                        normal: {
                            // color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                            //     offset: 0,
                            //     color: '#735BFF'
                            // }, {
                            //     offset: 1,
                            //     color: '#5876FF'
                            // }])
                            color: '#735BFF'
                        }
                    }
                    },
                    {
                        value: smallSurplus, name: '', itemStyle: {
                        normal: {
                            color: '#E8ECF0'
                        }
                    }
                    }
                ]
            },
            {
                name: '',
                type: 'pie',
                silent: true,
                radius: ['70%', '90%'],
                clockwise: false,
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: bigDivisor, name: '', itemStyle: {
                        normal: {
                            // color: new echarts.graphic.LinearGradient(0.5, 1, 1, 0, [{
                            //     offset: 0,
                            //     color: '#57E0FF'
                            // }, {
                            //     offset: 1,
                            //     color: '#2DBEFF'
                            // }])
                            color: '#57E0FF'
                        }
                    }
                    },
                    {
                        value: bigSurplus, name: '', itemStyle: {
                        normal: {
                            color: '#E8ECF0'
                        }
                    }
                    }
                ]
            }
        ]
    };
    return pie;
}

/**
 *
 * @param params.value 为进度值，params.color1为进度环颜色，params.color2为背景环颜色
 * @returns option
 */
function simpleCircProgress(params){
    var option = {
        tooltip: {
            show: false
        },
        grid:{
            left:'1%',
            right:'1%',
            top: '1%',
            bottom:'1%'
        },
        series: [
            {
                type:'pie',
                radius: ['74%', '90%'],
                hoverAnimation:false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                data:[
                    {value:params.value,
                        itemStyle: {
                            normal: {
                                color: params.color1
                            }
                        }
                    },
                    {value:100-(params.value>=100?'100':params.value),
                        itemStyle: {
                            normal: {
                                color:params.color2
                            }
                        }
                    }
                ]
            }
        ]
    };
    return option;
}
//质量看板简洁趋势图
// params xData-x轴数据, valueData-折线数据
function simpleTrendLine(xData,valueData){
    var option = {
        grid:{
            top: 2,
            left: 12,
            right: 12,
            height: 39
        },
        tooltip: {
            show:false
        },
        legend: {
            show:false
        },
        xAxis: {
            type: 'category',
            data: xData,
            boundaryGap: false,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false

            },
            axisLabel: {
                inside:true,
                margin:0,
                interval:xData.length-2,
                textStyle: {
                    fontSize: 9,
                    color:'#2772FF',
                    showMinLabel:true,
                    showMaxLabel:true,
                    inside:true
                }
            }
        },
        yAxis: {
            show:false
        },
        series: [{
            name: '',
            type: 'line',
            smooth: false,
            showSymbol: true,
            showAllSymbol:true,
            symbol: 'emptyCircle',
            symbolSize: 4,
            data: valueData,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(236,244,255,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(236,244,255,1)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: '#2772FF'
                }
            },
            lineStyle: {
                normal: {
                    width: 1
                }
            }
        }]
    };
    return option;
}
//圆环占比图
function circleDataRate(fillColor,dataList){
    var option = {
        color:fillColor,
        tooltip: {
            trigger: 'item',
            formatter: function(params, ticket, callback) {
                var res = params.seriesName;
                res += '<br/>' + params.name + ' : ' + params.percent + '%';
                return res;
            }
        },
        legend: {
            show:false
        },
        series: [{
            name: '一级客诉占比',
            type: 'pie',
            selectedMode: 'single',
            radius: ['50%', '70%'],
            label: {
                normal: {show:false}
            },
            labelLine: {
                normal: {show: false}
            },
            data: [{
                value:dataList[0].value,
                name:dataList[0].name},
                {value:dataList[1].value,
                    name:dataList[1].name},
                {value:dataList[2].value,
                    name:dataList[2].name}
            ]
        }]
    };
    return option;
}
