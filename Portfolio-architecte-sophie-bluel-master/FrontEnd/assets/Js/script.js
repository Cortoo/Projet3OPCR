var works = null;
var gallery = document.querySelector(".gallery");
let categoriesContainer = document.querySelector(".filters");

//Fonctions :

//Fonction création de figure gallery
const createFigureGallery = (element) => {
  const figure = document.createElement("figure");
  figure.setAttribute("data-tagid", element.categoryId);
  figure.setAttribute("data-id", element.id);

  const img = document.createElement("img");
  img.setAttribute("crossorigin", "anonymous");
  img.setAttribute("src", element.imageUrl);
  img.setAttribute("alt", element.title);

  const figcaption = document.createElement("figcaption");
  figcaption.innerText = element.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
};

//Fetch works from API
fetch(`${url}works`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((projects) => {
    works = projects;
    works.forEach((project) => {
      gallery.appendChild(createFigureGallery(project));
      
    });
  })
  .catch((error) => console.log("mon erreur "+error));


  //fetch categories from API
  fetch(`${url}categories`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })

  .then((choices) => {
      //first category with id 0 and name "Tous"
      choices.unshift({
        id: 0,
        name: "Tous",
      });

      //Affichage des Works selon filtre 
      choices.forEach((choice) => {
        let button = document.createElement("button");
        button.innerHTML = choice.name;
        button.setAttribute("data-id", choice.id);
        button.addEventListener("click", function(event) {
        gallery.innerHTML = "";
        let categoryId = event.target.getAttribute("data-id");

          
        works.forEach((project) => {
          if (categoryId == "0" || categoryId == project.categoryId) {
          gallery.appendChild(createFigureGallery(project));
                  }
              
        });
        })
        categoriesContainer.appendChild(button);
      })
  })
    
   



