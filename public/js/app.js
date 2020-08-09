$(document).ready(function(){
    $.get('/scrape', function(data) {
        return
    })

    $.get('/both', function(data) {
        $('.articles').empty()
        for (let i = 0; i < data.length; i++) {
            let post = $('<div>').attr('data-id', data[i]._id)

            let title = $('<h1>').html(data[i].title)
            let summary = $('<p>').html(data[i].summary)
            let link = $('<a>').attr({'href': `https://www.usatoday.com${data[i].link}`, 'target': '_blank'}).text('Link to article')
            let commentButton = $('<button>').attr({'class': 'comment_btn'}).html('Add a comment')

            let links = $('<div>').attr('class', 'links')
            links.append(link, commentButton)

            post.append(title, summary)

            let comments = $('<div>').attr('class', 'comments')
            if(data[i].comments.length > 0) {
                for (let j = 0; j < data[i].comments.length; j++) {
                    let commentWrap = $('<div>').attr({'class': 'comment_wrapper', 'id': data[i].comments[j]._id})
                    let deleteBtn = $('<p>').attr('class', 'delete_comment').text('X')
                    let comment = $('<p>').text(data[i].comments[j].comment)
                    commentWrap.append(deleteBtn, comment)
                    comments.append(commentWrap)
                }
                post.append(links,comments)
            } else {
                post.append(links)
            }
            $('.articles').append(post)
        }
        $('.delete_comment').click(function(){
            let id = $(this).parent().attr('id')
            $.get(`/delete/${id}`, async function(results) {
                console.log('deleted')
            }).then(function() {
                location.reload()
            })
        })
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
                let commentObj = {comment: comment}
                $('#comment_bar').val('')
                let id = $(this).parent().parent().attr('data-id')
                $.post(`/articles/${id}`, commentObj, async function(data) {
                    console.log(data)
                }).then(function() {
                    location.reload()
                })
            })
        })
    })
})