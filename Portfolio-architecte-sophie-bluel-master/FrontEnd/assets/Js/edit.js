const body = document.querySelector("body");
const header = document.querySelector("body > header");
const introduction = document.querySelector("#introduction");
const portfolio = document.querySelector(".myProjects");


//Creation de la bannière et des boutons édition
let editingBanner;
let editingButton;

const createBannner = () => {
    editingBanner = document.createElement("div");
    editingBanner.classList.add("editing_banner");
    editingBanner.innerHTML = `<i class="fa-regular fa-pen-to-square modal_trigger"></i>
    <p>Mode édition</p>
    <button class="changes_publication_button">publier les changements</button>`;
};

const createEditingButton = (id) => {
    editingButton = document.createElement("div");
    editingButton.classList.add("edit_button");
    editingButton.setAttribute("id", id);
    editingButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>`;
};

if (sessionStorage.token) {
    //TO do : Lire token jwt et voir date de validité
    
    //suppression filtres quand login
    document.querySelector(".filters").style.display = "none";

    //création banner
    createBannner();
    body.insertBefore(editingBanner, header);

    createEditingButton("introduction_figure_button");
    const introductionFigure = introduction.querySelector("figure");
    introductionFigure.append(editingButton);


    createEditingButton("projects_editing_button");
    portfolio.append(editingButton);

    //login to logout
    function changeInnerHtml(element, newInnerHtml) {
        element.innerHTML = newInnerHtml;
    }

    let login = document.querySelector("#linkLogin");

    changeInnerHtml(login, "logout");

    //to do : Clear TOKEN eventlistener click login

}
