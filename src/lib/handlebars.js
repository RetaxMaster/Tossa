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

module.exports = handlebars;