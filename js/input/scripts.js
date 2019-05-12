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

});