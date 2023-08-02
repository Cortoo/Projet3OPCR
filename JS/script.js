// Déclarer les variables en dehors de la fonction pour les rendre accessibles globalement
let htmlSize = 0;
let resourcesSize = 0;

// Fonction pour calculer le poids total de la page
function calculerPoidsTotal() {
    // Poids du HTML
    htmlSize = document.documentElement.innerHTML.length;

    // Poids des ressources statiques (images, CSS, JavaScript)
    const resources = document.querySelectorAll('img, link[rel="stylesheet"], script');

    resources.forEach(resource => {
      if (resource.tagName === 'IMG') {
        resourcesSize += resource.outerHTML.length;
      } else {
        resourcesSize += resource.innerHTML.length;
      }
    });
};

document.addEventListener("DOMContentLoaded", function () {
  // Appel de la fonction pour calculer le poids total de la page
  calculerPoidsTotal();

  // Poids total de la page (HTML + ressources statiques) en kilo-octets (KB)
  const totalSizeKB = (htmlSize + resourcesSize) / 1024;

  // Mettre à jour l'élément HTML avec le résultat du calcul
  document.getElementById("poidsTotal").textContent = `${totalSizeKB.toFixed(2)} KB`;
});
