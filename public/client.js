$(document).ready(function () {
            $('form').hide();
            $('.enter').click(function (event) {
                        event.preventDefault();
                        $('main').show();
                        $('#intro).hide();
                        });
