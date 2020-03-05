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

var whiteColor = $(".comp-block").css("background-color");
var yellowColor = $("<div/>")
  .css({
    "background-color": "#f9fd0a"
  })
  .css("background-color");
$(".comp-block").click(function() {
  if ($(this).css("background-color") == whiteColor) {
    $(this).css("background-color", "#f9fd0a");
  } else if ($(this).css("background-color") == yellowColor) {
    $(this).css("background-color", "#c0e908");
  } else {
    $(this).css("background-color", whiteColor);
  }
});
