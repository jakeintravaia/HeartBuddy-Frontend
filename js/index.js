$(document).ready(function () {

    //localStorage.clear(); // Clear any previously stored data
    $(".config").on("click", function () {
        $(".block-out").fadeIn();
        $('.config-page').fadeIn();
        $('.config-title').fadeIn();
        $('.config-body').fadeIn();
        $('.config-title').css("display", "flex");
        $('.config-body').css("display", "flex");
    });

    $(".config-body .https").on("click", function () {
        $(".highlight").css({
            left: "auto",
            right: "0px"
        });
        localStorage.setItem("protocol", "https");
    });

    $(".config-body .http").on("click", function () {
        $(".highlight").css({
            right: "auto",
            left: "0px"
        });
        localStorage.setItem("protocol", "http");
    });

    $(".config-title .exit").on("click", function () {
        $(".block-out").fadeOut();
        $('.config-page').fadeOut();
        $('.config-title').fadeOut();
        $('.config-body').fadeOut();
    });

    $(".config-submit").on("click", function () {
        var serverIp = $(".server-ip").val();
        var serverPort = $(".server-port").val();
        localStorage.setItem("serverIp", serverIp);
        localStorage.setItem("serverPort", serverPort);
        $(".block-out").fadeOut();
        $('.config-page').fadeOut();
        $('.config-title').fadeOut();
        $('.config-body').fadeOut();
    });


});