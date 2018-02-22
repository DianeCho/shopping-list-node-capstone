$(document).ready(function () {
    //    when the page loads
    $('.js-search-page').hide();
    $('.js-ingredients-page').hide();
    $('.js-shoppinglist-page').hide();
    $('.js-login-page').hide();
    $('.js-newuser-page').hide();

    //button triggers
    $('.enter').click(function (event) {
        event.preventDefault();
        $('.js-login-page').show();
        $('.js-main-page').hide();
    });


    $('.newuser').click(function (event) {
        event.preventDefault();
        $('.js-newuser-page').show();
        $('.js-login-page').hide();
    });


    $('.registerbtn').click(function (event) {
        event.preventDefault();
        $('.js-login-page').show();
        $('.js-newuser-page').hide();
    });



    $('.login').click(function (event) {
        event.preventDefault();
        $('.js-search-page').show();
        $('.js-login-page').hide();
    });



    $('.searchbtn').click(function (event) {
        event.preventDefault();
        $('.js-ingredients-page').show();
        $('.js-search-page').hide();
    });


    $('.continuebtn').click(function (event) {
        event.preventDefault();
        $('.js-shoppinglist-page').show();
        $('.js-ingredients-page').hide();
    });

    $('#returnbtn').click(function (event) {
        event.preventDefault();
        $('.js-search-page').show();
        $('.js-shoppinglist-page').hide();
    });

    $('#print').click(function (event) {
        event.preventDefault();
        window.print();

    });

});
