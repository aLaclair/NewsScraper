$(document).ready(function(){
    $.get('/scrape', function(data) {
        console.log(data)
    })
})