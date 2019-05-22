"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Detecta a los inputs personalizados
  var customizedInputs = document.querySelectorAll(".input-alternative .input-container input");
  customizedInputs.forEach(function (element) {
    element.addEventListener("blur", function () {
      var span = element.parentNode.children[1];
      if (element.value != "") span.classList.add("active");else span.classList.remove("active");
    });
  }); // -> Detecta a los inputs personalizados
  // Detecta los textareas personalizados

  var customizedTextAreas = document.querySelectorAll(".input-alternative.multi-line .text-area-container .text-area");
  customizedTextAreas.forEach(function (element) {
    element.addEventListener("blur", function () {
      var span = element.parentNode.children[1];
      if (element.textContent != "") span.classList.add("active");else span.classList.remove("active");
    });
  }); // Simula el efecto de un label para los textareas personalziados

  var customizedTextAreasLabels = document.querySelectorAll(".input-alternative.multi-line .text-area-container .text-area-placeholder");
  customizedTextAreasLabels.forEach(function (element) {
    element.addEventListener("click", function () {
      var forElement = element.dataset["for"];

      if (typeof forElement !== "undefined") {
        document.querySelector("#".concat(forElement)).focus();
      }
    });
  }); // -> Simula el efecto de un label para los textareas personalziados
  // -> Detecta los textareas personalizados
  // ComboBox

  document.addEventListener("click", function (e) {
    e.path.every(function (_this) {
      if (_this.classList && _this.classList.contains('combo-input')) {
        var comboOptions = _this.parentNode.children[2];
        var display = comboOptions.style.display;
        comboOptions.style.display = display == "block" ? "none" : "block";
        return false;
      }

      return true;
    });
  });
  document.addEventListener("click", function (e) {
    e.path.every(function (_this) {
      if (_this.classList && _this.classList.contains('combo-option')) {
        _this.parentNode.style.display = "none";
        _this.parentNode.parentNode.children[0].value = _this.textContent.trim();
        _this.parentNode.parentNode.children[0].dataset.value = _this.dataset.value;

        _this.parentNode.parentNode.children[0].dispatchEvent(new Event("change"));

        return false;
      }

      return true;
    });
  }); // -> ComboBox
});