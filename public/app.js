$(document).ready(function() {
    var searchTerm = ''


    $.getJSON("http://localhost:8080/books", function(data) {


        $.each(data, function(index, value) {


            $(".displayExistingTitles").append('<div class="' + value.tags + '"><p class=' + value._id + '><span class="bookTitle"> Title: ' + value.title + ' </span><span class="bookAuthor">Author: ' + value.author + ' </span><span class="read">Have you read it? ' + value.readBook + ' </span><span class="bookReview"> notes: ' + value.review + ' </span><span class="bookTags">Tags: ' + value.tags + ' </span><button  id=' + value._id + ' class="deleteButton">Delete</button><button class="editButton">Edit</button><button class="updateButton">Update</button></p></div>')


        });
        $(".displayExistingTitles").append('<div><p id= "hideBookDisplay"> Click to hide</p></div>')
   
        $('#showBooks').click(function() {
            var shelfOption = $('.filterBooks').val();
            console.log(shelfOption)

            $('.displayExistingTitles div').hide();
            $('.displayExistingTitles div.' + shelfOption).show();


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


            $(this).hide();
            $(this).parent("p").children('.updateButton').show();

            var title = $(this).parent("p").children("span.bookTitle").text();
            console.log(title)
            $(this).parent("p").children('span.bookTitle').html("<input id='editTitle' name='editTitle' type='text' value='" + title + "'>");

            var author = $(this).parent("p").children("span.bookAuthor").text();
            console.log(author)
            $(this).parent("p").children('span.bookAuthor').html("<input id='editAuthor' name='editAuthor' type='text' value='" + author + "'>");

            var readItText = $(this).parent("p").children("span.read").text();
            if (readItText == 'yes') {
                $(this).parent("p").children("span.read").html(' <select name="readName" class="readDropDown"><option value="yes" name="yes" class="readYes" selected>Yes</option><option value="no" name="no" class="readNo">No</option></select>')
            } else {
                $(this).parent("p").children("span.read").html(' <select name="readName" class="readDropDown"><option value="no" name="no" class="readNo" selected>No</option><option value="yes" name="yes" class="readYes">Yes</option></select>')
            }

            var review = $(this).parent("p").children("span.bookReview").text();
            $(this).parent("p").children('span.bookReview').html("<input id='editReview' name='editReview' type='text' value='" + review + "'>");

            var tagOption = $(this).parent("p").children("span.bookTags").text();
            if (tagOption == 'To be read') {
                $(this).parent("p").children("span.bookTags").html(' <select name="tagsName" class="tagsDropDown"><option value="TBR" name="TRB" class="tagsTBR" selected>To be read</option><option value="wishlist" name="wishlist" class="wishList">Wishlist</option><option value="favorites" name="favorites" class="favoritedBook">Favorites</option><option value="reference" name="reference" class="bookReference">Reference</option><option value="readreturn" name="readreturn" class="ReadandReturn">Read & Returned</option></select>')
            } else if (tagOption == 'Wishlist') {
                $(this).parent("p").children("span.bookTags").html(' <select name="tagsName" class="tagsDropDown"><option value="wishlist" name="wishlist" class="wishList" selected>Wishlist</option><option value="TBR" name="TRB" class="tagsTBR">To be read</option><option value="favorites" name="favorites" class="favoritedBook">Favorites</option><option value="reference" name="reference" class="bookReference">Reference</option><option value="readreturn" name="readreturn" class="ReadandReturn">Read & Returned</option></select>')
            } else if (tagOption == 'Favorites') {
                $(this).parent("p").children("span.bookTags").html(' <select name="tagsName" class="tagsDropDown"><option value="favorites" name="favorites" class="favoritedBook" selected>Favorites</option><option value="wishlist" name="wishlist" class="wishList">Wishlist</option><option value="TBR" name="TRB" class="tagsTBR">To be read</option><option value="reference" name="reference" class="bookReference">Reference</option><option value="readreturn" name="readreturn" class="ReadandReturn">Read & Returned</option></select>')
            } else if (tagOption == 'Reference') {
                $(this).parent("p").children("span.bookTags").html(' <select name="tagsName" class="tagsDropDown"><option value="reference" name="reference" class="bookReference" selected>Reference</option><option value="favorites" name="favorites" class="favoritedBook">Favorites</option><option value="wishlist" name="wishlist" class="wishList">Wishlist</option><option value="TBR" name="TRB" class="tagsTBR">To be read</option><option value="readreturn" name="readreturn" class="ReadandReturn">Read & Returned</option></select>')
            } else {
                $(this).parent("p").children("span.bookTags").html(' <select name="tagsName" class="tagsDropDown"><option value="readreturn" name="readreturn" class="ReadandReturn" selected>Read & Returned</option><option value="reference" name="reference" class="bookReference" >Reference</option><option value="favorites" name="favorites" class="favoritedBook">Favorites</option><option value="wishlist" name="wishlist" class="wishList">Wishlist</option><option value="TBR" name="TRB" class="tagsTBR">To be read</option><option value="readreturn" name="readreturn" class="ReadandReturn">Read & Returned</option></select>')
            }

            $('.updateButton').click(function() {


                var buttonClassUpdate = $(this).parent('p').attr('class')
                var editedTitle = $('p.' + buttonClassUpdate).children('span').children('input#editTitle').val();
                var editedAuthor = $('p.' + buttonClassUpdate).children('span').children('input#editAuthor').val();
                var editedRead = $('p.' + buttonClassUpdate).children('span.read').children('.readDropDown').val();
                var editedReview = $('p.' + buttonClassUpdate).children('span').children('input#editReview').val();
                var editedTags = $('p.' + buttonClassUpdate).children('span.bookTags').children('input#editTags').val();


                console.log(editedRead)




                var updateObject = new Object();
                updateObject._id = buttonClassUpdate;
                updateObject.title = editedTitle;
                updateObject.author = editedAuthor;
                updateObject.readBook = editedRead;
                updateObject.review = editedReview;
                updateObject.tags = editedTags
                console.log(updateObject);

                $.ajax({
                    url: "http://localhost:8080/books/" + buttonClassUpdate,
                    type: "PUT",
                    data: updateObject,
                    success: function() {

                        console.log(buttonClassUpdate);

                    }


                });


            });

        });

    });
    $('textarea#reviewBox').click(function() {
        $(this).text('');
    })
    $('.addNewTitle h2').click(function() {
        $('.showAddForm').toggle();
        if ($(this).text() == 'Add a new title here') {
            $(this).text('Click to hide form');
        } else {
            $(this).text('Add a new title here')
        }

    });

    $('.suggestionBox').click(function() {
        $('#suggestSearchBox').show();
    });

    $('#submitSearch').click(function() {
        searchTerm = $('#bookSearchTerms').val();
        console.log(searchTerm)


        var params = {
            q: searchTerm,
            type: 'books',
            info: 1,
            k: '250853-Bookshel-AY9XODQO',

        };
        url = 'https://www.tastekid.com/api/similar?callback=?&q=' +searchTerm;


        $.getJSON(url, params, function(data) {
            console.log(data);
            myData = data.Similar.Results
            console.log(myData)
      

        $.each(myData, function(index, value) {
            var newTitle = value.Name
            var newDescription = value.wTeaser

            $('.showRecommends').append('<p> '+newTitle+'</p>');
            $('.showRecommends').append('<p> '+newDescription+'</p>')
        });
          });
    });


// add form modal 
var addModal = document.getElementById('addTitleModal');

// Get the button that opens the modal
var btn = document.getElementById("openAddButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    addModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    addModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}
// show books modal
var showModal = document.getElementById('showBooksModal');

// Get the button that opens the modal
var btn = document.getElementById("displayBookshelf");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("showClose")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    showModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    showModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == showModal) {
        showModal.style.display = "none";
    }
}

// show suggestion modal
var suggestModal = document.getElementById('showSuggestionModal');

// Get the button that opens the modal
var btn = document.getElementById("openSuggestionOverlay");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("suggestClose")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    suggestModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    suggestModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == suggestModal) {
        suggestModal.style.display = "none";
    }
}

});