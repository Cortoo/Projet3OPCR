document.addEventListener('DOMContentLoaded', function() {
    var averageLoadTime = 3000; // Remplacez cette valeur par la moyenne estimée
    
    var loadTimeValue = performance.now();
    var loadTimeElement = document.getElementById('loadingTime');
    loadTimeValue = Math.round(loadTimeValue);
    loadTimeElement.textContent = 'Le temps de chargement de la page est de : ' + loadTimeValue + ' ms (' + (loadTimeValue / 1000).toFixed(2) + ' s)';

    var gainElement = document.getElementById('loadingGain');
    
    if (!isNaN(loadTimeValue)) {
        if (loadTimeValue < averageLoadTime) {
            var gain = averageLoadTime - loadTimeValue;
            gainElement.textContent = 'Soit un gain de vitesse de : ' + gain.toFixed(2) + ' ms (' + (gain / 1000).toFixed(2) + ' s) plus rapide que la moyenne des sites internet.';
        } 
    }
});
