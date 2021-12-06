// Change text in Card Title to ...
/* Ex: <h5 class="card-title">The Ultimate MySQL Bootcamp: GO from SQL Beginner to Expert</h5> */

// When all the website loads its scripts, call function
window.addEventListener("load", function()  {
    truncateCardTitle();
});

/*
Truncate Card Title
 */
function truncateCardTitle() {
    var cardList = document.getElementsByClassName("card-title");
    console.log(cardList);
    for(var i = 0; i < cardList.length; i++){
        var text = cardList[i].innerHTML; // get content inside html
        var newText = truncateString(text, 40);
        cardList[i].innerHTML = newText;
    }
}

// function to execute text
function truncateString(str,num) {
    if(str.length > num) {
        return str.slice(0,num) + "..."; // slice start from first str to num, include space
    } else{
        return str;
    }
}

/*
Truncate Card Title
 */

/* Sidebar Mini */
var toggleBtn = document.querySelector('.sidebarMini__btn');
var sidebarMini = document.querySelector('.sidebarMini');
var switchBtn = document.querySelector('#checkbox');


toggleBtn.addEventListener('click', function() {
    sidebarMini.classList.toggle('is-opened');
});

switchBtn.addEventListener('click', function() {
    document.querySelector('body').classList.toggle('darkMode');
});