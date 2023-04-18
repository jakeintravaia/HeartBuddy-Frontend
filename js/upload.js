function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file);
    reader.onload = function () {
        var raw_encode = reader.result;
        var raw_encode = raw_encode.split(",");
        var encoded_file = raw_encode[1];
        localStorage.setItem("encoded_file", encoded_file); // Save encoded file in local storage
        console.log(encoded_file);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

$(document).ready(function () {
    localStorage.clear(); // Clear any previously stored data
    $(".upload-file").on("click", function () {
        $(".file-input").trigger("click");
    });

    $(".file-input").change(function () {
        var fileName = $(".file-input").val().split('\\').pop();
        var extension = fileName.split(".");
        if (extension.slice(-1)[0] !== "npy") {
            $(".upload-file").html("Error: Only .npy files are supported.");
            $(".submit-btn").addClass("disabled");
        } else {
            $(".upload-file").html("File selected: " + fileName);
            var file = $("#npy-upload").prop('files')[0];
            getBase64(file); // prints the base64 string
            setInterval(checkPayload, 500);
        }
    });

    function checkPayload() {
        if (localStorage.getItem("encoded_file") != null) {
            $(".submit-btn").removeClass("disabled");
            $(".submit-btn").removeAttr("disabled");
        }
    }

    $(".submit-btn").on("click", function () {
        window.location.href = "patient.html";
    });
});