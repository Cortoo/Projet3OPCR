const url = "http://localhost:5678/api/";


// Fetch works from API

fetch(`${url}works`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((projects) => {
    projects.forEach((project) => {
      let figure = document.createElement("figure");
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
      const createFigureGallery = gallery.appendChild(figure);
      
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


      let categoriesContainer = document.querySelector(".filters");
      var gallery = document.querySelector(".gallery");

      choices.forEach((choice) => {
        let button = document.createElement("button");
        button.innerHTML = choice.name;
        button.setAttribute("data-id", choice.id);

        button.addEventListener("click", function(event) {
          var gallery = document.querySelector(".gallery");
          gallery.innerHTML = "";
          let categoryId = event.target.getAttribute("data-id");

          fetch(`${url}works`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((projects) => {
            projects.forEach((project) => {
              if (categoryId == "0" || categoryId == project.categoryId) {
              let figure = document.createElement("figure");
              let image = document.createElement ("img");
              let figcaption = document.createElement("figcaption");
              image.src = project.imageUrl;
              image.alt = project.title;
              figcaption.innerHTML = project.title;
        
              image.setAttribute("crossorigin", "anonymous");  
        
              figure.appendChild(image);
              figure.appendChild(figcaption)
        
              
              gallery.appendChild(figure);
              }
              
            });
          })
          
        
        

        })
        categoriesContainer.appendChild(button);
        })
        
      })
    
   



