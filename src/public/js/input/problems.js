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
                        <p>${res.problems.description}</p>
                        <section class="write-answer">
                            <h3>Publica una respuesta</h3>
                            <div class="input-alternative multi-line">
                                <div class="text-area-container">
                                    <div class="text-area" contenteditable="true" id="write-answer-1"></div>
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

});