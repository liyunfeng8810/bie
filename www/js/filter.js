angular.module('starter.filter', [])
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';
            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;
            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    })
    .filter('wordPlace', function ($sce) {
        return function (input, word) {
            if (!word)
                return input;
            var result = input.replace(word, "<span style='color:#6CA4FF;'>" + word + "</span>");
            return $sce.trustAsHtml(result);
        };
    })
    .filter('wordWrapWidth', function ($sce, $filter) {
        return function (input, num) {
            if (!num)
                num = 10;
            var arr = input.split('');
            var k = -1;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].charCodeAt(0) > 255) {
                    k += 2;
                } else {
                    k++;
                }
                if ((k + 1) % num == 0) {
                    arr[i] += '<br />';
                }
            }
            var result = arr.join('');
            if (k < num) {
                result = $filter("myNumber")(input) + '<br />';
            }
            return $sce.trustAsHtml(result);
        };
    })
    .filter('wordWrapWidthNamePink', function ($sce, $filter) {
        return function (input, num,row) {
            if(!input || !num || !row){
                return input;
            }
            if (!num)
                num = 10;
            var result = '';
            if(input.length <= (num*row - 3)){
                return $sce.trustAsHtml( input.substring(0,num) + '</br>' +input.substring(num));
            }
            var cont = 0;
            for(var i = 0;i < row;i++){
                if(i == (row - 1)){
                    result += (input.substring(cont,(cont + num) - 2) + '...');
                    break
                }
                result += input.substring(cont,cont + num) + '</br>';
                cont += num;
            }
            return $sce.trustAsHtml(result);
        };
    })

    .filter('myNumber', function ($filter) {
        return function (input) {
            if (input == 0)
                return '-';
            if (!input) {
                return "-";
            }
            input += "";
            if (isNaN(input)) {
                return input;
            } else {
                var resultArray = input.split(".");
                if (resultArray.length > 1) {
                    return $filter("number")(resultArray[0]) + "." + resultArray[1];
                }
                return $filter("number")(input);
            }
        };
    })
    .filter('myNumber2', function ($filter) {
        return function (input) {
            if (input == 0) {
                return 0;
            }
            if (!input) {
                return "";
            }
            input += "";
            if (isNaN(input)) {
                return input;
            } else {
                var resultArray = input.split(".");
                if (resultArray.length > 1) {
                    return $filter("number")(resultArray[0]) + "." + resultArray[1];
                }
                return $filter("number")(input);
            }
            //}
        };
    })
    .filter('myNumber002', function ($filter) {
        return function (input, num) {
            if (input == 0) {
                return 0;
            }
            if (!input) {
                return "";
            }
            input += "";
            if (isNaN(input)) {
                return input;
            } else {
                return $filter("number")(input, num);
            }
        };
    })
    .filter('myNumberFusu', function ($filter) {
        return function (input) {
            if (!input) {
                return "";
            }
            input += "";
            if (isNaN(input)) {
                return input;
            } else {
                var abs = input;
                var resultArray = abs.split(".");
                if (resultArray.length > 1) {
                    return $filter("number")(Math.abs(resultArray[0])) + "." + resultArray[1];
                }
                return $filter("number")(Math.abs(input));
            }
        };
    })
    .filter('myPercentage', function () {
        return function (input) {
            if (input == "" || input == "null" || input == "-" || input == " " || input == undefined) {
                return "-";
            } else {
                if (input.indexOf(".") > 0) {
                    return input;
                } else {
                    return input + ".00";
                }
            }
        }
    }).filter('myPercentageUnit', function () {
    return function (input) {
        if (input == "" || input == "null" || input == " ") {
            return "";
        } else {
            return input;
        }
    }
})

    .filter('parseNumber', function () {
        return function (input) {
            return input.replace(/[^0-9.-]/ig, "");
        };
    })

    .filter('myDateUpMonth_day', function () {
        return function (input) {
            var date1 = input.substring(5);
            return date1;
        };
    })
    .filter('myDateUpMonth_day01', function () {
        return function (input) {
            function getlastday(year,month) {
                var new_year = year;    //取当前地年份
                var new_month = month++;//取下一个月地第一天，方便计算（最后一天不固定）
                if(month>12)            //如果当前大于12月，则年份转到下一年
                {
                    new_month -=12;        //月份减
                    new_year++;            //年份增
                }
                var new_date = new Date(new_year,new_month - 1,1);                //取当年当月中地第一天
                return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
            }
            return (Number(input.substring(4,6)) - 1) + '月' + getlastday(Number(input.substring(0,4)),Number(input.substring(4,6))) + '日';
        };
    })
    .filter('myDateUpMonth_month', function () {
        return function (input) {
            var date1 = input.substring(5, 8);
            return date1;
        };
    })
    .filter('myDateUpMonth_month01', function () {
        return function (input) {
            return (Number(input.substring(4,6)) -1) + '月';
        };
    })
    .filter('myDateUpMonth_dayUp', function () {
        return function (input) {
            var date1 = input.substring(8, 12);
            return date1;
        };
    })
    .filter('myDateUpMonth_dayUp01', function () {
        return function (input) {
            function getlastday(year,month) {
                var new_year = year;    //取当前地年份
                var new_month = month++;//取下一个月地第一天，方便计算（最后一天不固定）
                if(month>12)            //如果当前大于12月，则年份转到下一年
                {
                    new_month -=12;        //月份减
                    new_year++;            //年份增
                }
                var new_date = new Date(new_year,new_month - 1,1);                //取当年当月中地第一天
                return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
            }
            return getlastday(Number(input.substring(0,4)),Number(input.substring(4,6)));
        };
    })

    .filter('myUpWeek', function () {
        return function (input) {
            if (input == "" || input == undefined) {
                return;
            } else {
                return (input.substring(4, 6) + "/" + input.substring(6));
            }
        }
    })
    .filter('myMonth', function () {
        return function (input) {
            var substringMonth = input.substring(4, 6);
            if (substringMonth.substring(0, 1) == 0) {
                return substringMonth.substring(1, 2);
            } else {
                return substringMonth;
            }
        }
    })
    .filter('myGrade', function () {
        return function (input) {
            return (input.length - 4) / 2;
        }
    })
    .filter('myGrade1', function () {
        return function (input) {
            return (input.length - 4) / 2 + 1;
        }
    })
    .filter('my1111Date', function () {
        return function (input) {
            if (input == "null") {
                return "-"
            } else {
                return input.substring(10, 16);
                ;
            }
        }
    })
    .filter('my1111DateAirplane', function () {
        return function (input) {
            if (input == "null") {
                return "-"
            } else {
                return input.substring(0, 5);
                ;
            }
        }
    })
    .filter('mySaixuanDate', function () {
        return function (input) {
            if (input == "" || input == 'null' || input == undefined) {
                return ""
            } else {
                return input;
            }
        }
    })
    .filter('mySplit', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null' || input == '0') {
                return "-"
            } else {
                return input.split(",").length;
            }
        }
    })

    .filter('mySplit2', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                var inputSplit = input.split(",");
                if (inputSplit.length >= 5) {
                    var str = "";
                    for (var i = 0; i < 5; i++) {
                        str += inputSplit[i] + ",";
                    }
                    return str + '···';
                } else {
                    return input;
                }
            }
        }
    })
    .filter('myGeshiDate', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                return input.substring(0, 4) + '年' + input.substring(4) + '月';
            }
        }
    })
    .filter('myGeshiDate01', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                return input.substring(0, 4) + '年' + input.substring(4,6) + '月' + input.substring(6) + '日';
            }
        }
    })
    .filter('myRh_handleDate', function () {
        return function (input) {
            if (input == "" || input == undefined || input == null) {
                return "";
            } else {
                var inputStr = input + "";
                return inputStr.substring(0, 4) + '-' + inputStr.substring(4, 6) + '-' + inputStr.substring(6);
            }

        }
    })
    .filter('myGeshiDate2', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                var month = input.substr(4,1)==0?input.substr(5,1):input.substr(4,2);
                return input.substring(0, 4) + '年' + month + '月';
            }
        }
    })
    .filter('myQJJiank', function () {
        return function (input1) {
            var input = Number(input1);
            if (input == "" || input == undefined || input == 'null') {
                return "-";
            } else {
                if (input == '1') {
                    return '非健康';
                } else if (input == "2") {
                    return '亚健康'
                } else if (input == "3") {
                    return '健康'
                }
            }
        }
    })
    .filter('myIndexIdDanwei', function () {
        return function (input) {
            if (input == 'ID050306' || input == 'ID050305' || input == 'ID050101' || input == 'ID050501' || input == 'ID05030202' || input == 'ID05030302' || input == 'ID05030301' || input == 'ID05030201' || input == 'ID050403' || input == 'ID05040401' || input == 'ID05040402') {
                return "%";
            } else if (input == 'ID050301' || input == 'ID05040102' || input == 'ID05040101') {
                return "(百万分)";
            } else if (input == 'ID050201') {
                return "(万元)";
            } else if (input == 'ID050304') {
                return "(小时)";
            } else if (input == 'ID050502') {
                return "(次)";
            } else {
                return "(分)";
            }
        }
    })
    .filter('myIndexIdDanwei22', function () {
        return function (input) {
            if (input == 'ID050301' || input == 'ID05040102' || input == 'ID05040101') {
                return "(百万分)";
            } else if (input == 'ID050201') {
                return "(元)";
            } else if (input == 'ID050304') {
                return "(小时)";
            } else {
                return "";
            }
        }
    })
    .filter('myReplace', function () {
        return function (input, str) {
            if (input == undefined) {
                return;
            }
            if (input.indexOf(str)) {
                return input.replace(str, '');
            } else {
                return input;
            }
        }
    })
    .filter('myCostResort', function () {
        return function (input) {
            if (input == '-9999') {
                return '-';
            } else {
                return input;
            }
        }
    })
    .filter('myGeshiDate3', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                return input.substring(4, 6) + '月' + input.substring(6, 8) + '日';
            }
        }
    })
    .filter('trend_desc', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else if (input == 0) {
                return '向好'
            } else if (input == 1) {
                return '当月恶化'
            } else if (input == 2) {
                return '连续2个月恶化'
            } else if (input == 3) {
                return '连续3个月恶化'
            } else if (input == 4) {
                return '无状态'

            }
        }
    })
    .filter('myGeshiDateYueB', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return '';
            }else{
                var input = input.substring(4, 6);
                if(input>=10){
                    return input.substring(0, 2) + '月';
                }else{
                    return input.substring(1, 2) + '月';
                }
            }
        }
    })
    .filter('myGeshiDateYue', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                var today = new Date().toLocaleDateString();
                return  today.substring(5,6) + '月';
            }else{
                var input = input.substring(4, 6);
                if(input>=10){
                    return input.substring(0, 2) + '月';
                }else{
                    return input.substring(1, 2) + '月';
                }
            }
        }
    })
    .filter('GradeFormat', function () {     //用户积分等级格式
        return function (input) {
            if(input){
                //var x = input.substring(0, 2);
                var x = input.split("-")[0]
                if(x=="HT"){
                    return "io-datongpai";
                }else if(x=="BY"){
                    return "io-dayinpai";
                }else if(x=="HJ"){
                    return "io-dajinpai";
                }else if(x=="BJ"){
                    return "io-dabaijin";
                }else if(x=="ZS"){
                    return "io-dazuanshi";
                }else{
                    return "io-datongpaiH"
                }
            }
        }
    })
    .filter('GradeFormatCN', function () {     //用户积分等级格式
        return function (input) {
            if(input){
                //var x = input.substring(0, 2);
                var x = input.split("-")[0]
                if(x=="HT"){
                    return "铜牌";
                }else if(x=="BY"){
                    return "银牌";
                }else if(x=="HJ"){
                    return "金牌";
                }else if(x=="BJ"){
                    return "白金";
                }else if(x=="ZS"){
                    return "钻石";
                }
            }
        }
    })
    .filter('GradeFormatNext', function () {     //根据当前等级，判断下级
        return function (x) {
            if(x){
                if(x=="HT-1"){
                    return "铜牌Ⅱ";
                }else if(x=="HT-2"){
                    return "银牌Ⅰ";
                }else if(x=="BY-1"){
                    return "银牌Ⅱ";
                }else if(x=="BY-2"){
                    return "金牌Ⅰ";
                }else if(x=="HJ-1"){
                    return "金牌Ⅱ";
                }else if(x=="HJ-2"){
                    return "白金Ⅰ";
                }else if(x=="BJ-1"){
                    return "白金Ⅱ";
                }else if(x=="BJ-2") {
                    return "钻石";
                }else if (x=="ZS") {
                    return "false"
                }
            }else{
                return "铜牌Ⅰ"
            }
        }
    })
    .filter('GradeFormatNum', function () {     //用户积分等级格式
        return function (input) {
            if(input){
                //var x =  input.substring(3, 4);
                var x = input.split("-")[1]
                if(x == 1){
                    return "Ⅰ";
                }else if(x== 2){
                    return "Ⅱ";
                }else{
                    return ""
                }
            }
        }
    })

    .filter('FormatJiFenTwo', function () {     //用户积分等级格式
        return function (input) {
            if(input){
                return input.substring(0,input.length-2)
            }else{
                return "-"
            }
        }
    })
    .filter('gradeNodate', function () {     //用户积分等级格式
        return function (input) {
            if(!input){
                return "-"
            }else{
                return input
            }
        }
    })
    .filter('gradeNodateZero', function () {     //用户积分等级格式
        return function (input) {
            if(!input){
                return "0"
            }else{
                return input
            }
        }
    })
    .filter('FormatDataNum', function () {     //用户积分等级格式
        return function (input) {
            if(input){
                return input.substring(0, 16);
            }
        }
    })
    .filter('GradeFormatNoData', function () {     //没数据，返回300积分
        return function (input) {
            if(!input){
                return '300';
            }else{
                return input
            }
        }
    })
    .filter('costBllYQ', function ($sce) {
        return function (input) {
            if (!input || input == '-')
                return '';
            var input = Number(input);
            var isYQ = input < 0;
            var inputColor = isYQ ? '#FF6284' : '#11CC80';
            var result = "<span class='bulletinYinQue' style='border:1px solid " + inputColor + ";color: " + inputColor + " '>" + (isYQ ? '缺' : '盈') + "</span>";
            return $sce.trustAsHtml(result);
        };
    })
    .filter('costBllYQ02', function ($sce) {
        return function (input) {
            if (!input || input == '-')
                return '';
            //var input = Number(input);
            var isYQ = input > 0;
            var inputColor = isYQ ? '#FF6284' : '#11CC80';
            var result = "<span class='bulletinYinQue' style='border:1px solid " + inputColor + ";color: " + inputColor + " '>" + (isYQ ? '缺' : '盈') + "</span>";
            return $sce.trustAsHtml(result);
        };
    })
    .filter('costBllYQ03', function ($sce) {
        return function (input) {
            if (!input || input == '-' || input == 'null')
                return '';
            return Math.abs(Number(input));
        };
    })
    .filter('myGeshiDateDay', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                return input.substring(6, 8) + '日';
            }
        }
    })
    .filter('myGeshiYear', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                return input.substring(0, 4) + '年';
            }
        }
    })
    .filter('myGeshiName', function () {                //格式化姓名第二个字为 * 号
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return "";
            } else {
                input=input.split('');
                input.splice(1,1,'*');
                return input.join('');
            }
        }
    })

    .filter('myGeshiTel', function () {                //格式化电话号码 增加* 号
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return "";
            } else {
                input=input.split('');
                input.splice(3,4,'****');
                return input.join('');
            }
        }
    })

    .filter('myGeshiTime', function () {                //格式化电话号码 增加* 号
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return "";
            } else {
                return input.substring(0, 10);
            }
        }
    })
    .filter('quotaPillarFomart', function () {
        return function (input) {
            if (input == "" || input == undefined || input == 'null') {
                return " ";
            } else {
                var key = input.substring(0, 4);
                if(key =="ID01"){
                    return "员满";
                }else if(key=="ID02"){
                    return "客满";
                }else if(key=="ID03"){
                    return "收入";
                }else if(key=="ID04"){
                    return "成本";
                }

            }
        }
    })

    .filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        }
    })
    .filter('MyCarTm', function () {
        return function (input) {
            console.log('---执行多长');
            return input.substring(5);
        }
    })
    .filter('NumberReserve',function(){
        return function(inputArray,field) {
            if(inputArray && inputArray.length > 0) {
                for (var i = 0; i < inputArray.length; i++) {
                    if (!isNaN(inputArray[i][field])) {
                        inputArray[i][field] = Number(inputArray[i][field]);
                    } else {
                        inputArray[i][field] = 0;
                    }
                }
            }
            return inputArray;
        }
    })
    .filter('numberToEmpty', function () {
        return function (input) {
            if (input == "" || input == "null" || input == "-" || input == " " || input == undefined) {
                return "-";
            } else {
                return input;
            }
        }
    })

;



