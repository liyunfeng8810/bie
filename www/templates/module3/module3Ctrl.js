app.registerController('module3Ctrl', function ($ionicModal,$timeout,$ionicLoading,$scope, getData, postData,$controller,$state) {
    $controller('BaseViewCtrl', {$scope: $scope});
    console.log('加载module4Ctrl');

    $scope.textName = {};

    $ionicModal.fromTemplateUrl('io-module2.html', {                                                                //B 弹出模块 DOM
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.module2Ups = modal;
    });
    getCity();
    var addr_arr = [];
    function getCity(){
        var url = baseUrl + loginUrl.doajax;
        var parms = {
            method:"getCityInfo"
        };
        postData.postData(parms,url).then(function (result) {
            addr_arr = $.parseJSON(result);
        }, function (result) {
            if (result.status == 0) {
                $ionicLoading.show({template: '网络异常，请稍后重试!', noBackdrop: true, duration: 1500});
            }
        });
    }


    $scope.textareaContNumber = function(){
        if($scope.textName.key){
            return $scope.textName.key.length;
        }else{
            return 0
        }
    };



    $scope.$on('$ionicView.afterEnter', function () {
        /**
         * 通过数组id获取地址列表数组
         *
         * @param {Number} id
         * @return {Array}
         */
        function getAddrsArrayById(id) {
            var results = [];
            if (addr_arr[id] != undefined)
                addr_arr[id].forEach(function (subArr) {
                    results.push({
                        key: subArr[0],
                        val: subArr[1]
                    });
                });
            else {
                return;
            }
            return results;
        }

        /**
         * 通过开始的key获取开始时应该选中开始数组中哪个元素
         *
         * @param {Array} StartArr
         * @param {Number|String} key
         * @return {Number}
         */
        function getStartIndexByKeyFromStartArr(startArr, key) {
            var result = 0;
            if (startArr != undefined)
                startArr.forEach(function (obj, index) {
                    if (obj.key == key) {
                        result = index;
                        return false;
                    }
                });
            return result;
        }

        //bind the click event for 'input' element
        $("#myAddrs").click(function () {
            var PROVINCES = [],
                startCities = [],
                startDists = [];
            //Province data，shall never change.
            addr_arr[0].forEach(function (prov) {
                PROVINCES.push({
                    key: prov[0],
                    val: prov[1]
                });
            });
            //init other data.
            var $input = $(this),
                dataKey = $input.attr("data-key"),
                provKey = 1, //default province 北京
                cityKey = 36, //default city 北京
                distKey = 37, //default district 北京东城区
                distStartIndex = 0, //default 0
                cityStartIndex = 0, //default 0
                provStartIndex = 0; //default 0

            if (dataKey != "" && dataKey != undefined) {
                var sArr = dataKey.split("-");
                if (sArr.length == 3) {
                    provKey = sArr[0];
                    cityKey = sArr[1];
                    distKey = sArr[2];

                } else if (sArr.length == 2) { //such as 台湾，香港 and the like.
                    provKey = sArr[0];
                    cityKey = sArr[1];
                }
                startCities = getAddrsArrayById(provKey);
                startDists = getAddrsArrayById(cityKey);
                provStartIndex = getStartIndexByKeyFromStartArr(PROVINCES, provKey);
                cityStartIndex = getStartIndexByKeyFromStartArr(startCities, cityKey);
                distStartIndex = getStartIndexByKeyFromStartArr(startDists, distKey);
            }
            var navArr = [{//3 scrollers, and the title and id will be as follows:
                title: "省",
                id: "scs_items_prov"
            }, {
                title: "市",
                id: "scs_items_city"
            }, {
                title: "区",
                id: "scs_items_dist"
            }];
            SCS.init({
                navArr: navArr,
                onOk: function (selectedKey, selectedValue) {
                    $input.val(selectedValue).attr("data-key", selectedKey);
                }
            });
            var distScroller = new SCS.scrollCascadeSelect({
                el: "#" + navArr[2].id,
                dataArr: startDists,
                startIndex: distStartIndex
            });
            var cityScroller = new SCS.scrollCascadeSelect({
                el: "#" + navArr[1].id,
                dataArr: startCities,
                startIndex: cityStartIndex,
                onChange: function (selectedItem, selectedIndex) {
                    distScroller.render(getAddrsArrayById(selectedItem.key), 0); //re-render distScroller when cityScroller change
                }
            });
            var provScroller = new SCS.scrollCascadeSelect({
                el: "#" + navArr[0].id,
                dataArr: PROVINCES,
                startIndex: provStartIndex,
                onChange: function (selectedItem, selectedIndex) { //re-render both cityScroller and distScroller when provScroller change
                    cityScroller.render(getAddrsArrayById(selectedItem.key), 0);
                    distScroller.render(getAddrsArrayById(cityScroller.getSelectedItem().key), 0);
                }
            });
        });

    });
    var param = {
        method:"saveJjianxx",
        params:''
    };
    $scope.baomingxihuo = function(){
        $scope.module2Ups.show();
        var city = $("#myAddrs").val();
        $scope.textName.city = city;


        if(!handleTextName()){

            return
        }

        param.params = {
            userId:"01198764",
            groupId:"1000101",
            custAddressPt1:$scope.textName.city,
            custAddressPt2:$scope.textName.key,
            custName:$scope.textName.name,
            custPhone:$scope.textName.phone,
            custPreNum:$scope.textName.number ,
            custPreWeight:$scope.textName.weight
        };
        param.params = JSON.stringify(param.params);
        //$ionicLoading.show();
        callLoading($timeout, $ionicLoading);
        var url = baseUrl + loginUrl.doajax;
        postData.postData(param, url).then(function (result) {
            $ionicLoading.hide();
            //console.log(JSON.stringify(result) + "--");

            //$state.go('module3Child01', {json: param.params});
        }, function (result) {
            if (result.status == 0) {
                $ionicLoading.show({template: '网络异常，请稍后重试!', noBackdrop: true, duration: 1500});
            }
        });
        //getDataAll();
    };

    function handleTextName(){

        if(!$scope.textName.key || $scope.textName.key.length < 5){
            $ionicLoading.show({template: '详细地址少于5个字', noBackdrop: true, duration: 1500});
            return false;
        }
        if(!$scope.textName.name){
            $ionicLoading.show({template: '请填写寄件人姓名', noBackdrop: true, duration: 1500});
            return false;
        }
        if(!$scope.textName.phone){
            $ionicLoading.show({template: '请填写寄件人电话', noBackdrop: true, duration: 1500});
            return false;
        }else{
            var b = checkme($scope.textName.phone);
            if(!b){
                $ionicLoading.show({template: '请填写正确的电话号码', noBackdrop: true, duration: 1500});
                return false
            }
        }
        if(!$scope.textName.number){
            $ionicLoading.show({template: '请填写预估寄件数量', noBackdrop: true, duration: 1500});
            return false;
        }else{
            if($scope.textName.number < 20){
                $ionicLoading.show({template: '您的预估寄件数量少于20件', noBackdrop: true, duration: 1500});
                return false;
            }
        }
        if(!$scope.textName.weight){
            $ionicLoading.show({template: '请选择填写平均重量', noBackdrop: true, duration: 1500});
            return false;
        }
        return true;

    }

    function getDataAll() {
        $.post("http://10.2.4.40:8080/server/doajax.do",{
            method:"saveJjianxx",
            params:JSON.stringify({
                custId:"01198764",
                groupId:"1000101",
                custAddressPt1:"广东省深圳市南山区",
                custAddressPt2:"粤海街道软件产业基地1栋c座2楼",
                custName:"李先生",
                custPhone:"13112345678",
                custPreNum:"10",
                custPreWeight:"20"
            })
        },function(resultJSONObject){
            console.log(JSON.stringify(resultJSONObject));
            $state.go('module3Child01', {json: ''});
        },"json");
    }

    function checkme(number){
        var val=number;
        var mobilevalid = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!mobilevalid.test(val)) {
            return false;
        }
        return true;
    }
    $.post("http://10.2.4.38:8080/server/doajax.do",{
        method:"getCityInfo"
    },function(resultJSONObject){
        debugger
    },"json");

})