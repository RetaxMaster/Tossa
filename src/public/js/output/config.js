"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

document.addEventListener("DOMContentLoaded", function () {
  // Añadir nueva categoría
  document.addEventListener("submit",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      var _this, input, newCategory, data, res, category;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this = e.target;

              if (!(_this.id == "new-category")) {
                _context.next = 19;
                break;
              }

              e.preventDefault();
              input = document.querySelector("#category-name");

              if (!(input.value != "")) {
                _context.next = 18;
                break;
              }

              newCategory = input.value;
              data = {
                mode: "addCategory",
                name: newCategory
              };
              _context.next = 9;
              return fetch("/requests", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'POST',
                body: JSON.stringify(data)
              });

            case 9:
              res = _context.sent;
              _context.t0 = JSON;
              _context.next = 13;
              return res.text();

            case 13:
              _context.t1 = _context.sent;
              res = _context.t0.parse.call(_context.t0, _context.t1);

              if (res.status) {
                category = "\n                    <div class=\"category\" data-id=\"".concat(res.id, "\">\n                        <span>").concat(res.name, "</span>\n                        <div class=\"delete\">\n                            <i class=\"fas fa-times\"></i>\n                        </div>\n                    </div>");
                category = document.createRange().createContextualFragment(category);
                document.querySelector("#your-categories").querySelector(".all-categories").appendChild(category);
                input.value = "";
              } else {
                alert(res.error);
              }

              _context.next = 19;
              break;

            case 18:
              alert("Por favor escribe una categoría.");

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()); // -> Añadir nueva categoría
  // Eliminar categoría

  document.querySelector("#add-categories").addEventListener("click", function (e) {
    e.path.every(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_this) {
        var sure, element, id, data, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this.classList && _this.classList.contains("delete"))) {
                  _context2.next = 16;
                  break;
                }

                sure = confirm("¿Seguro que deseas eliminar esta categoría? Ten en cuenta que al eliminarla se eliminarán todos los problemas que estén publicados en la misma.");

                if (!sure) {
                  _context2.next = 15;
                  break;
                }

                element = _this.parentNode;
                id = element.dataset.id;
                data = {
                  mode: "deleteCategory",
                  id: id // Petición Ajax

                };
                _context2.next = 8;
                return fetch("/requests", {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                  },
                  method: 'POST',
                  body: JSON.stringify(data)
                });

              case 8:
                res = _context2.sent;
                _context2.t0 = JSON;
                _context2.next = 12;
                return res.text();

              case 12:
                _context2.t1 = _context2.sent;
                res = _context2.t0.parse.call(_context2.t0, _context2.t1);

                // -> Petición Ajax
                if (res.status) {
                  element.parentNode.removeChild(element);
                } else {
                  alert(res.error);
                }

              case 15:
                return _context2.abrupt("return", false);

              case 16:
                return _context2.abrupt("return", true);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  }); // -> Eliminar categoría
  // Añadir nuevo administrador

  document.addEventListener("submit",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(e) {
      var _this, input, newAdmin, data, res, admin;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this = e.target;

              if (!(_this.id == "new-admin")) {
                _context3.next = 19;
                break;
              }

              e.preventDefault();
              input = document.querySelector("#admin-name");

              if (!(input.value != "")) {
                _context3.next = 18;
                break;
              }

              newAdmin = input.value;
              data = {
                mode: "addAdmin",
                username: newAdmin
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
              _context3.t0 = JSON;
              _context3.next = 13;
              return res.text();

            case 13:
              _context3.t1 = _context3.sent;
              res = _context3.t0.parse.call(_context3.t0, _context3.t1);

              if (res.status) {
                admin = "\n                    <div class=\"admin\" data-id=\"".concat(res.id, "\">\n                        <span>").concat(res.username, "</span>\n                        <div class=\"delete\">\n                            <i class=\"fas fa-times\"></i>\n                        </div>\n                    </div>");
                admin = document.createRange().createContextualFragment(admin);
                document.querySelector("#your-admins").querySelector(".all-admins").appendChild(admin);
                input.value = "";
              } else {
                alert(res.error);
              }

              _context3.next = 19;
              break;

            case 18:
              alert("Por favor escribe una nombre de usuario.");

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
  }()); // -> Añadir nuevo administrador
  // Eliminar administrador

  document.querySelector("#add-admins").addEventListener("click", function (e) {
    e.path.every(
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_this) {
        var element, id, data, res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this.classList && _this.classList.contains("delete"))) {
                  _context4.next = 14;
                  break;
                }

                element = _this.parentNode;
                id = element.dataset.id;
                data = {
                  mode: "deleteAdmin",
                  id: id // Petición Ajax

                };
                _context4.next = 6;
                return fetch("/requests", {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                  },
                  method: 'POST',
                  body: JSON.stringify(data)
                });

              case 6:
                res = _context4.sent;
                _context4.t0 = JSON;
                _context4.next = 10;
                return res.text();

              case 10:
                _context4.t1 = _context4.sent;
                res = _context4.t0.parse.call(_context4.t0, _context4.t1);

                // -> Petición Ajax
                if (res.status) {
                  element.parentNode.removeChild(element);
                } else {
                  alert(res.error);
                }

                return _context4.abrupt("return", false);

              case 14:
                return _context4.abrupt("return", true);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());
  }); // -> Eliminar administrador
});