// Funciones

const closeModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("show");

    setTimeout(() => {
        const cards = modal.querySelectorAll(".modal-card");
        cards.forEach(e => e.style.display = "none");
    }, 300);
}

const showModal = e => {
    document.querySelector(`#${e}`).style.display = "block";
    document.querySelector("#modal").classList.add("show");
}

// -> Funciones

// Eventos

//Cerrar la ventana al hacer click afuera
document.addEventListener("click", e => {
    let _this = e.target;
    if (_this.classList.contains('modal-main')) closeModal();
});

// -> Eventos