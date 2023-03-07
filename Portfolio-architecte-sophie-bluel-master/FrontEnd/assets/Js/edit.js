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
   //Decode JWT pour sécuriser la connexion (sinon l'user a simplement a mettre token = 1 dans la console pour se connecter)
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
    //vérifie que le Token est valide
    const timeOut = parseJwt(sessionStorage.token) ? parseJwt(sessionStorage.token).exp : 0;
    if (timeOut >= Date.now()/1000) {
        
    //suppression filtres quand login
    document.querySelector(".filters").style.display = "none";

    //création banner édition
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
        //redirection homepage
        window.location.href = "index.html";
    };
    
    //ajout d'un addEventListener au clic sur le bouton
    login.addEventListener("click", (event) => {
        event.preventDefault ();
        console.log("click", logout)
        logout();
    });

    



    //Modal

    const modalBox = `
    <div class="overlay"></div>

    <aside id="edit_modal" class="modal">
        <div class="modalWrapper">
        <header class="headerModal">
            <i id="closeModal" class="fa-solid fa-xmark"></i>
        </header>
        <h3>Galerie photo</h3>
        <div class="modal_content"></div>
        <input type="submit" id="addPhoto" value="Ajouter une photo">  
        <div class="gallery_supression">Supprimer la galerie</div>
    </aside>
    </div>
    
    
        <aside id="add_Photo" class="modal_2">
            <div class="modalWrapper">
            <header class="headerModal">
                <i id="previous_icon" class="fa-solid fa-arrow-left-long"></i>
                <i id="closeModal_2" class="fa-solid fa-xmark"></i>
            </header>
            <h3>Ajout photo</h3>
            <div class="modal_content"></div>
        <form action="#" method="post" id="addPhotoForm">
            <div id="sendPhotoContainer">
                <label class="sendPhotoContent" for="buttonAddPhoto">
                    <i class="fa-regular fa-image photoIcon"></i>
                </label>
                <label for="buttonAddPhoto" id="buttonAddPhotoData" class="sendPhotoContent">
                  + Ajouter photo
                <input type="file" id="buttonAddPhoto" accept="image/jpeg,image/png,image/jpg" required />
                </label>
                <label class="sendPhotoContent" id="indicationPhoto">jpg.png: 4mo max</label>
                                <img id="photoShowPreview" alt="votre photo" src="#" />
                            </div>
                            <div class="optionPhotoSelection">
                            <label>Titre</label>
                            <input type="text" name="Title" id="sendPhotoTitle" required />
                            <label>Catégorie</label>
                            <select id="sendPhotoCategory">
                                <option value="0"></option>
                                <option value="1">Objets</option>
                                <option value="2">Appartements</option>
                                <option value="3">Hôtels & restaurants</option>
                            </select>
                            </div>
                        </form>
                        <button id="valider">Valider</button>  
                </div>
                
        
            </aside>
        </div>
        `
        document.body.insertAdjacentHTML("afterbegin", modalBox);

    //OpenModal & CloseModal
    const addPhotoModal = document.querySelector("#add_Photo");
    const modal_2 = document.querySelector(".modal_2");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    //Open Modal
    const openModal = (modal) => {
    modal.classList.add("active");
    overlay.classList.add("active");
    };

    //Close Modal
    const closeModal = (modal) => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    };

    //openModal on click "Modifier" on Homepage
    const projectsEditingButton = document.querySelectorAll(".edit_button").forEach(a => {
    a.addEventListener("click", () => openModal(modal));
    });

    //closeModal when click on cross
    document.getElementById("closeModal").addEventListener("click", () => closeModal(modal));
    document.getElementById("closeModal_2").addEventListener("click", () => closeModal(modal_2));

    //closeModal when click outside Modal
    overlay.addEventListener("click", () => {
    closeModal(modal);
    closeModal(modal_2);
    });

    
    //Button return
    const return_modal1 = document.getElementById("previous_icon");
    return_modal1.addEventListener("click", () => {
    closeModal(modal_2);
    openModal(modal)
    });


    // open Modal_2 when click on AddPhoto
    const addingModal = document.getElementById("addPhoto");
                addingModal.addEventListener("click", () => {
                closeModal(modal);
                openModal(modal_2)
                });
    }
}
    //ajout des photos gallerie Modal
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
    
    fetch(`${url}works`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })

        //Création de figure gallery dans la Modal
        .then((projects) => {
            projects.forEach((project) => {
                createFigureModal(project);
            });
            //ajoute un addEventListener sur trashCan
            const trashButtons = document.querySelectorAll(".trashCan");
            trashButtons.forEach((button) => {
                button.addEventListener("click", (e) => deleteWork(e.target));
            });
        })
        .catch((err) => {
            console.log(err);
        });

        //Delete WORK
        const deleteWork = (element) => {
            const workId = element.dataset.id;
            fetch(`${url}works/${workId}`, {
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
                        //si la suppression a échoué = erreur
                        console.error("Une erreur est survenue lors de la suppression");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
                };

                //Delete ALL when click on Supprimer la galerie

                let deleteTrigger = document.querySelector(".gallery_supression")
                var gallery = document.querySelector(".gallery");
                const deleteAllWork = () => {
                    const figures = gallery.querySelectorAll("figure");
                    figures.forEach((figure) => {
                      const workId = figure.getAttribute("data-id");
                      fetch(`${url}works/${workId}`, {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${sessionStorage["token"]}`,
                        },
                      })
                        .then((res) => {
                          if (res.ok) {
                            console.log(`Les projets ont bien été supprimés`);
                           //a revoir pour supprimer de la gallery = workId.parentNode.remove();
                            Array.from(gallery.querySelectorAll("figure")).forEach(
                                (figure) => {
                                    if (figure.getAttribute("data-id") === workId) {
                                        figure.remove();
                                    }
                                })
                            //figure.remove();
                          } else {
                            console.error(`Une erreur est survenue lors de la suppression des projets`);
                          }
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                    });
                  };
                  
                  deleteTrigger.addEventListener("click", deleteAllWork);
                
            //fonction qui va vérifier datas sont correctes
            const verifyData = () => {
            const buttonCheck = document.getElementById("valider");
            const newPhoto = document.getElementById("buttonAddPhoto");
            const newTitle = document.getElementById("sendPhotoTitle");
            const selectElement = document.getElementById("sendPhotoCategory");

            //si les 3 champs sont corrects = bouton vert
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
            //sinon bouton gris
            } else {
            buttonCheck.style.backgroundColor = "#A7A7A7";
            return false;
            }
        };

        const createNewWork = () => {
            //créer la nouvelle image
            const data = new FormData();
            const buttonCheck = document.getElementById("valider");
            const newPhoto = document.getElementById("buttonAddPhoto");
            const newTitle = document.getElementById("sendPhotoTitle");
            const newCategory = document.getElementById("sendPhotoCategory");
            data.append("image", newPhoto.files[0]);
            data.append("title", newTitle.value);
            data.append("category", newCategory.value);
        
            fetch(`${url}works`,
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
                        
                        alert("Le projet a bien été ajouté");
                    } else {
                        let error = document.querySelector("p#error");
                        if (error) {
                            error.parentNode.removeChild(error);
                        }
                        buttonCheck.insertAdjacentHTML(
                            "beforebegin",
                            `<p id="error">*Tous les champs sont nécessaires</p>`
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        
         //to do : Refactoriser
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
            gallery.appendChild(figure);

            
        };

        const photoPreview = document.getElementById("buttonAddPhoto");
        photoPreview.addEventListener("change", (event) => {
        const file = event.target.files[0];
        //vérifie la taille de l'image
        if (file.size < 4 * 1024 * 1024) {
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

//si le bouton est valide, la fonction createNewWork est appellée quand cliqué
document.getElementById("valider").addEventListener("click", () => {
if (verifyData) {
    createNewWork();
}
});