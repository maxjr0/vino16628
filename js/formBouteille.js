/**
 * @file Script contenant les fonctions spécifiques à la page d'ajout de bouteille
 * @author Yves Chouinard
 * @update 2019-03-15
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 */

window.addEventListener('load', function() {
    /*
        Éléments de la page d'ajout
    */
    
    let inputRecherche = document.querySelector("[name='recherche']");
    let liste = document.querySelector('.listeAutoComplete');
    let form = document.querySelector(".formBouteille form");
    let submitForm = document.querySelector("[name='submitForm']");
    let imageUsager = document.getElementById("usagerImage");

    if (form) {
        var img = form.querySelector("img");
        
        var champs = {
            "id_cellier": form.querySelector("[name='id_cellier']"),
            "nom": form.querySelector("[name='nom']"),
            "code_saq": form.querySelector("[name='code_saq']"),
            "pays": form.querySelector("[name='pays']"),
            "prix": form.querySelector("[name='prix']"),
            "url_saq": form.querySelector("[name='url_saq']"),
            "url_img": form.querySelector("[name='url_img']"),
            "format": form.querySelector("[name='format']"),
            "type": form.querySelector("[name='type']"),
            "date_achat": form.querySelector("[name='date_achat']"),
            "garde_jusqua": form.querySelector("[name='garde_jusqua']"),
            "notes": form.querySelector("[name='date_achat']"),
            "quantite": form.querySelector("[name='quantite']"),
            "millesime": form.querySelector("[name='millesime']")
        };
    }

    /*
        L'input recherche est un autocomplete qui remplit la liste.
    */
    
    if (inputRecherche) {
        inputRecherche.addEventListener("keyup", function(evt){
            console.log(evt);
            
            let nom = inputRecherche.value;
            console.log('nom');
            console.log(nom);
            liste.innerHTML = "";

            if(nom){
                let requete = new Request(
                    "index.php?requete=autocompleteBouteille",
                    {
                        method: 'POST',
                        body: '{"nom": "' + nom + '", "nbResultats": 10}'
                    }
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

                    response.forEach(function(element){
                        liste.innerHTML += "<li data-id='"+ element.id_bouteille_saq +"'>"+element.nom+"</li>";
                    })
                })
                .catch(error => {
                    console.error(error);
                });
            }
        });
    }

    /*
        Cliquer sur un élément de la liste ajoute les attributs de la bouteille au formulaire.
    */
    
    if (liste) {
        liste.addEventListener("click", function(evt){
            console.log(evt);

            if(evt.target.tagName == "LI"){
                let idBouteilleSaq = evt.target.dataset.id;

                let requete = new Request(
                    "index.php?requete=getBouteilleSaq",
                    {method: 'POST', body: '{"id_bouteille_saq": "'+idBouteilleSaq+'"}'}
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

                    champs.nom.value = response.nom;
                    champs.code_saq.value = response.code_saq;
                    champs.pays.value = response.pays;
                    champs.prix.value = Number(response.prix_saq).toFixed(2);
                    champs.url_saq.value = response.url_saq;
                    champs.url_img.value = response.url_img;
                    champs.format.value = response.format;
                    champs.type.value = response.type;


                    if (img) {
                        // console.log(imageUsager);
                        imageUsager.style.display='none';

                        img.src = response.url_img;
                        img.style.display = "block";

                    }

                    liste.innerHTML = "";
                    inputRecherche.value = "";
                })
                .catch(error => {
                    console.error(error);
                });        
            }
        });        
    }

    /** VALIDTION DU FORMULAIRE **/

    let validationFormulaire = (()=>{
        let obj ={};
        obj.estValide = (unObjet)=>{
            if (unObjet.value ==""){
                return true
            }
        };
        return obj;
    })();


    if (submitForm){

        submitForm.addEventListener('click',(event)=>{
        // console.log(champs.nom)
            if (validationFormulaire.estValide(champs.nom ) == true ||
                validationFormulaire.estValide(champs.pays ) == true ||
                validationFormulaire.estValide(champs.date_achat ) == true ||
                validationFormulaire.estValide(champs.prix) == true ||
                validationFormulaire.estValide(champs.format ) == true ||
                validationFormulaire.estValide(champs.type  ) == true ){
                event.preventDefault();
            }
        });


    }


});

