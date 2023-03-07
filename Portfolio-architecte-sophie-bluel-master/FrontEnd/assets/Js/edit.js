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
   //test decode JWT
   function parseJwt (token) {
    var base64Url = token.split('.')[1];
    if (base64Url) {
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    if (jsonPayload) {
        return JSON.parse(jsonPayload);
    }
    else {
        return null;
    }
}
else {
    return null;
}
}

if (sessionStorage.token) {
   
    const timeOut = parseJwt(sessionStorage.token) ? parseJwt(sessionStorage.token).exp : 0;
    if (timeOut >= Date.now()/1000) {
        
    
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
        window.location.href = "index.html";
    };
    
    //ajout d'un addEventListener au clic sur le bouton
    login.addEventListener("click", (event) => {
        event.preventDefault ();
        console.log("click", logout)
        logout();
    });

    



    //Modal
    
    //OpenModal
    let addPhotoModal = document.querySelector("#add_Photo");
    let modal_2 = document.querySelector(".modal_2")
    let modal = document.querySelector(".modal")
    let overlay = document.querySelector(".overlay")

    const openModal = () => {
        modal.classList.add("active");
        overlay.classList.add("active");
    }

    const openModal_2 = () => {
        modal_2.style.display = "block";
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

    //CloseModal2
    const closeModal_2 = () => {
        modal_2.style.display = "none";
        overlay.classList.remove("active");
    };

    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("closeModal_2").addEventListener("click", closeModal_2);

    //fermture on click a l'extérieur de la moddal
    overlay.addEventListener("click", closeModal)
    overlay.addEventListener("click", closeModal_2)
    
    //bouton return
    const return_modal1 = document.getElementById("previous_icon");
    return_modal1.addEventListener("click", () => {
    closeModal_2();
    openModal()
    });


    // open Modal AddPhoto
    const addingModal = document.getElementById("addPhoto");
                addingModal.addEventListener("click", () => {
                closeModal();
                openModal_2()
                });
    
    

    

    }
        

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

        //delete WORK
        const deleteWork = (element) => {
            const workId = element.dataset.id;
            fetch(`http://localhost:5678/api/works/${workId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${sessionStorage["token"]}`,
                },
            })
                .then((res) => {
                    if (res.ok) {
                        console.log("L'image à bien été supprimée");
                        element.parentNode.remove();
                        Array.from(gallery.querySelectorAll("figure")).forEach(
                            (figure) => {
                                if (figure.getAttribute("data-id") === workId) {
                                    figure.remove();
                                }
                            }
                        );
                    } else {
                        //si la suppression a échoué, affiche un message d'erreur
                        console.error("Une erreur est survenue lors de la suppression");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
                };

                //delete ALL

                let deleteTrigger = document.querySelector(".gallery_supression")
                var gallery = document.querySelector(".gallery");
                const deleteAllWork = () => {
                     gallery.querySelectorAll("figure").forEach(
                        (figure) => { 
                            figure.remove()
                }
                    )}
                    deleteTrigger.addEventListener("click", deleteAllWork)
                
                //fonction qui va vérifier sont correctes
            const verifyData = () => {
            const buttonCheck = document.getElementById("valider");
            const newPhoto = document.getElementById("buttonAddPhoto");
            const newTitle = document.getElementById("sendPhotoTitle");
            const selectElement = document.getElementById("sendPhotoCategory");
            //si les 3 champs à remplir sont completés on met le background en couleur
            if (
            newPhoto.value !== "" &&
            newTitle.value !== "" &&
            selectElement.value !== "0"
            ) {
            let error = document.querySelector("p#error");
            if (error) {
            error.remove();
            }
            buttonCheck.style.backgroundColor = "#1D6154";
            return true;
            //sinon on le laisse en gris
            } else {
            buttonCheck.style.backgroundColor = "#A7A7A7";
            return false;
            }
        };

        const createNewWork = () => {
            //crée la nouvelle image
            const data = new FormData();
            const buttonCheck = document.getElementById("valider");
            const newPhoto = document.getElementById("buttonAddPhoto");
            const newTitle = document.getElementById("sendPhotoTitle");
            const newCategory = document.getElementById("sendPhotoCategory");
            data.append("image", newPhoto.files[0]);
            data.append("title", newTitle.value);
            data.append("category", newCategory.value);
        
            fetch(
                "http://localhost:5678/api/works", //envoie une requête à l'api pour crée une nouvelle image
                {
                    method: "POST",
                    accept: "application/json",
                    headers: {
                        Authorization: `Bearer ${sessionStorage["token"]}`,
                    },
                    body: data,
                }
            )
                .then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                        addDynamicWork(data);
                        })
                        
                        alert("Projet ajouté !");
                    } else {
                        let error = document.querySelector("p#error");
                        if (error) {
                            error.parentNode.removeChild(error);
                        }
                        buttonCheck.insertAdjacentHTML(
                            "beforebegin",
                            `<p id="error">*Veuillez remplir tous les champs</p>`
                        );
                    }
                })
                
        
                .catch((error) => {
                    console.log(error);
                });
        };
        
        const addDynamicWork = (project) => {
            //ajoute dynamiquement le Work en utilisant l'ancienne fonction
            let figure = document.createElement("figure");
            figure.setAttribute("data-id", project.id);
            let image = document.createElement ("img");
            let figcaption = document.createElement("figcaption");
            image.src = project.imageUrl;
            image.alt = project.title;
            figcaption.innerHTML = project.title;
      
            image.setAttribute("crossorigin", "anonymous");  
      
            figure.appendChild(image);
            figure.appendChild(figcaption)
      
            var gallery = document.querySelector(".gallery");
            //to do : Refactoriser
            gallery.appendChild(figure);
        };

        const photoPreview = document.getElementById("buttonAddPhoto");
    photoPreview.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file.size < 4 * 1024 * 1024) {
            //vérifie la taille de l'image
            const photoPreviewBox = document.getElementById("photoShowPreview");
            const fileUrl = URL.createObjectURL(file);
            photoPreviewBox.src = fileUrl;

            const sendPhotoContentElements =
                document.querySelectorAll(".sendPhotoContent");
            for (const element of sendPhotoContentElements) {
                element.style.display = "none";
                photoPreviewBox.style.display = "block";
            }
        } else {
            alert("image trop volumineuse");
        }
    });

//verifie les changement dans le form
document
.getElementById("addPhotoForm")
.addEventListener("change", verifyData);

//si le bouton est en couleur (valide), la fonction createNewWork est appellée quand cliqué
document.getElementById("valider").addEventListener("click", () => {
if (verifyData) {
    createNewWork();
}
});