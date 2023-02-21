const body = document.querySelector("body");
const header = document.querySelector("body > header");
const introduction = document.querySelector("#introduction");
const portfolio = document.querySelector(".myProjects");


//Creation de la bannière et des boutons édition
let editingBanner;
let editingButton;
//var a = document.getElementById("projects_editing_button"); 


const createBannner = () => {
    editingBanner = document.createElement("div");
    editingBanner.classList.add("editing_banner");
    editingBanner.innerHTML = `<i class="fa-regular fa-pen-to-square modal_trigger"></i>
    <p>Mode édition</p>
    <button class="changes_publication_button">publier les changements</button>`;
};

const createEditingButton = (id) => {
    editingButton = document.createElement("a");
    editingButton.setAttribute("href", "#edit_modal");
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

    const logout = () => {
        //suppression du token de sessionStorage
        sessionStorage.clear();
        //redirection vers la page de connexion
        window.location.href = "/login/login.html";
    };
    const logoutButton = document.querySelector("#linkLogin");
    //ajout d'un addEventListener au clic sur le bouton
    logoutButton.addEventListener("click", () => {
        logout();
    });

    



    //Modal
    
    //OpenModal
    let modal = document.querySelector(".modal")
    let overlay = document.querySelector(".overlay")
    const openModal = () => {
        modal.classList.add("active");
        overlay.classList.add("active");
    }
    
    const projectsEditingButton = document.querySelectorAll(".edit_button").forEach(a => {
        a.addEventListener("click", openModal)
    })
   
    //CloseModal
    const closeModal = () => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
    };

    document.getElementById("closeModal").addEventListener("click", closeModal);

}
    //ajout des photos gallerie Modal
    
    //création figure dans GalleryModal
    const createFigureModal = (element) => {
        const modalGallery = document.querySelector(".modal_content");

        const figure = document.createElement("figure");
        figure.setAttribute("data-id", element.id);
        figure.setAttribute("data-tag", element.category.name);
        figure.setAttribute("class", "figureModalGallery");

        const img = document.createElement("img");
        img.setAttribute("class", "imgModalGallery");
        img.setAttribute("crossorigin", "anonymous");
        img.setAttribute("src", element.imageUrl);
        img.setAttribute("alt", element.title);

        const arrowIcon = document.createElement("i");
        arrowIcon.setAttribute(
            "class",
            "fa-solid fa-arrows-up-down-left-right arrowMove"
        );

        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "fa-solid fa-trash-can trashCan");
        trashIcon.setAttribute("data-id", element.id);

        const h4 = document.createElement("h4");
        h4.innerText = "éditer";

        figure.appendChild(img);
        figure.appendChild(arrowIcon);
        figure.appendChild(trashIcon);
        figure.appendChild(h4);

        modalGallery.appendChild(figure);
    };
    
    fetch("http://localhost:5678/api/works")
        //si fetch fonctionne on récupère les données au format JSON
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })

        //"createFigureModal" pour chaque élément récupéré
        .then((products) => {
            products.forEach((product) => {
                createFigureModal(product);
            });
            //ajoute un addEventListener sur tous les icones corbeille
            const trashButtons = document.querySelectorAll(".trashCan");
            trashButtons.forEach((button) => {
                button.addEventListener("click", (e) => deleteWork(e.target));
            });
        })

        //Console LOG
        .catch((err) => {
            console.log(err);
        });


