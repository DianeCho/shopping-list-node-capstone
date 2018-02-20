$(document).ready(function () {
    $('.js-login-form').hide();
    $('.enter').click(function (event) {
        event.preventDefault();
        $('.js-login-form').show();
        $('.js-main-page').hide();
    });

    $('.js-newuser-form').hide();
    $('.newuser').click(function (event) {
        event.preventDefault();
        $('.js-newuser-form').show();
        $('.js-login-form').hide();
    });

    $('.js-newuser-form').hide();
    $('.registerbtn').click(function (event) {
        event.preventDefault();
        $('.js-login-form').show();
        $('.js-newuser-form').hide();
    });


    $('.js-login-form').hide();
    $('.login').click(function (event) {
        event.preventDefault();
        $('.js-search-form').show();
        $('.js-login-form').hide();
    });


    $('.js-login-form').hide();
    $('.searchbtn').click(function (event) {
        event.preventDefault();
        $('.js-ingredients-form').show();
        $('.js-search-form').hide();
    });

    $('.js-ingredients-form').hide();
    $('.continuebtn').click(function (event) {
        event.preventDefault();
        $('.js-shoppinglist-form').show();
        $('.js-ingredients-form').hide();
    });


    $('.js-search-form').hide();
    $('.js-ingredients-form').hide();
    $('.js-shoppinglist-form').hide();
});
