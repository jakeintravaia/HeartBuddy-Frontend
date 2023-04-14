$(document).ready(function () {
    var age = localStorage.getItem("age");
    var height = localStorage.getItem("height");
    var weight = localStorage.getItem("weight");
    var payload = localStorage.getItem("encoded_file");
    var actual_data = {
        "prediction_type": "Numpy",
        "age": parseInt(age),
        "sex": "Male",
        "weight": parseInt(weight),
        "height": parseInt(height),
        "payload_b64": payload
    };

    console.log(actual_data);

    fetch('http://10.103.8.110:7463/upload', {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actual_data)
    }).then(response => response.json()
    ).then(data => {
        console.log(data);
        result = data.result;
        console.log(result);
        localStorage.setItem("result", JSON.stringify(result));
        window.location.href = "results.html";
    })
        .catch(error => {
            // Redirect to error page
        });
});
