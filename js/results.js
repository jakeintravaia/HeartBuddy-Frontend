var keys = [];
var vals = [];
var delay = 300;
var threshold = 0;

var names = {
    "AF": "Atrial Flutter",
    "AFIB": "Atrial Fibrillation",
    "AVB": "1st Degree Atrioventricular Block",
    "CRBBB": "Complete Right Bundle Branch Block",
    "LVH": "Left Ventricular Hypertrophy",
    "SA": "Sinus Arrhythmia",
    "SB": "Sinus Bradycardia",
    "SR": "Sinus Rhythm",
    "ST": "Sinus Tachycardia",
    "STTC": "ST-T Change"
};

var results = localStorage.getItem("result");

$(document).ready(function () {

    function addResults(result) {
        console.log(result);
        var items = [];
        for (var i = 0; i < result.length; i++) {
            if (result[i][1].predict_tensor_r > threshold) {
                items.push("<div class='result' id='" + result[i][1].acronym + "'><div class='abnorm'>" + result[i][1].name + "</div><div class='confidence'>" + (result[i][1].predict_tensor_r * 100).toFixed(2) + "%</div></div>");
            }
        }
        for (i = 0; i < items.length; i++) {
            $(".rslt-tbl").append(items[i]);
        }

        $('.result').each(function () {
            $(this).css('animation-delay', delay + 'ms');
            delay += 100; // increase delay by 100ms for each div
        });
    }
    var parsed_rslts = JSON.parse(results);
    var sorted_rslts = Object.entries(parsed_rslts).sort((a, b) => b[1].predict_tensor_r - a[1].predict_tensor_r);
    console.log(sorted_rslts);
    addResults(sorted_rslts);

    $(document).on("click", ".result", function () {
        var cond = $(this).attr('id');
        console.log(cond);// Get ID
        if (descriptions[cond]) { // If it exists, show the user
            popUp(descriptions[cond].name, descriptions[cond].description, descriptions[cond].symptoms, descriptions[cond].source);
        }
    });

    $(document).on("click", ".exit", function () {
        $(".pop-up").fadeOut(300, function () { $(this).remove(); });

        $(".block-out").animate({
            opacity: 0
        }, 300, function () {
            $(this).remove();
        });
    });

    

    $(".download").on("click", function () {
        // Do something
    });
});



// Make our pop up div

function popUp(name, desc, symptoms, source) {
    this.main = $("<div>");
    this.body = $("<div>");
    this.title = $("<div>");
    this.desc = $("<div>");
    this.symptoms = $("<ul>");
    this.source = ("<a href='" + source + "' target='_blank'><span>Source</span></a>");
    this.blockOut = $("<div>");

    this.main.addClass("pop-up")
    this.body.addClass("pop-body");
    this.title.addClass("title");
    this.desc.addClass("desc");
    this.symptoms.addClass("symptom-list");
    this.blockOut.addClass("block-out");

    this.title.html(name);
    this.main.append("<div class='exit'>X</div>");
    this.desc.html(desc);
    this.blockOut.attr("disabled", "true");

    for (var i = 0; i < symptoms.length; i++) {
        this.symptoms.append("<li>" + symptoms[i] + "</li>");
    }

    this.main.append(this.title);
    this.body.append("<h1>Description</h1>");
    this.body.append(this.desc);
    this.body.append("<h1>Symptoms</h1>");
    this.body.append(this.symptoms);
    this.body.append("<h1>Learn More</h1>");
    this.body.append(this.source);

    this.main.append(this.body);
    //$("body").prepend("<div class='block-out' disabled='true'></div>");
    
    //$("body").append(this.main);
    this.blockOut.hide().prependTo("body").fadeIn(300);
    this.main.hide().appendTo("body").fadeIn(300);
}