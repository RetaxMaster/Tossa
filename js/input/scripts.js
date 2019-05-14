document.addEventListener("DOMContentLoaded", () => {
    
    // Detecta a los inputs personalizados
    
    const customizedInputs = document.querySelectorAll(".input-alternative .input-container input");
    customizedInputs.forEach(element => {
        element.addEventListener("blur", () => {
            let span = element.parentNode.children[1];

            if (element.value != "")
                span.classList.add("active");
            else 
                span.classList.remove("active");
        });
    });
    
    
    // -> Detecta a los inputs personalizados

    // Detecta los textareas personalizados
    
    const customizedTextAreas = document.querySelectorAll(".input-alternative.multi-line .text-area-container .text-area");
    customizedTextAreas.forEach(element => {
        element.addEventListener("blur", () => {
            let span = element.parentNode.children[1];
            
            if (element.textContent != "")
                span.classList.add("active");
            else
                span.classList.remove("active");
        });
    });

    // Simula el efecto de un label para los textareas personalziados
    
    const customizedTextAreasLabels = document.querySelectorAll(".input-alternative.multi-line .text-area-container .text-area-placeholder");

    customizedTextAreasLabels.forEach(element => {
        element.addEventListener("click", () => {
            let forElement = element.dataset.for;

            if (typeof forElement !== "undefined") {
                document.querySelector(`#${forElement}`).focus();   
            }
            
        });
    });
    
    // -> Simula el efecto de un label para los textareas personalziados
    
    // -> Detecta los textareas personalizados

    // ComboBox

    document.addEventListener("click", e => {
        let _this = e.target;
        if(_this.classList.contains('combo-input')){
            let comboOptions = _this.parentNode.children[2];
            let display = comboOptions.style.display;
            comboOptions.style.display = (display == "block") ? "none" : "block";
        }
    });

    document.addEventListener("click", e => {
        let _this = e.target;
        if(_this.classList.contains('combo-option')){
            _this.parentNode.style.display = "none";
            _this.parentNode.parentNode.children[0].value = _this.textContent.trim();
            _this.parentNode.parentNode.children[0].dataset.value = _this.dataset.value;
        }
    });

    // -> ComboBox

    // Ver respuestas
    
    document.addEventListener("click", e => {
        let _this = e.target;
        if (_this.classList.contains('view-answers')) {
            document.querySelector("#Respuestas").dataset.problem = _this.parentNode.parentNode.dataset.id;
            showModal("Respuestas");
        }
    });
    
    // -> Ver respuestas

});