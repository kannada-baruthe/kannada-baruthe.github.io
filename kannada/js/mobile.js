/**
 * Created by vikram on 6/11/15.
 */
function playMusic(fileName) {
    fileName = fileName.trim();
    fileName = "/media/" + escape(fileName);

    $("#jquery_jplayer_1").jPlayer("setMedia", {mp3: fileName});
    $("#jquery_jplayer_1").jPlayer("play");
    collapse();

}

function collapse() {
    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
}

var myApp = angular.module('kbApp', ['angularUtils.directives.dirPagination']);

myApp.controller('KbController', ['$scope', '$http', function ($scope, $http) {
    $scope.category = function (value) {


        $scope.category_id = value;
        $scope.table = [];
        $http({
            url: 'categories/' + value,
            method: "GET"
        }).
            then(function (response) {


                $scope.table = response.data.response;

                $scope.filteredList = $scope.table;

                setTimeout(
                    function () {
                        collapse();
                        //do something special
                    }, 300);




                // this callback will be called asynchronously
                // when the response is available
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


    };

    $scope.config = {
        itemsPerPage: 5,
        maxPages: 5,
        fillLastPage: "yes"
    };

    $scope.test_category = function (value) {

        $scope.translation2 = "";
        $scope.translation = "";


        $scope.category_id = value * 10;
        $scope.table = [];
        $http({
            url: 'test/' + value,
            method: "GET"
        }).then(function (response) {


            $scope.test = response.data.response;
            $scope.test.translation2 = "";
            $scope.test.translation = "";


            // this callback will be called asynchronously
            // when the response is available
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    };

    $scope.post_test = function (value, option_id) {


        $http({
            url: 'test/' + value + '?option_id=' + option_id,
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {option_id: option_id}
        }).then(function (response) {


            $scope.test = response.data.response;
            $scope.test.translation2 = "";
            $scope.test.translation = "";


            // this callback will be called asynchronously
            // when the response is available
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    };



    $scope.playMusic = function (value) {

        playMusic(value);
        console.log(value);

    };

    $scope.init = function () {
        $scope.category_id = 45;
        $scope.category($scope.category_id);

    };


    // console.log("init");
}]);

(function ($) {


    $("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                mp3: "/media/col_converted.mp3"
            });
        },
        swfPath: "js",
        supplied: "mp3",
        wmode: "window"
    });


    $.each(document.images, function () {
        var this_image = this;
        var src = $(this_image).attr('src') || '';
        if (!src.length > 0) {
            //this_image.src = options.loading; // show loading
            var lsrc = $(this_image).attr('data-src') || '';
            if (lsrc.length > 0) {
                var img = new Image();
                img.src = lsrc;
                $(img).load(function () {
                    this_image.src = this.src;
                });
            }
        }
    });

    $("a.jQueryBookmark").click(function (e) {
        e.preventDefault(); // this will prevent the anchor tag from going the user off to the link

        var bookmarkURL = window.location.href;
        var bookmarkTitle = document.title;

        if ('addToHomescreen' in window && window.addToHomescreen.isCompatible) {
            // Mobile browsers
            addToHomescreen({autostart: false, startDelay: 0}).show(true);
        } else if (window.sidebar && window.sidebar.addPanel) {
            // Firefox version < 23
            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
        } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
            // Firefox version >= 23 and Opera Hotlist
            $(this).attr({
                href: bookmarkURL,
                title: bookmarkTitle,
                rel: 'sidebar'
            }).off(e);
            return true;
        } else if (window.external && ('AddFavorite' in window.external)) {
            // IE Favorite
            window.external.AddFavorite(bookmarkURL, bookmarkTitle);
        } else {
            // Other browsers (mainly WebKit - Chrome/Safari)
            alert('Press ' + (/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
        }
    });


    //    $('.slider').slider();
    //     $('.button-collapse').sideNav();

    //     $("#slider").append('<img src="images/slide1.jpg" alt="" />');


})(jQuery); // end of jQuery name space