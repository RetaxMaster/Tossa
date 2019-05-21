const empty = (string) => {
    return string == "";
}

const removeSpecialChars = (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

const parseUrlName = function (name) {
    return removeSpecialChars(name.toLowerCase().trim().split(" ").join("-"));
}