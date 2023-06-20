<!DOCTYPE html>

<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <!-- <meta name="HandheldFriendly" content="true"> -->
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title> Renta & Co</title>
        <link type="text/css" rel="stylesheet" href="style.css">
        
    </head>
    <body>
        <main>
            <aside id="aside">
                <div class="box-aside">
                    <a href="index.html"><div  class="titre">Renta & Co</div></a>
                    <div class="user">
                        <a href="">
                            <div class="user-logo"><img src="assets/boulanger.png" style="height: 56px; width: 56px; border-radius: 50%;"></div>
                        </a>
                        <div class="user-box">
                            <a href="">
                                <div class="user-name">La Petite Boulangerie</div>
                            </a>
                            <a href="">
                                <div class="user-info">Modifier mes informations</div>
                            </a>
                        </div>
                    </div>
                    <div class="menu">
                        <a href=""><div class="content">Mon tableau de bord</div></a>
                        <a href="matieres-premieres.php"><div class="content" style="font-weight: 800;">Mes matières premières</div></a>
                        <a href=""><div class="content">Mes préparations</div></a>
                        <a href="recette.php"><div class="content">Mes recettes</div></a>
                        
                    </div>
                </div>
            </aside>
            <div id="box" class="box">
                <div class="box-titre">
                    <div class="titre">Mes Matières Premières 🥚 </div>
                    <div class="sous-titre">Ajouter ou modifier votre ingrédient en remplissant le formulaire ci-dessous 📝</div>
                    <div class="recherche-box">
                        <input class="recherche" placeholder="Rechercher">
                        <img src="assets/loupe.svg" class="loupe">
                    </div>
                </div>
                <a href="#" id="button-add" class="add-mat">Ajouter<div class="add-mat-plus"><span class="cross"></span></div></a> 
                <div class="table-container">
                    <table id="table-mat" class="table-mat">
                        <thead>
                            <tr>
                                <th>Famille Produit</th>
                                <th>Ingrédient</th>
                                <th>Prix HT/unité</th>
                                <th>TVA %</th>
                                <th>Unité</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                include 'functions.php';
                                $query = "SELECT * FROM matieres";
                                $result = $db->query($query);
                                $rows = $result->fetchAll();
                                if ($rows === null) {
                                } else {
                                    foreach ($rows as $row) {
                            ?>
                            <tr>
                                <th><?php 
                                    echo $row['famille']; ?></th>
                                <th><?php echo $row['ingredient']; ?></th>
                                <th><?php echo str_replace(".", ",", rtrim(number_format(($row['prix']/$row['qte']), 3), '.0'))."€"; ?></th>
                                <th><?php 
                                    $query = "SELECT famille.tva FROM matieres INNER JOIN famille ON matieres.famille = famille.nom WHERE matieres.id = :id";
                                    $stmt = $db->prepare($query);
                                    $stmt->bindParam(':id', $row['id']);
                                    $stmt->execute();
                                    $tva = $stmt->fetchColumn();
                                    echo str_replace(".", ",", rtrim(number_format($tva, 3), '.0'))."%";
                                ?></th>
                                <th style="display:none;"><?php echo str_replace(".", ",", rtrim(number_format($row['qte'], 3), '.0')); ?></th>
                                <th><?php echo $row['unite']; ?></th>
                                <th style="display:none;"><?php echo str_replace(".", ",", rtrim(number_format($row['prix'], 3), '.0')); ?></th>
                                <th style="display:none;"><?php echo $row['fournisseur']; ?></th>
                                <th>
                                    <a href="#" id="modifier-link" class="modifier-link" data-id="<?php echo $row['id']; ?>"><img src="assets/btnModifier.svg"></a>
                                    <div class="modifier-box" id="modifier-box-<?php echo $row['id']; ?>" data-id="<?php echo $row['id'];  ?>">
                                        <div id="modifier-button" class="modifier-button" data-id="<?php echo $row['id']; ?>">Modifier <img src="assets/crayon.svg" style="margin-left:26px;"></div>
                                        <form id="dupliquer-form" action="dupliquer-items.php" method="post"> 
                                            <button type="submit" id="dupliquer-button" name="dupliquer-button" class="dupliquer-button" value="<?php echo $row['id']; ?>">Dupliquer  <img src="assets/dupliquer.svg" style="margin-left:14px;"></button>
                                        </form>
                                        <div id="supprimer-button" class="supprimer-button" data-id="<?php echo $row['id']; ?>">Supprimer <img src="assets/poubelle.svg" style="margin-left:13px;"></div>
                                    </div>
                                </th>
                            </tr>
                            <?php }}
                         ?>
                        </tbody>
                    </table>
                </div>
                <div class="notif" id="notif"></div>
            </div>
            
            <div id="add-item" class="add-item">
                <div class="box-titre">
                    <div class="titre">Mes Matières Premières 🥚 </div>
                    <div class="sous-titre">Ajouter ou modifier votre ingrédient en remplissant le formulaire ci-dessous 📝</div>
                    <a href="" id="precedent" class="precedent"><img src="assets/arrow-left-gray.png"> <span style="margin-left: 10px;">Précédent</span></a>
            
                </div>
                <div class="main-box">
                    <form id="form-add" action="add-items.php" method="post">
                        <div class="box-items">Nom de votre ingrédient<input class="item-input" name="nom-ingredient" placeholder="Nom de l'ingrédient"></div>
                        <div class="menu-deroulant" id="menu-deroulant">
                            <div class="box-items">Famille de votre ingrédient                         
                                <input class="item-input" id="famille-ingredient" name="famille-ingredient" placeholder="Famille de l'ingrédient" readonly>
                                <div class="menu-famille" id="menu-famille" value="">
                                    <div class="recherche-box2">
                                        <input type="texte" class="item-deroulant-rechercher-famille-ajouter" id="famille-recherche-ajouter" value="" placeholder="Rechercher"></input>
                                        <img src="assets/loupe.svg" class="loupe2">
                                    </div>
                                    <span id="ajax-famille-ajouter">
                                        <?php
                                            include 'functions.php';
                                            $query = "SELECT nom FROM famille";
                                            $result = $db->query($query);
                                            $rows = $result->fetchAll();
                                            if ($rows === null) {
                                                
                                            } else {
                                                foreach ($rows as $row) {
                                        ?>
                                        <div class="item-deroulant" value=<?php echo $row['nom']; ?>><?php echo $row['nom']; ?><div class="crayon-rouge" id="crayon-rouge1" ><img src="assets/crayonRouge.svg"></div></div>
                                        <?php }} ?>
                                    </span>
                                    <div id="add-famille" class="add-famille">Ajouter une famille</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-items">Prix d’achat HT € <input type="number" id="prix-ingredient" class="item-input" name="prix-ingredient" placeholder="Prix d’achat HT €" step="0.001"></div>
                        <div class="box-items" style="height: 116px;">TVA %<br>
                            <span>Ce chiffre a été enregistré automatiquement lors de la saisie de la famille produit.</span><input type="number" id="tva-ingredient" class="item-input" name="tva-ingredient" placeholder="TVA %" readonly disabled></div>
                        <div class="box-items">Poids net de l’achat ou pièce<input type="number" id="poids" class="item-input" name="poids-ingredient" placeholder="Poids" step="0.001"></div>
                        <div class="menu-deroulant-unite" id="menu-deroulant-unite">
                            <div class="box-items">Unité
                                <input class="item-input" id="unite-ingredient" name="unite-ingredient" placeholder="Unité" readonly>
                                <div class="menu-famille" id="menu-unite" value="">
                                    <div class="item-deroulant-unite" value="Kg">Kg</div>
                                    <div class="item-deroulant-unite" value="L">L</div>
                                    <div class="item-deroulant-unite" value="Pièce">Pièce</div>
                                </div>
                            </div>                       
                        </div>
                        <div class="box-items" style="height: 116px;">Prix HT€, à l’unité<br>
                            <span>Ce chiffre a été automatiquement calculé pour vous.</span> <input type="number" id="prixHTU" class="item-input" name="prix-unite-ingredient" readonly disabled></div>
                        <div class="menu-deroulant-fournisseur" id="menu-deroulant-fournisseur">
                            <div class="box-items">Fournisseur ingrédient
                            <input class="item-input" id="fournisseur-ingredient" name="fournisseur-ingredient" placeholder="Fournisseur" readonly>
                                <div class="menu-fournisseur" id="menu-fournisseur" value="">
                                    <div class="recherche-box2">
                                        <input type="texte" class="item-deroulant-rechercher-fournisseur-ajouter" id="fournisseur-recherche-ajouter" value="" placeholder="Rechercher"></input>
                                        <img src="assets/loupe.svg" class="loupe2">
                                    </div>
                                    <span id="ajax-fournisseur">
                                        <?php
                                            include 'functions.php';
                                            $query = "SELECT nom FROM fournisseur";
                                            $result = $db->query($query);
                                            $rows = $result->fetchAll();
                                            if ($rows === null) {
                                                
                                            } else {
                                                foreach ($rows as $row) {
                                        ?>
                                        <div class="item-deroulant-fournisseur" value=<?php echo $row['nom']; ?>><?php echo $row['nom']; ?><div class="crayon-rouge" id="crayon-rouge2"><img src="assets/crayonRouge.svg"></div></div>
                                        <?php }} ?>
                                    </span>
                                    <div id="add-fournisseur" class="add-fournisseur">Ajouter un fournisseur</div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="add-items-button">Ajouter mon ingrédient</button>
                    </form>
                </div>
            </div>

            <div id="modifier-item" class="modifier-item">
                <div class="box-titre">
                    <div class="titre">Mes Matières Premières 🥚 </div>
                    <div class="sous-titre">Ajouter ou modifier votre ingrédient en remplissant le formulaire ci-dessous 📝</div>
                    <a href="" id="modifier-precedent" class="precedent"><img src="assets/arrow-left-gray.png"> <span style="margin-left: 10px;">Précédent</span></a>
            
                </div>
                <div class="main-box">
                    <form id="form-modifier" action="modifier-items.php" method="post">
                        <div class="box-items">Nom de votre ingrédient<input class="item-input" name="nom-ingredient" placeholder="Nom de l'ingrédient"></div>
                        <div class="menu-deroulant-modifier" id="menu-deroulant-modifier">
                            <div class="box-items">Famille de votre ingrédient
                                <input class="item-input" id="famille-ingredient-modifier" name="famille-ingredient" placeholder="Famille de l'ingrédient" readonly>
                                <div class="menu-famille" id="menu-famille-modifier" value="">
                                    <div class="recherche-box2">
                                        <input type="texte" class="item-deroulant-rechercher-famille-modifier" id="famille-recherche-modifier" value="" placeholder="Rechercher"></input>
                                        <img src="assets/loupe.svg" class="loupe2">
                                    </div>
                                    <span id="ajax-famille-modifier">
                                        <?php
                                            include 'functions.php';
                                            $query = "SELECT nom FROM famille";
                                            $result = $db->query($query);
                                            $rows = $result->fetchAll();
                                            if ($rows === null) {
                                                
                                            } else {
                                                foreach ($rows as $row) {
                                        ?>
                                        <div class="item-deroulant-modifier" value=<?php echo $row['nom']; ?>><?php echo $row['nom']; ?><div class="crayon-rouge" id="crayon-rouge3"><img src="assets/crayonRouge.svg"></div></div>
                                        <?php }} ?>
                                    </span>
                                    <div id="add-famille-modifier" class="add-famille-modifier">Ajouter une famille</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-items">Prix d’achat HT € <input type="number" id="prix-ingredient2" class="item-input" name="prix-ingredient" placeholder="Prix d’achat HT €" step="0.001"></div>
                        <div class="box-items" style="height: 116px;">TVA %<br>
                            <span>Ce chiffre a été enregistré automatiquement lors de la saisie de la famille produit.</span><input type="number" id="tva-ingredient-modifier" class="item-input" name="tva-ingredient-modifier" placeholder="TVA %" value="" readonly></div>
                        <div class="box-items">Poids net de l’achat ou pièce<input type="number" id="poids2" class="item-input" name="poids-ingredient" placeholder="Poids" step="0.001" ></div>
                        <div class="menu-deroulant-unite-modifier" id="menu-deroulant-unite-modifier">
                            <div class="box-items">Unité
                                <input class="item-input" id="unite-ingredient-modifier" name="unite-ingredient" placeholder="Unité" readonly>
                                <div class="menu-famille" id="menu-unite-modifier" value="">
                                    <div class="item-deroulant-unite-modifier" value="Kg">Kg</div>
                                    <div class="item-deroulant-unite-modifier" value="L">L</div>
                                    <div class="item-deroulant-unite-modifier" value="Pièce">Pièce</div>
                                </div>
                            </div>                       
                        </div>
                        <div class="box-items" style="height: 116px;">Prix HT€, à l’unité<br>
                            <span>Ce chiffre a été automatiquement calculé pour vous.</span> <input type="number" id="prixHTU2" class="item-input" name="prix-unite-ingredient" readonly disabled></div>
                        <div class="menu-deroulant-fournisseur-modifier" id="menu-deroulant-fournisseur-modifier">
                            <div class="box-items">Fournisseur ingrédient
                                <input class="item-input" id="fournisseur-ingredient-modifier" name="fournisseur-ingredient" placeholder="Fournisseur" readonly>
                                <div class="menu-fournisseur" id="menu-fournisseur-modifier" value="">
                                    <div class="recherche-box2">        
                                        <input type="texte" class="item-deroulant-rechercher-fournisseur-modifier" id="item-deroulant-rechercher-fournisseur-modifier" value="" placeholder="Rechercher"></input>
                                        <img src="assets/loupe.svg" class="loupe2">
                                    </div>
                                    <span id="ajax-fournisseur-modifier">
                                        <?php
                                            include 'functions.php';
                                            $query = "SELECT nom FROM fournisseur";
                                            $result = $db->query($query);
                                            $rows = $result->fetchAll();
                                            if ($rows === null) {
                                                
                                            } else {
                                                foreach ($rows as $row) {
                                        ?>
                                    
                                        <div class="item-deroulant-fournisseur-modifier" id="ajax-fournisseur" value=<?php echo $row['nom']; ?>><?php echo $row['nom']; ?><div class="crayon-rouge" id="crayon-rouge4"><img src="assets/crayonRouge.svg"></div></div>
                                        <?php }} ?>
                                    </span>
                                    <div id="add-fournisseur" class="add-fournisseur">Ajouter un fournisseur</div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" id="modifier-form" name="modifier-form" class="add-items-button" value="">Modifier mon ingrédient</button>
                    </form>
                </div>
            </div>

            <div class="supprimer-box">
                <div class="supprimer-content">
                    <div class="supprimer-titre">Vous souhaitez supprimer votre<br> ingrédient</div>
                    <div class="supprimer-main">Votre ingrédient va disparaître également<br>
                        de vos recettes. Êtes-vous sûr(e) de vouloir<br>
                          le supprimer ?</div>
                    <form id="supprimer-form" action="supprimer-items.php" method="post">
                        <button type="submit" id="supprimer-box-button" name="supprimer-box-button" class="supprimer-box-button" value="">Supprimer</button>
                    </form>
                    <div class="close-supprimer"><span class="cross-supp"></span></div>
                </div>
            </div>

            <div class="famille-box">
                <div class="famille-content">
                    <div class="famille-titre">Ajoutez ici une famille d’ingrédient</div>
                    <form id="famille-form" action="add-famille-ajouter.php" method="post">
                        <div class="famille-main">Quel est le nom de votre famille d’ingrédient ?</div>
                        <input class="famille-input" name="input-nom-famille" placeholder="Nom de votre famille">
                        <div class="famille-main">Quel est la TVA% de cette famille ?</div>
                        <input class="famille-input" name="input-tva-famille" placeholder="TVA %">
                        <button type="submit" id="famille-box-button" name="famille-box-button" class="famille-box-button" value="">Ajouter ma famille</button>
                    </form>
                    <div class="close-famille"><span class="cross-supp"></span></div>
                    <img src="assets/Check.svg" class="check" id="check-famille">
                    <div class="notif-famille" id="notif-famille"></div>
                </div>
            </div>
            <div class="famille-box-modifier">
                <div class="famille-content">
                    <div class="famille-titre">Ajoutez ici une famille d’ingrédient</div>
                    <form id="famille-form-modifier" action="add-famille-modifier.php" method="post">
                        <div class="famille-main">Quel est le nom de votre famille d’ingrédient ?</div>
                        <input class="famille-input" name="input-nom-famille" placeholder="Nom de votre famille">
                        <div class="famille-main">Quel est la tva de votre famille d’ingrédient ?</div>
                        <input class="famille-input" name="input-tva-famille" placeholder="TVA %">
                        <button type="submit" id="famille-box-button" name="famille-box-button" class="famille-box-button" value="">Ajouter ma famille</button>
                    </form>
                    <div class="close-famille-modifier"><span class="cross-supp"></span></div>
                    <img src="assets/Check.svg" class="check" id="check-famille-modifier">
                    <div class="notif-famille" id="notif-famille-modifier"></div>
                </div>
            </div>    

            <div class="famille-box-modifier-ajouter">
                <div class="famille-content">
                    <div class="famille-titre">Modifier cette famille</div>
                    <form id="famille-form-modifier-ajouter" action="modifier-famille.php" method="post">
                        <div class="famille-main">Quel est le nouveau nom de cette famille ?</div>
                        <input class="famille-input" id="input-nom-famille-ajouter" name="input-nom-famille-ajouter" placeholder="Nom de votre famille" value="">
                        <input class="famille-input" id="input-nom-famille-ajouter2" name="input-nom-famille-ajouter2" value="" style="display:none;">
                        <div class="famille-main">Quel est la nouvelle TVA% de cette famille ?</div>
                        <input class="famille-input" id="input-tva-famille-modifier" name="input-tva-famille-modifier" placeholder="TVA %">
                        <button type="submit" id="famille-box-button" name="famille-box-button" class="famille-box-button" value="">Modifier cette famille</button>
                    </form>
                    <div class="close-famille-modifier" id="close-famille-modifier-ajouter"><span class="cross-supp"></span></div>
                    <img src="assets/Check.svg" class="check" id="check-famille-modifier-ajouter">
                    <div class="notif-famille" id="notif-famille-modifier-ajouter"></div>
                </div>
            </div>

            <div class="famille-box-modifier-modifier" id="famille-box-modifier-modifier">
                <div class="famille-content">
                    <div class="famille-titre">Modifier cette famille</div>
                    <form id="famille-form-modifier-modifier" action="modifier-famille-modifier.php" method="post">
                        <div class="famille-main">Quel est le nouveau nom de cette famille ?</div>
                        <input type="text" class="famille-input" id="input-nom-famille-modifier" name="input-nom-famille-modifier" placeholder="Nom de votre famille" value="">
                        <input class="famille-input" id="input-nom-famille-modifier2" name="input-nom-famille-modifier2" value="" style="display:none;">
                        <div class="famille-main">Quel est la nouvelle TVA% de cette famille ?</div>
                        <input class="famille-input" id="input-tva-famille-modifier" name="input-tva-famille-modifier" placeholder="TVA %">
                        <button type="submit" id="famille-box-button" name="famille-box-button" class="famille-box-button" value="">Modifier cette famille</button>
                    </form>
                    <div class="close-famille-modifier" id="close-famille-modifier-modifier"><span class="cross-supp"></span></div>
                    <img src="assets/Check.svg" class="check" id="check-famille-modifier-modifier">
                    <div class="notif-famille" id="notif-famille-modifier-modifier"></div>
                </div>
            </div>

            <div class="fournisseur-box">
                <div class="fournisseur-content">
                    <div class="fournisseur-titre">Ajoutez ici une fournisseur d’ingrédient</div>
                    <form id="fournisseur-form" method="post">
                        <div class="fournisseur-main">Quel est le nom de votre fournisseur d’ingrédient ?</div>
                        <input class="fournisseur-input" name="input-nom-fournisseur" placeholder="Nom de votre fournisseur">
                        <button type="submit" id="fournisseur-box-button" name="fournisseur-box-button" class="fournisseur-box-button" value="">Ajouter un fournisseur</button>
                    </form>
                    <div class="close-fournisseur"><span class="cross-supp"></span></div>
                    <img src="assets/Check.svg" class="check" id="check-fournisseur">
                    <div class="notif-fournisseur" id="notif-fournisseur"></div>
                </div>
            </div>

            <div class="fournisseur-box-modifier">
                <div class="fournisseur-content">
                    <div class="fournisseur-titre">Ajoutez ici une fournisseur d’ingrédient</div>
                    <form id="fournisseur-form-modifier" action="add-fournisseur-modifier.php" method="post">
                        <div class="fournisseur-main">Quel est le nom de votre fournisseur d’ingrédient ?</div>
                        <input class="fournisseur-input" name="input-nom-fournisseur" placeholder="Nom de votre fournisseur">
                        <button type="submit" id="fournisseur-box-button" name="fournisseur-box-button" class="fournisseur-box-button" value="">Ajouter un fournisseur</button>
                    </form>
                    <div class="close-fournisseur-modifier"><span class="cross-supp"></span></div>
                    <img src="assets/Check.svg" class="check" id="check-fournisseur">
                    <div class="notif-fournisseur" id="notif-fournisseur"></div>
                </div>
            </div>
            
        </main>
        
        
    </body>
</html>	
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="script.js"></script>