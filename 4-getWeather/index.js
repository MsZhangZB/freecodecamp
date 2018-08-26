/* 设置城市 */
function callback0(data) {
    init($("#prov"),data.prov);
    init($("#city"),data.city);
    init($("#county"),data.county);
}
function callback1(data) {
    init($("#city"),data.city);
    init($("#county"),data.county);
}
function init(sel,data) {
    sel.html("");
    $(data).each(function(i,item){
        sel.append("<option value='"+item.re_code+"'>"+item.re_name+"</option>");
    });
}

$(document).ready(function () {
    $.ajax({
        type:"get",
        dataType:"jsonp",
        url:"http://res.42du.cn/region/init",
        jsonpCallback:"callback0"
    });
    $("#prov").change(function () {
        var v = $(this).val();
        $.ajax({
            type:"get",
            dataType:"jsonp",
            url:"http://res.42du.cn/region/prov/"+v,
            jsonpCallback:"callback1"
        });
    });
    $("#city").click(function () {
        var v = $(this).val();
        $.ajax({
            type:"get",
            dataType:"jsonp",
            url:"http://res.42du.cn/region/city/"+v
        });

        var url = "http://v.juhe.cn/weather/index?key=a0cd37f111f43d0453f14acf8820a339" ;
        var cityname = $('#city option:selected').text();
        if ($('#city option:selected').text() === '市辖区') {
            cityname = $('#prov option:selected').text();
        }
        $.ajax(url, {
            data: {
              'cityname': cityname,
            },
            dataType: 'jsonp',
            crossDomain: true,
            success: function(data) {
            if(data && data.resultcode == '200'){
                    $('#humidity').html(data.result.sk.humidity);
                    $('#dressingAdvice').html(data.result.today.dressing_advice);
                    $('#wash_index').html(data.result.today.wash_index);
                    $('#travel_index').html(data.result.today.travel_index);
                    $('#exercise_index').html(data.result.today.exercise_index);
                    $('#uv_index').html(data.result.today.uv_index);  
                    $('.temperature').html(data.result.today.temperature);
                    $('.weather').html(data.result.today.weather);
                    var itemStart = '<div class="item"><dl>';
                    var itemEnd = '</dl></div>';
                    $('.futureWeather').empty();
                    $.each(data.result.future,function(key, val) {
                        if (val.week !== data.result.today.week) {
                            $('.futureWeather').append(itemStart + 
                                '<dt>' + val.date + '(' + val.week + ')' + '</dt>'+
                                '<dd>' + val.temperature + '</dd>'+
                                '<dd>' + val.weather + '</dd>'+
                                '<dd>' + val.wind + '</dd>'+
                                itemEnd);
                            } 
                    })
                } else {
                    $('.temperature').html("错误" + data.reason);    
                }
            }
        })
    });
});
