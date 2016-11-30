var booklist = {
    "bookInfo": [
        {
            "id": "1",
            "title": "Harry Potter and the Sorcerer's Stone",
            "author": "J.K. Rowling",
            "source": "borrowed from a friend",
            "collection": "to be read"
        },
        {
            "id": "2",
            "title": "War and Peace",
            "author": "Tolstoy",
            "source": "purchased at Goodwill",
            "collection": "classics"
        },
        {
            "id": "3",
            "title": "Madame Secretary",
            "author": "Madeleine Albright",
            "source": "birthday present",
            "collection": "loaned out"
        },
        {
            "id": "4",
            "title": "Computing: A Concise History",
            "author": "Paul Ceruzzi",
            "source": "library",
            "collection": "to be read"
        }
    ]
};

function getBooklist(callbackFn) {
    setTimeout(function(){ callbackFn(booklist)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayBooklist(data) {
    for (index in data.bookInfo) {
       $('.displayExistingTitles').append(
        '<div id="booklisting> <p id="bookTitle">Title: ' + data.bookInfo[index].title+ '</p><p id="bookAuthor"> Author: '+ data.bookInfo[index].author+ '</p><button id="Edit"> Edit </button><button id="Delete"> Delete </button></div>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayBooklist() {
    getBooklist(displayBooklist);
}

// $(function() {
//     getAndDisplayBooklist();
// })