// Fit variable sized company names inside fixed sized div blocks
textFit(document.getElementsByClassName("comp-block"));

// function trial(compid) {
//   // Get the modal
//   var modal = document.getElementById("myModal");

//   // Get the button that opens the modal
//   var btn = document.getElementById("myBtn");

//   // Get the <span> element that closes the modal
//   var span = document.getElementsByClassName("close")[0];

//   // When the user clicks the button, open the modal
//   btn.onclick = function() {
//     modal.style.display = "block";
//   };

//   // When the user clicks on <span> (x), close the modal
//   span.onclick = function() {
//     modal.style.display = "none";
//   };

//   // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   };
// }

var whiteColor = $("<div/>")
  .css({
    "background-color": "#ffffff"
  })
  .css("background-color");
var yellowColor = $("<div/>")
  .css({
    "background-color": "#f9fd0a"
  })
  .css("background-color");

var DELAY = 300,
  clicks = 0,
  timer = null;

function compactions(el, compid) {
  if (el.getAttribute("data-dblclick") == null) {
    el.setAttribute("data-dblclick", 1);
    timer = setTimeout(function() {
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
    el.removeAttribute("data-dblclick");
    alert("doubleclick");
  }
}
