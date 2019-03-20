/**
 * @file Code spécifique à la page de liste des bouteilles d'un cellier (vue listeBouteilles.php)
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 */

window.addEventListener('load', () => {
    /*
        Rend le bouton supprimer visible seulement si la quantité de la bouteille est zéro.
    */
    
    function ajusterVisibiliteBtnSupprimer(divBouteille) {
        console.log(divBouteille);
        let btnSupprimer = divBouteille.querySelector('.btnSupprimer');
        let quantite = divBouteille.querySelector('.quantite').innerHTML;        
        btnSupprimer.style.display = (quantite > 0) ? 'none' : 'inline';
    }
    
    /*
        Met à jour la quantité d'une bouteille donnée dans le DOM et ajuste la visibilité du bouton supprimer en conséquence.
    */
    
    function ajusterQuantiteDom(idBouteille, quantite) {
        let divBouteille = document.querySelector(".bouteille[data-id='" + idBouteille + "']");
        divBouteille.querySelector(".quantite").innerHTML = quantite;
        ajusterVisibiliteBtnSupprimer(divBouteille);
    }
    
    /*
        Fait la requête Ajax pour modifier la quantite d'une bouteille donnée et modifie la quantité dans le DOM avec la nouvelle valeur.
    */
        
    function modifierQuantite(nomRequete, idBouteille) {
        let requete = new Request(
            BaseURL + "index.php?requete=" + nomRequete,
            {method: 'POST', body: '{"id": ' + idBouteille + '}'}
        );

        console.log(requete);

        fetch(requete).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error('Erreur');
            }
        })
        .then(response => {
            console.log(response);
            ajusterQuantiteDom(idBouteille, response.quantite);
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    /*
        Pour chaque div bouteille :
        
            - Le bouton boire diminue la quantié de la bouteille dans le cellier;
            - Le bouton ajouter diminue la quantité de la bouteille dans le cellier;
            - Le bouton supprimer n'est visible que si la quantité est supérieure à zéro.
    */
            
    document.querySelectorAll('.bouteille').forEach(divBouteille => {
        let idBouteille = divBouteille.dataset.id;
        
        divBouteille.querySelector(".btnBoire").addEventListener('click', evt => {
            modifierQuantite('boireBouteilleCellier', idBouteille);
        });
        
        divBouteille.querySelector(".btnAjouter").addEventListener('click', evt => {
            modifierQuantite('ajouterBouteilleCellier', idBouteille);
        });
        
        ajusterVisibiliteBtnSupprimer(divBouteille);
    });
});