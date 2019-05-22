"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

document.addEventListener("DOMContentLoaded", function () {
  // Cambiar de categoría
  document.querySelector("#search-by-category").addEventListener("change", function (e) {
    document.location.href = parseUrlName(e.target.value);
  }); // -> Cambiar de categoría
  // Publicar un nuevo problema

  document.addEventListener("submit",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      var _this, titleInput, descriptionInput, categoryInput, title, description, category, data, res, problem, allProblemsContainer, firstChild, noProblemsFound;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this = e.target;

              if (!(_this.id == "new-problem-form")) {
                _context.next = 23;
                break;
              }

              e.preventDefault();
              titleInput = document.querySelector("#problem-title");
              descriptionInput = document.querySelector("#write-problem");
              categoryInput = document.querySelector("#category"); //Obtenemos los datos

              title = titleInput.value;
              description = descriptionInput.innerHTML.split("<br>").join("\\n");
              category = categoryInput.dataset.value;

              if (!(!empty(title) && !empty(description) && category != "0")) {
                _context.next = 22;
                break;
              }

              //Petición Ajax
              data = {
                mode: "newProblem",
                title: title,
                description: description,
                category: category
              };
              _context.next = 13;
              return fetch("/requests", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'POST',
                body: JSON.stringify(data)
              });

            case 13:
              res = _context.sent;
              _context.t0 = JSON;
              _context.next = 17;
              return res.text();

            case 17:
              _context.t1 = _context.sent;
              res = _context.t0.parse.call(_context.t0, _context.t1);

              if (res.status) {
                //Creamos el problema y lo insertamos
                problem = "\n                    <section class=\"card problem\" data-id=\"".concat(res.problems.id, "\">\n                        <h2><b>").concat(res.problems.title, "</b></h2>\n                        <span class=\"username\">").concat(res.problems.user, "</span>\n                        <p>").concat(putLineBreaks(res.problems.description), "</p>\n                        <section class=\"write-answer\">\n                            <h3>Publica una respuesta</h3>\n                            <div class=\"input-alternative multi-line\">\n                                <div class=\"text-area-container\">\n                                    <div class=\"text-area\" contenteditable=\"true\"></div>\n                                    <div data-for=\"write-answer-1\" class=\"text-area-placeholder\">Tu respuesta</div>\n                                    <div class=\"border-bottom-input\"></div>\n                                </div>\n                            </div>\n                        </section>\n                        <div class=\"button-container right\">\n                            <button type=\"button\" class=\"btn button-2 make-answer\">Responder</button>\n                            <button type=\"button\" class=\"btn button-2 view-answers\">Ver respuestas</button>\n                        </div>\n                    </section>");
                problem = document.createRange().createContextualFragment(problem);
                allProblemsContainer = document.querySelector("#all-problems");

                if (allProblemsContainer.children.length > 0) {
                  firstChild = allProblemsContainer.children[0];
                  allProblemsContainer.insertBefore(problem, firstChild);
                } else {
                  allProblemsContainer.appendChild(problem);
                } //Eliminamos el mensaje de que no se encontraron problemas


                noProblemsFound = document.querySelector("#no-problems-found");
                noProblemsFound.parentNode.removeChild(noProblemsFound); //Reestablecemos los campos

                titleInput.value = "";
                titleInput.focus();
                titleInput.blur();
                descriptionInput.innerHTML = "";
                descriptionInput.focus();
                descriptionInput.blur();
                categoryInput.value = "Selecciona una categoría";
                categoryInput.datatset.value = "0";
              } else {
                alert(res.error);
              }

              _context.next = 23;
              break;

            case 22:
              alert("Por favor rellena los campos.");

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()); // -> Publicar un nuevo problema
  // Abrir la caja de respuestas

  var openResponses =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(id) {
      var data, res, allResponses, noResponses;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = {
                mode: "getResponses",
                id: id
              };
              _context2.next = 3;
              return fetch("/requests", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'POST',
                body: JSON.stringify(data)
              });

            case 3:
              res = _context2.sent;
              _context2.t0 = JSON;
              _context2.next = 7;
              return res.text();

            case 7:
              _context2.t1 = _context2.sent;
              res = _context2.t0.parse.call(_context2.t0, _context2.t1);

              if (res.status) {
                //Limpio el contenedor
                allResponses = document.querySelector("#all-responses");
                allResponses.innerHTML = "";

                if (res.responses.length > 0) {
                  res.responses.reverse(); //Inserto los nuevos elementos

                  res.responses.forEach(function (response) {
                    var responseUser = "\n                    <article class=\"coment\" data-id=\"".concat(response._id, "\">\n                        <span class=\"username\"><b>").concat(response.user, "</b></span>\n                        <p>").concat(putLineBreaks(response.response), "</p>\n                    </article>");
                    responseUser = document.createRange().createContextualFragment(responseUser);
                    allResponses.append(responseUser);
                  });
                } else {
                  noResponses = "\n                <article class=\"no-responses-founded\">\n                    <span>No se encontraron respuestas</span>\n                </article>";
                  noResponses = document.createRange().createContextualFragment(noResponses);
                  allResponses.append(noResponses);
                }

                document.querySelector("#Respuestas").dataset.problem = id;
                showModal("Respuestas");
              } else {
                alert(res.error);
              }

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function openResponses(_x2) {
      return _ref2.apply(this, arguments);
    };
  }(); // -> Abrir la caja de respuestas
  // Responder un problema


  document.addEventListener("click", function (e) {
    e.path.every(
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_this) {
        var parent, responseArea, responseText, pubId, data, res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this.classList && _this.classList.contains('make-answer'))) {
                  _context3.next = 18;
                  break;
                }

                parent = _this.parentNode.parentNode;
                responseArea = parent.querySelector(".text-area");
                responseText = responseArea.innerHTML.split("<br>").join("\\n");
                pubId = parent.dataset.id;

                if (!(responseText != "")) {
                  _context3.next = 16;
                  break;
                }

                data = {
                  mode: "makeResponse",
                  responseText: responseText,
                  pubId: pubId
                };
                _context3.next = 9;
                return fetch("/requests", {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                  },
                  method: 'POST',
                  body: JSON.stringify(data)
                });

              case 9:
                res = _context3.sent;
                openResponses(pubId);
                responseArea.innerHTML = "";
                responseArea.focus();
                responseArea.blur();
                _context3.next = 17;
                break;

              case 16:
                alert("Por favor escribe una respuesta.");

              case 17:
                return _context3.abrupt("return", false);

              case 18:
                return _context3.abrupt("return", true);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
  }); // -> Responder un problema
  // Ver respuestas

  document.addEventListener("click", function (e) {
    e.path.every(function (_this) {
      if (_this.classList && _this.classList.contains('view-answers')) {
        var pubId = _this.parentNode.parentNode.dataset.id;
        openResponses(pubId);
        return false;
      }

      return true;
    });
  }); // -> Ver respuestas
});