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
        }
    });
});

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
    $("#navButtons").append("<div id='prev' class='nav-button'>Prev</div>");
    $("#navButtons").append("<div id='next' class='nav-button'>Next</div>");
}

function createIndexPoints(array, $el){
    for(var i = 0; i < array.length; i++){
        $el.append(
            "<div class='index-point' id='index" + i + "'>" +
              "<p>" + zetaGitInfo[i].name + "</p>" +
              "<p>" + zetaGitInfo[i].github + "</p>" +
              "<p>" + zetaGitInfo[i].shoutout + "</p>" +
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