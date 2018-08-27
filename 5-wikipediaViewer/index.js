$(document).ready(function() {
    $('#rearchIcon').click(function() {
        $('.rearchPanel').fadeIn(1000);
        $('#rearchIcon').hide();
        $('#rearch').focus();
    });
    $('#deleteIcon').click(function() {
        $('body').css('justify-content', 'center');
        $('.container').empty();
        $('.tips').show();
        $('#rearchIcon').fadeIn(500)
        $('.rearchPanel').hide();
        $('#rearch').val('');
    });
    $('#rearch').bind('keypress',function(event){
        if (event.keyCode == "13") {
            $('body').css('justify-content', 'flex-start');
            $('.container').empty();
            $('.tips').hide();
            var keyword = $('#rearch').val();
            var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=keyword&explaintext&prop=info&inprop=url&utf8=&format=json";
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    "srsearch": keyword,
                },
                dataType: "jsonp",
                headers: { 'Api-User-Agent': 'Example/1.0' },
                success:function(data){
                    var infoList = data.query.search;
                    $.each(infoList, function(key, val){
                        var firstTag = '<a  class="infoitem" href="https://en.wikipedia.org/?curid=' +val.pageid + ' target="_blank">';
                        var spanTag = '<span class="title">' + val.title +'</span>';
                        var endTag = '<p>' + val.snippet +'</p></a>';  
                        $('.container').append(firstTag + spanTag + endTag);
                    });   
                    $(".infoitem:first-child").animate({marginTop:'30px'}, 200);
                },  
                error:function(){
                    //获取出错了
                    alert("Sorry,there's something wrong within the search,please refresh this page and try again!");
                }
            });

        }
    });
})