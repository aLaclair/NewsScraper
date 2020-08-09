$(document).ready(function(){
    $.get('/scrape', function(data) {
        return
    })

    $.get('/articles', function(data) {
        $('.articles').empty()
        for (let i = 0; i < data.length; i++) {
            let post = $('<div>').attr('data-id', data[i]._id)

            let title = $('<h1>').html(data[i].title)
            let summary = $('<p>').html(data[i].summary)
            let link = $('<a>').attr({'href': `https://www.usatoday.com${data[i].link}`, 'target': '_blank'}).text('Link to article')
            let commentButton = $('<button>').attr({'class': 'comment_btn'}).html('Add a comment')

            let links = $('<div>').attr('class', 'links')
            links.append(link, commentButton)

            post.append(title,summary, links)
            $('.articles').append(post)
        }
        $('.comment_btn').click(function() {
            let div = $(this).parent().parent()

            let commentDiv = $('<div>').attr('class', 'comment_div')
            let commentBar = $('<input>').attr({'type': 'text', 'id': 'comment_bar'})
            let submit = $('<button>').attr('id', 'submit_btn').text('Submit')
            let close = $('<button>').attr('id', 'close_btn').text('Close')

            commentDiv.append(commentBar, submit, close)

            div.append(commentDiv)
            $('#close_btn').click(function() {
                $(this).parent().remove()
            })
            $('#submit_btn').click(function() {
                let comment = $('#comment_bar').val()
                let id = $()
                $('#comment_bar').val('')
                
            })
        })
    })
})