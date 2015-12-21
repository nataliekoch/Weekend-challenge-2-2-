var thetaGitInfo;

var indexTracker = 0;

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "../data/theta.json",
        success: function(data){
            //store data into variable zetaGitInfo
            thetaGitInfo = data.people;
            //create carousel
            createCarousel(thetaGitInfo);

            updateIndexPoints();

            $("#next").on('click', nextSlide);
            $("#prev").on('click', prevSlide);
            updateMain();
            timer();
        }
    });
});

function timer() {
    setInterval(
        function(){
            nextSlide();
        }, 10000
    );
}

function createCarousel(array) {
    $("#container").append("<div class='main'></div>");
    var $el = $("#container").children().last();
    createNavButtons($el);
    createIndexPoints(array, $el);
}

function nextSlide(){
    indexTracker++;
    if(indexTracker >= thetaGitInfo.length){
        indexTracker = 0;
    }

    updateMain();
    updateIndexPoints();
}

function prevSlide(){
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = thetaGitInfo.length - 1;
    }

    updateMain();
    updateIndexPoints();
}

function createNavButtons($el){
    //$("#navButtons").append("<div id='prev' class='nav-button'>Prev</div>");
    //$("#navButtons").append("<div id='next' class='nav-button'>Next</div>");
    $("#navButtons").append("<button id='prev' type='button' class='btn btn-default'>Prev</button>");
    $("#navButtons").append("<button id='next' type='button' class='btn btn-default'>Next</button>");

}

function createIndexPoints(array, $el){
    for(var i = 0; i < array.length; i++){
        $el.append(
            "<div class='index-point' id='index" + i + "'>" +
              "<h1>" + thetaGitInfo[i].name + "</h1>" +
              "<h3>" + thetaGitInfo[i].location + "</h3>" +
              "<h3>" + thetaGitInfo[i].animal + "</h3>" +
              "<img src='" + thetaGitInfo[i].animalImage + "' height='15%' width='15%'>" +
            "</div>"
        )
    }
}

function updateIndexPoints(){
    for(var i = 0; i < thetaGitInfo.length; i++){
        $("#index" + i).stop(true, true).fadeOut("fast");

        if(i == indexTracker){
            $("#index" + i).stop(true, true).fadeIn("slow");
        }
    }
}

function updateMain(){
    $("#mainContent").text(thetaGitInfo[indexTracker]);
}