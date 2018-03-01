let loggedInUser = undefined;


function buildRecipeList(dataOutput) {
    //builds recipe html for user selection
    //console.log(dataOutput);
    var buildHtml = '';

    $.each(dataOutput.matches,
        function (key, value) {

            //ours
            buildHtml += '<li>';
            buildHtml += '<div class="recipetitle">';
            buildHtml += '<label for="title">' + value.recipeName + '</label>';
            buildHtml += ' <a href="https://www.yummly.com/#recipe/ ' + value.id + '" target="_blank" alt="Link to Yummly Recipe" title="Link to Yummly Recipe">';
            buildHtml += '<i class="fa fa-info-circle" aria-hidden="true"></i>';
            buildHtml += '</a>';
            buildHtml += '</div>';
            buildHtml += '<img src="' + value.smallImageUrls[0] + '" class="recipe" alt="">';
            buildHtml += '<div class="recipes">';
            buildHtml += '<ul class="recipeslist">';
            buildHtml += '<li>';
            buildHtml += 'Rating: ' + value.rating;
            buildHtml += '</li>';
            buildHtml += '<li>';
            buildHtml += 'Course: ' + value.attributes.course;
            buildHtml += '</li>';
            buildHtml += '<li class="title">';
            buildHtml += 'Ingredients:';
            buildHtml += '</li>';
            buildHtml += '<li>';


            buildHtml += '<ol class="ingredientBox">';
            let shortList = "";
            $.each(value.ingredients, function (subkey, subvalue) {

                buildHtml += '<li>';
                buildHtml += subvalue;
                buildHtml += '</li>';

                shortList += subvalue + ",";

            });
            buildHtml += '</ol>'

            buildHtml += '</li>';
            buildHtml += '<li>';
            buildHtml += "<form class='storeToDb'>";
            buildHtml += "<input type='hidden' class='storeToDbName' value='" + value.recipeName + "'>";
            buildHtml += "<input type='hidden' class='storeToDbRating' value='" + value.rating + "'>";
            buildHtml += "<input type='hidden' class='storeToDbCourse' value='" + value.attributes.course + "'>";
            buildHtml += "<input type='hidden' class='storeToDbId' value='" + value.id + "'>";
            buildHtml += "<input type='hidden' class='storeToShortList' value='" + shortList + "'>";

            buildHtml += '<button class="selectButton" >Select Recipe</button>';

            buildHtml += "</form>";

            buildHtml += '</li>';
            buildHtml += '</ul>';
            buildHtml += '</div>';
            buildHtml += '<button type="button" class="addbtn">Add to list</button>';
            buildHtml += '</li>';
            //    console.log(buildHtml);
        });
    $('.yummly-search-results').html(buildHtml);

};

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
    let email = $('#sign-in-username').val();
    let password = $('#sign-in-password').val();

    if ((!email) || (email.length < 1) || (email.indexOf(' ') > 0)) {
        alert('Invalid username');
    } else if ((!password) || (password.length < 1) || (password.indexOf(' ') > 0)) {
        alert('Invalid password');
    } else {
        const unamePwObject = {
            email: email,
            password: password
        };
        $.ajax({
                type: "POST",
                url: "/users/signin",
                dataType: 'json',
                data: JSON.stringify(unamePwObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                loggedInUser = result.email;
                // show the signout link in header as soon as user is signed in

                $('.js-search-page').show();
                $('.js-login-page').hide();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Invalid username and password combination. Pleae check your username and password and try again.');
            });
    }
});


$(document).on('click', '.searchbtn', function (event) {
    event.preventDefault();

    let searchString = $('.js-query').val();

    if ((!searchString) || (searchString.length < 1)) {
        alert('Invalid search string');
    } else {

        $.ajax({
                type: "GET",
                url: '/search-recipes/' + searchString,
                dataType: 'json',
            })
            .done(function (dataOutput) {
                console.log(dataOutput);
                buildRecipeList(dataOutput);

            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }

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
