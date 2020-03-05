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
function compactions(el, num) {
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
