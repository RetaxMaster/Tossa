document.addEventListener("DOMContentLoaded", () => {

    // Cambiar de categoría
    
    document.querySelector("#search-by-category").addEventListener("change", e => {
        document.location.href = parseUrlName(e.target.value);
    });
    
    // -> Cambiar de categoría

    // Publicar un nuevo problema
    
    document.addEventListener("submit", async e => {
        const _this = e.target;
        if (_this.id == "new-problem-form") {
            e.preventDefault();
            const titleInput = document.querySelector("#problem-title");
            const descriptionInput = document.querySelector("#write-problem");
            const categoryInput = document.querySelector("#category");

            //Obtenemos los datos
            const title = titleInput.value;
            const description = descriptionInput.innerHTML.split("<br>").join("\\n");
            const category = categoryInput.dataset.value;

            if (!empty(title) &&  !empty(description) && category != "0") {
                //Petición Ajax
    
                const data = { mode : "newProblem", title, description, category };
    
                let res = await fetch("/requests", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                res = JSON.parse(await res.text());
                
                if (res.status) {
                    //Creamos el problema y lo insertamos
        
                    let problem = `
                    <section class="card problem" data-id="${res.problems.id}">
                        <h2><b>${res.problems.title}</b></h2>
                        <span class="username">${res.problems.user}</span>
                        <p>${putLineBreaks(res.problems.description)}</p>
                        <section class="write-answer">
                            <h3>Publica una respuesta</h3>
                            <div class="input-alternative multi-line">
                                <div class="text-area-container">
                                    <div class="text-area" contenteditable="true"></div>
                                    <div data-for="write-answer-1" class="text-area-placeholder">Tu respuesta</div>
                                    <div class="border-bottom-input"></div>
                                </div>
                            </div>
                        </section>
                        <div class="button-container right">
                            <button type="button" class="btn button-2 make-answer">Responder</button>
                            <button type="button" class="btn button-2 view-answers">Ver respuestas</button>
                        </div>
                    </section>`;
                    problem = document.createRange().createContextualFragment(problem);
        
                    const allProblemsContainer = document.querySelector("#all-problems");
        
                    if (allProblemsContainer.children.length > 0) {
                        const firstChild = allProblemsContainer.children[0];
                        allProblemsContainer.insertBefore(problem, firstChild);
                    }
                    else {
                        allProblemsContainer.appendChild(problem);
                    }

                    //Eliminamos el mensaje de que no se encontraron problemas
                    const noProblemsFound = document.querySelector("#no-problems-found");
                    noProblemsFound.parentNode.removeChild(noProblemsFound);
        
                    //Reestablecemos los campos
                    titleInput.value = "";
                    titleInput.focus();
                    titleInput.blur();
                    descriptionInput.innerHTML = "";
                    descriptionInput.focus();
                    descriptionInput.blur();
                    categoryInput.value = "Selecciona una categoría";
                    categoryInput.datatset.value = "0";
                }
                else {
                    alert(res.error);
                }
            }
            else {
                alert("Por favor rellena los campos.");
            }
        }
    });
    
    // -> Publicar un nuevo problema

    // Abrir la caja de respuestas
    
    const openResponses = async id => {
        const data = {
            mode : "getResponses",
            id : id
        };

        let res = await fetch("/requests", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        res = JSON.parse(await res.text());

        if (res.status) {
            //Limpio el contenedor
            const allResponses = document.querySelector("#all-responses");
            allResponses.innerHTML = "";

            if (res.responses.length > 0) {     
                res.responses.reverse();
    
                //Inserto los nuevos elementos
                res.responses.forEach(response => {
                    let responseUser = `
                    <article class="coment" data-id="${response._id}">
                        <span class="username"><b>${response.user}</b></span>
                        <p>${putLineBreaks(response.response)}</p>
                    </article>`;
                    responseUser = document.createRange().createContextualFragment(responseUser);
                    allResponses.append(responseUser);
                });
            }
            else {
                let noResponses = `
                <article class="no-responses-founded">
                    <span>No se encontraron respuestas</span>
                </article>`;
                noResponses = document.createRange().createContextualFragment(noResponses);
                allResponses.append(noResponses);
            }

            document.querySelector("#Respuestas").dataset.problem = id;
            showModal("Respuestas");
        }
        else {
            alert(res.error);
        }
    }
    
    // -> Abrir la caja de respuestas

    // Responder un problema
    
    document.addEventListener("click", e => {
        e.path.every(async _this => {
            if (_this.classList && _this.classList.contains('make-answer')) {
                const parent = _this.parentNode.parentNode;
                const responseArea = parent.querySelector(".text-area")
                const responseText = responseArea.innerHTML.split("<br>").join("\\n");
                const pubId = parent.dataset.id;

                if (responseText != "") {
                    const data = {
                        mode: "makeResponse",
                        responseText,
                        pubId
                    };
    
                    let res = await fetch("/requests", {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=UTF-8'
                        },
                        method: 'POST',
                        body: JSON.stringify(data)
                    });
    
                    openResponses(pubId);
                    responseArea.innerHTML = "";
                    responseArea.focus();
                    responseArea.blur();
                }
                else{
                    alert("Por favor escribe una respuesta.");
                }

                return false;
            }
            return true;
        });
    });
    
    // -> Responder un problema

    // Ver respuestas

    document.addEventListener("click", e => {
        e.path.every(_this => {
            if (_this.classList && _this.classList.contains('view-answers')) {
                const pubId = _this.parentNode.parentNode.dataset.id;
                openResponses(pubId);
                return false;
            }
            return true;
        });
    });

    // -> Ver respuestas

});