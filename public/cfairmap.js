// Fit variable sized company names inside fixed sized div blocks
textFit(document.getElementsByClassName("comp-block"));

//On single click of company div block - change to yellow
// function colorchange(compid) {
//   var whiteColor = document.getElementById(compid).style.backgroundColor;
//   alert(whiteColor);
//   if (document.getElementById(compid).style.backgroundColor == whiteColor) {
//     alert("inside if");
//     document.getElementById(compid).style.backgroundColor = "yellow";
//   } else {
//     alert("inside else");
//     document.getElementById(compid).style.backgroundColor = "green";
//   }
// }

// function compdesc(company) {
//   alert(company);
// }

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

var DELAY = 400,
  clicks = 0,
  timer = null;

$(".comp-block")
  .on("click", function() {
    clicks++;
    if (clicks === 1) {
      timer = setTimeout(function() {
        if ($(".comp-block").css("background-color") == whiteColor) {
          $(".comp-block").css("background-color", "#f9fd0a");
        } else if ($(".comp-block").css("background-color") == yellowColor) {
          $(".comp-block").css("background-color", "#c0e908");
        } else {
          $(".comp-block").css("background-color", whiteColor);
        }
        clicks = 0; //after action performed, reset counter
      }, DELAY);
    } else {
      clearTimeout(timer); //prevent single-click action
      alert("Double Click"); //perform double-click action
      clicks = 0; //after action performed, reset counter
    }
  })
  .on("dblclick", function(e) {
    e.preventDefault(); //cancel system double-click event
  });
