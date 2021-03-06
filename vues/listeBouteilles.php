<div class="encadré">
    <div class="containeurBlanc">
        <div class="hautDePage">
            <!-- Bouton Ajouter une bouteille -->
            <button><a href="index.php?requete=nouvelleBouteilleCellier&idCellier=<?= $data['idCellier'] ?>"><i class="fas fa-plus"></i>  Ajouter une bouteille</a></button>

            <!-- Recherche Bouteille-->
            <div class="recherche">
                <div id="recherche_bouteille_cellier" class="group">
                    <label class="icon_form"><i class="fas fa-search"></i></label>
                    <input type="text" name="rechercheInfo" placeholder="Recherche">
                </div>
            </div>

            <!--Bouton choisir affichage-->
            <div id="afficheListe">
                <button class="afficherListeBouteille"><i class="fas fa-list"></i></button>
                <button class="afficherListeVignette"><i class="fas fa-th"></i></button>
            </div>

        </div>
 
        <div class="recherche">
            <ul class="listeAutoComplete"></ul>
            <input type="hidden" name="idCellier" value="<?= $_SESSION['idCellier']?>">
            <button>Filtrer par  <i class="fas fa-angle-down"></i> </button>
        <!--    <button>Filtrer par &nbsp; <i class="fas fa-angle-down"></i> </button>-->

            <div id="filtreRecherche" class="mc">
                <select name="pays">
                    <option value="">Pays</option>
                    <?php
                    foreach ( $data['pays'] as  $pays){
                        if ($pays['pays'] != ""){
                            echo '<option value="'.$pays['pays'].' ">'.$pays['pays'].'</option>';
                        }

                    }
                    ?>
                </select>
                <select name="millesime">
                    <option value="">Millésimes</option>
                    <?php
                    foreach ( $data['millesime'] as  $millesime){
                        if ($millesime['millesime'] != ""){
                            echo '<option value="'.$millesime['millesime'].'">'.$millesime['millesime'].'</option>';
                        }
                    }
                    ?>
                </select>
                <select name="type">
                    <option value="">Type</option>
                    <?php
                    foreach ( $data['type'] as  $type){
                        echo '<option value="'.$type['id_type']. '">'.$type['type'].'</option>';
                    }
                    ?>

                </select>
            </div>

        </div>
        
        <button id="reset"> Remettre à zéro</button>
        <div id="errorFiltre"></div>
        
        <div id="listeBouteille" class="listeBouteilleParVignette">
            <?php
            foreach ($data['listeBouteilles'] as $cle => $bouteille) {
            ?>

            <!-- Carte -->
            <div class="carte bouteille" data-id="<?php echo $bouteille['id_bouteille'] ?>">
                <!-- Carte image -->
                <div class="carte-image">
                    <?php
                    if ($bouteille['url_img'] == null && $bouteille['image'] == null){
                        ?>
                        <img src="./images/bouteille_vin.png" alt="Image de la bouteille">

                        <?php
                    }
                    else{

                        if (trim($bouteille['image']) !== ""){
                            echo '<img src="./images/'. $bouteille['image'] .'" alt="Image de la bouteille">';
                        }
                        else {
                            ?>
                            <img src="https:<?php echo $bouteille['url_img'] ?>" alt="Image de la bouteille">
                            <?php
                        }
                    }
                    ?>
                </div>

                <div class="carte-description">
                    <h2 class="carte-titre">
                        <?php echo $bouteille['nom'] ?>
                    </h2>

                    <div class="carte-information">
                        <!-- Texte -->
                        <div class="carte-type">Type : <?php echo $bouteille['type'] ?></div>
                        <div class="carte-pays">Pays : <?php echo $bouteille['pays'] ?></div>
                        <div class="carte-millesime">Millesime : <?php echo $bouteille['millesime'] ?></div>
                        <div class="carte-date_achat">Date achat : <?php echo $bouteille['date_achat'] ?></div>
                        <div class="carte-quantite">Quantité : <span class="quantite"><?php echo $bouteille['quantite'] ?></span></div>
                    </div>

                    <div class="carte-information-2">
                        <!-- Texte -->
                        <?php
                        if ($bouteille['code_saq'] != null ) {
                            ; ?>
                            <div class="carte-code_saq">Code saq : <a
                                        href="<?php echo $bouteille['url_saq'] ?>"><?php echo $bouteille['code_saq'] ?></a></div>
                            <?php
                        }
                        ?>
                        <div class="carte-format"> Format : <?php echo $bouteille['format'] ?></div>
                        <div class="carte-garde_jusqua">garde jusqu'à : <?php echo $bouteille['garde_jusqua'] ?></div>
                        <div class="carte-notes">Notes : <?php echo $bouteille['notes'] ?></div>
                    </div>

                </div>

                <!-- Bouton -->
                <div class="carte-boutons">
                    <button class='btnAjouter'><i class="fas fa-plus"></i></button>
<!--                    <button class='btnVoir'><a href="index.php?requete=bouteilleIndividuelle&idBouteille=<?= $bouteille['id_bouteille'] ?>"><i class="fas fa-wine-bottle"></i></a></button>-->
                    <button class='btnBoire'><i class="fas fa-minus"></i></button>
                    <button class='btnModifier'><a href="index.php?requete=modifierBouteille&idBouteille=<?= $bouteille['id_bouteille'] ?>"><i class="fas fa-edit"></i></a></button>
                    <button class='btnSupprimer'><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>

            <?php
            }
            ?>
        </div>
    </div>
</div>