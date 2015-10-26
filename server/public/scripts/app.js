var zetaGitInfo;

var indexTracker = 0;

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "../data/zeta.json",
        success: function(data){
            //store data into variable zetaGitInfo
            zetaGitInfo = data.zeta;
            console.log(zetaGitInfo);
            //create carousel
            createCarousel(zetaGitInfo);

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
    if(indexTracker >= zetaGitInfo.length){
        indexTracker = 0;
    }

    updateMain();
    updateIndexPoints();
}

function prevSlide(){
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = zetaGitInfo.length - 1;
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
              "<h1>" + zetaGitInfo[i].name + "</h1>" +
              "<h4>" + zetaGitInfo[i].github + "</h4>" +
              "<h5>" + zetaGitInfo[i].shoutout + "</h5>" +
            "</div>"
        )
    }
}

function updateIndexPoints(){
    for(var i = 0; i < zetaGitInfo.length; i++){
        $("#index" + i).fadeOut("slow");

        if(i == indexTracker){
            $("#index" + i).fadeIn("slow");
        }
    }
}

function updateMain(){
    $("#mainContent").text(zetaGitInfo[indexTracker]);
}