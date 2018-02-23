$(document).ready(function () {
    //    when the page loads
    $('.js-search-page').hide();
    $('.js-ingredients-page').hide();
    $('.js-shoppinglist-page').hide();
    $('.js-login-page').hide();
    $('.js-newuser-page').hide();
});
//button triggers

$(document).on('click', '.enter', function (event) {
    event.preventDefault();
    $('.js-login-page').show();
    $('.js-main-page').hide();
});

//trigger for the register form
$(document).on('click', '.newuser', function (event) {
    event.preventDefault();
    $('.js-newuser-page').show();
    $('.js-login-page').hide();
});

//trigger to register a new user
$(document).on('submit', '.js-newuser-form', function (event) {
    event.preventDefault();

    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let email = $('#email').val();
    let pw = $('#npassword').val();
    let confirmPw = $('#cpassword').val();
    console.log(fname, lname, email, pw, confirmPw);
    if (email == "") {
        alert('Please add an email');
    } else if (pw !== confirmPw) {
        alert('Passwords must match!');
    } else {
        const newUserObject = {
            fname: fname,
            lname: lname,
            email: email,
            password: pw
        };
        // will assign a value to variable 'user' in signin step below
        // AJAX call to send form data up to server/DB and create new user
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                alert('Thanks for signing up! You may now sign in with your username and password.');
                $('.js-login-page').show();
                $('.js-newuser-page').hide();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});


$(document).on('click', '.login', function (event) {

    event.preventDefault();
    $('.js-search-page').show();
    $('.js-login-page').hide();
});


$(document).on('click', '.searchbtn', function (event) {

    event.preventDefault();
    $('.js-ingredients-page').show();
    $('.js-search-page').hide();
});

$(document).on('click', '.continuebtn', function (event) {

    event.preventDefault();
    $('.js-shoppinglist-page').show();
    $('.js-ingredients-page').hide();
});

$(document).on('click', '#returnbtn', function (event) {

    event.preventDefault();
    $('.js-search-page').show();
    $('.js-shoppinglist-page').hide();
});

$(document).on('click', '#print', function (event) {

    event.preventDefault();
    window.print();

});

$(document).on('click', '.deletebtn', function (event) {

    console.log('removed button');
});

$(document).on('click', '.addbtn', function (event) {

    console.log('add recipes to list');
});

$(document).on('click', '#addbutton', function (event) {

    console.log('add more ingredients to shopping list');
});
