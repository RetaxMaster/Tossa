document.addEventListener("DOMContentLoaded", () => {

    // Añadir nueva categoría
    
    document.addEventListener("submit", async e => {
        const _this = e.target;
        if (_this.id == "new-category") {
            e.preventDefault();
            const input = document.querySelector("#category-name");
            if (input.value != "") {
                const newCategory = input.value;
                const data = {
                    mode : "addCategory",
                    name : newCategory
                }
    
                let res = await fetch("/requests", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                });
                res = JSON.parse(await res.text());
                
                if (res.status) {
                    let category = `
                    <div class="category" data-id="${res.id}">
                        <span>${res.name}</span>
                        <div class="delete">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>`;
                    category = document.createRange().createContextualFragment(category);

                    document.querySelector("#your-categories").querySelector(".all-categories").appendChild(category);

                    input.value = "";
                } else {
                    alert(res.error)
                }
            }
            else {
                alert("Por favor escribe una categoría.");
            }
        }
    });
    
    // -> Añadir nueva categoría

    // Eliminar categoría
    
    document.querySelector("#add-categories").addEventListener("click", e => {
        e.path.every(async _this => {
            if (_this.classList && _this.classList.contains("delete")) {
                const element = _this.parentNode;
                const id = element.dataset.id;
                var data = {
                    mode : "deleteCategory",
                    id : id
                }

                // Petición Ajax
                let res = await fetch("/requests", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                res = JSON.parse(await res.text());
                // -> Petición Ajax

                if (res.status) {
                    element.parentNode.removeChild(element);
                }
                else {
                    alert(res.error);
                }
                
                return false;
            }
            return true;
        });
    });
    
    // -> Eliminar categoría

    // Añadir nuevo administrador
    
    document.addEventListener("submit", async e => {
        const _this = e.target;
        if (_this.id == "new-admin") {
            e.preventDefault();
            const input = document.querySelector("#admin-name");
            if (input.value != "") {
                const newAdmin = input.value;
                const data = {
                    mode : "addAdmin",
                    username : newAdmin
                }
    
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
                    let admin = `
                    <div class="admin" data-id="${res.id}">
                        <span>${res.username}</span>
                        <div class="delete">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>`;
                    admin = document.createRange().createContextualFragment(admin);

                    document.querySelector("#your-admins").querySelector(".all-admins").appendChild(admin);

                    input.value = "";
                } else {
                    alert(res.error)
                }
            }
            else {
                alert("Por favor escribe una nombre de usuario.");
            }
        }
    });
    
    // -> Añadir nuevo administrador

    // Eliminar administrador
    
    document.querySelector("#add-admins").addEventListener("click", e => {
        e.path.every(async _this => {
            if (_this.classList && _this.classList.contains("delete")) {
                const element = _this.parentNode;
                const id = element.dataset.id;
                var data = {
                    mode : "deleteAdmin",
                    id : id
                }

                // Petición Ajax
                let res = await fetch("/requests", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                });
                res = JSON.parse(await res.text());
                // -> Petición Ajax

                if (res.status) {
                    element.parentNode.removeChild(element);
                }
                else {
                    alert(res.error);
                }
                
                return false;
            }
            return true;
        });
    });
    
    // -> Eliminar administrador

});