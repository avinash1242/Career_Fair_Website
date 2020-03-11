// Fit variable sized company names inside fixed sized div blocks
// textFit(document.getElementsByClassName("comp-block"));

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
  console.log(name);
  var compid = "comp-id-" + num;
  var modalid = "modal-" + num;
  var modalcontainer = document.getElementById(modalid);
  var modalidid = "modal-id-" + num;
  var modal = document.getElementById(modalidid);
  //   var span = document.getElementById("close");
  if (name != "") {
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
      modalcontainer.style.display = "block";
      if (modal.innerHTML.indexOf("ABOUT") === -1) {
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
            if (
              typeof element["result"]["detailedDescription"] !== "undefined"
            ) {
              var text =
                element["result"]["detailedDescription"]["articleBody"];
              var link = element["result"]["detailedDescription"]["url"];
              modal.innerHTML += "ABOUT" + "<br>" + text + "<br>";
              modal.innerHTML +=
                "<a href='" + link + "'>Wikipedia</a>" + "<br><br>";
            }
            if (typeof element["result"]["image"] !== "undefined") {
              var image = element["result"]["image"]["contentUrl"];
              modal.innerHTML += '<img src="' + image + '">';
            }
          });
        });
        //   span.onclick = function(event) {
        //     if (event.target == modal) {
        //       modal.style.display = "none";
        //     }
        //   };
        window.onclick = function(event) {
          if (event.target == modalcontainer) {
            modalcontainer.style.display = "none";
          }
        };
      }
    }
  } else {
    $("#" + compid).css("background-color", "#E6E6E6");
  }
}
