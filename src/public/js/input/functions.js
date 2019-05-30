export default {
    empty : (string) => {
        return string == "";
    },

    removeSpecialChars : (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    },

    parseUrlName : function (name) {
        return this.removeSpecialChars(name.toLowerCase().trim().split(" ").join("-"));
    },

    putLineBreaks : (text) => {
        return text.split("\\n").join("<br>");
    }
}

