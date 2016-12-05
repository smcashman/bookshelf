$(document).ready(function() {


    //$("#showBooks").click(function() {

    $.getJSON("http://localhost:8080/books", function(data) {
        // var myResponse = (data.title);
        $.each(data, function(index, value) {

            $(".displayExistingTitles").append('<div><p class=' + value._id + '><span class="bookTitle">' + value.title + ' </span><span class="bookAuthor"> ' + value.author + ' </span><span class="bookSource"> ' + value.source + ' </span><button  id=' + value._id + ' class="deleteButton">Delete</button><button class="editButton">Edit</button><button class="updateButton">Update</button></p></div>')
        });

        $('.deleteButton').click(function() {
            var buttonId = $(this).attr('id');
            console.log(buttonId)
            $.ajax({
                url: "http://localhost:8080/books/" + buttonId,
                type: "Delete",
                success: function() {
                    $('button#' + buttonId).closest('div').remove();
                    console.log("item deleted");

                }
            })

        });

        $('.editButton').click(function() {


           // $(this).text('Update').addClass('editSubmitButton');
           $(this).hide();
        $(this).parent("p").children('.updateButton').show();
            var title = $(this).parent("p").children("span.bookTitle").text();
            $(this).parent("p").children('span.bookTitle').html("<input id='editTitle' name='editTitle' type='text' value=" + title + ">");

            var author = $(this).parent("p").children("span.bookAuthor").text();
            $(this).parent("p").children('span.bookAuthor').html("<input id='editAuthor' name='editAuthor' type='text' value=" + author + ">");

            var source = $(this).parent("p").children("span.bookSource").text();
            $(this).parent("p").children('span.bookSource').html("<input id='editSource' name='editSource' type='text' value=" + source + ">");

            console.log(title);
            console.log(author);
            console.log(source);

            $('.updateButton').click(function() {


                var buttonClassUpdate = $(this).parent('p').attr('class')
                var editedTitle = $('p.' + buttonClassUpdate).children('span').children('input#editTitle').val();
                var editedAuthor = $('p.' + buttonClassUpdate).children('span').children('input#editAuthor').val();
                var editedSource = $('p.' + buttonClassUpdate).children('span').children('input#editSource').val();
                console.log(buttonClassUpdate);
                console.log(editedTitle);
                console.log(editedAuthor);
                console.log(editedSource);
                var updateObject = new Object();
                updateObject._id = buttonClassUpdate;
                updateObject.title = editedTitle;
                updateObject.author = editedAuthor;
                updateObject.source = editedSource;
                console.log(updateObject);
                var objectString = JSON.stringify(updateObject);
                console.log(objectString)

                $.ajax({
                    url: "http://localhost:8080/books/" + buttonClassUpdate,
                    type: "Put",
                    data: updateObject,
                    success: function() {

                        console.log(buttonClassUpdate);



                        // $('button#' + buttonIdUpdate).closest('div').remove();


                    }
                })
            })

        })


    });


    // });

    $('.addNewTitle h2').click(function() {
        $('.showAddForm').toggle();
        if ($(this).text()=='Add a new title here'){
             $(this).text('Click to hide form');
        }
        else {
            $(this).text('Add a new title here')
        }
       
    });

});