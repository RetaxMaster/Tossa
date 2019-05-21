const handlebars = {};

// Switch... case

handlebars.switch = (value, options) => {
    this.switch_value = value;
    this.switch_break = false;
    return options.fn(this);
}

handlebars.case = (value, options) => {
    if (value == this.switch_value) {
        this.switch_break = true;
        return options.fn(this);
    }
}

handlebars.default = (value, options) => {
    if (this.switch_break == false) {
        return options.fn(this);
    }
}

// -> Switch... case

// If

handlebars.ifCond = (v1, operator, v2) => {

    switch (operator) {
        case '==':
            return (v1 == v2);
        case '===':
            return (v1 === v2);
        case '!=':
            return (v1 != v2);
        case '!==':
            return (v1 !== v2);
        case '<':
            return (v1 < v2);
        case '<=':
            return (v1 <= v2);
        case '>':
            return (v1 > v2);
        case '>=':
            return (v1 >= v2);
        case '&&':
            return (v1 && v2);
        case '||':
            return (v1 || v2);
    }
};

// -> If

// Agrega saltos de linea

handlebars.putLineBreaks = (text) => {
    return text.split("\\n").join("<br>");
}

// -> Agrega saltos de linea

// Retorna si hay hijos en un elemento
handlebars.hasChilds = (element) => {
    return element.length > 0;
}
// -> Retorna si hay hijos en un elemento

// Retorna si no hijos en un elemento
handlebars.hasntChilds = (element) => {
    return element.length == 0;
}
// -> Retorna si no hijos en un elemento

module.exports = handlebars;