const supressionModal = document.querySelector("#supression_modal");
const overlay = document.querySelector(".overlay");
const supressionModalContent = supressionModal.querySelector(".modal_content");
const modal = documnent.querySelector(".modal")

// Fonctions d'ouverture/fermeture modale
const openModal = (modal) => {
    overlay.classList.add("active");
    modal.classList.add("active");
};

const closeModal = (modal) => {
    overlay.classList.remove("active");
    modal.classList.remove("active");
};

// Ouverture de la supressionModal au clic
const projectsEditingButton = document.querySelector("#projects_editing_button");

projectsEditingButton.addEventListener("click", () => {
    openModal(supressionModal);
});