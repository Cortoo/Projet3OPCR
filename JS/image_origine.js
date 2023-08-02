function afficherImageOriginale() {
    // Récupérer les éléments d'images
    const imageTramee = document.getElementById("imageTramee");
    const imageOriginale = document.getElementById("imageOriginale");
  
    // Vérifier si l'image tramee est affichée
    if (imageTramee.style.display === "none") {
      // Afficher l'image tramee et masquer l'image originale
      imageTramee.style.display = "inline";
      imageOriginale.style.display = "none";
    } else {
      // Afficher l'image originale et masquer l'image tramee
      imageTramee.style.display = "none";
      imageOriginale.style.display = "inline";
    }
  }
  