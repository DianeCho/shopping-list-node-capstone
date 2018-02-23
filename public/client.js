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

    $(document).on('click', '.newuser', function (event) {

        event.preventDefault();
        $('.js-newuser-page').show();
        $('.js-login-page').hide();
    });

    $(document).on('click', '.registerbtn', function (event) {

        event.preventDefault();
        $('.js-login-page').show();
        $('.js-newuser-page').hide();
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



