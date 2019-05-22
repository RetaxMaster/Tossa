"use strict";

// Funciones
var closeModal = function closeModal() {
  var modal = document.querySelector("#modal");
  modal.classList.remove("show");
  setTimeout(function () {
    var cards = modal.querySelectorAll(".modal-card");
    cards.forEach(function (e) {
      return e.style.display = "none";
    });
  }, 300);
};

var showModal = function showModal(e) {
  document.querySelector("#".concat(e)).style.display = "block";
  document.querySelector("#modal").classList.add("show");
}; // -> Funciones
// Eventos
//Cerrar la ventana al hacer click afuera


document.addEventListener("click", function (e) {
  var _this = e.target;
  if (_this.classList.contains('modal-main')) closeModal();
}); // -> Eventos