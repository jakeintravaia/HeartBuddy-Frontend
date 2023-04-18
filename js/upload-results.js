$(document).ready(function () {
    localStorage.clear(); // Clear any previously stored data
    $(".upload-file").on("click", function () {
        $(".file-input").trigger("click");
    });

    $(".file-input").change(function () {
        var fileName = $(".file-input").val().split('\\').pop();
        var extension = fileName.split(".");
        if (extension[1] !== "json") {
            $(".upload-file").html("Error: Only .json files are supported.");
            $(".submit-btn").addClass("disabled");
        } else {
            $(".upload-file").html("File selected: " + fileName);
            $(".submit-btn").removeClass("disabled");
            $(".submit-btn").removeAttr("disabled");
        }
    });

    $(".submit-btn").on("click", function () {
        var file = $("#results-upload").prop('files')[0];
        //window.location.href = "results.html";
        var fileReader = new FileReader();

        // Set up the onload event handler
        fileReader.onload = function (event) {
            // Access the file data as a string
            var fileData = event.target.result;
            var results = JSON.parse(fileData);
            var model_results = results.predictions.result;
            var features = results.feature_extraction.result;
            var full_results = results;
            localStorage.setItem("features", features); // Our FE images
            localStorage.setItem("model_results", JSON.stringify(model_results)); // Our model predictions
            localStorage.setItem("full_results", JSON.stringify(full_results)); // Our full results
            window.location.href = "results.html";
        };

        // Read the selected file as a text file
        fileReader.readAsText(file);
    });
});