var encoded_file = localStorage.getItem("encoded_file");

var age_valid = false;
var height_valid = false;
var weight_valid = false;



$(document).ready(function () {
    function checkValid() {
        if (age_valid && height_valid && weight_valid) {
            $(".submit").removeClass("disabled");
        } else {
            $(".submit").addClass("disabled");
        }
    }

    $(".age").on("input", function () {
        if ($(this).val() < $(this).attr("min")) {
            $(this).addClass("incorrect");
            age_valid = false;
        } else {
            $(this).removeClass("incorrect");
            age_valid = true;
        }
        checkValid();
    });

    $(".height").on("input", function () {
        if ($(this).val() < $(this).attr("min")) {
            $(this).addClass("incorrect");
            height_valid = false;
        } else {
            $(this).removeClass("incorrect");
            height_valid = true;
        }
        checkValid();
    });

    $(".weight").on("input", function () {
        if ($(this).val() < $(this).attr("min")) {
            $(this).addClass("incorrect");
            weight_valid = false;
        } else {
            $(this).removeClass("incorrect");
            weight_valid = true;
        }
        checkValid();
    });

    

    $(".submit").on("click", function () {
        var age = $(".age").val();
        var weight = $(".weight").val();
        var height = $(".height").val();
        localStorage.setItem("age", age);
        localStorage.setItem("weight", weight);
        localStorage.setItem("height", height);
        window.location.href = "loading.html";
    });
});

