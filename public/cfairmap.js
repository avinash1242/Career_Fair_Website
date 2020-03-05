// Fit variable sized company names inside fixed sized div blocks
textFit(document.getElementsByClassName("comp-block"));

// Set whiteColor to identify background of company block and set it to yellow on click
var whiteColor = $("<div/>")
  .css({
    "background-color": "#ffffff"
  })
  .css("background-color");

// Set yellowColor to check if background of company block is yellow and set it to green on click
var yellowColor = $("<div/>")
  .css({
    "background-color": "#f9fd0a"
  })
  .css("background-color");

//set Delay and timer for function that differentiates between single click and double click
var DELAY = 300;
var timer = null;

//Function output: Actions to be performed on a single or double click
function compactions(el, num, name) {
  var compid = "comp-id-" + num;
  var modalid = "modal-id-" + num;
  var modal = document.getElementById(modalid);
  var span = document.getElementsByClassName("close")[0];
  if (el.getAttribute("data-dblclick") == null) {
    el.setAttribute("data-dblclick", 1);
    timer = setTimeout(function() {
      //Action for single click
      if (el.getAttribute("data-dblclick") == 1) {
        if ($("#" + compid).css("background-color") == whiteColor) {
          $("#" + compid).css("background-color", "#f9fd0a");
        } else if ($("#" + compid).css("background-color") == yellowColor) {
          $("#" + compid).css("background-color", "#c0e908");
        } else {
          $("#" + compid).css("background-color", whiteColor);
        }
      }
      el.removeAttribute("data-dblclick");
    }, DELAY);
  } else {
    //Action for double click
    el.removeAttribute("data-dblclick");
    modal.style.display = "block";
    //Knowledge Search API - for company details
    var service_url = "https://kgsearch.googleapis.com/v1/entities:search";
    var params = {
      query: name,
      limit: 1,
      indent: true,
      key: "AIzaSyCGovNGr-UOT1luezbQrAP1gQ46HCLnx68"
    };
    $.getJSON(service_url + "?callback=?", params, function(response) {
      $.each(response.itemListElement, function(i, element) {
        console.log(element);
        var text = element["result"]["detailedDescription"]["articleBody"];
        var link = element["result"]["detailedDescription"]["url"];
        var image = element["result"]["image"]["contentUrl"];
        document.querySelector(".modal-content").innerHTML += text + "<br>";
        document.querySelector(".modal-content").innerHTML += link + "<br><br>";
        document.querySelector(".modal-content").innerHTML +=
          '<img src="' + image + '">';
      });
    });

    span.onclick = function() {
      modal.style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}
