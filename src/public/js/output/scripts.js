/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/js/input/scripts.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/public/js/input/scripts.js":
/*!****************************************!*\
  !*** ./src/public/js/input/scripts.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  // Detecta a los inputs personalizados\n  var customizedInputs = document.querySelectorAll(\".input-alternative .input-container input\");\n  customizedInputs.forEach(function (element) {\n    element.addEventListener(\"blur\", function () {\n      var span = element.parentNode.children[1];\n      if (element.value != \"\") span.classList.add(\"active\");else span.classList.remove(\"active\");\n    });\n  }); // -> Detecta a los inputs personalizados\n  // Detecta los textareas personalizados\n\n  var customizedTextAreas = document.querySelectorAll(\".input-alternative.multi-line .text-area-container .text-area\");\n  customizedTextAreas.forEach(function (element) {\n    element.addEventListener(\"blur\", function () {\n      var span = element.parentNode.children[1];\n      if (element.textContent != \"\") span.classList.add(\"active\");else span.classList.remove(\"active\");\n    });\n  }); // Simula el efecto de un label para los textareas personalziados\n\n  var customizedTextAreasLabels = document.querySelectorAll(\".input-alternative.multi-line .text-area-container .text-area-placeholder\");\n  customizedTextAreasLabels.forEach(function (element) {\n    element.addEventListener(\"click\", function () {\n      var forElement = element.dataset[\"for\"];\n\n      if (typeof forElement !== \"undefined\") {\n        document.querySelector(\"#\".concat(forElement)).focus();\n      }\n    });\n  }); // -> Simula el efecto de un label para los textareas personalziados\n  // -> Detecta los textareas personalizados\n  // ComboBox\n\n  document.addEventListener(\"click\", function (e) {\n    e.path.every(function (_this) {\n      if (_this.classList && _this.classList.contains('combo-input')) {\n        var comboOptions = _this.parentNode.children[2];\n        var display = comboOptions.style.display;\n        comboOptions.style.display = display == \"block\" ? \"none\" : \"block\";\n        return false;\n      }\n\n      return true;\n    });\n  });\n  document.addEventListener(\"click\", function (e) {\n    e.path.every(function (_this) {\n      if (_this.classList && _this.classList.contains('combo-option')) {\n        _this.parentNode.style.display = \"none\";\n        _this.parentNode.parentNode.children[0].value = _this.textContent.trim();\n        _this.parentNode.parentNode.children[0].dataset.value = _this.dataset.value;\n\n        _this.parentNode.parentNode.children[0].dispatchEvent(new Event(\"change\"));\n\n        return false;\n      }\n\n      return true;\n    });\n  }); // -> ComboBox\n});\n\n//# sourceURL=webpack:///./src/public/js/input/scripts.js?");

/***/ })

/******/ });