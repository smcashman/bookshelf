var booklist = {
    "bookInfo": [{
        "id": "1",
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "source": "borrowed from a friend",
        "collection": "to be read"
    }, {
        "id": "2",
        "title": "War and Peace",
        "author": "Tolstoy",
        "source": "purchased at Goodwill",
        "collection": "classics"
    }, {
        "id": "3",
        "title": "Madame Secretary",
        "author": "Madeleine Albright",
        "source": "birthday present",
        "collection": "loaned out"
    }, {
        "id": "4",
        "title": "Computing: A Concise History",
        "author": "Paul Ceruzzi",
        "source": "library",
        "collection": "to be read"
    }]
};

// function getBooklist(callbackFn) {
//     setTimeout(function(){ callbackFn(booklist)}, 100);
// }

// // this function stays the same when we connect
// // to real API later
// function displayBooklist(data) {
//     for (index in data.bookInfo) {
//        $('.displayExistingTitles').append(
//         '<div id="booklisting> <p id="bookTitle">Title: ' + data.bookInfo[index].title+ '</p><p id="bookAuthor"> Author: '+ data.bookInfo[index].author+ '</p><button id="Edit"> Edit </button><button id="Delete"> Delete </button></div>');
//     }
// }

// // this function can stay the same even when we
// // are connecting to real API
// function getAndDisplayBooklist() {
//     getBooklist(displayBooklist);
// }

$(document).ready(function() {

    // $('#submitButton').click(function(){
    //      $.ajax({
    //             url: "http://localhost:8080/books",
    //             data: "{title:'anything'}",
    //             type: "post",
    //             success: function(){
    //               $('#submitSuccess').html('<p>Book successfully added</p>');

    //             }
    //         })
    // })

    $("#showBooks").click(function() {

        $.getJSON("http://localhost:8080/books", function(data) {
            // var myResponse = (data.title);
            $.each(data, function(index, value) {

                $(".displayExistingTitles").append('<div><p class='+value._id+'><span class="bookTitle">' + value.title + ' </span><span class="bookAuthor"> ' + value.author + ' </span><span class="bookSource"> ' + value.source + ' </span><button class="deleteButton">Delete</button><button class="editButton" id=' + value._id + '>Edit</button></p></div>')
            });
            $('.deleteButton').click(function() {
                var buttonId = $(this).attr('id');
                $.ajax({
                    url: "http://localhost:8080/books/" + buttonId,
                    type: "Delete",
                    success: function() {
                        $('button#' + buttonId).closest('div').remove();
                        console.log("item deleted");

                    }
                })

            })

            $('.editButton').click(function() {

                $(this).text('Update').addClass('editSubmitButton');

                var title = $(this).parent("p").children("span.bookTitle").text();
                $(this).parent("p").children('span.bookTitle').html("<input id='editTitle' name='editTitle' type='text' value=" + title + ">");

                var author = $(this).parent("p").children("span.bookAuthor").text();
                $(this).parent("p").children('span.bookAuthor').html("<input id='editAuthor' name='editAuthor' type='text' value=" + author + ">");

                var source = $(this).parent("p").children("span.bookSource").text();
                $(this).parent("p").children('span.bookSource').html("<input id='editSource' name='editSource' type='text' value=" + source + ">");

                console.log(title);
                console.log(author);
                console.log(source);

                $('.editSubmitButton').click(function(){

                    var buttonClassUpdate = $(this).parent('p').attr('class')
                   var editedTitle = $('p.'+buttonClassUpdate).children('span').children('input#editTitle').val();
                   console.log(editedTitle);
                    $.ajax({
                    url: "http://localhost:8080/books/" + buttonClassUpdate,
                    type: "Put",
                    success: function() {
                         
                          console.log(buttonClassUpdate);

                        
                        
                        // $('button#' + buttonIdUpdate).closest('div').remove();
                        

                    }
                })
                })

            })


        });


    });



});


// $(function() {
//     getAndDisplayBooklist();
// })