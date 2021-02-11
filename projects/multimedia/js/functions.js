"use strict";

var nav = document.getElementById("navbar");

window.addEventListener("load", () => {
  window.onscroll = function() {
    navbarTop();
  };
});
var navbarTop = () => {
  if (window.pageYOffset >=395) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
