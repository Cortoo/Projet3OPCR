const url = "http://localhost:5678/api/";


// Recupération works via API

fetch(`${url}works`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((projects) => {
    projects.forEach((project) => {
      var figure = document.createElement("figure");
      var image = document.createElement ("img");
      image.src = project.imageUrl;
      image.alt = project.title;
      image.setAttribute("crossorigin", "anonymous");  
      figure.appendChild(image);
      var gallery = document.querySelector(".gallery");
      gallery.appendChild(figure);
    });
  })
  .catch((error) => console.log("mon erreur "+error));
